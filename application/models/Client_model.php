<?php

class Client_model extends MY_Model {
    /* table info */

    var $table = "clients";
    var $idCol = "id";
    var $usernameCol = "username";
    var $emailCol = "email";
    var $passwordCol = "password";
    var $loginCol = "email";

    function __construct() {
        parent::__construct();
    }

    //check id if he is a user or not and if he is  a user set cookies
    public function check($loginCol, $password, $set_cookie = true, $remember = false) {

        if ($this->isUser($loginCol, $password)) {
            if ($set_cookie) {
                if ($this->setUserCookie($username, $password, $remember)) {
                    return true;
                }
            }
            return true;
        }
        return false;
    }

    private function isUser($loginCol, $password) {
        if ($find = $this->findByCol($this->loginCol, $loginCol)) {
            //pri($find);
            if ($this->validate_password($find->password, $password))
                return true;
        }

        return false;
    }

    private function validate_password($password, $log_password) {
        $log_password = $this->password_hashing($log_password);
        if ($log_password == $password) {
            return true;
        }
        return false;
    }

    public function password_hashing($log_password) {
        return md5($log_password);
    }

  

}
