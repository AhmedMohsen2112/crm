<?php

    class Users extends C_Controller{
        public function __construct(){
            parent::__construct();
            $this->check_access('users', 'open');
            $this->load->model('Users_model', 'users');
            $this->load->model('Groups_model', 'groups');
        }

        public function index(){
            $this->check_access('users', 'open');
            $this->data['groups'] = $this->groups->get();
            $main_content = 'users/index';
            $this->_view($main_content, 'admin');
        }

        public function row(){
            $this->check_access('users', 'edit');
            $id = $_POST['id'];
            $find = $this->users->find($id);

            if ($find) {
                print_json('success', $find);
            } else {
                print_json('error', 'error');
            }
        }

        public function add(){
            $this->check_access('users', 'add');
            $this->load->library('form_validation');
            $this->form_validation->set_rules('username', _lang('username'), 'required');
            $this->form_validation->set_rules('password', _lang('password'), 'required');
            $this->form_validation->set_rules('groups_id', _lang('groups_id'), 'required');
            $this->form_validation->set_rules('address', _lang('address'), 'required');
            $this->form_validation->set_rules('email', _lang('email'), 'required');
            $this->form_validation->set_rules('phone', _lang('phone'), 'required');
            if ($this->form_validation->run() == false) {
                $errors = $this->form_validation->error_array();
                print_json('error', $errors);
            } else {
                $this->inputs_check(array(
                    'email' => xss_clean($_POST['email']),
                    'username' => xss_clean($_POST['username']),
                        )
                );
                $data['username'] = xss_clean($_POST['username']);
                $data['password'] = md5(xss_clean($_POST['password']));
                $data['groups_id'] = xss_clean($_POST['groups_id']);
                $data['address'] = xss_clean($_POST['address']);
                $data['email'] = xss_clean($_POST['email']);
                $data['phone'] = xss_clean($_POST['phone']);
                $data['active'] = xss_clean($_POST['active']);
                $data['address'] = $this->User->id;
                $data['phone'] = $_POST['phone'];
                $data['created_by'] = $this->User->id;
                //pri($data_array);
                $add = $this->users->add($data);
                if ($add) {
                    print_json('success', _lang('added_successfully'));
                } else {
                    print_json('error', 'error');
                }
            }
        }

        public function edit(){
            $this->check_access('users', 'edit');
            $id = $_POST['id'];
            $user = $this->users->find($id);
            $this->load->library('form_validation');
            $this->form_validation->set_rules('username', _lang('username'), 'required');
            $this->form_validation->set_rules('groups_id', _lang('groups_id'), 'required');
            $this->form_validation->set_rules('address', _lang('address'), 'required');
            $this->form_validation->set_rules('email', _lang('email'), 'required');
            $this->form_validation->set_rules('phone', _lang('phone'), 'required');
            if ($this->form_validation->run() == false) {
                $errors = $this->form_validation->error_array();
                print_json('error', $errors);
            } else {
                $this->inputs_check(array(
                    'email' => xss_clean($_POST['email']),
                    'username' => xss_clean($_POST['username']),
                        ), $id
                );
                $data['username'] = xss_clean($_POST['username']);
                $password = $_POST['password'];
                $data['password'] = (isset($password)&&!empty($password)) ? md5(xss_clean($_POST['password'])) : $user->password;
                $data['groups_id'] = xss_clean($_POST['groups_id']);
                $data['address'] = xss_clean($_POST['address']);
                $data['email'] = xss_clean($_POST['email']);
                $data['phone'] = xss_clean($_POST['phone']);
                $data['active'] = xss_clean($_POST['active']);
                $data['phone'] = $_POST['phone'];
                $where_array['id'] = $id;
                $update = $this->users->update($data, $where_array);
                if ($update) {
                    print_json('success', _lang('updated_successfully'));
                } else {
                    print_json('error', _lang('no_affected_rows'));
                }
            }
        }

        public function delete(){
            $this->check_access('users', 'delete');
            $where_array['id'] = $_POST['id'];
            $deleted = $this->users->delete($where_array);
            if ($deleted) {
                print_json('success', _lang('deleted_successfully'));
            } else {
                print_json('error', 'error');
            }
        }

        function data(){
            $this->check_access('users', 'open');
            $this->load->library('datatables');
            $this->datatables
                    ->select("users.id,users.username,users.active,groups.name as group_name")
                    ->from("users")
                    ->join('groups', 'groups.id=users.groups_id');

            $this->datatables->add_column('active', function($data) {
                return ($data['active'] == 1) ? _lang('active') : _lang('not_active');
            }, 'id');
            $this->datatables->add_column('options', function($data) {
                $CI = & get_instance();
                $back = "";
                $back .='<div class="btn-group">';
                $back .=' <button class="btn btn-xs green dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false"> ' . _lang('options') . '';
                $back .='<i class="fa fa-angle-down"></i>';
                $back .='</button>';
                $back .='<ul class = "dropdown-menu" role = "menu">';
                if ($CI->check_access('users', 'edit', true)) {
                    $back .='<li>';
                    $back .='<a href="" onclick = "Users.edit(this);return false;" data-id = "' . $data["id"] . '">';
                    $back .='<i class = "icon-docs"></i>' . _lang('edit') . '';
                    $back .='</a>';
                    $back .='</li>';
                }
                if ($CI->check_access('users', 'delete', true)) {
                    $back .='<li>';
                    $back .='<a href="" data-toggle="confirmation" onclick = "Users.delete(this);return false;" data-id = "' . $data["id"] . '">';
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
                $find = $this->users->get($where_array);
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
