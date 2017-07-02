<?php

class Products extends C_Controller {

    public function __construct() {
        parent::__construct();
        $this->load->model('Products_model', 'products');
        $this->load->model('Categories_model', 'categories');
        $this->load->model('Products_slider_model', 'products_slider');
        $this->load->model('Countries_model', 'countries');
        $this->load->model('Categories_model', 'categories');
        $this->load->model('Brands_model', 'brands');
    }

    public function index() {
        $categories = $this->categories->get(array('parent_id' => 0));
        $countries = $this->countries->get();
        $brands = $this->brands->get();
        $this->data['categories'] = $categories;
        $this->data['countries'] = $countries;
        $this->data['brands'] = $brands;
        $main_content = 'products/index';
        $this->_view($main_content, 'admin');
    }

    public function row() {
        //pri($_POST);
        $id = $_POST['id'];
        $find = $this->products->find($id);
        if ($find) {
            print_json('success', $find);
        } else {
            print_json('error', 'error');
        }
    }

    public function add() {
        //pri($_POST);
        $this->load->library('form_validation');
        $this->form_validation->set_rules('title', _lang('title'), 'trim|required');
        $this->form_validation->set_rules('description', _lang('description'), 'trim|required');
        $this->form_validation->set_rules('phone', _lang('phone'), 'trim|required');
        $this->form_validation->set_rules('this_order', _lang('this_order'), 'required');
        $this->form_validation->set_rules('price', _lang('price'), 'required');
        $this->form_validation->set_rules('countries_id', _lang('country'), 'required');
        $this->form_validation->set_rules('categories_id', _lang('category'), 'required');
        $this->form_validation->set_rules('brands_id', _lang('brand'), 'required');
        $valid_upload = false;
        $image_name = "";
        if ($this->form_validation->run() == false) {
            $errors = $this->form_validation->error_array();
            print_json('error', $errors);
        } else {
            $data['title'] = $this->input->post('title');
            $data['description'] = $this->input->post('description');
            $data['phone'] = $this->input->post('phone');
            $data['price'] = $this->input->post('price');
            $data['sale_price'] = ($this->input->post('sale_price')) ? $this->input->post('sale_price') : 0;
            $data['countries_id'] = $this->input->post('countries_id');
            $data['brands_id'] = $this->input->post('brands_id');
            $data['categories_id'] = $this->input->post('categories_id');
            $data['bill_status'] = $this->input->post('bill_status');
            $data['calls_or_messages'] = $this->input->post('calls_or_messages');
            $data['this_order'] = $this->input->post('this_order');
            $data['active'] = $this->input->post('active');
            $add = $this->products->add($data);
            if ($add) {
                print_json('success', _lang('added_successfully'));
            } else {
                print_json('error', 'added_failed');
            }
        }
    }

    public function edit() {
        //pri($_POST);
        $id = $_POST['id'];
        $find = $this->products->find($id);
        $this->load->library('form_validation');
        $this->form_validation->set_rules('title', _lang('title'), 'trim|required');
        $this->form_validation->set_rules('description', _lang('description'), 'trim|required');
        $this->form_validation->set_rules('phone', _lang('phone'), 'trim|required');
        $this->form_validation->set_rules('this_order', _lang('this_order'), 'required');
        $this->form_validation->set_rules('price', _lang('price'), 'required');
        $this->form_validation->set_rules('countries_id', _lang('country'), 'required');
        $this->form_validation->set_rules('categories_id', _lang('category'), 'required');
        $this->form_validation->set_rules('brands_id', _lang('brand'), 'required');
        $valid_upload = false;
        $image_name = "";
        if ($this->form_validation->run() == false) {
            $errors = $this->form_validation->error_array();
            print_json('error', $errors);
        } else {
            $data['title'] = $this->input->post('title');
            $data['description'] = $this->input->post('description');
            $data['phone'] = $this->input->post('phone');
            $data['price'] = $this->input->post('price');
            $data['sale_price'] = ($this->input->post('sale_price')) ? $this->input->post('sale_price') : 0;
            $data['countries_id'] = $this->input->post('countries_id');
            $data['brands_id'] = $this->input->post('brands_id');
            $data['categories_id'] = $this->input->post('categories_id');
            $data['bill_status'] = $this->input->post('bill_status');
            $data['calls_or_messages'] = $this->input->post('calls_or_messages');
            $data['this_order'] = $this->input->post('this_order');
            $data['active'] = $this->input->post('active');
            $where['id'] = $id;
            $update = $this->products->update($data, $where);
            if ($update) {
                print_json('success', _lang('updated_successfully'));
            } else {
                print_json('error', _lang('no_affected_rows'));
            }
        }
    }

    public function delete() {
        $id = $_POST['id'];
        $find = $this->products->find($id);
        $delete = $this->products->delete($id);
        if ($delete) {
            $image_original = substr($find->image, strrpos($find->image, '_') + 1);
            $image_without_prefix = substr($find->image, strpos($find->image, '_') + 1); //without s_

            $files = array(
                FCPATH . 'uploads/products/' . $image_original,
                FCPATH . 'uploads/products/s_' . $image_without_prefix,
                FCPATH . 'uploads/products/m_' . $image_without_prefix,
            );
            foreach ($files as $file) {
                if (!is_dir($file)) {
                    if (file_exists($file)) {
                        unlink($file);
                    }
                }
            }
            print_json('success', _lang('deleted_successfully'));
        } else {
            print_json('error', 'no_affected_rows');
        }
    }

    public function add_images() {
        //pri($_POST);
        $products_id = $_POST['products_id'];
        //$errors = array();
        $errors = 0;
        $images_names = array();
        if (!empty($_FILES['file'])) {
            $this->config->load('files');
            $config = $this->config->item('product_images');
            $files = $_FILES;
            $number_of_files = count($_FILES['product_images']['name']);
            //pri($number_of_files);
            for ($i = 0; $i < $number_of_files; $i++) {
                $_FILES['product_images']['name'] = $files['product_images']['name'][$i];
                $_FILES['product_images']['type'] = $files['product_images']['type'][$i];
                $_FILES['product_images']['tmp_name'] = $files['product_images']['tmp_name'][$i];
                $_FILES['product_images']['error'] = $files['product_images']['error'][$i];
                $_FILES['product_images']['size'] = $files['product_images']['size'][$i];
                $uploading = $this->products_slider->do_upload('product_images', $config, 'uploads/products/',$_FILES['product_images']['name'],true);
                if (!$uploading) {
                    $errors++;
                } else {

                    $images_names[] = $uploading;
                }
            }

            if ($errors > 0) {
                //pri($errors);
                $message = _lang('there_is_number');
                $message.=' ';
                $message.=$errors;
                $message.=' ';
                $message.=_lang('file');
                $message.=' ';
                $message.=_lang('not_uploaded');
                print_json('error', $message);
            } else {
                foreach ($images_names as $image) {
                    $data['products_id'] = $products_id;
                    $data['image'] = $image;
                    $add = $this->products_slider->add($data);
                }
                print_json('success', _lang('added_successfully'));
            }
        } else {
            print_json('error', _lang('no_file_to_upload'));
        }
    }

    public function listFiles() {
        //pri($_POST);
        $products_id = $_POST['products_id'];
        $find = $this->products_slider->get(array('products_id' => $products_id));
        if ($find) {
            print_json('success', $find);
        } else {
            print_json('error', 'no images');
        }
    }

    public function remove_image() {
        //pri($_POST);
        $errors = 0;
        foreach ($_POST as $key => $value) {
            if (startsWith($key, 'product_images')) {

                $find = $this->products_slider->findByCol('id', $value);
                //pri($value);
                $image_original = substr($find->image, strrpos($find->image, '_') + 1);
                $image_without_prefix = substr($find->image, strpos($find->image, '_') + 1);
                $files = array(
                    FCPATH . 'uploads/products/' . $image_original,
                    FCPATH . 'uploads/products/s_' . $image_without_prefix,
                    FCPATH . 'uploads/products/l_' . $image_without_prefix,
                );
                //pri($image_without_prefix);
                foreach ($files as $file) {
                    if (!is_dir($file)) {
                        if (file_exists($file)) {
                            $deleted_file = unlink($file);
                        }
                    }
                }
                $deleted = $this->products_slider->deleteByCol('id', $value);
                if (!$deleted) {
                    $errors++;
                }
            }
        }
        if ($errors == 0) {

            print_json('success', _lang('deleted_successfully'));
        } else {
            print_json('error', _lang('error'));
        }
    }

    function data() {

        $this->load->library('datatables');
        $this->datatables
                ->select("products.price,products.title as product_title,"
                        . "products.id,"
                        . "c1.title_ar as category_title_ar,c1.title_en as category_title_en,"
                        . "concat(clients.firstname,' ',clients.lastname) as client_name")
                ->from("products")
                ->join("clients", "products.created_by=clients.id")
                ->join("categories c1", "products.categories_id=c1.id");


        $this->datatables->add_column('category_title', function($data) {
            $back = $data['category_title_ar'] . ' - ' . $data['category_title_en'];
            return $back;
        }, 'id');
        $this->datatables->add_column('options', function($data) {
            $CI = & get_instance();
            $back = "";
            $back .='<div class="btn-group">';
            $back .=' <button class="btn btn-xs green dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false"> ' . _lang('options') . '';
            $back .='<i class="fa fa-angle-down"></i>';
            $back .='</button>';
            $back .='<ul class = "dropdown-menu" role = "menu">';
            if ($CI->check_access('products', 'edit', true)) {
                $back .='<li>';
                $back .='<a href="" onclick = "Products.edit_products(this);return false;" data-id = "' . $data["id"] . '">';
                $back .='<i class = "icon-docs"></i>' . _lang('edit') . '';
                $back .='</a>';
                $back .='</li>';
            }
            if ($CI->check_access('products', 'delete', true)) {
                $back .='<li>';
                $back .='<a href="" data-toggle="confirmation" onclick = "Products.delete_products(this);return false;" data-id = "' . $data["id"] . '">';
                $back .='<i class = "icon-docs"></i>' . _lang('delete') . '';
                $back .='</a>';
                $back .='</li>';
            }
            if ($CI->check_access('products', 'gallery', true)) {
                $back .='<li>';
                $back .='<a href="" data-toggle="confirmation" onclick = "Products.gallery(this);return false;" data-id = "' . $data["id"] . '">';
                $back .='<i class = "icon-docs"></i>' . _lang('gallery') . '';
                $back .='</a>';
                $back .='</li>';
            }
            $back .='</ul>';
            $back .=' </div>';
            return $back;
        }, 'id');

        $results = $this->datatables->generate();
        echo $results;
        exit;
    }

    public function inputs_check($inputs = array(), $id = false) {
        $errors = array();

        foreach ($inputs as $key => $value) {
            $where_array = array();
            if ($id) {
                $where_array['id !='] = $id;
            }
            $where_array[$key] = $value;
            $find = $this->products->get($where_array);
            //pri($find);
            if ($find) {
                $errors[$key] = _lang('added_before');
            } else {
                $find = $this->categories->get($where_array);
                if ($find) {
                    $errors[$key] = _lang('product_name_is_similar_to_category_name');
                }
            }
        }

        if (!empty($errors)) {
            print_json('error', $errors);
        }
        return true;
    }

}
