(function() {

    'use strict';

    function HomeService() {
        this.message = 'Well hello there...';
    }

    angular
        .module('home')
        .service('HomeService', HomeService);

})();