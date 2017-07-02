<?php

    class App_settings extends C_Controller{
        public function __construct(){
            parent::__construct();
            $this->check_access('app_settings', 'open');
            $this->load->model('App_settings_model', 'app_settings');
        }

        public function index(){
            $this->check_access('app_settings', 'open');
            $app_settings = $this->app_settings->row();
            //pri($app_settings);
            $this->data['app_settings'] = $app_settings;
            $main_content = 'app_settings/index';
            $this->_view($main_content, 'admin');
        }

        function edit(){
            $this->check_access('app_settings', 'edit');
            $id = $_POST['id'];
            //pri($find);
            $this->load->library('form_validation');
            $this->form_validation->set_rules('phone', _lang('phone'), 'trim|required');
            $this->form_validation->set_rules('email', _lang('email'), 'trim|required|valid_email');
            $this->form_validation->set_rules('usage_conditions_ar', _lang('usage_conditions_ar'), 'trim|required');
            $this->form_validation->set_rules('usage_conditions_en', _lang('usage_conditions_en'), 'trim|required');
            $this->form_validation->set_rules('about_app_ar', _lang('about_app_ar'), 'trim|required');
            $this->form_validation->set_rules('about_app_en', _lang('about_app_en'), 'trim|required');
            $this->form_validation->set_rules('no_of_free_ads', _lang('no_of_free_ads'), 'trim|required');
            $valid_upload = true;
            $image_name = "";
            if ($this->form_validation->run() == false) {
                $errors = $this->form_validation->error_array();
                print_json('error', $errors);
            } else {
                $data['phone'] = $this->input->post('phone');
                $data['email'] = $this->input->post('email');
                $data['usage_conditions_ar'] = $this->input->post('usage_conditions_ar');
                $data['usage_conditions_en'] = $this->input->post('usage_conditions_en');
                $data['about_app_ar'] = $this->input->post('about_app_ar');
                $data['about_app_en'] = $this->input->post('about_app_en');
                $data['no_of_free_ads'] = $this->input->post('no_of_free_ads');
                $where_array['id'] = $id;
                //pri($where_array);
                $update = $this->app_settings->update($data, $where_array);
                $settings_after_update = $this->app_settings->find($id);
                if ($update) {
                    print_json('success', $settings_after_update);
                } else {
                    print_json('error',_lang('no_affected_rows'));
                }
            }

            //save data here
        }

    }
