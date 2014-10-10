(function() {

    'use strict';

    function HomeDirective() {
        return {
            templateUrl: 'scripts/home/home.html',
            restrict: 'A',
            controller: 'HomeController',
            controllerAs: 'home'
        };
    }

    angular
        .module('home')
        .directive('home', HomeDirective);

})();