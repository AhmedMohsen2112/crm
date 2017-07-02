<?php

class Brands extends MY_Controller {

    public function __construct() {
        parent::__construct();
       $this->load->model('Brands_model', 'brands');

    }
    
    public function all(){
        $this->form_validation->set_rules('lang', _lang('lang'), 'trim|required');
        if ($this->form_validation->run() == true) {
            $brands = $this->brands->get(array('active' => 1), 'this_order', 'ASC');
            $new_brands = array();
            if ($brands) {
                foreach ($brands as $one) {
                    $brand = new stdClass();
                    $brand->title = $one->{$this->title_slug};
                    $categories = $this->brands->getBrandCategories(array('brands.id' => $one->id, 'categories.active' => 1), 'categories.this_order', 'ASC');
                    $new_categories = array();
                    if ($categories) {
                        foreach ($categories as $one) {
                            $category = new stdClass();
                            $category->id = $one->id;
                            $category->title = $one->{$this->category_title_slug};
                            $category->image = base_url('uploads/categories/' . $one->image);
                            $new_categories[] = $category;
                        }
                    }

                    $brand->categories = $new_categories;
                    $new_brands[] = $brand;
                }
            }

            print_json('success', $new_brands, 200);
        } else {
            print_json("error", $this->form_validation->error_array(), 200);
        }
    }

}
