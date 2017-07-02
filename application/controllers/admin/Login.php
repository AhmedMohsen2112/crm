<?php

    class Login extends Admin_Controller{
        function __construct(){
            parent::__construct();
            $this->load->model('User_model', 'user');
            $this->is_logged_in();
        }

        function index(){
            //pri($this->Employee);

            $this->load->view('main_content/admin/login');
        }

        public function check(){

            $this->form_validation->set_rules('username', _lang('username'), 'required');
            $this->form_validation->set_rules('password', _lang('password'), 'required');
            $ajax = $_POST['ajax'];

            if ($this->form_validation->run() == true) {
                //$remember = (bool) $this->input->post('remember');
                if ($this->user->userLogIn($_POST['username'], $_POST['password'], false)) {

                    if ($ajax) {
                        print_json("success", base_url('admin'));
                    }
                } else {
                    print_json("error", _lang('invalid_username_or_password'));
                }
            } else {
                print_json("error", $this->form_validation->error_array());
            }
        }

        public function is_logged_in(){
            if ($this->isUser) {
                redirect(base_url('admin'));
            }
        }

    }
