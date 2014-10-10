(function() {

    'use strict';

    /* @ngInject */
    function HomeController(HomeService) {
        this.message = HomeService.message;
    }

    angular
        .module('home')
        .controller('HomeController', HomeController);

})();