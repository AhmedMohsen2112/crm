<?php

    class Other_settings extends C_Controller{
        public function __construct(){
            parent::__construct();
            $this->check_access('other_settings', 'open');
            $this->load->model('Other_settings_model', 'other_settings');
            $this->load->model('Currency_model', 'currency');
        }

        public function index(){
            $this->check_access('other_settings', 'open');
            $other_settings = $this->_other_settings;
            $this->data['other_settings'] = $other_settings;
            $main_content = 'other_settings/index';
            $this->_view($main_content, 'admin');
        }

        function edit(){
            $this->check_access('other_settings', 'edit');
            $id = $_POST['id'];
            $find = $this->other_settings->find($id);
            //pri($find);
            $this->load->library('form_validation');
            $this->form_validation->set_rules('language', _lang('language'), 'required');
            if ($this->form_validation->run() == false) {
                $errors = $this->form_validation->error_array();
                print_json('error', $errors);
            } else {
                $data['language'] = $this->input->post('language');
                $where_array['id'] = $id;
                //pri($where_array);
                $update = $this->other_settings->update($data, $where_array);
                $other_settings_after_update = $this->other_settings->find($id);
                if ($update) {
                    print_json('success', $other_settings_after_update);
                } else {
                    print_json('error', 'no_affected_rows');
                }
            }

            //save data here
        }

    }
