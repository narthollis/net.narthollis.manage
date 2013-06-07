var dnsService = angular.module('dnsService', ['ngResource']);

dnsService.factory('Zone', function($resource) {
    return $resource(
        '/dns/api/zone/:zone_id',
        {'zone_id': '@id'}
    );
});

dnsService.factory('Record', function($resource) {
    return $resource(
        '/dns/api/zone/:zone_id/record/:record_id',
        {'zone_id': '@zone', 'record_id': '@id'}
    );
});
