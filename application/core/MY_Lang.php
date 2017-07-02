<?php

    class MY_Lang extends CI_Lang{

        // languages
        var $languages = array(
            'en' => 'english',
            'ar' => 'arabic'
        );
        // special URIs (not localized)
        var $special = array(
            "admin",
            "ajax",
            "Ajax",
            "api",
        );
        // where to redirect if no language in URI
        var $default_uri = '';
        var $default_lang = 'ar';

        /*         * ******************************************** */
        function __construct(){
            parent::__construct();

            global $CFG;
            global $URI;
            global $RTR;
            global $IN;
            global $CI;
            $segment = $URI->segment(1);
            if (isset($this->languages[$segment])) { // URI with language -> ok
                $language = $this->languages[$segment];
                $CFG->set_item('language', $language);
            } else if ($this->is_special($segment)) { // special URI -> no redirect
                return;
            } else { // URI without language -> redirect to default_uri
                // set default language
                $CFG->set_item('language', $this->languages[$CFG->item('default_language')]);
                // redirect
                header("Location: " . $CFG->site_url($this->localized($this->default_uri . $segment)), TRUE, 302);
                exit;
            }
        }

        // get current language
        // ex: return 'en' if language in CI config is 'english'
        function lang(){
            global $CFG;
            $language = $CFG->item('language');

            $lang = array_search($language, $this->languages);
            if ($lang) {
                return $lang;
            }

            return NULL; // this should not happen
        }

        function is_special($uri){
            $exploded = explode('/', $uri);
            if (in_array($exploded[0], $this->special)) {
                return TRUE;
            }
            return FALSE;
        }

        function switch_uri($lang){
            $CI = & get_instance();

            $uri = $CI->uri->uri_string();
            if ($uri != "") {
                $exploded = explode('/', $uri);
                if ($exploded[0] == $this->lang()) {
                    $exploded[0] = $lang;
                }
                $uri = implode('/', $exploded);
            }
            return $uri;
        }

        // is there a language segment in this $uri?
        function has_language($uri){
            $first_segment = NULL;

            $exploded = explode('/', $uri);
            if (isset($exploded[0])) {
                if ($exploded[0] != '') {
                    $first_segment = $exploded[0];
                } else if (isset($exploded[1]) && $exploded[1] != '') {
                    $first_segment = $exploded[1];
                }
            }

            if ($first_segment != NULL) {
                return isset($this->languages[$first_segment]);
            }

            return FALSE;
        }

        // add language segment to $uri (if appropriate)
        function localized($uri){
            if ($this->has_language($uri) || $this->is_special($uri) || preg_match('/(.+)\.[a-zA-Z0-9]{2,4}$/', $uri)) {
                // we don't need a language segment because:
                // - there's already one or
                // - it's a special uri (set in $special) or
                // - that's a link to a file
            } else {
                $uri = $this->lang() . '/' . $uri;
            }

            return $uri;
        }

    }

    /* End of file */
