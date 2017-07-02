<?php

    class Groups extends C_Controller{
        public function __construct(){
            parent::__construct();
            $this->check_access('groups', 'open');
            $this->load->model('Pages_model', 'pages');
            $this->load->model('Modules_model');
            $this->load->model('Groups_model', 'groups');
        }

        public function index(){
            $this->check_access('groups', 'open');
            $this->data['modules_actions'] = $this->Modules_model->modules_actions();
            $main_content = 'groups/index';
            $this->_view($main_content, 'admin');
        }

        public function row(){
            $this->check_access('groups', 'edit');
            $id = $_POST['id'];
            $find = $this->groups->find($id);
            $find->permissions = json_decode($find->permissions);

            if ($find) {
                print_json('success', $find);
            } else {
                print_json('error', 'error');
            }
        }

        public function add(){
            $this->check_access('groups', 'add');
            $this->load->library('form_validation');
            $this->form_validation->set_rules('name', _lang('name'), 'required');
            if ($this->form_validation->run() == false) {
                $errors = $this->form_validation->error_array();
                print_json('error', $errors);
            } else {
                $this->inputs_check(array(
                    'name' => xss_clean($_POST['name']),
                        )
                );
                $data['name'] = xss_clean($_POST['name']);
                $data['active'] = xss_clean($_POST['active']);
                $data['permissions'] = json_encode($_POST['group_options']);
                $data['created_by'] = $this->User->id;
                //pri($data_array);
                $add = $this->groups->add($data);
                if ($add) {
                    print_json('success', _lang('added_successfully'));
                } else {
                    print_json('error', 'error');
                }
            }
        }

        public function edit(){
            $this->check_access('groups', 'edit');
            $id = $_POST['id'];
            $group = $this->groups->find($id);
            $this->form_validation->set_rules('name', _lang('name'), 'required');
            if ($this->form_validation->run() == false) {
                $errors = $this->form_validation->error_array();
                print_json('error', $errors);
            } else {
                $this->inputs_check(array(
                    'name' => xss_clean($_POST['name']),
                        ), $id
                );
                $data['name'] = xss_clean($_POST['name']);
                $data['active'] = xss_clean($_POST['active']);
                $data['permissions'] = json_encode($_POST['group_options']);
                $where_array['id'] = $id;
                $update = $this->groups->update($data, $where_array);
                if ($update) {
                    print_json('success', _lang('updated_successfully'));
                } else {
                    print_json('error', _lang('no_affected_rows'));
                }
            }
        }

        public function delete(){
            $this->check_access('groups', 'delete');
            $where_array['id'] = $_POST['id'];
            $deleted = $this->groups->delete($where_array);
            if ($deleted) {
                print_json('success', _lang('deleted_successfully'));
            } else {
                print_json('error', 'error');
            }
        }

        function data(){

            $this->load->library('datatables');
            $this->datatables
                    ->select("groups.id,groups.name,groups.active")
                    ->from("groups");

            $this->datatables->add_column('active', function($data) {
                return ($data['active'] == 1) ? 'نشط' : 'غير نشط';
            }, 'id');
            $this->datatables->add_column('options', function($data) {
                $CI = & get_instance();
                $back = "";
                $back .='<div class="btn-group">';
                $back .=' <button class="btn btn-xs green dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false"> ' . _lang('options') . '';
                $back .='<i class="fa fa-angle-down"></i>';
                $back .='</button>';
                $back .='<ul class = "dropdown-menu" role = "menu">';
                if ($CI->check_access('groups', 'edit', true)) {
                    $back .='<li>';
                    $back .='<a href="" onclick = "Groups.edit(this);return false;" data-id = "' . $data["id"] . '">';
                    $back .='<i class = "icon-docs"></i>' . _lang('edit') . '';
                    $back .='</a>';
                    $back .='</li>';
                }
                if ($CI->check_access('groups', 'delete', true)) {
                    $back .='<li>';
                    $back .='<a href="" data-toggle="confirmation" onclick = "Groups.delete(this);return false;" data-id = "' . $data["id"] . '">';
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
                $find = $this->groups->get($where_array);
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
