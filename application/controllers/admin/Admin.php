<?php

    class Admin extends C_Controller{
        function __construct(){
            parent::__construct();
            $this->check_access('admin', 'open');
        }

        function index(){
            $main_content = 'index';
            $this->_view($main_content, 'admin');
        }

    }
