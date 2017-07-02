<?php
class MY_Controller extends CI_Controller {

    public $data,
            $lang_code,
            $_app_settings;

    public function __construct() {
        parent::__construct();
        $this->load->model('App_settings_model','app_settings');
        $this->_app_settings=  $this->app_settings->row();
        if ($this->input->post('lang')) {
            $lang_code = $this->input->post('lang');
            $this->load_lang_files($lang_code);
        }
    }

    public function _view($main_content, $type = 'front') {
        $data['main_content'] = $main_content;
        $data['data'] = $this->data;
        $view_dir = 'layouts';
        if ($type == 'front') {
            $this->load->view($view_dir . '/main_layout.php', $data);
        }
        if ($type == 'admin') {
            $this->load->view($view_dir . '/admin_layout.php', $data);
        }
        if ($type == 'haj_umrah') {
            $this->load->view($view_dir . '/haj_umrah_layout.php', $data);
        }
    }

    public function load_lang_files($lang_code) {
        $this->lang_code = $lang_code;
        $lang_array = array(
            "ar" => "arabic",
            "en" => "english",
        );
        $this->config->set_item('language', $lang_array[$this->lang_code]);
        if (realpath(APPPATH . "language/" . $lang_array[$this->lang_code])) {
            $langFiles = scandir(realpath(APPPATH . "language/" . $lang_array[$this->lang_code]));
            foreach ($langFiles as $lang) {
                if (endsWith($lang, "_lang.php")) {
                    $this->lang->load(str_replace("_lang.php", "", $lang));
                }
            }
            $this->slugsCreate();
        }
    }

    public function slugsCreate() {
        $this->data['title_slug'] = 'title_' . $this->lang_code;
        $this->title_slug = $this->data['title_slug'];
        $this->data['desc_slug'] = 'desc_' . $this->lang_code;
        $this->desc_slug = $this->data['desc_slug'];
        $this->data['product_title_slug'] = 'product_title_' . $this->lang_code;
        $this->product_title_slug = $this->data['product_title_slug'];
        $this->data['product_desc_slug'] = 'product_desc_' . $this->lang_code;
        $this->product_desc_slug = $this->data['product_desc_slug'];
        $this->data['brand_title_slug'] = 'brand_title_' . $this->lang_code;
        $this->brand_title_slug = $this->data['brand_title_slug'];
        $this->data['category_title_slug'] = 'category_title_' . $this->lang_code;
        $this->category_title_slug = $this->data['category_title_slug'];
    }

    public function sendEmail($email_data = array()) {
        $config = Array(
            'protocol' => 'smtp',
            'smtp_host' => 'labyek.com',
            'smtp_port' => '587',
            'smtp_user' => 'no-reply@labyek.com',
            'smtp_pass' => 'lN2v$33a',
            'mailtype' => 'html',
            'charset' => 'utf-8'
        );
        $this->load->library('email');
        $this->email->initialize($config);
        $this->email->set_newline("\r\n");
        $this->email->from($email_data['from']);
        $this->email->reply_to($email_data['reply_to'], $email_data['name']);
        $this->email->to($email_data['to']);  // replace it with receiver mail id
        $this->email->subject($email_data['subject']); // replace it with relevant subject
        $this->email->message($email_data['message']);
        $send = $this->email->send();
        // echo $this->email->print_debugger();
        if ($send) {
            return true;
        } else {
            return false;
        }
    }

    public function inputs_check($model, $inputs = array(), $id = false) {
        $errors = array();

        foreach ($inputs as $key => $value) {
            $where_array = array();
            if ($id) {
                $where_array['id !='] = $id;
            }
            $where_array[$key] = $value;
            $find = $this->{$model}->get($where_array);
            //pri($find);
            if ($find) {
                $errors[$key] = _lang('added_before');
            }
        }

        if (!empty($errors)) {
            print_json('error', $errors, 200);
        }
        return true;
    }
    

}

require_once APPPATH . "/core/Admin_Controller.php";
require_once APPPATH . "/core/C_Controller.php";
