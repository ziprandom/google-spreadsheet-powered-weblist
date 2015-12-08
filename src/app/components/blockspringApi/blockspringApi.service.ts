declare var blockspring: any; // magic

export class BlockspringApi {
    //   private apiUrl: string = "https://run.blockspring.com/api_v2/blocks/query-google-spreadsheet?&flatten=true&cache=true&expiry=3600";

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
	    this.$log.error('XHR Failed for getContributors.\n', error.data);
	});
	return deferred.promise;
    }
}
