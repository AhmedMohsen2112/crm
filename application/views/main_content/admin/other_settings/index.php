
<div class="panel panel-default" id="editOtherSettings">
    <div class="panel-heading">
        <h3 class="panel-title"><?= _lang('other_settings'); ?></h3>
    </div>
    <div class="panel-body">
        <form role="form"  id="editOtherSettingsForm"  enctype="multipart/form-data">
            <input type="hidden" name="id" id="id" value="<?= $other_settings->id ?>">
           
                
                <div class="form-group form-md-line-input col-md-4">
                    <select class="form-control" id="language" name="language">
                        <option value="ar"><?=_lang('arabic')?></option>
                        <option value="en"><?=_lang('english')?></option>
                    </select>
                    <label for="language"><?= _lang('language') ?></label>
                </div>
                <div class="clearfix"></div>
                



          


        </form>

        <!--Table Wrapper Finish-->
    </div>
    <div class="panel-footer text-center">
        <button type="button" class="btn btn-info submit-form"
                ><?= _lang('save') ?></button>
    </div>
</div>
<script>
        var new_lang = {
            messages: {
                language: {
                    required: lang.required

                },
            }
        };
</script>


<?php
    global $_require;
    $_require['js'] = array('other_settings.js');
?>