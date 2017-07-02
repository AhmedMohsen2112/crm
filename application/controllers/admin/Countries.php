<?php

class Countries extends C_Controller {

    public function __construct() {
        parent::__construct();
        $this->check_access('countries', 'open');
        $this->load->model('Countries_model', 'countries');
        $this->load->model('Currency_model', 'currency');
    }

    public function index() {
        $this->check_access('countries', 'open');
        $this->data['currency'] = $this->currency->get(array(), 'this_order', 'ASC');
        $main_content = 'countries/index';
        $this->_view($main_content, 'admin');
    }

    public function row() {
        $this->check_access('countries', 'edit');
        $id = $_POST['id'];
        $find = $this->countries->find($id);
        //pri($find);
        if ($find) {
            print_json('success', $find);
        } else {
            print_json('error', 'error');
        }
    }

    public function add() {
        $this->check_access('countries', 'add');
        $this->load->library('form_validation');
        $this->form_validation->set_rules('this_order', _lang('this_order'), 'required');
        $this->form_validation->set_rules('title_ar', _lang('title_ar'), 'trim|required');
        $this->form_validation->set_rules('title_en', _lang('title_en'), 'trim|required');
        $valid_upload = false;
        $image_name = "";
        if ($this->form_validation->run() == false) {
            $errors = $this->form_validation->error_array();
            print_json('error', $errors);
        } else {
            $this->inputs_check(array(
                'title_en' => xss_clean($_POST['title_en']),
                'title_en' => xss_clean($_POST['title_en']),
                    )
            );
            if (isset($_FILES['country_image']) && $_FILES['country_image']['name'] != "") {

                $this->config->load('files');
                $config = $this->config->item('country_image');
                $new_path = 'uploads/countries/';
                $uploading = $this->countries->do_upload('country_image', $config, $new_path,$_FILES['country_image']['name'],true);

                if (!$uploading) {
                    $errors = array('country_image' => $this->upload->display_errors());
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
            $message['country_image'] = _lang('no_file_to_upload');
            print_json('error', $message);
        }
        $data['active'] = \xss_clean($_POST['active']);
        $data['title_ar'] = \xss_clean($_POST['title_ar']);
        $data['title_en'] = \xss_clean($_POST['title_en']);
        $data['currency_id'] = \xss_clean($_POST['currency_id']);
        $data['this_order'] = \xss_clean($_POST['this_order']);
        $add = $this->countries->add($data);
        if ($add) {
            print_json('success', _lang('added_successfully'));
        } else {
            print_json('error', 'added_failed');
        }
    }

    public function edit() {
        $this->check_access('countries', 'edit');
        $id = $_POST['id'];
        $find = $this->countries->find($id);
        //pri($find);
        $this->load->library('form_validation');
        $this->form_validation->set_rules('this_order', _lang('this_order'), 'required');
        $this->form_validation->set_rules('title_ar', _lang('title_ar'), 'trim|required');
        $this->form_validation->set_rules('title_en', _lang('title_en'), 'trim|required');
        $valid_upload = false;
        $image_name = "";
        if ($this->form_validation->run() == false) {
            $errors = $this->form_validation->error_array();
            print_json('error', $errors);
        } else {
            $this->inputs_check(array(
                'title_en' => xss_clean($_POST['title_en']),
                'title_en' => xss_clean($_POST['title_en']),
                    ), $id
            );
            if (isset($_FILES['country_image']) && $_FILES['country_image']['name'] != "") {

                $this->config->load('files');
                $config = $this->config->item('country_image');
                $new_path = 'uploads/countries/';
                $uploading = $this->countries->do_upload('country_image', $config, $new_path,$_FILES['country_image']['name'],true);

                if (!$uploading) {
                    $errors = array('country_image' => $this->upload->display_errors());
                    print_json('error', $errors);
                } else {
                    $files = array(
                        FCPATH . 'uploads/countries/' . $find->image,
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
        //pri($image_name);
        if ($valid_upload) {
            if ($image_name != "") {
                $data['image'] = $image_name;
            }
        } else if (!$valid_upload && empty($find->image)) {
            $message['country_image'] = _lang('no_file_to_upload');
            print_json('error', $message);
        }
        $data['active'] = \xss_clean($_POST['active']);
        $data['title_ar'] = \xss_clean($_POST['title_ar']);
        $data['title_en'] = \xss_clean($_POST['title_en']);
        $data['currency_id'] = \xss_clean($_POST['currency_id']);
        $data['this_order'] = \xss_clean($_POST['this_order']);
        $where['id'] = $id;
        //pri($where);
        $update = $this->countries->update($data, $where);
        if ($update) {
            print_json('success', _lang('updated_successfully'));
        } else {
            print_json('error', 'no_affected_rows');
        }
    }

    public function delete() {
        $this->check_access('countries', 'delete');
        $id = $_POST['id'];
        $find = $this->countries->find($id);
        $delete = $this->countries->delete($id);
        if ($delete) {
            $files = array(
                FCPATH . 'uploads/countries/' . $find->image,
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

    public function data() {
        $CI = & get_instance();
        $this->load->library('datatables');
        $this->datatables
                ->select('countries.id,countries.title_ar,countries.title_en,countries.active,countries.image')
                ->from("countries");
        $this->datatables->add_column('image', function($data) {
            $back = '<img src="' . base_url() . 'uploads/countries/' . $data['image'] . '" style="height:64px;width:64px;"/>';
            return $back;
        }, 'id');
//            $this->datatables->add_column('cities', function($data) {
//                //$back = '<button type="button" class="data btn green"  data-id="' . $data["id"] . '">' . _lang('cities') . '</button>';
//                $back = '<a href="#" class="btn btn-sm data-box" data-type="cities"  data-id="' . $data["id"] . '">' . _lang('cities') . '</a>';
//                return $back;
//            }, 'id');
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
            if ($CI->check_access('countries', 'edit', true)) {
                $back .='<li>';
                $back .='<a href="" onclick = "Countries.edit(this);return false;" data-id = "' . $data["id"] . '">';
                $back .='<i class = "icon-docs"></i>' . _lang('edit') . '';
                $back .='</a>';
                $back .='</li>';
            }
            if ($CI->check_access('countries', 'delete', true)) {
                $back .='<li>';
                $back .='<a href="" data-toggle="confirmation" onclick = "Countries.delete(this);return false;" data-id = "' . $data["id"] . '">';
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

    public function inputs_check($inputs = array(), $id = false) {
        $errors = array();

        foreach ($inputs as $key => $value) {
            $where_array = array();
            if ($id) {
                $where_array['id !='] = $id;
            }
            $where_array[$key] = $value;
            $find = $this->countries->get($where_array);
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
