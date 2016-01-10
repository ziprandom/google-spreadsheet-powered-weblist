declare var blockspring: any; // magic

export class BlockspringApi {

    /** @ngInject */
    constructor(private $log: angular.ILogService, private $q: any, private $http: angular.IHttpService) {
    }

    getSpreadsheet(spreadsheetUrl: string): angular.IPromise<any[]> {
	var deferred: ng.IDeferred<any> = this.$q.defer();
        blockspring.runParsed('query-google-spreadsheet', {
            query: 'SELECT A, B, C, D, E, F, G, H, I',
            url: spreadsheetUrl
        }, (response: any): any => {
	    deferred.resolve(response.params.data);
        }, (error: any): any => {
	    deferred.reject();
	  this.$log.error('XHR Failed for ' + spreadsheetUrl + '\n', error.data);
	});
	return deferred.promise;
    }
}
