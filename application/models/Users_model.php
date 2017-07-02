<?php

    class Users_model extends MY_Model{

        protected static $table = "users";
        protected static $tableId = "id";

        function __construct(){
            parent::__construct();
        }

    }
