<?php

class Home_slider extends C_Controller {

    public function __construct() {
        parent::__construct();
        $this->load->model('Home_slider_model', 'home_slider');
    }

    public function index() {
        $home_slider = $this->home_slider->get();
        $this->data['home_slider']=$home_slider;
        $main_content = 'home_slider/index';
        $this->_view($main_content, 'admin');
    }

    public function row() {
        // pri($_POST);
        $id = $_POST['id'];
        $find = $this->home_slider->find($id);

        if ($find) {
            print_json('success', $find);
        } else {
            print_json('error', 'error');
        }
    }

    public function listFiles() {
        $find = $this->home_slider->get();
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
                $find = $this->home_slider->findByCol('id', $value);
                //pri($value);
                $image_original = substr($find->image, strrpos($find->image, '_') + 1);
                $image_without_prefix = substr($find->image, strpos($find->image, '_') + 1);
                $files = array(
                    FCPATH . 'uploads/home_slider/' . $image_original,
                    FCPATH . 'uploads/home_slider/s_' . $image_without_prefix,
                );
                //pri($image_without_prefix);
                foreach ($files as $file) {
                    if (!is_dir($file)) {
                        if (file_exists($file)) {
                            $deleted_file = unlink($file);
                        }
                    }
                }
                $deleted = $this->home_slider->deleteByCol('id', $value);
                if (!$deleted) {
                    $errors++;
                }
         
        }
        if ($errors == 0) {
            print_json('success', _lang('deleted_successfully'));
        } else {
            print_json('error', _lang('error'));
        }
    }

    public function add() {
        //pri($_FILES);
        $errors = 0;
        $images_names = array();
        if (!empty($_FILES['home_slider_image'])) {
            $this->config->load('files');
            $config = $this->config->item('home_slider_image');
            $files = $_FILES;
            $number_of_files = count($_FILES['home_slider_image']['name']);
            //pri($number_of_files);
            for ($i = 0; $i < $number_of_files; $i++) {
                $_FILES['home_slider_image']['name'] = $files['home_slider_image']['name'][$i];
                $_FILES['home_slider_image']['type'] = $files['home_slider_image']['type'][$i];
                $_FILES['home_slider_image']['tmp_name'] = $files['home_slider_image']['tmp_name'][$i];
                $_FILES['home_slider_image']['error'] = $files['home_slider_image']['error'][$i];
                $_FILES['home_slider_image']['size'] = $files['home_slider_image']['size'][$i];
                $uploading = $this->home_slider->do_upload('home_slider_image', $config, 'uploads/home_slider/',$_FILES['home_slider_image']['name'],true);
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
                //pri($images_names);
                foreach ($images_names as $image) {
                    $data['image'] = $image;
                    $add = $this->home_slider->add($data);
                }
                print_json('success', _lang('added_successfully'));
            }
        } else {
            print_json('error', _lang('no_file_to_upload'));
        }
    }

 

    public function delete() {
        $id = $_POST['id'];
        $find = $this->home_slider->find($id);
        $deleted = $this->home_slider->delete($id);
        if ($deleted) {
            $image_original = substr($find->image, strrpos($find->image, '_') + 1);
            $image_without_prefix = substr($find->image, strpos($find->image, '_') + 1); //without s_

            $files = array(
                FCPATH . 'uploads/home_slider/' . $image_original,
                FCPATH . 'uploads/home_slider/s_' . $image_without_prefix,
                FCPATH . 'uploads/home_slider/l_' . $image_without_prefix,
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

    function data() {

        $this->load->library('datatables');
        $this->datatables
                ->select("id,first_title_en,second_title_en,active,image")
                ->from("home_slider");

        $this->datatables->add_column('active', function($data) {
            return ($data['active'] == 1) ? _lang('active') : _lang('not_active');
        }, 'id');
        $this->datatables->add_column('image', function($data) {
            $back = '<img src="' . base_url() . 'uploads/home_slider/' . $data['image'] . '" style="height:64px;width:64px;"/>';
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
            $back .='<a href="" onclick = "Home_slider.edit(this);return false;" data-id = "' . $data["id"] . '">';
            $back .='<i class = "icon-docs"></i>' . _lang('edit') . '';
            $back .='</a>';
            $back .='</li>';
            $back .='<li>';
            $back .='<a href="" data-toggle="confirmation" onclick = "Home_slider.delete(this);return false;" data-id = "' . $data["id"] . '">';
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

    public function inputs_check($inputs = array(), $id = false) {
        $errors = array();

        foreach ($inputs as $key => $value) {
            $where_array = array();
            if ($id) {
                $where_array['id !='] = $id;
            }
            $where_array[$key] = $value;
            $find = $this->home_slider->get($where_array);
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
