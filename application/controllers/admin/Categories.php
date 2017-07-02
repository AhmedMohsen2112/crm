<?php

    class Categories extends C_Controller{
        public function __construct(){
            parent::__construct();
            $this->load->model('Categories_model', 'categories');
        }

        public function index(){
            $main_content = 'categories/index';
            $this->_view($main_content, 'admin');
        }

        public function row(){
            // pri($_POST);
            $id = $_POST['id'];
            $find = $this->categories->find($id);

            if ($find) {
                print_json('success', $find);
            } else {
                print_json('error', 'error');
            }
        }

        public function add(){
            $this->load->library('form_validation');
            $this->form_validation->set_rules('title_ar', _lang('title_ar'), 'required');
            $this->form_validation->set_rules('title_en', _lang('title_en'), 'required');
            $this->form_validation->set_rules('this_order', _lang('this_order'), 'required');
            if ($this->form_validation->run() == false) {
                $errors = $this->form_validation->error_array();
                print_json('error', $errors);
            } else {
                $this->inputs_check(array(
                    'title_en' => xss_clean($_POST['title_en']),
                        )
                );
                if (isset($_FILES['category_image']) && $_FILES['category_image']['name'] != "") {

                    $this->config->load('files');
                    $config = $this->config->item('category_image');
                    $new_path = 'uploads/categories/';
                    $uploading = $this->categories->do_upload('category_image', $config, $new_path,$_FILES['category_image']['name'],true);

                    if (!$uploading) {
                        $errors = array('category_image' => $this->upload->display_errors());
                        print_json('error', $errors);
                    } else {
                        $image_name = $uploading;
                        $valid_upload = true;
                    }
                } else {
                    $valid_upload = false;
                }
            }
            if ($valid_upload) {
                if ($image_name != "") {
                    $data['image'] = $image_name;
                }
            } else {
                $message['category_image'] = _lang('no_file_to_upload');
                print_json('error', $message);
            }
            $data['title_ar'] = trim(xss_clean($_POST['title_ar']));
            $data['title_en'] = trim(xss_clean($_POST['title_en']));
            $data['this_order'] = xss_clean($_POST['this_order']);
            $data['active'] = xss_clean($_POST['active']);
            $add = $this->categories->add($data);
            if ($add) {
                print_json('success', _lang('added_successfully'));
            } else {
                print_json('error', 'error');
            }
        }

        public function edit(){
            $id = $_POST['id'];
            $find = $this->categories->find($id);
            $this->load->library('form_validation');
            $this->form_validation->set_rules('title_ar', _lang('title_ar'), 'required');
            $this->form_validation->set_rules('title_en', _lang('title_en'), 'required');
            $this->form_validation->set_rules('this_order', _lang('this_order'), 'required');
            if ($this->form_validation->run() == false) {
                $errors = $this->form_validation->error_array();
                print_json('error', $errors);
            } else {
                $this->inputs_check(array(
                    'title_en' => xss_clean($_POST['title_en']),
                        ), $id
                );
                if (isset($_FILES['category_image']) && $_FILES['category_image']['name'] != "") {

                    $this->config->load('files');
                    $config = $this->config->item('category_image');
                    $new_path = 'uploads/categories/';
                    $uploading = $this->categories->do_upload('category_image', $config, $new_path,$_FILES['category_image']['name'],true);

                    if (!$uploading) {
                        $errors = array('category_image' => $this->upload->display_errors());
                        print_json('error', $errors);
                    } else {
//                        $image_original = substr($find->image, strrpos($find->image, '_') + 1);
//                        $image_without_prefix = substr($find->image, strpos($find->image, '_') + 1); 
                        $files = array(
                            FCPATH . 'uploads/categories/' . $find->image,
//                            FCPATH . 'uploads/categories/' . $image_original,
//                            FCPATH . 'uploads/categories/s_' . $image_without_prefix,
//                            FCPATH . 'uploads/categories/m_' . $image_without_prefix,
                        );
                        foreach ($files as $file) {
                            if (!is_dir($file)) {
                                if (file_exists($file)) {
                                    unlink($file);
                                }
                            }
                        }
                        $image_name = $uploading;
                        $valid_upload = true;
                    }
                } else {
                    $valid_upload = false;
                }
            }
            if ($valid_upload) {
                if ($image_name != "") {
                    $data['image'] = $image_name;
                }
            } else if (!$valid_upload && empty($find->image)) {
                $message['category_image'] = _lang('no_file_to_upload');
                print_json('error', $message);
            }
            $data['title_ar'] = trim(xss_clean($_POST['title_ar']));
            $data['title_en'] = trim(xss_clean($_POST['title_en']));
            $data['this_order'] = xss_clean($_POST['this_order']);
            $data['active'] = xss_clean($_POST['active']);
            $where_array['id'] = $id;
            $update = $this->categories->update($data, $where_array);
            if ($update) {
                print_json('success', _lang('updated_successfully'));
            } else {
                print_json('error', _lang('no_affected_rows'));
            }
        }

        public function delete(){
            $id = $_POST['id'];
            $find = $this->categories->find($id);
            $deleted = $this->categories->delete($id);
            if ($deleted) {
//                $image_original = substr($find->image, strrpos($find->image, '_') + 1);
//                $image_without_prefix = substr($find->image, strpos($find->image, '_') + 1);

                $files = array(
                    FCPATH . 'uploads/categories/' . $find->image,
//                    FCPATH . 'uploads/categories/' . $image_original,
//                    FCPATH . 'uploads/categories/s_' . $image_without_prefix,
//                    FCPATH . 'uploads/categories/m_' . $image_without_prefix,
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

        function data(){

            $this->load->library('datatables');
            $this->datatables
                    ->select("id,title_en,active,image")
                    ->from("categories");

            $this->datatables->add_column('active', function($data) {
                return ($data['active'] == 1) ? _lang('active') : _lang('not_active');
            }, 'id');
            $this->datatables->add_column('image', function($data) {
                $back = '<img src="' . base_url() . 'uploads/categories/' . $data['image'] . '" style="height:64px;width:64px;"/>';
                return $back;
            }, 'id');
            $this->datatables->add_column('options', function($data) {

                $back = "";
                $back .='<div class="btn-group">';
                $back .=' <button class="btn btn-xs green dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false"> ' . _lang('options') . '';
                $back .='<i class="fa fa-angle-down"></i>';
                $back .='</button>';
                $back .='<ul class = "dropdown-menu" role = "menu">';
                $back .='<li>';
                $back .='<a href="" onclick = "Categories.edit(this);return false;" data-id = "' . $data["id"] . '">';
                $back .='<i class = "icon-docs"></i>' . _lang('edit') . '';
                $back .='</a>';
                $back .='</li>';
                $back .='<li>';
                $back .='<a href="" data-toggle="confirmation" onclick = "Categories.delete(this);return false;" data-id = "' . $data["id"] . '">';
                $back .='<i class = "icon-docs"></i>' . _lang('delete') . '';
                $back .='</a>';
                $back .='</li>';
                $back .='</ul>';
                $back .=' </div>';
                return $back;
            }, 'id');

            $results = $this->datatables->generate();
            echo $results;
            exit;
        }

        public function inputs_check($inputs = array(), $id = false){
            $errors = array();

            foreach ($inputs as $key => $value) {
                $where_array = array();
                if ($id) {
                    $where_array['id !='] = $id;
                }
                $where_array[$key] = $value;
                $find = $this->categories->get($where_array);
                //pri($find);
                if ($find) {
                    $errors[$key] = _lang('added_before');
                }
            }

            if (!empty($errors)) {
                print_json('error', $errors);
            }
            return true;
        }

    }
