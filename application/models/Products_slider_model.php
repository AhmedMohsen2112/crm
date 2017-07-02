<?php

    class Products_slider_model extends MY_Model{

        protected static $table = "products_slider";
        protected static $tableId = "products_id";
        protected static $imagesDimensions = array(
            's' => array('width' => '150', 'height' => 82),
            'l' => array('width' => '750', 'height' => 750),
        );

        function __construct(){
            parent::__construct();
        }

    }
