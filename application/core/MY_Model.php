<?php
    define('NO_DATA', "IM_MODEL_NO_DATA");

    abstract class MY_Model extends CI_Model{

        var $fields;

        function __construct(){
            parent::__construct();
        }

        public function __call($name, $arguments){
            if (in_array(strtolower($name), array("join", "like", "where", "where_in", "where_not_in", "group_by",
                        "join"
                    ))) {
                call_user_func_array(array($this->db, $name), $arguments);
            }

            return $this;
        }

        function __set($name, $value){
            $this->fields->{$name} = $value;
        }

        function getTable(){
            if (isset(static::$table))
                return static::$table;
            return strtolower(str_replace("_model", "", get_called_class())) . "s";
        }

        function getTableId(){
            if (isset(static::$tableId))
                return static::$tableId;
            return substr(static::getTable(), 0, -1);
        }

        function is_exists($id = NULL){
            if ($id !== NULL) {
                $this->db->where(static::getTableId(), $id);
            }
            return $this->db->limit(1)->get(static::getTable())->num_rows() > 0;
        }

        function result(){
            return $this->db->get(static::getTable())->result();
        }

        function order($a){
            $this->db->order_by($a);
            return $this;
        }

        public function find($id){
            $this->db->select('*');
            $this->db->from(static::getTable());
            if (is_array($id)) {
                $cond = $id;
                foreach ($cond as $key => $value) {
                    $this->db->where($key, $value);
                }
            } else {
                $this->db->where('id', $id);
            }
            $query = $this->db->get();
            if ($query->num_rows() > 0) {
                return $query->row();
            } else {
                return false;
            }
        }

        public function findByCol($col, $id){
            $this->db->select('*');
            $this->db->from(static::getTable());
            $this->db->where($col, $id);
            $query = $this->db->get();
            if ($query->num_rows() > 0) {
                return $query->row();
            } else {
                return false;
            }
        }

        function row(){
            return $this->db->get(static::getTable())->row();
        }

        function create($data = NULL){

            if ($data == NULL) {
                foreach ($this->fields as $field => $val) {
                    if ($val == NO_DATA)
                        continue;
                    if ($val == "CURRENT_TIMESTAMP")
                        $this->db->set($field, $val, FALSE);
                    else
                        $this->db->set($field, $val);
                    $this->fields->{$field} = NO_DATA;
                }
                $this->db->insert(static::getTable());
                return $this->db->insert_id();
            }
            else {
                $this->db->insert(static::getTable(), $data);
                return $this->db->insert_id();
            }
        }

        public function add($data = array()){
            $this->db->insert(static::getTable(), $data);
            $affected_rows = $this->db->affected_rows();
            if ($affected_rows > 0) {
                return $this->db->insert_id();
            } else {
                return false;
            }
        }

        public function update($data = array(), $where_array = array()){
            if (count($where_array) > 0) {
                foreach ($where_array as $key => $value) {
                    $this->db->where($key, $value);
                }
            }
            $this->db->update(static::getTable(), $data);
            $affected_rows = $this->db->affected_rows();
            if ($affected_rows > 0) {
                return true;
            } else {
                return false;
            }
        }

        public function delete($id){
            if (is_array($id)) {
                $this->db->where_in(static::getTableId(), $id);
            } else {
                $this->db->where(static::getTableId(), $id);
            }
            $this->db->delete(static::getTable());
            $affected_rows = $this->db->affected_rows();
            if ($affected_rows > 0) {
                return true;
            } else {
                return false;
            }
        }

        public function deleteByCol($col, $id){
            if (is_array($id)) {
                $this->db->where_in($col, $id);
            } else {
                $this->db->where($col, $id);
            }
            $this->db->delete(static::getTable());
            $affected_rows = $this->db->affected_rows();
            if ($affected_rows > 0) {
                return true;
            } else {
                return false;
            }
        }

        function datatables(){
            $this->load->library('datatables');
            $this->datatables->from(static::getTable());
            return $this->datatables;
        }

        public function get($cond = array(), $order = false, $order_type = false, $limit = false, $offset = false){
            if (count($cond) > 0) {
                foreach ($cond as $key => $value) {
                    $this->db->where($key, $value);
                }
            }
            if ($limit && $offset) {
                $this->db->limit($limit, $offset);
            }
            if ($limit && !$offset) {
                $this->db->limit($limit);
            }
            if ($order && $order_type) {
                $this->db->order_by("$order", "$order_type");
            }
            $query = $this->db->get(static::getTable());
            if ($query->num_rows() > 0) {
                return $query->result();
            } else {
                return false;
            }
        }

        public function do_upload($image, $config, $new_path,$file_name,$cancel_resize=false){
            $file_name_arr=explode(".", $file_name);
            $file_ext=array_pop($file_name_arr);
            $config['file_name'] = md5(uniqid(mt_rand())).$file_ext;;
            $this->load->library('upload');
            $this->upload->initialize($config);
            if (!$this->upload->do_upload($image)) {
                return FALSE;
            } else {
                $data = $this->upload->data();
                if(!$cancel_resize){
                    $file_resized_name = resize5($data, $new_path, static::$imagesDimensions, true);
                    return $file_resized_name;
                }
                return $data['file_name'];
                
            }
        }

    }
