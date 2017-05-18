define(function(require) {

	var $ = require('jquery');

    var upload = require('./edit/upload'),
        charttype = require('./edit/charttype'),
        customize = require('./edit/customize'),
        publish = require('./edit/publish');

    return function(chart) {

    	// initialize sub-modules
    	upload(chart);
    	charttype(chart);
    	customize(chart);
    	publish(chart);

    	// all UI changes is driven by events
    	chart.onChange(function() {

    	});

    };

});
