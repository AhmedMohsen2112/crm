
<div class="modal fade" id="addEditCountries" role="dialog">
    <div class="modal-dialog modal-lg">

        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title" id="addEditCountriesLabel"></h4>
            </div>

            <div class="modal-body">


                <form role="form"  id="addEditCountriesForm"  enctype="multipart/form-data">
                    <input type="hidden" name="id" id="id" value="0">
                    <div class="form-body">

                        <div class="form-group form-md-line-input col-md-6">
                            <input type="text" class="form-control" id="title_ar" name="title_ar" placeholder="<?= _lang('title_ar') ?>">
                            <label for="title_ar"><?= _lang('title_ar') ?></label>
                            <span class="help-block"></span>
                        </div>

                        <div class="form-group form-md-line-input col-md-6">
                            <input type="text" class="form-control" id="title_en" name="title_en" placeholder="<?= _lang('title_en') ?>">
                            <label for="title_en"><?= _lang('title_en') ?></label>
                            <span class="help-block"></span>
                        </div>
                        <div class="form-group form-md-line-input col-md-6">
                            <input type="number" class="form-control" id="this_order" name="this_order" placeholder="<?= _lang('this_order') ?>">
                            <label for="phone"><?= _lang('this_order') ?></label>
                            <span class="help-block"></span>
                        </div>
                        <div class="form-group form-md-line-input col-md-6">
                            <label class="control-label" for="active"><?= _lang('status') ?></label>
                            <select class="form-control" id="active" name="active">
                                <option  value="1"><?= _lang('active') ?></option>
                                <option  value="0"><?= _lang('not_active') ?></option>
                            </select>

                        </div>
                        <div class="form-group form-md-line-input col-md-6">
                            <select class="form-control" id="currency_id" name="currency_id">
                                <?php if ($currency) { ?>
                                    <?php foreach ($currency as $key => $value) { ?>
                                      
                                        <option value="<?= $value->id ?>"><?= $value->title_ar . '-' . $value->title_en ?></option>
                                    <?php } ?>
                                <?php } ?>
                            </select>
                            <label for="visa_currency_id"><?= _lang('currency') ?></label>
                        </div>

                        <div class="form-group col-md-6">
                            <div>
                                <label class="control-label"><?= _lang('image') ?></label>
                            </div>
                            <div class="input-file">
                                <input type="file" name="country_image" id="country_image">
                                <span class="help-block"></span>
                            </div>

                        </div>
                        
                        <div class="form-group col-md-6">
                            <div class="image_uploaded">

                                <img src="<?php echo base_url('no-image.jpg'); ?>" width="150" height="80" />
                            </div>
                        </div>
                        <div class="clearfix"></div>
                        


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
<div class="panel panel-default">
    <div class="panel-heading">
        <a class="panel-title"><?= _lang('countries'); ?></a>
    </div>
    <div class="panel-body">
        <!--Table Wrapper Start-->
        <a class="btn btn-sm btn-info pull-left" style="margin-bottom: 40px;" href="" onclick="Countries.add();
                return false;"><?= _lang('add_new'); ?> </a>
        <style>
            .table-box.active{display:block!important;}
            .table-box.disabled{display:none!important;}
        </style>
        <div class="table-box"  id="countries_table">
            <table class="table table-striped table-bordered table-hover table-checkable order-column dataTable no-footer">
                <thead>
                    <tr>
                        <th><?= _lang('title_ar'); ?></th>
                        <th><?= _lang('title_en'); ?></th>
                        <th><?= _lang('image'); ?></th>
                        <!--<th><?= _lang('cities'); ?></th>-->
                        <th><?= _lang('status'); ?></th>
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
        'add_country': lang.add_country,
        'edit_country': lang.edit_country,
        messages: {
            title_ar: {
                required: lang.required,
            },
            title_en: {
                required: lang.required,
            },
            this_order: {
                required: lang.required,
            },
        }
    };
</script>
<?php
global $_require;
$_require['js'] = array('countries.js');
?>
