<?php

class Packages extends MY_Controller {

    public function __construct() {
        parent::__construct();
        $this->load->model('Client_model', 'client');

    }
    
    public function register(){
        $this->form_validation->set_rules('lang', _lang('lang'), 'trim|required');
        $this->form_validation->set_rules('clients_id', _lang('client_id'), 'trim|required');
        $this->form_validation->set_rules('packages_id', _lang('package_id'), 'trim|required');
        if ($this->form_validation->run() == true) {
            $packages_id=  $this->input->post('packages_id');
            $clients_id=  $this->input->post('clients_id');
            $this->client->update(array('packages_id'=>$packages_id),array('id'=>$clients_id));
            print_json('success', _lang('registeration_completed_successfully'), 200);
        } else {
            print_json("error", $this->form_validation->error_array(), 200);
        }
    }

}
