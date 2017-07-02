
<div class="modal fade" id="addEditPackages" role="dialog">
    <div class="modal-dialog modal-lg">

        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title" id="addEditPackagesLabel"></h4>
            </div>

            <div class="modal-body">


                <form role="form"  id="addEditPackagesForm"  enctype="multipart/form-data">
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
                            <textarea rows="5" class="form-control" name="desc_ar" id="desc_ar"></textarea>
                            <label for="desc_ar"><?= _lang('desc_ar') ?></label>
                            <span class="help-block"></span>
                        </div>
                        <div class="form-group form-md-line-input col-md-6">
                            <textarea rows="5" class="form-control" name="desc_en" id="desc_en"></textarea>
                            <label for="desc_en"><?= _lang('desc_en') ?></label>
                            <span class="help-block"></span>
                        </div>
                        <div class="form-group form-md-line-input col-md-6">
                            <input type="number" class="form-control" id="price" name="price" placeholder="<?= _lang('price') ?>">
                            <label for="price"><?= _lang('price') ?></label>
                            <span class="help-block"></span>
                        </div>
                        <div class="form-group form-md-line-input col-md-6">
                            <input type="number" class="form-control" id="period" name="period" placeholder="<?= _lang('period_in_days') ?>">
                            <label for="period"><?= _lang('period_in_days') ?></label>
                            <span class="help-block"></span>
                        </div>
                        <div class="form-group form-md-line-input col-md-6">
                            <input type="number" class="form-control" id="no_of_ads" name="no_of_ads" placeholder="<?= _lang('no_of_ads') ?>">
                            <label for="no_of_ads"><?= _lang('no_of_ads') ?></label>
                            <span class="help-block"></span>
                        </div>
                        <div class="form-group form-md-line-input col-md-6">
                            <input type="number" class="form-control" id="this_order" name="this_order" placeholder="<?= _lang('this_order') ?>">
                            <label for="this_order"><?= _lang('this_order') ?></label>
                            <span class="help-block"></span>
                        </div>
                         <div class="form-group form-md-line-input col-md-6">
                            <select class="form-control edited" id="active" name="active">
                                <option  value="1"><?= _lang('active') ?></option>
                                <option  value="0"><?= _lang('not_active') ?></option>
                            </select>
                            <label class="control-label" for="active"><?= _lang('status') ?></label>
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
        <h3 class="panel-title"><?= _lang('packages'); ?></h3>
    </div>
    <div class="panel-body">
        <!--Table Wrapper Start-->
        <?php if (check_permission('packages', 'add')) { ?>
            <a class="btn btn-sm btn-info pull-left" style="margin-bottom: 40px;" href="" onclick="Packages.add();
                            return false;"><?= _lang('add_new'); ?> </a>
        <?php } ?>
        <table class="table table-striped table-bordered table-hover table-checkable order-column dataTable no-footer">
            <thead>
                <tr>
                    <th><?= _lang('title'); ?></th>
                    <th><?= _lang('period'); ?></th>
                    <th><?= _lang('price'); ?></th>
                    <th><?= _lang('no_of_ads'); ?></th>
                    <th><?= _lang('status'); ?></th>
                    <th><?= _lang('options'); ?></th>
                </tr>
            </thead>
            <tbody>

            </tbody>
        </table>

        <!--Table Wrapper Finish-->
    </div>
</div>
<script>
    var new_lang = {
        'add_packages': lang.add_packages,
        'edit_packages': lang.edit_packages,
        messages: {
            title_ar: {
                required: lang.required

            },
            title_en: {
                required: lang.required

            }
        }
    };
</script>
<?php
global $_require;
$_require['js'] = array('packages.js');
?>