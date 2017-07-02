<?php

    /**
     * Created by Master Vission.
     * Date: 9/22/2016
     */
    class Permissions_model extends CI_Model{

        public $permissions = array();

        function __construct(){
            parent::__construct();
        }

        function set_permissions($permission){
            if (!empty($permission)) {
                $this->permissions = json_decode($permission);
            }

            return $this->permissions;
        }

        function get($permission){
            if (isset($this->permissions->{$permission})) {
                return $this->permissions->{$permission};
            }
            return false;
        }

        function check($page, $permission = "open"){
            if (!empty($page)) {
                if (isset($this->permissions->{$page})) {
                    if (isset($this->permissions->{$page}->{$permission})) {
                        if ($this->permissions->{$page}->{$permission} == 1) {
                            return true;
                        }
                    }
                }
            }
            return false;
        }

        function check2($page, $permission = "open", $return = false){
            if (!empty($page)) {
                if (isset($this->permissions->{$page})) {
                    if (isset($this->permissions->{$page}->{$permission})) {
                        if ($this->permissions->{$page}->{$permission} == 1) {
                            return true;
                        }
                    }
                }
            }
            if ($return) {
                return false;
            }
            die("NO PERMISSIONS !");
        }

        function check3($permission, $sub = "open"){
            if (isset($this->permissions->{$permission})) {
                if (isset($this->permissions->{$permission}->{$sub})) {
                    if ($this->permissions->{$permission}->{$sub} == 1) {
                        return 1;
                    }
                }
            }
            return 0;
        }

    }
