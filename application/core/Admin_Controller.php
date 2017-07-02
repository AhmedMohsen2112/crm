<?php

    class Admin_Controller extends CI_Controller{

        public $User;
        public $isUser = false;
        public $_current_user = null;
        public $current_user_company = null;
        public $current_user_branch = null;
        public $_login_data = null;
        public $_last_view = null;
        public $Modules = array();
        public $Main_pages = array();
        public $Sub_pages = array();
        public $lang_code = 'ar';
        public $visa_price;

        function __construct(){
            parent::__construct();
            $this->load->model('Admin_model');
            $this->load->model('User_model', 'user');
            $this->load->model('Other_settings_model', 'other_settings');
            $this->load->model('Pages_model', 'pages');
            $this->load->model('Permissions_model', 'permissions');
            $this->load->model('Groups_model', 'groups');
            $this->slugsCreate();
            $this->_other_settings = $this->other_settings->row();
            $this->load_lang_files($this->_other_settings->language);
            if ($this->user->logged_in()) {
                $this->User = $this->user->current_user();
                $group = $this->groups->find($this->User->groups_id);
                if ($group) {
                    if ($group->permissions !== null) {
                        $this->permissions->set_permissions($group->permissions);
                    } else {
                        $this->permissions->set_permissions(array());
                    }
                }

                $this->isUser = true;
                $this->login = true;
                $this->data['modules'] = $this->Modules;
                $this->data['other_settings'] = $this->_other_settings;
                $this->data['user_login_image'] = "defult.jpg";
                $this->data['main_pages'] = $this->pages->get(array('parent_id' => 0, 'active' => 1), 'this_order', 'ASC');
                $this->data['page_link_name'] = $this->uri->segment(2);
                $this->data['user'] = $this->User;
                //pri($this->data['user']);
            }

            $this->data['view_name'] = $this->uri->segment('2');
        }

        public function _view($main_content, $type = 'front'){
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

        public function load_lang_files($language='ar'){
            $this->lang_code = $language;

            $this->data['lang_code'] = $this->lang_code;
            $this->data['lang'] = $this->lang_code;
            $lang_array = array(
                "ar" => "arabic",
                "en" => "english",
                "fr" => "french"
            );
            global $CFG;
            $language = $lang_array[$this->lang_code];
            $CFG->set_item('language', $language);
            if (realpath(APPPATH . "language/" . $lang_array[$this->lang_code])) {
                $langFiles = scandir(realpath(APPPATH . "language/" . $lang_array[$this->lang_code]));
            }
            if (!$this->session->userdata("lang_files")) {
                $lang_files = array();
                foreach ($langFiles as $lang) {
                    if (endsWith($lang, "_lang.php")) {
                        $this->lang->load(str_replace("_lang.php", "", $lang));
                        $lang_files[] = str_replace("_lang.php", "", $lang);
                    }
                }
                $this->session->set_userdata("lang_files", $lang_files);
            } else {
                $lang_files = $this->session->userdata("lang_files");
                foreach ($lang_files as $lang) {
                    $this->lang->load($lang);
                }
            }
        }

        public function slugsCreate(){
            $this->data['title_slug'] = 'title_' . $this->lang_code;
            $this->title_slug = $this->data['title_slug'];
            $this->data['desc_slug'] = 'desc_' . $this->lang_code;
            $this->desc_slug = $this->data['desc_slug'];
            $this->data['body_slug'] = 'body_' . $this->lang_code;
            $this->data['program_title_slug'] = 'program_title_' . $this->lang_code;
            $this->program_title_slug = $this->data['program_title_slug'];
            $this->data['program_desc_slug'] = 'program_desc_' . $this->lang_code;
            $this->program_desc_slug = $this->data['program_desc_slug'];
            $this->data['program_include_slug'] = 'program_include_' . $this->lang_code;
            $this->data['country_title_slug'] = 'country_title_' . $this->lang_code;
            $this->data['city_title_slug'] = 'city_title_' . $this->lang_code;
            $this->data['country_desc_slug'] = 'country_desc_' . $this->lang_code;
            $this->data['city_desc_slug'] = 'city_desc_' . $this->lang_code;
            $this->data['hotel_title_slug'] = 'hotel_title_' . $this->lang_code;
            $this->data['hotel_desc_slug'] = 'hotel_desc_' . $this->lang_code;
            $this->data['hint_slug'] = 'hint_' . $this->lang_code;
            $this->data['going_from_title_slug'] = 'going_from_title_' . $this->lang_code;
            $this->data['going_to_title_slug'] = 'going_to_title_' . $this->lang_code;
            $this->data['return_from_title_slug'] = 'return_from_title_' . $this->lang_code;
            $this->data['return_to_title_slug'] = 'return_to_title_' . $this->lang_code;
            $this->data['site_title_slug'] = 'site_title_' . $this->lang_code;
            $this->data['site_desc_slug'] = 'site_desc_' . $this->lang_code;
            $this->data['site_keywords_slug'] = 'site_keywords_' . $this->lang_code;
            $this->data['site_address_slug'] = 'site_address_' . $this->lang_code;
        }

        public function check_access($page, $permission, $return = false){

            if ($this->permissions->check($page, $permission, $return)) {
                return true;
            }
            if ($return) {
                return false;
            }
            err_404('permissions');
        }

    }
