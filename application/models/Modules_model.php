<?php

    class Modules_model extends MY_Model{

        protected static $table = "modules";
        protected static $tableId = "id";

        public function __construct(){
            parent::__construct();
        }

        public function modules_actions(){
            $modules = $this->get();
            $modules_actions = array();
            if ($modules) {
                foreach ($modules as $module) {
                    $module->actions = explode(',', $module->actions);
                    $modules_actions[] = $module;
                }
            }
            return $modules_actions;
        }

    }
