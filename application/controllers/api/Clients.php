<?php

class Clients extends MY_Controller {

    public function __construct() {
        parent::__construct();
        $this->load->model('Client_model', 'client');
        $this->load->model('Brands_model', 'brands');
        $this->load->model('Categories_model', 'categories');
        $this->load->model('Products_model', 'products');
         $this->load->model('Products_slider_model', 'products_slider');
    }

    public function sign_in() {

        $this->form_validation->set_rules('_email', _lang('_email'), 'trim|required|valid_email');
        $this->form_validation->set_rules('_password', _lang('_password'), 'trim|required');
        if ($this->form_validation->run() == true) {
            $email = $this->input->post('_email');
            $password = $this->input->post('_password');
            if ($this->client->check($email, $password, false)) {
                $find = $this->client->findByCol('email', $email);
                //pri($find);
                $this->client->update(array('last_login' => date("Y-m-d H:i:s")), array('id', $find->id));
                print_json("success", _lang('you_are_logged_now'), 200);
            } else {
                print_json("error", _lang('invalid_email_or_password'), 200);
            }
        } else {
            print_json("error", $this->form_validation->error_array(), 200);
        }
    }

    public function sign_up() {
        $this->form_validation->set_rules('lang', _lang('lang'), 'trim|required');
        $this->form_validation->set_rules('firstname', _lang('firstname'), 'trim|required');
        $this->form_validation->set_rules('lastname', _lang('lastname'), 'trim|required');
        $this->form_validation->set_rules('username', _lang('username'), 'trim|required');
        $this->form_validation->set_rules('email', _lang('email'), 'trim|required|valid_email');
        $this->form_validation->set_rules('phone', _lang('phone'), 'trim|required');
        $this->form_validation->set_rules('password', _lang('password'), 'trim|required|matches[confirm_password]');
        $this->form_validation->set_rules('confirm_password', _lang('confirm_password'), 'trim|required');

        if ($this->form_validation->run() == true) {
            $this->inputs_check('client', array(
                'username' => $this->input->post('username'),
                'email' => $this->input->post('email'),
                    )
            );
            $data_array['firstname'] = $this->input->post('firstname');
            $data_array['lastname'] = $this->input->post('lastname');
            $data_array['username'] = $this->input->post('username');
            $data_array['email'] = $this->input->post('email');
            $data_array['phone'] = $this->input->post('phone');
            $data_array['password'] = $this->client->password_hashing($this->input->post('password'));
            if ($this->client->add($data_array)) {
                print_json("success", _lang('you_are_registered_now'), 200);
            }
        } else {
            print_json("error", $this->form_validation->error_array(), 200);
        }
    }

    public function edit_account() {
        $client_id = $this->input->post('clients_id');
        $this->form_validation->set_rules('clients_id', _lang('client_id'), 'trim|required');
        $this->form_validation->set_rules('lang', _lang('lang'), 'trim|required');
        $this->form_validation->set_rules('firstname', _lang('firstname'), 'trim|required');
        $this->form_validation->set_rules('lastname', _lang('lastname'), 'trim|required');
        $this->form_validation->set_rules('username', _lang('username'), 'trim|required');
        $this->form_validation->set_rules('email', _lang('email'), 'trim|required|valid_email');
        $this->form_validation->set_rules('phone', _lang('phone'), 'trim|required');
        $this->form_validation->set_rules('password', _lang('password'), 'trim|required');

        if ($this->form_validation->run() == true) {
            $this->inputs_check('client', array(
                'username' => $this->input->post('username'),
                'email' => $this->input->post('email'),
                    ), $client_id
            );
            $data_array['firstname'] = $this->input->post('firstname');
            $data_array['lastname'] = $this->input->post('lastname');
            $data_array['username'] = $this->input->post('username');
            $data_array['email'] = $this->input->post('email');
            $data_array['phone'] = $this->input->post('phone');
            if ($this->input->post('password')) {
                $data_array['password'] = $this->client->password_hashing($this->input->post('password'));
            }
            $this->client->update($data_array, array('id' => $client_id));
            print_json("success", _lang('updated_successfully'), 200);
        } else {
            print_json("error", $this->form_validation->error_array(), 200);
        }
    }

    public function edit_username() {
        $client_id = $this->input->post('clients_id');
        $this->form_validation->set_rules('lang', _lang('lang'), 'trim|required');
        $this->form_validation->set_rules('clients_id', _lang('client_id'), 'trim|required');
        $this->form_validation->set_rules('username', _lang('username'), 'trim|required');

        if ($this->form_validation->run() == true) {
            $this->inputs_check('client', array(
                'username' => $this->input->post('username'),
                    ), $client_id
            );
            $data_array['username'] = $this->input->post('username');
            $this->client->update($data_array, array('id' => $client_id));
            print_json("success", _lang('updated_successfully'), 200);
        } else {
            print_json("error", $this->form_validation->error_array(), 200);
        }
    }

    public function edit_password() {
        $this->form_validation->set_rules('lang', _lang('lang'), 'trim|required');
        $this->form_validation->set_rules('clients_id', _lang('client_id'), 'trim|required');
        $this->form_validation->set_rules('old_password', _lang('old_password'), 'trim|required');
        $this->form_validation->set_rules('new_password', _lang('password'), 'trim|required|matches[confirm_new_password]');
        $this->form_validation->set_rules('confirm_new_password', _lang('confirm_new_password'), 'trim|required');

        if ($this->form_validation->run() == true) {
            $client_id = $this->input->post('clients_id');
            $old_password = $this->input->post('old_password');
            $new_password = $this->input->post('new_password');
            $client = $this->client->find($client_id);
            if ($this->client->password_hashing($old_password) != $client->password) {
                print_json('error', _lang('old_password_is_not_correct'));
            }
            $data_array['password'] = $this->client->password_hashing($new_password);
            $this->client->update($data_array, array('id' => $client_id));
            print_json("success", _lang('updated_successfully'), 200);
        } else {
            print_json("error", $this->form_validation->error_array(), 200);
        }
    }

    public function products() {
        $this->form_validation->set_rules('lang', _lang('lang'), 'trim|required');
        $this->form_validation->set_rules('clients_id', _lang('client_id'), 'trim|required');

        if ($this->form_validation->run() == true) {
            $client_id = $this->input->post('clients_id');
             $products = $this->products->getProducts(array(
                'products.created_by' => $client_id,
                    ), 'products.this_order', 'ASC');
            $new_products = array();
            if ($products) {
                foreach ($products as $one) {
                    $product = new stdClass();
                    $product->product_id = $one->product_id;
                    $product->product_title = $one->product_title;
                    $product->price = $one->price;
                    $product_image = $this->products_slider->get(array('products_id' => $one->product_id));
                    $product->image = ($product_image)?base_url('uploads/products/' . $product_image[0]->image):base_url('no-image.jpg');
                    $product->brand_title = $one->{$this->brand_title_slug};
                    $product->currency_sign = $one->currency_sign;
                    $new_products[] = $product;
                }
            }
            print_json('success', $new_products, 200);
        } else {
            print_json("error", $this->form_validation->error_array(), 200);
        }
    }

}
