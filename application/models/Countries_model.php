<?php

    class Countries_model extends MY_Model{

        protected static $table = "countries";
        protected static $tableId = "id";
        protected static $imagesDimensions = array(
            's' => array('width' => 255, 'height' => 170), 
        );

        public function __construct(){
            parent::__construct();
        }

    }
