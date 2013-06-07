/*
function ZonesListCtrl($scope, $http) {
    $http.get('/dns/zone/').success(function(data) {
        $scope.zones = [];
        for (var i=0,len=data.length; i<len; i++) {
            $scope.zones[i] = data[i]['fields'];
            $scope.zones[i]['pk'] = data[i]['pk'];
        }
    });

    $scope.orderProp = 'zone';
}
*/

function ZonesListCtrl($scope, Zone) {
    $scope.zones = Zone.query();

    $scope.orderProp = 'zone';
}
ZonesListCtrl.$inject = ['$scope', 'Zone'];

function ZoneCtrl($scope, Zone) {
    $scope.zone = new Zone();

    $scope.addZone = function() {
        $scope.zone.$save()
    };
}
ZoneCtrl.$inject = ['$scope', 'Zone'];

function ZoneRecordsListCtrl($scope, $routeParams, Zone, Record) {
    $scope.zone = Zone.get({'zone_id': $routeParams.zone_id});
    $scope.records = Record.query({'zone_id': $routeParams.zone_id});

    $scope.default = {};
    $scope.default.ttl = 7200;

    $scope.getTemplateUrl = function(record) {
        return 'partials/record_types/' + record.type.toLowerCase() + '.html';
    }
}
ZoneRecordsListCtrl.$inject = ['$scope', '$routeParams', 'Zone', 'Record'];

function ZoneRecordCtrl($scope) {
    $scope.record = $scope.$parent.record;

    $scope.hostname = /^(\*\.)?([a-z0-9_][a-z0-9-]*\.)*([a-z0-9_][a-z0-9-]*)$/;
    $scope.ipv4 = /((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.|$)){4}/;
    // This Horrific blob of regexp validates ipv6 addresses
    // Sourced from http://forums.intermapper.com/viewtopic.php?t=452
    $scope.ipv6 = /^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/;

}
ZoneRecordCtrl.$inject = ['$scope'];

