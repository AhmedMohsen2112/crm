<?php

class Main extends MY_Controller {

    public function __construct() {
        parent::__construct();
        $this->load->model('Client_model', 'client');
        $this->load->model('Packages_model', 'packages');
        $this->load->model('Languages_model', 'languages');
        $this->load->model('Countries_model', 'countries');
        $this->load->model('Brands_model', 'brands');
        $this->load->model('Categories_model', 'categories');
        $this->load->model('Products_model', 'products');
        $this->load->model('Products_slider_model', 'products_slider');
    }

    public function index() {
        $this->load->view('main_content/api/index');
    }

    public function data() {
        $this->form_validation->set_rules('lang', _lang('lang'), 'trim|required');
        $this->form_validation->set_rules('countries_id', _lang('country'), 'trim|required');
        if ($this->form_validation->run() == true) {
            $countries_id = $this->input->post('countries_id');
            $data = array();
            $brands = $this->brands->get(array('active' => 1), 'this_order', 'ASC');
            $new_brands = array();
            foreach ($brands as $one) {
                $brand = new stdClass();
                $brand->id = $one->id;
                $brand->title = $one->{$this->title_slug};
                $brand->image = base_url('uploads/brands/' . $one->image);
                $new_brands[] = $brand;
            }
            $data['brands'] = $new_brands;
            $categories = $this->categories->get(array('active' => 1), 'this_order', 'ASC');
            $new_categories = array();
            if ($categories) {
                foreach ($categories as $one) {
                    $category = new stdClass();
                    $category->id = $one->id;
                    $category->title = $one->{$this->title_slug};
                    $category->image = base_url('uploads/categories/' . $one->image);

                    $products = $this->products->getProducts(array(
                        'categories.id' => $one->id,
                        'countries.id' => $countries_id
                            ), 'products.this_order', 'ASC', 6);
                    $new_products = array();
                    if ($products) {
                        foreach ($products as $one) {
                            
                            $product = new stdClass();
                            $product->product_id = $one->product_id;
                            $product->product_title = $one->product_title;
                            $product->price = $one->price;
                            $product_image=$this->products_slider->get(array('products_id'=>$one->product_id));
                            $product->image = ($product_image)?base_url('uploads/products/' . $product_image[0]->image):base_url('no-image.jpg');
                            $product->brand_title = $one->{$this->brand_title_slug};
                            $product->currency_sign = $one->currency_sign;
                            $new_products[] = $product;
                        }
                    }

                    $category->products = $new_products;
                    $new_categories[] = $category;
                }
            }
            $data['categories'] = $new_categories;
            print_json('success', $data, 200);
        } else {
            print_json("error", $this->form_validation->error_array(), 200);
        }
    }

    

    
   



    public function languages() {
        $languages = $this->languages->get(array(), 'this_order', 'ASC');
        print_json('success', $languages, 200);
    }

    public function countries() {
        $countries = $this->countries->get(array('active' => 1), 'this_order', 'ASC');
        print_json('success', $countries, 200);
    }

}
