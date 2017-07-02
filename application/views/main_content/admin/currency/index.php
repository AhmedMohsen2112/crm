
<div class="modal fade" id="addEditCurrency" role="dialog">
    <div class="modal-dialog">

        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title" id="addEditCurrencyLabel"></h4>
            </div>

            <div class="modal-body">


                <form role="form"  id="addEditCurrencyForm"  enctype="multipart/form-data">
                    <input type="hidden" name="id" id="id" value="0">
                    <div class="form-body">
                        <div class="form-group form-md-line-input">
                            <input type="text" class="form-control" id="title_ar" name="title_ar" placeholder="<?= _lang('title_ar') ?>">
                            <label for="title_ar"><?= _lang('title_ar') ?></label>
                            <span class="help-block"></span>
                        </div>
                        <div class="form-group form-md-line-input">
                            <input type="text" class="form-control" id="title_en" name="title_en" placeholder="<?= _lang('title_en') ?>">
                            <label for="title_en"><?= _lang('title_en') ?></label>
                            <span class="help-block"></span>
                        </div>
                       
                        <div class="form-group form-md-line-input">
                            <input type="text" class="form-control" id="sign" name="sign" placeholder="<?= _lang('sign') ?>">
                            <label for="sign"><?= _lang('sign') ?></label>
                            <span class="help-block"></span>
                        </div>
                        <div class="form-group form-md-line-input col-md-6">
                            <input type="number" class="form-control" id="this_order" name="this_order" placeholder="<?= _lang('this_order') ?>">
                            <label for="phone"><?= _lang('this_order') ?></label>
                            <span class="help-block"></span>
                        </div>
                        <div class="form-group form-md-line-input col-md-6">
                            <select class="form-control edited" id="active" name="active">
                                <option  value="1"><?= _lang('active') ?></option>
                                <option  value="0"><?= _lang('not_active') ?></option>
                            </select>

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
        <h3 class="panel-title"><?= _lang('currency'); ?></h3>
    </div>
    <div class="panel-body">
        <!--Table Wrapper Start-->
        <a class="btn btn-sm btn-info pull-left" style="margin-bottom: 40px;" href="" onclick="Currency.add(); return false;"><?= _lang('add_new'); ?> </a>

        <table class="table table-striped table-bordered table-hover table-checkable order-column dataTable no-footer">
            <thead>
                <tr>
                    <th><?= _lang('title_ar'); ?></th>
                    <th><?= _lang('title_en'); ?></th>
                    <th><?= _lang('sign'); ?></th>
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
            'add_currency': lang.add_currency,
            'edit_currency': lang.edit_currency,
            messages: {
                title_ar: {
                    required: lang.required

                },
                title_en: {
                    required: lang.required

                },
                sign: {
                    required: lang.required,
                },
                amount_le: {
                    required: lang.required,
                },
            }
        };
</script>
<?php
    global $_require;
    $_require['js'] = array('currency.js');
?>