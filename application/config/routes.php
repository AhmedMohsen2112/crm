<?php
    defined('BASEPATH') OR exit('No direct script access allowed');

    $route['default_controller'] = 'home';
    $route['404_override'] = '';
    $route['admin'] = 'admin/admin';
    $route['([a-z]{2})/hotels/(:any)'] = 'hotels/index/$2';
    $route['([a-z]{2})/property/(:any)/(:any)'] = 'property/index';
    $route['api/data'] = 'api/main/data';
    $route['api/brands'] = 'api/main/brands';
    $route['api/category'] = 'api/main/category';
    $route['api/product'] = 'api/main/product';
    $route['api/dec'] = 'api/main/dec';
    $route['api/languages'] = 'api/main/languages';
    $route['api/countries'] = 'api/main/countries';



    $route['^([a-z]{2})$'] = $route['default_controller'];
    $route['^([a-z]{2})/(.*)$'] = "$2";
    //$route['404_override'] = 'pages';
