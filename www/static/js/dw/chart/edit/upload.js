define(function(require) {
    
    var Handsontable = require('handsontable-new');

    var data = [
        ['', 'Kia', 'Nissan', 'Toyota', 'Honda', 'Mazda', 'Ford'],
        ['2012', 10, 11, 12, 13, 15, 16],
        ['2013', 10, 11, 12, 13, 15, 16],
        ['2014', 10, 11, 12, 13, 15, 16],
        ['2015', 10, 11, 12, 13, 15, 16],
        ['2016', 10, 11, 12, 13, 15, 16]
    ],
    cont = document.getElementById('ht-data-upload');

    var hot = new Handsontable(cont, {
        // data: [['']],
        startRows: 11,
        startCols: 10,
        colHeaders: true,
        stretchH: 'all',
        minSpareRows: 1
    });

    return function(chart) {

    };
    // console.log('xx', Handsontable);

});