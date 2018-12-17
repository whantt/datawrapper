/* globals $, dw, _, define */
define(function() {

    return function(chart) {
        var saveTimeout,
            unsavedChanges = false,
            nextSaveDeferred = $.Deferred(),
            saveCallbacks = [];

        function save() {

            window.fetch(
                // '/api/2/charts/'+chart.get('id') + window.location.search, {
                '//api.datawrapper.local/3/charts/'+chart.get('id') + window.location.search,
            {
                method: 'PUT',
                mode: 'cors',
                 headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(chart.attributes())
            })
            .then(res => {
                if (res.status !== 200) return new Error(res.statusText);
                return res.text();
            })
            .then(text => {
                // console.log('status', res);
                try {
                    return JSON.parse(text);
                } catch (Error) {
                    // could not parse json, so just return text
                    console.warn('malformed json input', text);
                    return text;
                }
            })
            .then(function(data) {
                if (data.status === "ok") {
                    // run callbacks
                    unsavedChanges = false;
                    _.each(saveCallbacks, function(cb) {
                        cb(chart);
                    });
                    nextSaveDeferred.resolve(data);
                    // create new deferred
                    nextSaveDeferred = $.Deferred();
                } else {
                    console.warn('could not save the chart', data);
                    dw.backend.logError('The chart changes could not be saved because of a server error.', '.chart-editor');
                }
            })
            .catch((err) => {
                console.error(err);
                console.warn(err.responseText);
                dw.backend.logError('The chart changes could not be saved because of a server error.', '.chart-editor');

            });
        }

        chart.save = save;

        chart.saveSoon = _.debounce(save, 1000);

        chart.onSave = function(callback) {
            saveCallbacks.push(callback);
        };

        chart.hasUnsavedChanges = function() {
            return unsavedChanges;
        };

        chart.nextSavePromise = function() {
            return nextSaveDeferred.promise();
        };

        chart.sync = function(el, attribute, _default) {
          if (_.isString(el)) el = $(el);
            el.data('sync-attribute', attribute);

            // initialize current state in UI
            var curVal = chart.get(attribute, _default);
            if (el.is('input[type=checkbox]'))  {
                el.prop('checked', curVal);
            } else if (el.is('input[type=text]') || el.is('textarea') || el.is('select')) {
                el.val(curVal);
            } else if (el.is('input[type=radio]')) {
                if (_.isBoolean(curVal)) {
                    curVal = curVal ? 'yes' : 'no';
                }
                $('input:radio[name='+el.attr('name')+'][value='+curVal+']').prop('checked', 'checked');
            }

            function storeElementValue(el) {
                var attr, val;
                // Resolve attribute string to a pointer to the attribute
                attr = el.data('sync-attribute');

                if (el.is('input[type=checkbox]')) {
                    val = el.prop('checked');
                } else if (el.is('input[type=text]') || el.is('textarea') || el.is('select')) {
                    val = el.val();
                } else if (el.is('input[type=radio]')) {
                    val = $('input:radio[name='+el.attr('name')+']:checked').val();
                    if (val === 'yes') val = true;
                    else if (val === 'no') val = false;
                }
                if (val !== undefined) {
                    chart.set(attr, val);
                }
            }

            el.change(function(evt) {
                storeElementValue($(evt.target));
            });

            if (el.is('input[type=text]') || el.is('textarea')) {
                el.keyup(function(evt) {
                    storeElementValue($(evt.target));
                });
            }
        };

        chart.onChange(function() {
            unsavedChanges = true;
            clearTimeout(saveTimeout);
            saveTimeout = setTimeout(save, 800);
        });

        window.onbeforeunload = function() {
            if (unsavedChanges) return 'Caution: unsaved changes';
        };
    };

});
