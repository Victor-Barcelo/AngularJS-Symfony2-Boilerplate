(function () {

    var app = angular.module("scraperify");

    var MainController = function ($http) {
        var vm = this;
        vm.doClick = function() {
            console.log("click!");
            var responsePromise = $http.get("http://localhost/Ng-ex2/build/api/scrape/es/eng/foo/.post_title");

            responsePromise.success(function(data, status, headers, config) {
                vm.responseData = data;
                console.log("hey!");
                console.log(data);
            });
            responsePromise.error(function(data, status, headers, config) {
                console.log("AJAX failed!");
            });
        }

    };

    app.controller("MainController", MainController);

}());