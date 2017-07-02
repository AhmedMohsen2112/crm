
<div class="panel panel-default">
    <div class="panel-heading">
        <h3 class="panel-title"><?= _lang('home_slider'); ?></h3>
    </div>
    <div class="panel-body">
        <form role="form"  id="homeSliderForm"  enctype="multipart/form-data">
            <div class="form-group col-md-6">
                <div>
                    <label class="control-label"><?= _lang('image') ?></label>
                </div>
                <div class="input-file">
                    <input type="file" name="home_slider_image[]" id="home_slider_image" multiple>
                    <span class="help-block"></span>
                </div>

            </div>
        </form>
    </div>
    <div class="panel-footer text-center">
        <button type="button" class="btn btn-info submit-form"><?= _lang('upload') ?></button>
    </div>
</div>

<div class="progress" id="progress_div" style="display: none;">
    <div class="progress-bar" id="bar" role="progressbar" aria-valuenow="70"
         aria-valuemin="0" aria-valuemax="100" style="width:0%">
        <div id="percent"></div>
    </div>
</div>
<div id="uploading_files_content">

    <?php if (!empty($home_slider)) { ?>
        <?php foreach ($home_slider as $one) { ?>
            <?php $image_id = 'slider_images_' . $one->id; ?>
            <div style="position:relative;float:right;padding: 5px 5px;">
                <img style="height:80px;width:80px;" src="<?= base_url('uploads/home_slider/' . $one->image . '') ?>"/>
                <div style="position: absolute; top: 4px; left: 4px; width: 15px; height: 15px; text-align: center; line-height: 15px; border-radius: 50px;">
                    <div class="md-checkbox">
                        <input type="checkbox" id="<?= $image_id ?>"  name="slider_images[]"  value="<?= $one->id ?>" class="slide_image md-check">
                        <label for="<?= $image_id ?>">
                            <span></span>
                            <span class="check"></span>
                            <span class="box" style="background-color: #fff;border: 2px solid #888;"></span></label>
                    </div>
                </div>
            </div>

        <?php } ?>

    <?php } ?>
    <div class="clearfix"></div>
    <?php if (!empty($home_slider)) { ?>
        <button type="button" disabled class="btn btn-info delete-slider-images"
                ><?= _lang('delete') ?>
        </button>
    <?php } ?>
</div>

<script>

    var new_lang = {
    };
</script>
<?php
global $_require;
$_require['js'] = array('home_slider.js');
?>