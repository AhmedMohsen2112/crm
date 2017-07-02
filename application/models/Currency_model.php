<?php

    class Currency_model extends MY_Model{

        protected static $table = "currency";
        protected static $tableId = "id";

        public function __construct(){
            parent::__construct();
        }

    }
