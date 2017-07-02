<form role="form"  id="editAppSettingsForm"  enctype="multipart/form-data">
    <input type="hidden" name="id" id="id" value="<?= $app_settings->id ?>">
    <div class="panel panel-default">
        <div class="panel-heading">
            <h3 class="panel-title"><?= _lang('contact_info'); ?></h3>
        </div>
        <div class="panel-body">

            <div class="form-body">

                <div class="form-group form-md-line-input col-md-6">
                    <input type="number" class="form-control" id="phone" name="phone" value="<?php if (isset($app_settings->phone)) echo $app_settings->phone; ?>">
                    <label for="phone"><?= _lang('phone') ?></label>
                    <span class="help-block"></span>
                </div>
                <div class="form-group form-md-line-input col-md-6">
                    <input type="text" class="form-control" id="email" name="email" value="<?php if (isset($app_settings->email)) echo $app_settings->email; ?>">
                    <label for="site_email"><?= _lang('email') ?></label>
                    <span class="help-block"></span>
                </div>
                <div class="clearfix"></div>
            </div>




            <!--Table Wrapper Finish-->
        </div>
    </div>
    <div class="panel panel-default">
        <div class="panel-heading">
            <h3 class="panel-title"><?= _lang('usage_conditions'); ?></h3>
        </div>
        <div class="panel-body">

            <div class="form-body">

                <div class="form-group form-md-line-input col-md-6">
                    <textarea rows="5" class="form-control" name="usage_conditions_ar" id="usage_conditions_ar"><?php if (isset($app_settings->usage_conditions_ar)) echo $app_settings->usage_conditions_ar; ?></textarea>
                    <label for="usage_conditions_ar"><?= _lang('usage_conditions_ar') ?></label>
                    <span class="help-block"></span>
                </div>
                <div class="form-group form-md-line-input col-md-6">
                    <textarea rows="5" class="form-control" name="usage_conditions_en" id="usage_conditions_en"><?php if (isset($app_settings->usage_conditions_en)) echo $app_settings->usage_conditions_en; ?></textarea>
                    <label for="usage_conditions_en"><?= _lang('usage_conditions_en') ?></label>
                    <span class="help-block"></span>
                </div>
                <div class="clearfix"></div>
            </div>




            <!--Table Wrapper Finish-->
        </div>
    </div>
    <div class="panel panel-default">
        <div class="panel-heading">
            <h3 class="panel-title"><?= _lang('about_app'); ?></h3>
        </div>
        <div class="panel-body">
            <div class="form-body">

                <div class="form-group form-md-line-input col-md-6">
                    <textarea rows="5" class="form-control" name="about_app_ar" id="about_app_ar"><?php if (isset($app_settings->about_app_ar)) echo $app_settings->about_app_ar; ?></textarea>
                    <label for="about_app_ar"><?= _lang('about_app_ar') ?></label>
                    <span class="help-block"></span>
                </div>
                <div class="form-group form-md-line-input col-md-6">
                    <textarea rows="5" class="form-control" name="about_app_en" id="about_app_en"><?php if (isset($app_settings->about_app_en)) echo $app_settings->about_app_en; ?></textarea>
                    <label for="about_app_en"><?= _lang('about_app_en') ?></label>
                    <span class="help-block"></span>
                </div>
                <div class="clearfix"></div>
            </div>




            <!--Table Wrapper Finish-->
        </div>
       
    </div>
    <div class="panel panel-default">
        <div class="panel-heading">
            <h3 class="panel-title"><?= _lang('others'); ?></h3>
        </div>
        <div class="panel-body">

            <div class="form-body">

                <div class="form-group form-md-line-input col-md-6">
                    <input type="number" class="form-control" id="no_of_free_ads" name="no_of_free_ads" value="<?php if (isset($app_settings->no_of_free_ads)) echo $app_settings->no_of_free_ads; ?>">
                    <label for="phone"><?= _lang('no_of_free_ads') ?></label>
                    <span class="help-block"></span>
                </div>
                <div class="clearfix"></div>
            </div>
            <!--Table Wrapper Finish-->
        </div>
        <div class="panel-footer text-center">
            <button type="button" class="btn btn-info submit-form"
                    ><?= _lang('save') ?></button>
        </div>
    </div>
    
</form>
<script>
    var new_lang = {
        messages: {
            phone: {
                required: lang.required

            },
            email: {
                required: lang.required

            },
            usage_conditions_ar: {
                required: lang.required

            },
            usage_conditions_en: {
                required: lang.required

            },
            about_app_ar: {
                required: lang.required

            },
            about_app_en: {
                required: lang.required

            },
            no_of_free_ads: {
                required: lang.required

            },
        }
    };
</script>


<?php
global $_require;
$_require['js'] = array('app_settings.js');
?>