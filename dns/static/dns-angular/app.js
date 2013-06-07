angular.module('nndns', ['dnsService']).config(
    [
        '$routeProvider',
        function($routeProvider) {
            $routeProvider.
                when('/zone', { controller: ZonesListCtrl }).
                when('/zone/new', { templateUrl: 'partials/zone-new.html', controller: ZoneCtrl }).
                when('/zone/:zone_id', { templateUrl: 'partials/zone-records.html', controller: ZoneRecordsListCtrl }).
                otherwise({redirectTo: '/zone'});
        }
    ]
);
