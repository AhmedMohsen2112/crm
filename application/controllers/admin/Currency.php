<?php

    class Currency extends C_Controller{
        public function __construct(){
            parent::__construct();
            $this->check_access('currency', 'open');
            $this->load->model('Currency_model', 'currency');
        }

        public function index(){
            $this->check_access('currency', 'open');
            $main_content = 'currency/index';
            $this->_view($main_content, 'admin');
        }

        public function row(){
            $this->check_access('currency', 'edit');
            $id = $_POST['id'];
            $find = $this->currency->find($id);

            if ($find) {
                print_json('success', $find);
            } else {
                print_json('error', 'error');
            }
        }

        public function add(){
            $this->check_access('currency', 'add');
            $this->load->library('form_validation');
            $this->form_validation->set_rules('title_ar', _lang('title_ar'), 'required');
            $this->form_validation->set_rules('title_en', _lang('title_en'), 'required');
            $this->form_validation->set_rules('sign', _lang('sign'), 'required');
            if ($this->form_validation->run() == false) {
                $errors = $this->form_validation->error_array();
                print_json('error', $errors);
            } else {
                $this->inputs_check(array(
                    'title_ar' => xss_clean($_POST['title_ar']),
                    'title_en' => xss_clean($_POST['title_en']),
                        )
                );
                $data['title_ar'] = xss_clean($_POST['title_ar']);
                $data['title_en'] = xss_clean($_POST['title_en']);
                $data['sign'] = xss_clean($_POST['sign']);
                $data['active'] = $_POST['active'];
                $data['this_order'] = $_POST['this_order'];
                //pri($data_array);
                $add = $this->currency->add($data);
                if ($add) {
                    print_json('success', _lang('added_successfully'));
                } else {
                    print_json('error', 'error');
                }
            }
        }

        public function edit(){
            $this->check_access('currency', 'edit');
            $id = $_POST['id'];
            $this->load->library('form_validation');
            $this->form_validation->set_rules('title_ar', _lang('title_ar'), 'required');
            $this->form_validation->set_rules('title_en', _lang('title_en'), 'required');
            $this->form_validation->set_rules('sign', _lang('sign'), 'required');
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
                $data['sign'] = xss_clean($_POST['sign']);
                $data['active'] = $_POST['active'];
               $data['this_order'] = $_POST['this_order'];
                $where_array['id'] = $id;
                //pri($data_array);
                $update = $this->currency->update($data, $where_array);
                if ($update) {
                    print_json('success', _lang('updated_successfully'));
                } else {
                    print_json('error', _lang('no_affected_rows'));
                }
            }
        }

        public function delete(){
            $this->check_access('currency', 'delete');
            $id = $_POST['id'];
            $deleted = $this->currency->delete($id);
            if ($deleted) {
                print_json('success', _lang('deleted_successfully'));
            } else {
                print_json('error', 'error');
            }
        }

        function data(){

            $this->load->library('datatables');
            $this->datatables
                    ->select("id,title_ar,title_en,sign")
                    //->where("user_type","admin")
                    ->from("currency");


            $this->datatables->add_column('options', function($data) {
                $CI = & get_instance();
                $back = "";
                $back .='<div class="btn-group">';
                $back .=' <button class="btn btn-xs green dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false"> ' . _lang('options') . '';
                $back .='<i class="fa fa-angle-down"></i>';
                $back .='</button>';
                $back .='<ul class = "dropdown-menu" role = "menu">';
                if ($CI->check_access('currency', 'edit', true)) {
                    $back .='<li>';
                    $back .='<a href="" onclick = "Currency.edit(this);return false;" data-id = "' . $data["id"] . '">';
                    $back .='<i class = "icon-docs"></i>' . _lang('edit') . '';
                    $back .='</a>';
                    $back .='</li>';
                }
                if ($CI->check_access('currency', 'delete', true)) {
                    $back .='<li>';
                    $back .='<a href="" data-toggle="confirmation" onclick = "Currency.delete(this);return false;" data-id = "' . $data["id"] . '">';
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
                $find = $this->currency->get($where_array);
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
