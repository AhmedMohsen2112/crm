<?php

class Products_model extends MY_Model {

    protected static $table = "products";
    protected static $tableId = "id";
    protected static $imagesDimensions = array(
        's' => array('width' => '170', 'height' => 93),
        'm' => array('width' => '320', 'height' => 360),
    );

    function __construct() {
        parent::__construct();
    }

    public function getProducts($where_array = array(), $order = false, $order_type = false, $limit = false, $offset = false) {
        $this->db->select('products.id as product_id,products.title as product_title,products.title_ar as product_title_ar,products.title_en as product_title_en,products.price,products.image,'
                . 'products.desc_ar as product_desc_ar,products.desc_en as product_desc_en,'
                . 'brands.id as brand_id,brands.title_ar as brand_title_ar,brands.title_en as brand_title_en,'
                . 'currency.sign as currency_sign,'
                . 'concat(clients.firstname," ",clients.lastname) as client_name,clients.phone as client_phone');
        $this->db->from('products');
        $this->db->join('categories', 'products.categories_id = categories.id');
        $this->db->join('brands', 'products.brands_id = brands.id');
        $this->db->join('countries', 'products.countries_id = countries.id');
        $this->db->join('currency', 'countries.currency_id = currency.id');
        $this->db->join('clients', 'products.created_by = clients.id');
        $this->db->where('products.active', 1);
        $this->db->where('brands.active', 1);
        $this->db->where('countries.active', 1);
        $this->db->where('categories.active', 1);
        $this->db->where('currency.active', 1);
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
