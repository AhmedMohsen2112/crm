<?php

class Property extends MY_Controller {

    public function __construct() {
        parent::__construct();
        $this->load->model('Categories_model', 'categories');
        $this->load->model('Products_model', 'products');
        $this->load->model('Products_slider_model', 'products_slider');
    }

    public function category() {
        $this->form_validation->set_rules('lang', _lang('lang'), 'trim|required');
        $this->form_validation->set_rules('categories_id', _lang('category_id'), 'trim|required');
        if ($this->form_validation->run() == true) {
            $categories_id = $this->input->post('categories_id');
            $category = $this->categories->find($categories_id);
            $category->title = $category->{$this->title_slug};
            $category->image = base_url('uploads/categories/' . $category->image);

            $products = $this->products->getProducts(array(
                'categories.id' => $category->id,
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

            $category->products = $new_products;

            print_json('success', $category, 200);
        } else {
            print_json("error", $this->form_validation->error_array(), 200);
        }
    }

    public function product() {
        $this->form_validation->set_rules('lang', _lang('lang'), 'trim|required');
        $this->form_validation->set_rules('products_id', _lang('product_id'), 'trim|required');
        if ($this->form_validation->run() == true) {
            $products_id = $this->input->post('products_id');

            $product_arr = $this->products->getProducts(array(
                'products.id' => $products_id,
                    ), 'products.this_order', 'ASC');
            $product = false;
            if ($product_arr) {
                $product_obj = $product_arr[0];
                $product = new stdClass();
                $product->id = $product_obj->product_id;
                $product->title = $product_obj->product_title;
                $product->desc = $product_obj->{$this->product_desc_slug};
                $product->price = $product_obj->price;
                $product->client_name = $product_obj->client_name;
                $product->client_phone = $product_obj->phone;                            
                $product->brand_title = $product_obj->{$this->brand_title_slug};
                $product->currency_sign = $product_obj->currency_sign;
                $product_images = $this->products_slider->get(array('products_id' => $product_obj->product_id));
                $product->image = ($product_images)?base_url('uploads/products/' . $product_images[0]->image):base_url('no-image.jpg');
                $new_product_images = array();
                if ($product_images) {
                    foreach ($product_images as $one) {
                        $new_product_images[] = base_url('uploads/products_slider/' . $one->image);
                    }
                }
                $product->images = $new_product_images;
            }
            print_json('success', $product, 200);
        } else {
            print_json("error", $this->form_validation->error_array(), 200);
        }
    }

}
