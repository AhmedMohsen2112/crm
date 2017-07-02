<!DOCTYPE html>
<html>
    <head>
        <title>Admin Panel(Client)</title>
        <link href="<?= base_url('assets/admin/plugins') ?>/bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
    </head>

    <body style="text-align: center;">
        <div class="row">
            <div class="col-md-6">
                <div class="panel panel-default">
                    <form action="<?= base_url('api/clients/sign_up') ?>" method="post" enctype="multipart/form-data">
                        <div class="panel-heading">
                            <h3 class="panel-title"><?= _lang('sign_up'); ?></h3>
                        </div>
                        <div class="panel-body">
                            <h4 style="color:red;">URL:<?= base_url('api/clients/sign_up') ?></h4>
                            <br>

                            <div class="row">
                                <div class="form-group">
                                    <label class="col-xs-12 col-sm-4 col-md-4 control-label text-capitalize"> <?= _lang('lang'); ?></label>
                                    <div class="col-xs-12 col-sm-8 col-md-8">
                                        <input type="text" class="form-control" id="lang" name="lang">
                                        <div class="help-block"></div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-xs-12 col-sm-4 col-md-4 control-label text-capitalize"> <?= _lang('firstname'); ?></label>
                                    <div class="col-xs-12 col-sm-8 col-md-8">
                                        <input type="text" class="form-control" id="firstname" name="firstname">
                                        <div class="help-block"></div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-xs-12 col-sm-4 col-md-4 control-label text-capitalize"> <?= _lang('lastname'); ?></label>
                                    <div class="col-xs-12 col-sm-8 col-md-8">
                                        <input type="text" class="form-control" id="lastname" name="lastname">
                                        <div class="help-block"></div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-xs-12 col-sm-4 col-md-4 control-label text-capitalize"> <?= _lang('username'); ?></label>
                                    <div class="col-xs-12 col-sm-8 col-md-8">
                                        <input type="text" class="form-control" id="username" name="username">
                                        <div class="help-block"></div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-xs-12 col-sm-4 col-md-4 control-label text-capitalize"> <?= _lang('email'); ?></label>
                                    <div class="col-xs-12 col-sm-8 col-md-8">
                                        <input type="text" class="form-control" id="email" name="email">
                                        <div class="help-block"></div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-xs-12 col-sm-4 col-md-4 control-label text-capitalize"> <?= _lang('phone'); ?></label>
                                    <div class="col-xs-12 col-sm-8 col-md-8">
                                        <input type="number" class="form-control" id="phone" name="phone">
                                        <div class="help-block"></div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-xs-12 col-sm-4 col-md-4 control-label text-capitalize"> <?= _lang('password'); ?></label>
                                    <div class="col-xs-12 col-sm-8 col-md-8">
                                        <input type="password" class="form-control" id="password" name="password">
                                        <div class="help-block"></div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-xs-12 col-sm-4 col-md-4 control-label text-capitalize"> <?= _lang('confirm_password'); ?></label>
                                    <div class="col-xs-12 col-sm-8 col-md-8">
                                        <input type="password" class="form-control" id="confirm_password" name="confirm_password">
                                        <div class="help-block"></div>
                                    </div>
                                </div>
                            </div>
                            <!--Table Wrapper Finish-->
                        </div>
                        <div class="panel-footer text-center">
                            <input type="submit" class="btn btn-info submit-form" value="<?= _lang('sign_up') ?>">
                        </div>
                    </form>
                </div>

            </div>
            <div class="col-md-6">
                <div class="panel panel-default">
                    <form action="<?= base_url('api/clients/sign_in') ?>" method="post" enctype="multipart/form-data">
                        <div class="panel-heading">
                            <h3 class="panel-title"><?= _lang('sign_in'); ?></h3>
                        </div>
                        <div class="panel-body">
                            <h4 style="color:red;">URL:<?= base_url('api/clients/sign_in') ?></h4>
                            <br>

                            <div class="row">
                                <div class="form-group">
                                    <label class="col-xs-12 col-sm-4 col-md-4 control-label text-capitalize"> <?= _lang('lang'); ?></label>
                                    <div class="col-xs-12 col-sm-8 col-md-8">
                                        <input type="text" class="form-control" id="lang" name="lang">
                                        <div class="help-block"></div>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label class="col-xs-12 col-sm-4 col-md-4 control-label text-capitalize"> <?= _lang('email'); ?></label>
                                    <div class="col-xs-12 col-sm-8 col-md-8">
                                        <input type="text" class="form-control" id="_email" name="_email">
                                        <div class="help-block"></div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-xs-12 col-sm-4 col-md-4 control-label text-capitalize"> <?= _lang('password'); ?></label>
                                    <div class="col-xs-12 col-sm-8 col-md-8">
                                        <input type="password" class="form-control" id="_password" name="_password">
                                        <div class="help-block"></div>
                                    </div>
                                </div>

                            </div>
                            <!--Table Wrapper Finish-->
                        </div>
                        <div class="panel-footer text-center">
                            <input type="submit" class="btn btn-info submit-form" value="<?= _lang('sign_in') ?>">
                        </div>
                    </form>
                </div>

            </div>

        </div>

        <div class="row">
            <div class="col-md-6">
                <div class="panel panel-default">
                    <form action="<?= base_url('api/clients/edit_account') ?>" method="post" enctype="multipart/form-data">
                        <div class="panel-heading">
                            <h3 class="panel-title"><?= _lang('edit_account'); ?></h3>
                        </div>
                        <div class="panel-body">
                            <h4 style="color:red;">URL:<?= base_url('api/clients/edit_account') ?></h4>
                            <br>

                            <div class="row">
                                <div class="form-group">
                                    <label class="col-xs-12 col-sm-4 col-md-4 control-label text-capitalize"> <?= _lang('lang'); ?></label>
                                    <div class="col-xs-12 col-sm-8 col-md-8">
                                        <input type="text" class="form-control" id="lang" name="lang">
                                        <div class="help-block"></div>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label class="col-xs-12 col-sm-4 col-md-4 control-label text-capitalize"> <?= _lang('client_id'); ?></label>
                                    <div class="col-xs-12 col-sm-8 col-md-8">
                                        <input type="text" class="form-control" id="clients_id" name="clients_id">
                                        <div class="help-block"></div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-xs-12 col-sm-4 col-md-4 control-label text-capitalize"> <?= _lang('firstname'); ?></label>
                                    <div class="col-xs-12 col-sm-8 col-md-8">
                                        <input type="text" class="form-control" id="firstname" name="firstname">
                                        <div class="help-block"></div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-xs-12 col-sm-4 col-md-4 control-label text-capitalize"> <?= _lang('lastname'); ?></label>
                                    <div class="col-xs-12 col-sm-8 col-md-8">
                                        <input type="text" class="form-control" id="lastname" name="lastname">
                                        <div class="help-block"></div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-xs-12 col-sm-4 col-md-4 control-label text-capitalize"> <?= _lang('username'); ?></label>
                                    <div class="col-xs-12 col-sm-8 col-md-8">
                                        <input type="text" class="form-control" id="username" name="username">
                                        <div class="help-block"></div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-xs-12 col-sm-4 col-md-4 control-label text-capitalize"> <?= _lang('email'); ?></label>
                                    <div class="col-xs-12 col-sm-8 col-md-8">
                                        <input type="text" class="form-control" id="email" name="email">
                                        <div class="help-block"></div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-xs-12 col-sm-4 col-md-4 control-label text-capitalize"> <?= _lang('phone'); ?></label>
                                    <div class="col-xs-12 col-sm-8 col-md-8">
                                        <input type="number" class="form-control" id="phone" name="phone">
                                        <div class="help-block"></div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-xs-12 col-sm-4 col-md-4 control-label text-capitalize"> <?= _lang('password'); ?></label>
                                    <div class="col-xs-12 col-sm-8 col-md-8">
                                        <input type="password" class="form-control" id="password" name="password">
                                        <div class="help-block"></div>
                                    </div>
                                </div>

                            </div>
                            <!--Table Wrapper Finish-->
                        </div>
                        <div class="panel-footer text-center">
                            <input type="submit" class="btn btn-info submit-form" value="<?= _lang('edit') ?>">
                        </div>
                    </form>
                </div>

            </div>
            <div class="col-md-6">
                <div class="panel panel-default">
                    <form action="<?= base_url('api/data') ?>" method="post" enctype="multipart/form-data">
                        <div class="panel-heading">
                            <h3 class="panel-title"><?= _lang('data'); ?></h3>
                        </div>
                        <div class="panel-body">
                            <h4 style="color:red;">URL:<?= base_url('api/data') ?></h4>
                            <br>

                            <div class="row">
                                <div class="form-group">
                                    <label class="col-xs-12 col-sm-4 col-md-4 control-label text-capitalize"> <?= _lang('lang'); ?></label>
                                    <div class="col-xs-12 col-sm-8 col-md-8">
                                        <input type="text" class="form-control" id="lang" name="lang">
                                        <div class="help-block"></div>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label class="col-xs-12 col-sm-4 col-md-4 control-label text-capitalize"> <?= _lang('country_id'); ?></label>
                                    <div class="col-xs-12 col-sm-8 col-md-8">
                                        <input type="text" class="form-control" id="countries_id" name="countries_id">
                                        <div class="help-block"></div>
                                    </div>
                                </div>


                            </div>
                            <!--Table Wrapper Finish-->
                        </div>
                        <div class="panel-footer text-center">
                            <input type="submit" class="btn btn-info submit-form" value="<?= _lang('get') ?>">
                        </div>
                    </form>
                </div>

            </div>

        </div>

        <div class="row">
            <div class="col-md-6">
                <div class="panel panel-default">
                    <form action="<?= base_url('api/brands/all') ?>" method="post" enctype="multipart/form-data">
                        <div class="panel-heading">
                            <h3 class="panel-title"><?= _lang('show all brands'); ?></h3>
                        </div>
                        <div class="panel-body">
                            <h4 style="color:red;">URL:<?= base_url('api/brands/all') ?></h4>
                            <br>

                            <div class="row">
                                <div class="form-group">
                                    <label class="col-xs-12 col-sm-4 col-md-4 control-label text-capitalize"> <?= _lang('lang'); ?></label>
                                    <div class="col-xs-12 col-sm-8 col-md-8">
                                        <input type="text" class="form-control" id="lang" name="lang">
                                        <div class="help-block"></div>
                                    </div>
                                </div>


                            </div>
                            <!--Table Wrapper Finish-->
                        </div>
                        <div class="panel-footer text-center">
                            <input type="submit" class="btn btn-info submit-form" value="<?= _lang('get') ?>">
                        </div>
                    </form>
                </div>

            </div>
            <div class="col-md-6">
                <div class="panel panel-default">
                    <form action="<?= base_url('api/property/category') ?>" method="post" enctype="multipart/form-data">
                        <div class="panel-heading">
                            <h3 class="panel-title"><?= _lang('category_details'); ?></h3>
                        </div>
                        <div class="panel-body">
                            <h4 style="color:red;">URL:<?= base_url('api/property/category') ?></h4>
                            <br>

                            <div class="row">
                                <div class="form-group">
                                    <label class="col-xs-12 col-sm-4 col-md-4 control-label text-capitalize"> <?= _lang('lang'); ?></label>
                                    <div class="col-xs-12 col-sm-8 col-md-8">
                                        <input type="text" class="form-control" id="lang" name="lang">
                                        <div class="help-block"></div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-xs-12 col-sm-4 col-md-4 control-label text-capitalize"> <?= _lang('category_id'); ?></label>
                                    <div class="col-xs-12 col-sm-8 col-md-8">
                                        <input type="text" class="form-control" id="categories_id" name="categories_id">
                                        <div class="help-block"></div>
                                    </div>
                                </div>


                            </div>
                            <!--Table Wrapper Finish-->
                        </div>
                        <div class="panel-footer text-center">
                            <input type="submit" class="btn btn-info submit-form" value="<?= _lang('get') ?>">
                        </div>
                    </form>
                </div>

            </div>
        </div>

        <div class="row">
            <div class="col-md-6">
                <div class="panel panel-default">
                    <form action="<?= base_url('api/property/product') ?>" method="post" enctype="multipart/form-data">
                        <div class="panel-heading">
                            <h3 class="panel-title"><?= _lang('product_details'); ?></h3>
                        </div>
                        <div class="panel-body">
                            <h4 style="color:red;">URL:<?= base_url('api/property/product') ?></h4>
                            <br>

                            <div class="row">
                                <div class="form-group">
                                    <label class="col-xs-12 col-sm-4 col-md-4 control-label text-capitalize"> <?= _lang('lang'); ?></label>
                                    <div class="col-xs-12 col-sm-8 col-md-8">
                                        <input type="text" class="form-control" id="lang" name="lang">
                                        <div class="help-block"></div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-xs-12 col-sm-4 col-md-4 control-label text-capitalize"> <?= _lang('product_id'); ?></label>
                                    <div class="col-xs-12 col-sm-8 col-md-8">
                                        <input type="text" class="form-control" id="products_id" name="products_id">
                                        <div class="help-block"></div>
                                    </div>
                                </div>


                            </div>
                            <!--Table Wrapper Finish-->
                        </div>
                        <div class="panel-footer text-center">
                            <input type="submit" class="btn btn-info submit-form" value="<?= _lang('get') ?>">
                        </div>
                    </form>
                </div>

            </div>
            <div class="col-md-6">
                <div class="panel panel-default">
                    <form action="<?= base_url('api/ads/add') ?>" method="post" enctype="multipart/form-data">
                        <div class="panel-heading">
                            <h3 class="panel-title"><?= _lang('add_new_ad'); ?></h3>
                        </div>
                        <div class="panel-body">
                            <h4 style="color:red;">URL:<?= base_url('api/ads/add') ?></h4>
                            <br>

                            <div class="row">
                                <div class="form-group col-md-12">
                                    <label class="col-xs-12 col-sm-4 col-md-4 control-label text-capitalize"> <?= _lang('lang'); ?></label>
                                    <div class="col-xs-12 col-sm-8 col-md-8">
                                        <input type="text" class="form-control" id="lang" name="lang">
                                        <div class="help-block"></div>
                                    </div>
                                </div>
                                <div class="form-group col-md-12">
                                    <label class="col-xs-12 col-sm-4 col-md-4 control-label text-capitalize"> <?= _lang('client_id'); ?></label>
                                    <div class="col-xs-12 col-sm-8 col-md-8">
                                        <input type="number" class="form-control" id="clients_id" name="clients_id">
                                        <div class="help-block"></div>
                                    </div>
                                </div>
                                <div class="form-group col-md-12">
                                    <label class="col-xs-12 col-sm-4 col-md-4 control-label text-capitalize"> <?= _lang('product_status'); ?></label>
                                    <div class="col-xs-12 col-sm-8 col-md-8">
                                        <input type="text" class="form-control" id="product_status" name="product_status">
                                        <div class="help-block"></div>
                                    </div>
                                </div>
                                <div class="form-group col-md-12">
                                    <label class="col-xs-12 col-sm-4 col-md-4 control-label text-capitalize"> <?= _lang('country_id'); ?></label>
                                    <div class="col-xs-12 col-sm-8 col-md-8">
                                        <input type="number" class="form-control" id="countries_id" name="countries_id">
                                        <div class="help-block"></div>
                                    </div>
                                </div>
                                <div class="form-group col-md-12">
                                    <label class="col-xs-12 col-sm-4 col-md-4 control-label text-capitalize"> <?= _lang('title'); ?></label>
                                    <div class="col-xs-12 col-sm-8 col-md-8">
                                        <input type="text" class="form-control" id="title" name="title">
                                        <div class="help-block"></div>
                                    </div>
                                </div>

                                <div class="form-group col-md-12">
                                    <label class="col-xs-12 col-sm-4 col-md-4 control-label text-capitalize"> <?= _lang('price'); ?></label>
                                    <div class="col-xs-12 col-sm-8 col-md-8">
                                        <input type="number" class="form-control" id="price" name="price">
                                        <div class="help-block"></div>
                                    </div>
                                </div>
                                <div class="form-group col-md-12">
                                    <label class="col-xs-12 col-sm-4 col-md-4 control-label text-capitalize"> <?= _lang('sale_price'); ?></label>
                                    <div class="col-xs-12 col-sm-8 col-md-8">
                                        <input type="number" class="form-control" id="sale_price" name="sale_price">
                                        <div class="help-block"></div>
                                    </div>
                                </div>
                                <div class="form-group col-md-12">
                                    <label class="col-xs-12 col-sm-4 col-md-4 control-label text-capitalize"> <?= _lang('brand_id'); ?></label>
                                    <div class="col-xs-12 col-sm-8 col-md-8">
                                        <input type="number" class="form-control" id="brands_id" name="brands_id">
                                        <div class="help-block"></div>
                                    </div>
                                </div>
                                <div class="form-group col-md-12">
                                    <label class="col-xs-12 col-sm-4 col-md-4 control-label text-capitalize"> <?= _lang('category_id'); ?></label>
                                    <div class="col-xs-12 col-sm-8 col-md-8">
                                        <input type="number" class="form-control" id="categories_id" name="categories_id">
                                        <div class="help-block"></div>
                                    </div>
                                </div>
                                <div class="form-group col-md-12">
                                    <label class="col-xs-12 col-sm-4 col-md-4 col-lg-4 control-label text-capitalize"><?= _lang('description'); ?></label>
                                    <div class="col-xs-12 col-sm-8 col-md-8 col-lg-8">
                                        <textarea rows="3" class="form-control" name="description" id="description"></textarea>
                                        <div class="help-block"></div>
                                    </div>
                                </div>


                            </div>
                            <div class="row">
                                <div class="form-group col-md-6">
                                    <label class="col-xs-12 col-sm-4 col-md-4 col-lg-4 control-label text-capitalize"><?= _lang('image_1'); ?></label>
                                    <div class="col-xs-12 col-sm-8 col-md-8 col-lg-8">
                                        <textarea rows="3" class="form-control" name="encoded_strings[]" id="image_1"></textarea>
                                        <div class="help-block"></div>
                                    </div>
                                </div>
                                <div class="form-group col-md-6">
                                    <label class="col-xs-12 col-sm-4 col-md-4 col-lg-4 control-label text-capitalize"><?= _lang('image_2'); ?></label>
                                    <div class="col-xs-12 col-sm-8 col-md-8 col-lg-8">
                                        <textarea rows="3" class="form-control" name="encoded_strings[]" id="image_2"></textarea>
                                        <div class="help-block"></div>
                                    </div>
                                </div>
                                <div class="form-group col-md-6">
                                    <label class="col-xs-12 col-sm-4 col-md-4 col-lg-4 control-label text-capitalize"><?= _lang('image_3'); ?></label>
                                    <div class="col-xs-12 col-sm-8 col-md-8 col-lg-8">
                                        <textarea rows="3" class="form-control" name="encoded_strings[]" id="image_3"></textarea>
                                        <div class="help-block"></div>
                                    </div>
                                </div>
                                <div class="form-group col-md-6">
                                    <label class="col-xs-12 col-sm-4 col-md-4 col-lg-4 control-label text-capitalize"><?= _lang('image_4'); ?></label>
                                    <div class="col-xs-12 col-sm-8 col-md-8 col-lg-8">
                                        <textarea rows="3" class="form-control" name="encoded_strings[]" id="image_4"></textarea>
                                        <div class="help-block"></div>
                                    </div>
                                </div>
                                <div class="form-group col-md-6">
                                    <label class="col-xs-12 col-sm-4 col-md-4 col-lg-4 control-label text-capitalize"><?= _lang('image_5'); ?></label>
                                    <div class="col-xs-12 col-sm-8 col-md-8 col-lg-8">
                                        <textarea rows="3" class="form-control" name="encoded_strings[]" id="image_5"></textarea>
                                        <div class="help-block"></div>
                                    </div>
                                </div>
                                <div class="form-group col-md-6">
                                    <label class="col-xs-12 col-sm-4 col-md-4 col-lg-4 control-label text-capitalize"><?= _lang('image_6'); ?></label>
                                    <div class="col-xs-12 col-sm-8 col-md-8 col-lg-8">
                                        <textarea rows="3" class="form-control" name="encoded_strings[]" id="image_6"></textarea>
                                        <div class="help-block"></div>
                                    </div>
                                </div>
                                <div class="form-group col-md-12">
                                    <label class="col-xs-12 col-sm-4 col-md-4 control-label text-capitalize"> <?= _lang('phone'); ?></label>
                                    <div class="col-xs-12 col-sm-8 col-md-8">
                                        <input type="number" class="form-control" id="phone" name="phone">
                                        <div class="help-block"></div>
                                    </div>
                                </div>
                                <div class="form-group col-md-12">
                                    <label class="col-xs-12 col-sm-4 col-md-4 control-label text-capitalize"> <?= _lang('bill'); ?></label>
                                    <label class="radio-inline"><input type="radio" name="bill_status" id="found" value="1"><?= _lang('found'); ?></label>
                                    <label class="radio-inline"><input type="radio" name="bill_status" id="not_found" value="0"><?= _lang('not_found'); ?></label>
                                </div>
                                <div class="form-group col-md-12">
                                    <div class="radio">
                                        <label><input type="radio" name="calls_or_messages" id="found" value="1"><?= _lang('allow_calls_and_messages') ?></label>
                                    </div>
                                    <div class="radio">
                                        <label><input type="radio" name="calls_or_messages" id="found" value="2"><?= _lang('allow_calls') ?></label>
                                    </div>
                                    <div class="radio">
                                        <label><input type="radio" name="calls_or_messages" id="found" value="3"><?= _lang('allow_messages') ?></label>
                                    </div>
                                    <div class="radio">
                                        <label><input type="radio" name="calls_or_messages" id="found" value="4"><?= _lang('allow_calls_and_messages_at_certain_times') ?></label>
                                    </div>

                                </div>
                                <div class="form-group col-md-12">
                                    <label class="checkbox-inline"><input type="checkbox" name="approval_of_the_terms" id="approval_of_the_terms"><?= _lang('i_agree_to_the_terms') ?></label>
                                </div>
                            </div>
                            <!--Table Wrapper Finish-->
                        </div>
                        <div class="panel-footer text-center">
                            <input type="submit" class="btn btn-info submit-form" value="<?= _lang('get') ?>">
                        </div>
                    </form>
                </div>

            </div>
        </div>
        <div class="row">
            <div class="col-md-6">
                <div class="panel panel-default">
                    <form action="<?= base_url('api/packages/register') ?>" method="post" enctype="multipart/form-data">
                        <div class="panel-heading">
                            <h3 class="panel-title"><?= _lang('packages_register'); ?></h3>
                        </div>
                        <div class="panel-body">
                            <h4 style="color:red;">URL:<?= base_url('api/packages/register') ?></h4>
                            <br>

                            <div class="row">
                                <div class="form-group">
                                    <label class="col-xs-12 col-sm-4 col-md-4 control-label text-capitalize"> <?= _lang('lang'); ?></label>
                                    <div class="col-xs-12 col-sm-8 col-md-8">
                                        <input type="text" class="form-control" id="lang" name="lang">
                                        <div class="help-block"></div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-xs-12 col-sm-4 col-md-4 control-label text-capitalize"> <?= _lang('client_id'); ?></label>
                                    <div class="col-xs-12 col-sm-8 col-md-8">
                                        <input type="number" class="form-control" id="clients_id" name="clients_id">
                                        <div class="help-block"></div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-xs-12 col-sm-4 col-md-4 control-label text-capitalize"> <?= _lang('package_id'); ?></label>
                                    <div class="col-xs-12 col-sm-8 col-md-8">
                                        <input type="number" class="form-control" id="packages_id" name="packages_id">
                                        <div class="help-block"></div>
                                    </div>
                                </div>


                            </div>
                            <!--Table Wrapper Finish-->
                        </div>
                        <div class="panel-footer text-center">
                            <input type="submit" class="btn btn-info submit-form" value="<?= _lang('get') ?>">
                        </div>
                    </form>
                </div>

            </div>
            <div class="col-md-6">
                <div class="panel panel-default">
                    <form action="<?= base_url('api/clients/edit_username') ?>" method="post" enctype="multipart/form-data">
                        <div class="panel-heading">
                            <h3 class="panel-title"><?= _lang('edit_username'); ?></h3>
                        </div>
                        <div class="panel-body">
                            <h4 style="color:red;">URL:<?= base_url('api/clients/edit_username') ?></h4>
                            <br>

                            <div class="row">
                                <div class="form-group">
                                    <label class="col-xs-12 col-sm-4 col-md-4 control-label text-capitalize"> <?= _lang('lang'); ?></label>
                                    <div class="col-xs-12 col-sm-8 col-md-8">
                                        <input type="text" class="form-control" id="lang" name="lang">
                                        <div class="help-block"></div>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label class="col-xs-12 col-sm-4 col-md-4 control-label text-capitalize"> <?= _lang('client_id'); ?></label>
                                    <div class="col-xs-12 col-sm-8 col-md-8">
                                        <input type="text" class="form-control" id="clients_id" name="clients_id">
                                        <div class="help-block"></div>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label class="col-xs-12 col-sm-4 col-md-4 control-label text-capitalize"> <?= _lang('username'); ?></label>
                                    <div class="col-xs-12 col-sm-8 col-md-8">
                                        <input type="text" class="form-control" id="username" name="username">
                                        <div class="help-block"></div>
                                    </div>
                                </div>


                            </div>
                            <!--Table Wrapper Finish-->
                        </div>
                        <div class="panel-footer text-center">
                            <input type="submit" class="btn btn-info submit-form" value="<?= _lang('edit') ?>">
                        </div>
                    </form>
                </div>

            </div>

        </div>

        <div class="row">
            <div class="col-md-6">
                <div class="panel panel-default">
                    <form action="<?= base_url('api/clients/edit_password') ?>" method="post" enctype="multipart/form-data">
                        <div class="panel-heading">
                            <h3 class="panel-title"><?= _lang('edit_password'); ?></h3>
                        </div>
                        <div class="panel-body">
                            <h4 style="color:red;">URL:<?= base_url('api/clients/edit_password') ?></h4>
                            <br>

                            <div class="row">
                                <div class="form-group">
                                    <label class="col-xs-12 col-sm-4 col-md-4 control-label text-capitalize"> <?= _lang('lang'); ?></label>
                                    <div class="col-xs-12 col-sm-8 col-md-8">
                                        <input type="text" class="form-control" id="lang" name="lang">
                                        <div class="help-block"></div>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label class="col-xs-12 col-sm-4 col-md-4 control-label text-capitalize"> <?= _lang('client_id'); ?></label>
                                    <div class="col-xs-12 col-sm-8 col-md-8">
                                        <input type="text" class="form-control" id="clients_id" name="clients_id">
                                        <div class="help-block"></div>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label class="col-xs-12 col-sm-4 col-md-4 control-label text-capitalize"> <?= _lang('old_password'); ?></label>
                                    <div class="col-xs-12 col-sm-8 col-md-8">
                                        <input type="password" class="form-control" id="old_password" name="old_password">
                                        <div class="help-block"></div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-xs-12 col-sm-4 col-md-4 control-label text-capitalize"> <?= _lang('new_password'); ?></label>
                                    <div class="col-xs-12 col-sm-8 col-md-8">
                                        <input type="password" class="form-control" id="new_password" name="new_password">
                                        <div class="help-block"></div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-xs-12 col-sm-4 col-md-4 control-label text-capitalize"> <?= _lang('confirm_new_password'); ?></label>
                                    <div class="col-xs-12 col-sm-8 col-md-8">
                                        <input type="password" class="form-control" id="confirm_new_password" name="confirm_new_password">
                                        <div class="help-block"></div>
                                    </div>
                                </div>


                            </div>
                            <!--Table Wrapper Finish-->
                        </div>
                        <div class="panel-footer text-center">
                            <input type="submit" class="btn btn-info submit-form" value="<?= _lang('edit') ?>">
                        </div>
                    </form>
                </div>

            </div>
            <div class="col-md-6">
                <div class="panel panel-default">
                    <form action="<?= base_url('api/clients/products') ?>" method="post" enctype="multipart/form-data">
                        <div class="panel-heading">
                            <h3 class="panel-title"><?= _lang('client_products'); ?></h3>
                        </div>
                        <div class="panel-body">
                            <h4 style="color:red;">URL:<?= base_url('api/clients/products') ?></h4>
                            <br>

                            <div class="row">
                                <div class="form-group">
                                    <label class="col-xs-12 col-sm-4 col-md-4 control-label text-capitalize"> <?= _lang('lang'); ?></label>
                                    <div class="col-xs-12 col-sm-8 col-md-8">
                                        <input type="text" class="form-control" id="lang" name="lang">
                                        <div class="help-block"></div>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label class="col-xs-12 col-sm-4 col-md-4 control-label text-capitalize"> <?= _lang('client_id'); ?></label>
                                    <div class="col-xs-12 col-sm-8 col-md-8">
                                        <input type="text" class="form-control" id="clients_id" name="clients_id">
                                        <div class="help-block"></div>
                                    </div>
                                </div>

                            </div>
                            <!--Table Wrapper Finish-->
                        </div>
                        <div class="panel-footer text-center">
                            <input type="submit" class="btn btn-info submit-form" value="<?= _lang('edit') ?>">
                        </div>
                    </form>
                </div>

            </div>
        </div>

    </body>
</html>