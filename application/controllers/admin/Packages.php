<?php

    class Packages extends C_Controller{
        public function __construct(){
            parent::__construct();
            $this->check_access('packages', 'open');
            $this->load->model('Packages_model', 'packages');
        }

        public function index(){
            $main_content = 'packages/index';
            $this->_view($main_content, 'admin');
        }

        public function row(){
            $this->check_access('packages', 'edit');
            $id = $_POST['id'];
            $find = $this->packages->find($id);

            if ($find) {
                print_json('success', $find);
            } else {
                print_json('error', 'error');
            }
        }

        public function add(){
            $this->check_access('packages', 'add');
            $this->load->library('form_validation');
            $this->form_validation->set_rules('title_ar', _lang('title_ar'), 'trim|required');
            $this->form_validation->set_rules('title_en', _lang('title_en'), 'trim|required');
            $this->form_validation->set_rules('desc_ar', _lang('desc_ar'), 'trim|required');
            $this->form_validation->set_rules('desc_en', _lang('desc_en'), 'trim|required');
            $this->form_validation->set_rules('price', _lang('price'), 'trim|required');
            $this->form_validation->set_rules('period', _lang('period'), 'trim|required');
            $this->form_validation->set_rules('no_of_ads', _lang('no_of_ads'), 'trim|required');
            $this->form_validation->set_rules('this_order', _lang('this_order'), 'trim|required');
            if ($this->form_validation->run() == false) {
                $errors = $this->form_validation->error_array();
                print_json('error', $errors);
            } else {
                $this->inputs_check(array(
                    'title_ar' => xss_clean($_POST['title_ar']),
                    'title_en' => xss_clean($_POST['title_en'])
                        )
                );
                $data['title_ar'] = xss_clean($_POST['title_ar']);
                $data['title_en'] = xss_clean($_POST['title_en']);
                $data['desc_ar'] = xss_clean($_POST['desc_ar']);
                $data['desc_en'] = xss_clean($_POST['desc_en']);
                $data['price'] = xss_clean($_POST['price']);
                $data['period'] = xss_clean($_POST['period']);
                $data['no_of_ads'] = xss_clean($_POST['no_of_ads']);
                $data['this_order'] = xss_clean($_POST['this_order']);
                $data['active'] = xss_clean($_POST['active']);
                //pri($data_array);
                $add = $this->packages->add($data);
                if ($add) {
                    print_json('success', _lang('added_successfully'));
                } else {
                    print_json('error', 'error');
                }
            }
        }

        public function edit(){
            $this->check_access('packages', 'edit');
            $id = $_POST['id'];
            $this->load->library('form_validation');
            $this->form_validation->set_rules('title_ar', _lang('title_ar'), 'trim|required');
            $this->form_validation->set_rules('title_en', _lang('title_en'), 'trim|required');
            $this->form_validation->set_rules('desc_ar', _lang('desc_ar'), 'trim|required');
            $this->form_validation->set_rules('desc_en', _lang('desc_en'), 'trim|required');
            $this->form_validation->set_rules('price', _lang('price'), 'trim|required');
            $this->form_validation->set_rules('period', _lang('period'), 'trim|required');
            $this->form_validation->set_rules('no_of_ads', _lang('no_of_ads'), 'trim|required');
            $this->form_validation->set_rules('this_order', _lang('this_order'), 'trim|required');
            if ($this->form_validation->run() == false) {
                $errors = $this->form_validation->error_array();
                print_json('error', $errors);
            } else {
                $this->inputs_check(array(
                    'title_ar' => xss_clean($_POST['title_ar']),
                    'title_en' => xss_clean($_POST['title_en']),
                        ), $id
                );
                $data['title_ar'] = xss_clean($_POST['title_ar']);
                $data['title_en'] = xss_clean($_POST['title_en']);
                $data['desc_ar'] = xss_clean($_POST['desc_ar']);
                $data['desc_en'] = xss_clean($_POST['desc_en']);
                $data['price'] = xss_clean($_POST['price']);
                $data['period'] = xss_clean($_POST['period']);
                $data['no_of_ads'] = xss_clean($_POST['no_of_ads']);
                $data['this_order'] = xss_clean($_POST['this_order']);
                $data['active'] = xss_clean($_POST['active']);
                $where_array['id'] = $id;
                $update = $this->packages->update($data, $where_array);
                if ($update) {
                    print_json('success', _lang('updated_successfully'));
                } else {
                    print_json('error', _lang('no_affected_rows'));
                }
            }
        }

        public function delete(){
            $this->check_access('packages', 'delete');
            $id = $_POST['id'];
            $deleted = $this->packages->delete($id);
            if ($deleted) {
                print_json('success', _lang('deleted_successfully'));
            } else {
                print_json('error', 'error');
            }
        }

        function data(){
            $this->load->library('datatables');
            $this->datatables
                    ->select("id,title_ar,title_en,period,price,no_of_ads,active")
                    ->from("packages");
            $this->datatables->add_column('active', function($data) {
            return ($data['active'] == 1) ? _lang('active') : _lang('not_active');
        }, 'id');
        $this->datatables->add_column('title', function($data) {
                $back = $data['title_ar'] . '-' . $data['title_en'];
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
                if ($CI->check_access('packages', 'edit', true)) {
                    $back .='<li>';
                    $back .='<a href="" onclick = "Packages.edit(this);return false;" data-id = "' . $data["id"] . '">';
                    $back .='<i class = "icon-docs"></i>' . _lang('edit') . '';
                    $back .='</a>';
                    $back .='</li>';
                }
                if ($CI->check_access('packages', 'delete', true)) {
                    $back .='<li>';
                    $back .='<a href="" data-toggle="confirmation" onclick = "Packages.delete(this);return false;" data-id = "' . $data["id"] . '">';
                    $back .='<i class = "icon-docs"></i>' . _lang('delete') . '';
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

        public function inputs_check($inputs = array(), $id = false){
            $errors = array();
            foreach ($inputs as $key => $value) {
                $where_array = array();
                if ($id) {
                    $where_array['id !='] = $id;
                }
                $where_array[$key] = $value;
                $find = $this->packages->get($where_array);
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
