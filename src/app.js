'use strict';

import angular from 'angular';

var ngModule = angular.module('app', []);

ngModule.directive('console', function consoleDirective() {
    const EM = 12;
    const CHAR_WIDTH = 6;
    const PADDING_TOP = 2;
    const PADDING_LEFT = 2;

    return {
        restrict: 'E',
        templateUrl: 'templates/console.html',
        scope: {},
        link: function($scope, $element, $attrs) {
            var el = $element[0];
            var $textarea = angular.element(el.querySelector('textarea'));
            var $dropdownMenu = angular.element(el.querySelector('.dropdown-menu'));

            var updateCursorPosition = function() {
                var selectionStart = $textarea.prop('selectionStart');
                var content = $textarea.val().substr(0, selectionStart);
                
                $scope.column = selectionStart - content.lastIndexOf('\n', selectionStart);
                $scope.line = content.split(/\n/).length;
            };

            var findCursorCoordinates = function() {
                return {
                    top: EM * ($scope.line - 1) - $textarea.prop('scrollTop') + PADDING_TOP,
                    left: CHAR_WIDTH * ($scope.column - 1) - $textarea.prop('scrollLeft') + PADDING_LEFT
                };
            };

            var triggerIntellisense = function() {
                var pos = findCursorCoordinates();

                $dropdownMenu.addClass('open').css({
                    left: pos.left + 'px',
                    top: pos.top + 'px'
                });
            };

            $textarea.on('keyup', e => { if (e.ctrlKey && e.keyCode === 32) triggerIntellisense(); });
            $textarea.on('keypress keyup mouseup', () => $scope.$apply(updateCursorPosition));

            $scope.items = [{name: 'test'}];
        }
    }
});

export default ngModule;