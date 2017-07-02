<?php

    class Categories_model extends MY_Model{

        protected static $table = "categories";
        protected static $tableId = "id";
        protected static $imagesDimensions = array(
            's' => array('width' => '170', 'height' => 93),
            'm' => array('width' => '560', 'height' => 460),
        );

        function __construct(){
            parent::__construct();
        }

    }
