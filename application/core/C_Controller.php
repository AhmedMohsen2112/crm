<?php
    (defined('BASEPATH')) OR exit('No direct script access allowed');

    class C_Controller extends Admin_Controller{
        function __construct(){
            parent::__construct();
            $this->is_logged_in();
        }

        public function is_logged_in(){
            if (!$this->isUser) {
                redirect(base_url('admin/login'));
            }
        }

    }
