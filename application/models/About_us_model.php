<?php

    class About_us_model extends MY_Model{

        protected static $table = "about_us";
        protected static $tableId = "id";
        protected static $imagesDimensions = array(
            's' => array('width' => 670, 'height' => 370),
        );

        public function __construct(){
            parent::__construct();
        }

    }
