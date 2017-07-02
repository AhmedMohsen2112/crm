<?php

    class About_us extends C_Controller{
        public function __construct(){
            parent::__construct();
            $this->check_access('about_us', 'open');
            $this->load->model('About_us_model', 'about_us');
        }

        public function index(){
            $about_us = $this->about_us->get();
            $this->data['about_us'] = $about_us[0];
            //pri($this->data['about_us']);
            $main_content = 'about_us/index';
            $this->_view($main_content, 'admin');
        }

        function edit(){
            //pri($_POST);
            $id = $_POST['id'];
            $find = $this->about_us->find($id);
            //pri($about_us);
            $this->load->library('form_validation');
            $this->form_validation->set_rules('title_ar', _lang('title_ar'), 'required');
            $this->form_validation->set_rules('title_en', _lang('title_ar'), 'required');
            $this->form_validation->set_rules('desc_ar', _lang('title_ar'), 'required');
            $this->form_validation->set_rules('desc_en', _lang('title_ar'), 'required');
            $valid_upload = true;
            $image_name = "";
            if ($this->form_validation->run() == false) {
                $errors = $this->form_validation->error_array();
                print_json('error', $errors);
            } else {
                if (isset($_FILES['about_us_image']) && $_FILES['about_us_image']['name'] != "") {

                    $this->config->load('files');
                    $config = $this->config->item('about_us_image');
                    $new_path = 'uploads/about_us/';
                    $uploading = $this->about_us->do_upload('about_us_image', $config, $new_path);

                    if (!$uploading) {
                        $errors = array('about_us_image' => $this->upload->display_errors());
                        print_json('error', $errors);
                    } else {
                        $image_original = substr($find->image, strrpos($find->image, '_') + 1);
                        $image_without_prefix = substr($find->image, strpos($find->image, '_') + 1); //without s_
                        $files = array(
                            FCPATH . 'uploads/about_us/' . $image_original,
                            FCPATH . 'uploads/about_us/s_' . $image_without_prefix,
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
                $message['about_us_image'] = _lang('no_file_to_upload');
                print_json('error', $message);
            }
            //pri($array_data);
            $data['title_ar'] = $_POST['title_ar'];
            $data['title_en'] = $_POST['title_en'];
            $data['desc_ar'] = $_POST['desc_ar'];
            $data['desc_en'] = $_POST['desc_en'];
            $where_array['id'] = $id;
            //pri($where_array);
            $update = $this->about_us->update($data, $where_array);
            $about_us_after_update = $this->about_us->find($id);
            if ($update) {
                print_json('success', $about_us_after_update);
            } else {
                print_json('error', 'no_affected_rows');
            }
            //save data here
        }

    }
