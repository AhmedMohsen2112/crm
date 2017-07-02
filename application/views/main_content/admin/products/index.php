
<div class="modal fade" id="addEditProducts" role="dialog">
    <div class="modal-dialog modal-lg">

        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title" id="addEditProductsLabel"></h4>
            </div>

            <div class="modal-body">


                <form role="form"  id="addEditProductsForm"  enctype="multipart/form-data">
                    <input type="hidden" name="id" id="id" value="0">
                    <div class="form-body">
                        <div class="form-group form-md-line-input col-md-6">
                            <input type="text" class="form-control" id="title" name="title" placeholder="<?= _lang('title') ?>">
                            <label for="title"><?= _lang('title') ?></label>
                            <span class="help-block"></span>
                        </div>
                        <div class="form-group form-md-line-input col-md-6">
                            <textarea rows="5" class="form-control" name="description" id="description"></textarea>
                            <label for="description"><?= _lang('description') ?></label>
                            <span class="help-block"></span>
                        </div>
                        <div class="form-group form-md-line-input col-md-6">
                            <select class="form-control" id="categories_id" name="categories_id">
                                <?php if ($categories) { ?>
                                    <?php foreach ($categories as $key => $value) { ?>
                                        <option  value="<?= $value->id ?>"><?= $value->title_ar . ' - ' . $value->title_en ?></option>
                                    <?php } ?>
                                <?php } ?>
                            </select>
                            <label for="categories_id"><?= _lang('categories') ?></label>
                        </div>
                        <div class="form-group form-md-line-input col-md-6">
                            <select class="form-control" id="countries_id" name="countries_id">
                                <?php if ($countries) { ?>
                                    <?php foreach ($countries as $key => $value) { ?>
                                        <option  value="<?= $value->id ?>"><?= $value->title_en ?></option>
                                    <?php } ?>
                                <?php } ?>
                            </select>
                            <label for="countries_id"><?= _lang('countries_id') ?></label>
                        </div>
                        <div class="form-group form-md-line-input col-md-6">
                            <select class="form-control" id="brands_id" name="brands_id">
                                <?php if ($brands) { ?>
                                    <?php foreach ($brands as $key => $value) { ?>
                                        <option  value="<?= $value->id ?>"><?= $value->title_en ?></option>
                                    <?php } ?>
                                <?php } ?>
                            </select>
                            <label for="brands_id"><?= _lang('brands') ?></label>
                        </div>
                        <div class="form-group form-md-line-input col-md-6">
                            <select class="form-control edited" id="active" name="active">
                                <option  value="1"><?= _lang('active') ?></option>
                                <option  value="0"><?= _lang('not_active') ?></option>
                            </select>
                            <label class="control-label" for="active"><?= _lang('status') ?></label>
                        </div>
                        <div class="form-group form-md-line-input col-md-6">
                            <select class="form-control edited" id="bill_status" name="bill_status">
                                <option  value="1"><?= _lang('found') ?></option>
                                <option  value="0"><?= _lang('not_found') ?></option>
                            </select>
                            <label class="control-label" for="bill_status"><?= _lang('bill_status') ?></label>
                        </div>
                        <div class="form-group form-md-line-input col-md-6">
                            <select class="form-control edited" id="calls_or_messages" name="calls_or_messages">
                                <option  value="1"><?= _lang('allow_calls_and_messages') ?></option>
                                <option  value="2"><?= _lang('allow_calls') ?></option>
                                <option  value="3"><?= _lang('allow_messages') ?></option>
                                <option  value="4"><?= _lang('allow_calls_and_messages_at_certain_times') ?></option>
                            </select>
                            <label class="control-label" for="calls_or_messages"><?= _lang('calls_or_messages') ?></label>
                        </div>

                        <div class="form-group form-md-line-input col-md-6">
                            <input type="number" class="form-control" id="price" name="price" placeholder="<?= _lang('price') ?>">
                            <label for="price"><?= _lang('price') ?></label>
                            <span class="help-block"></span>
                        </div>
                        <div class="form-group form-md-line-input col-md-6">
                            <input type="number" class="form-control" id="sale_price" name="sale_price" placeholder="<?= _lang('sale_price') ?>">
                            <label for="sale_price"><?= _lang('sale_price') ?></label>
                            <span class="help-block"></span>
                        </div>

                        <div class="form-group form-md-line-input col-md-6">
                            <input type="number" class="form-control" id="phone" name="phone" placeholder="<?= _lang('phone') ?>">
                            <label for="phone"><?= _lang('phone') ?></label>
                            <span class="help-block"></span>
                        </div>
                        <div class="form-group form-md-line-input col-md-6">
                            <input type="number" class="form-control" id="this_order" name="this_order" placeholder="<?= _lang('this_order') ?>">
                            <label for="this_order"><?= _lang('this_order') ?></label>
                            <span class="help-block"></span>
                        </div>




                    </div>


                </form>

            </div>

            <div class="modal-footer">
                <span class="margin-right-10 loading hide"><i class="fa fa-spin fa-spinner"></i></span>
                <button type="button" class="btn btn-info submit-form"
                        >حفظ</button>
                <button type="button" class="btn btn-white"
                        data-dismiss="modal"><?= _lang("close") ?></button>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="addEditProductsImages" role="dialog">
    <div class="modal-dialog modal-lg">

        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title" id="addEditProductsImagesLabel"></h4>
            </div>

            <div class="modal-body">


                <form role="form" class="form-horizontal" id="addEditProductsImagesForm"  enctype="multipart/form-data">
                    <div class="form-group">

                        <label class="col-xs-12 col-sm-2 col-md-2 col-lg-2 control-label text-capitalize"><?= _lang('images'); ?></label>
                        <div class="col-xs-12 col-sm-8 col-md-8 col-lg-8">
                            <input type="file" class="form-control" id="product_images" name="product_images[]"  multiple>
                            <div class="help-block"></div>
                        </div>
                    </div>



                </form>
                <div id="products-images-box">

                </div>
                <div class="clearfix"></div>
                <ul class="list-group" id="files-not-uploaded">

                </ul>
            </div>

            <div class="modal-footer">
                <span class="margin-right-10 loading hide"><i class="fa fa-spin fa-spinner"></i></span>
                <button type="button" class="btn btn-info submit-form"
                        ><?= _lang('upload') ?></button>
                <button type="button" disabled class="btn btn-info delete-product-images"
                        ><?= _lang('delete') ?></button>
                <button type="button" class="btn btn-white"
                        data-dismiss="modal"><?= _lang("close") ?></button>
            </div>
        </div>
    </div>
</div>
<div class="modal fade" id="addEditProductsFeatures" role="dialog">
    <div class="modal-dialog">

        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title" id="addEditProductsFeaturesLabel"></h4>
            </div>

            <div class="modal-body">


                <form role="form" class="form-horizontal" id="addEditProductsFeaturesForm"  enctype="multipart/form-data">
                    <input type="hidden" name="products_features_id" id="products_features_id" value=""/>
                    <div class="form-body">
                        <div class="form-group form-md-line-input col-md-12">
                            <input type="text" class="form-control" id="title_enn" name="title_enn">
                            <label for="title_enn"><?= _lang('title') ?></label>
                            <span class="help-block"></span>
                        </div>
                    </div>



                </form>

            </div>

            <div class="modal-footer">
                <span class="margin-right-10 loading hide"><i class="fa fa-spin fa-spinner"></i></span>
                <button type="button" class="btn btn-info submit-form"
                        ><?= _lang('save') ?></button>
                <button type="button" class="btn btn-white"
                        data-dismiss="modal"><?= _lang("close") ?></button>
            </div>
        </div>
    </div>
</div>





<div class="panel panel-default">
    <div class="panel-heading">
        <a class="panel-title data-box"  data-type="products" data-id="0"><?= _lang('products'); ?></a>
    </div>
    <div class="panel-body">
        <!--Table Wrapper Start-->

        <style>
            .table-box.active{display:block!important;}
            .table-box.disabled{display:none!important;}
        </style>
        <div class="table-box active"  id="products_table">
            <?php if (check_permission('products', 'add')) { ?>
                <a class="btn btn-sm btn-info pull-left" style="margin-bottom: 40px;" href="" onclick="Products.add_products();
                        return false;"><?= _lang('add_new'); ?> </a>
               <?php } ?>
            <table class="table table-striped table-bordered table-hover table-checkable order-column dataTable no-footer">
                <thead>
                    <tr>
                        <th><?= _lang('product_title'); ?></th>
                        <th><?= _lang('main_category'); ?></th>
                        <th><?= _lang('price'); ?></th>
                        <th><?= _lang('created_by'); ?></th>
                        <th><?= _lang('options'); ?></th>
                    </tr>
                </thead>
                <tbody>

                </tbody>
            </table>


        </div>

        <div class="table-box disabled" id="products_features_table">
            <a class="btn btn-sm btn-info pull-left" style="margin-bottom: 40px;" href="" onclick="Products.add_products_features();
                    return false;"><?= _lang('add_new'); ?> </a>
            <table class="table table-striped table-bordered table-hover table-checkable order-column dataTable no-footer">
                <thead>
                    <tr>
                        <th><?= _lang('title'); ?></th>
                        <th><?= _lang('options'); ?></th>
                    </tr>
                </thead>
                <tbody>

                </tbody>
            </table>
        </div>

        <!--Table Wrapper Finish-->
    </div>
</div>

<script>
    var new_lang = {
        'add_product': lang.add_product,
        'edit_product': lang.edit_product,
        'add_products_images': lang.add_products_images,
        'edit_products_images': lang.edit_products_images,
        'add_products_features': lang.add_products_features,
        'edit_products_features': lang.edit_products_features,
        messages: {
            title_ar: {
                required: lang.required,
            },
            title_en: {
                required: lang.required,
            },
            quantity: {
                required: lang.required
            },
            this_order: {
                required: lang.required
            },
            price: {
                required: lang.required,
            },
            desc_ar: {
                required: lang.required,
            },
            desc_en: {
                required: lang.required,
            }
        },
        products_extra_services_messages: {
            product_extra_services_id: {
                required: lang.required,
            },
            price: {
                required: lang.required,
            },
        },
    };
</script>
<?php
global $_require;
$_require['js'] = array('products.js');
?>
