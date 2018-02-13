import { join } from 'path';

import { SeedConfig } from './seed.config';
import { ExtendPackages } from './seed.config.interfaces';

/**
 * This class extends the basic seed configuration, allowing for project specific overrides. A few examples can be found
 * below.
 */
export class ProjectConfig extends SeedConfig {

  PROJECT_TASKS_DIR = join(process.cwd(), this.TOOLS_DIR, 'tasks', 'project');

  constructor() {
    super();
    // this.APP_TITLE = 'Put name of your app here';
    // this.GOOGLE_ANALYTICS_ID = 'Your site's ID';

    /* Enable typeless compiler runs (faster) between typed compiler runs. */
    // this.TYPED_COMPILE_INTERVAL = 5;

    // Add `NPM` third-party libraries to be injected/bundled.
    this.NPM_DEPENDENCIES = [
      ...this.NPM_DEPENDENCIES,
      // {src: 'jquery/dist/jquery.min.js', inject: 'libs'},
      // {src: 'lodash/lodash.min.js', inject: 'libs'},
      //{src: 'bootstrap/dist/js/bootstrap.min.js', inject: 'libs'}
    ];

    // Add `local` third-party libraries to be injected/bundled.
    this.APP_ASSETS = [
      // {src: `${this.APP_SRC}/your-path-to-lib/libs/jquery-ui.js`, inject: true, vendor: false}
      // {src: `${this.CSS_SRC}/path-to-lib/test-lib.css`, inject: true, vendor: false},
       {src: 'node_modules/tether/dist/js/tether.min.js', inject: 'libs', vendor: false}

    ];

    this.ROLLUP_INCLUDE_DIR = [
      ...this.ROLLUP_INCLUDE_DIR,
      //'node_modules/moment/**'
    ];

    this.ROLLUP_NAMED_EXPORTS = [
      ...this.ROLLUP_NAMED_EXPORTS,
      //{'node_modules/immutable/dist/immutable.js': [ 'Map' ]},
    ];





    let additionalPackages: ExtendPackages[] = [{
      name: '@ng-bootstrap/ng-bootstrap',
      // Path to the package's bundle
      path: 'node_modules/@ng-bootstrap/ng-bootstrap/bundles/ng-bootstrap.js'
    },{
      name: 'angular-web-storage',
      // Path to the package's bundle
      path: 'node_modules/angular-web-storage/bundles/angular-web-storage.umd.min.js'
    }

  ];

    this.addPackagesBundles(additionalPackages);

    this.SYSTEM_CONFIG_DEV.paths['@ng-bootstrap/ng-bootstrap'] =
      `${this.APP_BASE}node_modules/@ng-bootstrap/ng-bootstrap/bundles/ng-bootstrap.js`;

    this.SYSTEM_BUILDER_CONFIG.packages['@ng-bootstrap/ng-bootstrap'] = {
      main: 'index.js',
      defaultExtension: 'js'
    };

    this.SYSTEM_BUILDER_CONFIG.packageConfigPaths.push(
      join('node_modules', '@ng-bootstrap', '*', 'package.json')
    );

    // Add `NPM` third-party libraries to be injected/bundled.
    this.NPM_DEPENDENCIES = [
      ...this.NPM_DEPENDENCIES,
      { src: 'jquery/dist/jquery.js', inject: 'libs' },
      { src: 'popper.js/dist/umd/popper.min.js', inject: 'libs' },
      { src: 'bootstrap-float-label/dist/bootstrap-float-label.min.css', inject: true }
      //{ src: 'bootstrap/dist/css/bootstrap.css', inject: true }
      // {src: 'jquery/dist/jquery.min.js', inject: 'libs'},
      // {src: 'lodash/lodash.min.js', inject: 'libs'},
    ];
    this.NPM_DEPENDENCIES = [
      ...this.NPM_DEPENDENCIES,
      { src: 'tether/dist/js/tether.min.js', inject: 'libs' },
      //remove the lines below for production
      // { src: 'ng2-toastr/bundles/ng2-toastr.min.css', inject: true },
      // { src: 'ng2-toastr/bundles/ng2-toastr.min.js', inject: 'libs' },
      //remove the lines above for production
      { src: 'bootstrap/dist/js/bootstrap.js', inject: 'libs' },
      { src: 'bootstrap/dist/css/bootstrap.css', inject: true }
      // {src: 'jquery/dist/jquery.min.js', inject: 'libs'},
      // {src: 'lodash/lodash.min.js', inject: 'libs'},
    ];


    // Add packages (e.g. ng2-translate)
    // let additionalPackages: ExtendPackages[] = [{
    //   name: 'ng2-translate',
    //   // Path to the package's bundle
    //   path: 'node_modules/ng2-translate/bundles/ng2-translate.umd.js'
    // }];
    //
    // this.addPackagesBundles(additionalPackages);

    /* Add proxy middleware */
    // this.PROXY_MIDDLEWARE = [
    //   require('http-proxy-middleware')('/account', { ws: false, target: 'http://localhost:5555' })
    // ];

    /* Add to or override NPM module configurations: */
    // this.PLUGIN_CONFIGS['browser-sync'] = { ghostMode: false };
  }

}
