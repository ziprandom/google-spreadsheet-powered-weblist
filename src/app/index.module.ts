/// <reference path="../../.tmp/typings/tsd.d.ts" />

import { config } from './index.config';
import { routerConfig } from './index.route';
import { runBlock } from './index.run';
import { MainController } from './main/main.controller';
import { BlockspringApi } from '../app/components/blockspringApi/blockspringApi.service';
import { PostRepo } from '../app/components/postRepo/postRepo.service';

declare var malarkey: any;
declare var moment: moment.MomentStatic;

module ghlist {
  'use strict';

  angular.module('ghlist', ['ngAnimate', 'ngCookies', 'ngSanitize', 'ui.router', 'ui.bootstrap'])
    .constant('malarkey', malarkey)
    .constant('moment', moment)
    .config(config)
    .config(routerConfig)
    .run(runBlock)
    .service('blockspringApi', BlockspringApi)
    .service('postRepo', PostRepo)
    .controller('MainController', MainController)
}
