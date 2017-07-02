<?php

    class App_settings_model extends MY_Model{

        protected static $table = "app_settings";
        protected static $tableId = "id";

        function __construct(){
            parent::__construct();
        }

    }
