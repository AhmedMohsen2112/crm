<?php

class Ads extends MY_Controller {

    public function __construct() {
        parent::__construct();
        $this->load->model('Client_model', 'client');
        $this->load->model('Packages_model', 'packages');
        $this->load->model('Products_model', 'products');
        $this->load->model('Products_slider_model', 'products_slider');
    }
    
    public function add(){
        $clients_id = $this->input->post('clients_id');
        $this->load->library('form_validation');
        $this->form_validation->set_rules('lang', _lang('lang'), 'trim|required');
        $this->form_validation->set_rules('title', _lang('title'), 'trim|required');
        $this->form_validation->set_rules('description', _lang('description'), 'trim|required');
        $this->form_validation->set_rules('phone', _lang('phone'), 'trim|required');
        $this->form_validation->set_rules('product_status', _lang('product_status'), 'trim|required');
        $this->form_validation->set_rules('price', _lang('price'), 'required');
        $this->form_validation->set_rules('countries_id', _lang('country'), 'trim|required');
        $this->form_validation->set_rules('brands_id', _lang('brand'), 'trim|required');
        $this->form_validation->set_rules('categories_id', _lang('category'), 'trim|required');
        $this->form_validation->set_rules('bill_status', _lang('bill_status'), 'trim|required');
        $this->form_validation->set_rules('approval_of_the_terms', _lang('approval_of_the_terms'), 'trim|required');
        $this->form_validation->set_rules('calls_or_messages', _lang('calls_or_messages'), 'trim|required');
        $images_names = array();
        if ($this->form_validation->run() == false) {
            $errors = $this->form_validation->error_array();
            print_json('error', $errors);
        } else {
            $this->check_for_new_ad($clients_id);
            $encoded_strings = $this->input->post('encoded_strings');
            if ($encoded_strings && !empty($encoded_strings[0])) {
                foreach ($encoded_strings as $one) {
                    if (empty($one)) {
                        continue;
                    }
                    $image_name = img_descoder($one, 'products_slider');
                    $images_names[] = $image_name;
                }
            } else {
                print_json('error', _lang('you_have_to_upload_one_image_at_least'));
            }
        }

        $data['title'] = $this->input->post('title');
        $data['description'] = $this->input->post('description');
        $data['product_status'] = $this->input->post('product_status');
        $data['phone'] = $this->input->post('phone');
        $data['price'] = $this->input->post('price');
        $data['sale_price'] = ($this->input->post('sale_price')) ? $this->input->post('sale_price') : 0;
        $data['countries_id'] = $this->input->post('countries_id');
        $data['brands_id'] = $this->input->post('brands_id');
        $data['categories_id'] = $this->input->post('categories_id');
        $data['bill_status'] = $this->input->post('bill_status');
        $data['calls_or_messages'] = $this->input->post('calls_or_messages');
        $data['image'] = $images_names[0];
        $data['created_by'] = $clients_id;
        //pri($data);
        $add = $this->products->add($data);
        if ($add) {
            foreach ($images_names as $one) {
                $this->products_slider->add(array(
                    'products_id' => $add,
                    'image' => $one,
                ));
            }
            $this->new_ad_trigger_after_insert($clients_id);
            print_json('success', _lang('ad_is_sending_successfully_Wait_for_activation_from_the_administration_may_take_24_hours'));
        } else {
            print_json('error', 'added_failed');
        }
    }
    public function check_for_new_ad($clients_id) {
        $client = $this->client->find($clients_id);
        $has_free_ads = $client->has_free_ads;
        $packages_id = $client->packages_id;
        $not_calculated_products = $this->products->get(array('calculated' => 0, 'created_by' => $clients_id));
        if ($has_free_ads == 1) {
            if (!$not_calculated_products) {
                return true;
            } else if ($not_calculated_products && count($not_calculated_products) < $this->_app_settings->no_of_free_ads) {
                return true;
            } else {
                print_json('error', _lang('you_have_exhausted_your_free_ads'));
            }
        } else {
            if ($packages_id > 0) {
                $package = $this->packages->find($packages_id);
                $no_of_ads = $package->no_of_ads;
                if (!$not_calculated_products) {
                    return true;
                } else if ($not_calculated_products && count($not_calculated_products) < $no_of_ads) {
                    return true;
                } else {
                    pri(count($not_calculated_products) .'-'.$no_of_ads);
                    print_json('error', _lang('you_have_exhausted_your_package_ads'));
                }
            }else{
                 print_json('error', _lang('you_have_exhausted_your_free_ads_and_not_registerd_to_any_package'));
            }
        }
    }

    public function new_ad_trigger_after_insert($clients_id) {
        $client = $this->client->find($clients_id);
        $has_free_ads = $client->has_free_ads;
        $packages_id = $client->packages_id;
        $not_calculated_products = $this->products->get(array('calculated' => 0, 'created_by' => $clients_id));
        if ($has_free_ads == 1) {
            if ($not_calculated_products && count($not_calculated_products) == $this->_app_settings->no_of_free_ads) {
                $this->products->update(array('calculated' => 1), array('created_by' => $clients_id,'calculated' => 0));
                $this->client->update(array('has_free_ads' => 0), array('id' => $clients_id));
            }
        } else {
            if ($packages_id > 0) {
                $package = $this->packages->find($packages_id);
                 $no_of_ads = $package->no_of_ads;
                if ($not_calculated_products && count($not_calculated_products) == $no_of_ads) {
                    $this->products->update(array('calculated' => 1), array('created_by' => $clients_id,  'calculated' => 0));
                    $this->client->update(array('packages_id' => 0), array('id' => $clients_id));
                }
            }
        }
    }

}
