(function() {
    'use strict';

    requirejs.config({
        paths: {
            es6: '../node_modules/requirejs-babel/es6',
            babel: '../node_modules/requirejs-babel/babel-5.8.22.min',
            angular: '../node_modules/angular/angular'
        },
        shim: {
            angular: {
                exports: 'angular'
            }
        },
        deps: ['angular', 'es6!app'],
        callback: function(angular, app) {
            angular.bootstrap(document, [app.name]);
        }
    });

})();