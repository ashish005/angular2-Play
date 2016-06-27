/**
 * System configuration for Angular 2 samples
 * Adjust as necessary for your application needs.
 */
(function(global) {
  // map tells the System loader where to look for things
  var map = {
    'app':                        'app', // 'dist',
    'esfi-common':                'app/common',
    'esfi-modules':               'app/app-modules',
    '@angular':                   'node_modules/@angular',
    'angular2-in-memory-web-api': 'node_modules/angular2-in-memory-web-api',
    'rxjs':                       'node_modules/rxjs',
    'ag-grid-ng2':                'node_modules/ag-grid-ng2',
    'ag-grid':                    'node_modules/ag-grid',
    'ng2-bs3-modal':              'node_modules/ng2-bs3-modal'
  };
  // packages tells the System loader how to load when no filename and/or no extension
  var packages = {
    'app'                         : { main: 'main.js',  defaultExtension: 'js' },
    'esfi-common'                 : { defaultExtension: 'js' },
    'rxjs'                        : { defaultExtension: 'js' },
    'angular2-in-memory-web-api'  : { main: 'index.js', defaultExtension: 'js' },
    'ag-grid-ng2'                 : { defaultExtension: "js" },
    'ag-grid'                     : { defaultExtension: "js" },
    'ng2-bs3-modal'               : { defaultExtension: "js" }
  };
  var ngPackageNames = [
    'common',
    'compiler',
    'core',
    'http',
    'platform-browser',
    'platform-browser-dynamic',
    'router',
    'router-deprecated',
    'upgrade',
  ];
  // Add package entries for angular packages
  ngPackageNames.forEach(function(pkgName) {
    packages['@angular/'+pkgName] = { main: pkgName + '.umd.js', defaultExtension: 'js' };
  });
  var config = {
    map: map,
    packages: packages
  }
  System.config(config);
})(this);