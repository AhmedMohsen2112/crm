<?php

class Brands_model extends MY_Model {

    protected static $table = "brands";
    protected static $tableId = "id";
    protected static $imagesDimensions = array(
        's' => array('width' => '170', 'height' => 93),
    );

    function __construct() {
        parent::__construct();
    }

    public function getBrandCategories($where_array = array(), $order = false, $order_type = false, $limit = false, $offset = false) {
        $this->db->select('categories.id as category_id,categories.title_ar as category_title_ar,categories.title_en as category_title_en,categories.image');
        $this->db->from('brands');
        $this->db->join('brands_categories', 'brands_categories.brands_id = brands.id');
        $this->db->join('categories', 'brands_categories.categories_id = categories.id');
        if (count($where_array) > 0) {
            foreach ($where_array as $key => $value) {
                $this->db->where($key, $value);
            }
        }
        if ($order && $order_type) {
            $this->db->order_by("$order", "$order_type");
        }
        $this->db->limit($limit, $offset);
        $query = $this->db->get();
        if ($query->num_rows() > 0) {
            return $query->result();
        } else {
            return false;
        }
    }

}
