<?php

    class Admin_model extends CI_Model{
        public function __construct(){
            parent::__construct();
        }

        public function main_pages(){ //0:main any number:sub  default:main
            $this->db->select('*');
            $this->db->from('pages');
            $this->db->where('active', 1);
            $this->db->where('parent_id', 0);
            $this->db->order_by('this_order', 'ASC');
            $query = $this->db->get();
            if ($query->num_rows() > 0) {
                return $query->result();
            } else {
                return false;
            }
        }

    }
