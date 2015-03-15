(function () {

    var app = angular.module("scraperify");

    var MainController = function ($http) {
        var vm = this;

        vm.doClick = function () {

            var encodedUrl = 'http://localhost/Ng-ex2/build/api/scrape/' + vm.selectedLangFrom.name + '/' + vm.selectedLangTo.name + '/' + encodeURIComponent(vm.selector) + '/' + encodeURIComponent(encodeURIComponent(prepareUrl(vm.url)));
            var responsePromise = $http.get(encodedUrl);

            responsePromise.success(function (data, status, headers, config) {
                vm.nodes = data.data;
                //console.log(data);
            });
            responsePromise.error(function (data, status, headers, config) {
                //console.log("AJAX failed!");
            });
        };

        vm.langFrom = [
            {id: 1, name: 'es'},
            {id: 2, name: 'en'}
        ];

        vm.selectedLangFrom = vm.langFrom[0];

        vm.langTo = [
            {id: 1, name: 'es'},
            {id: 2, name: 'en'}
        ];
        vm.selectedLangTo = vm.langTo[0];

        vm.url = 'victorbarcelo.net';
        vm.selector = '.post_title';
        //vm.url = null;
        //vm.selector = null;

    };

    var prepareUrl = function (url) {
        return url.replace(/.*?:\/\//g, "").replace(/\/$/, "");
    };

    app.controller("MainController", MainController);

}());