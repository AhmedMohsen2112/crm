<?php

    class Logout extends Admin_Controller{
        function __construct(){
            parent::__construct();
        }

        function index(){
            $CI = & get_instance();
            unset(
                    $_SESSION['USER_SESSION_DATA']
            );
            $CI->session->sess_destroy();
            redirect(base_url('admin'));
        }

    }
