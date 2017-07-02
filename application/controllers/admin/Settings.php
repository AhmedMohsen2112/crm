<?php

    class Settings extends C_Controller{
        public function __construct(){
            parent::__construct();
            $this->check_access('settings', 'open');
            $this->load->model('Settings_model', 'settings');
            $this->load->model('Currency_model', 'currency');
        }

        public function index(){
            $this->check_access('settings', 'open');
            $settings = $this->settings->get();
            //pri($settings[0]);
            $settings[0]->site_contacts = json_decode($settings[0]->site_contacts);
            //pri($settings);
            $this->data['settings'] = $settings[0];
            $this->data['currency'] = $this->currency->get();
            $main_content = 'settings/index';
            $this->_view($main_content, 'admin');
        }

        function edit(){
            $this->check_access('settings', 'edit');
            $id = $_POST['id'];
            $find = $this->settings->find($id);
            //pri($find);
            $this->load->library('form_validation');
            $this->form_validation->set_rules('site_title_ar', _lang('site_title_ar'), 'required');
            $this->form_validation->set_rules('site_title_en', _lang('site_title_en'), 'required');
            $this->form_validation->set_rules('site_phone', _lang('site_phone'), 'required');
            $this->form_validation->set_rules('site_email', _lang('site_email'), 'required');
            $this->form_validation->set_rules('site_address_ar', _lang('address_ar'), 'required');
            $this->form_validation->set_rules('site_address_en', _lang('address_en'), 'required');
            $this->form_validation->set_rules('site_desc_ar', _lang('site_desc_ar'), 'required');
            $this->form_validation->set_rules('site_desc_en', _lang('site_desc_en'), 'required');
            $this->form_validation->set_rules('site_keywords_ar', _lang('keywords_ar'), 'required');
            $this->form_validation->set_rules('site_keywords_en', _lang('keywords_en'), 'required');
            $this->form_validation->set_rules('visa_price_cost', _lang('visa_price_cost'), 'required');
            $this->form_validation->set_rules('visa_price_profit', _lang('visa_price_profit'), 'required');
            $this->form_validation->set_rules('egy_code', _lang('egy_code'), 'required');
            $this->form_validation->set_rules('usa_code', _lang('usa_code'), 'required');
            $valid_upload = true;
            $image_name = "";
            if ($this->form_validation->run() == false) {
                $errors = $this->form_validation->error_array();
                print_json('error', $errors);
            } else {
                $data['site_title_ar'] = $this->input->post('site_title_ar');
                $data['site_title_en'] = $this->input->post('site_title_en');
                $data['site_phone'] = $this->input->post('site_phone');
                $data['site_email'] = $this->input->post('site_email');
                $data['site_address_ar'] = $this->input->post('site_address_ar');
                $data['site_address_en'] = $this->input->post('site_address_en');
                $data['site_desc_ar'] = $this->input->post('site_desc_ar');
                $data['site_desc_en'] = $this->input->post('site_desc_en');
                $data['site_keywords_ar'] = $this->input->post('site_keywords_ar');
                $data['site_keywords_en'] = $this->input->post('site_keywords_en');
                $data['visa_price_cost'] = $this->input->post('visa_price_cost');
                $data['visa_price_profit'] = $this->input->post('visa_price_profit');
                $data['visa_currency_id'] = $this->input->post('visa_currency_id');
                $data['egy_code'] = $this->input->post('egy_code');
                $data['usa_code'] = $this->input->post('usa_code');
                $data['site_contacts'] = json_encode($this->input->post('site_contacts'));
                $where_array['id'] = $id;
                //pri($where_array);
                $update = $this->settings->update($data, $where_array);
                $settings_after_update = $this->settings->find($id);
                if ($update) {
                    print_json('success', $settings_after_update);
                } else {
                    print_json('error', 'no_affected_rows');
                }
            }

            //save data here
        }

    }
