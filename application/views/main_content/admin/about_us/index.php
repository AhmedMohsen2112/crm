
<div class="panel panel-default" id="editAboutUs">
    <div class="panel-heading">
        <h3 class="panel-title"><?= _lang('about_us'); ?></h3>
    </div>
    <div class="panel-body">
        <form role="form"  id="editAboutUsForm"  enctype="multipart/form-data">
            <input type="hidden" name="id" id="id" value="<?= $about_us->id ?>">
            <div class="form-body">
                <div class="form-group form-md-line-input col-md-6">
                    <input type="text" class="form-control" id="title_ar" name="title_ar" value="<?= (!empty($about_us->title_ar)) ? $about_us->title_ar : '' ?>">
                    <label for="title_ar"><?= _lang('title_ar') ?></label>
                    <span class="help-block"></span>
                </div>
                <div class="form-group form-md-line-input col-md-6">
                    <input type="text" class="form-control" id="title_en" name="title_en" value="<?= (!empty($about_us->title_en)) ? $about_us->title_en : '' ?>">
                    <label for="title_en"><?= _lang('title_en') ?></label>
                    <span class="help-block"></span>
                </div>

                <div class="form-group form-md-line-input col-md-6">
                    <textarea class="form-control" id="desc_ar" name="desc_ar" rows="4"><?= (!empty($about_us->desc_ar)) ? $about_us->desc_ar : '' ?></textarea>
                    <label for="desc_ar"><?= _lang('desc_ar') ?></label>
                    <span class="help-block"></span>
                </div>
                <div class="form-group form-md-line-input col-md-6">
                    <textarea class="form-control" id="desc_en" name="desc_en" rows="4"><?= (!empty($about_us->desc_en)) ? $about_us->desc_en : '' ?>"</textarea>
                    <label for="desc_en"><?= _lang('desc_en') ?></label>
                    <span class="help-block"></span>
                </div>
                <div class="form-group col-md-6">
                    <div>
                        <label class="control-label"><?= _lang('image') ?></label>
                    </div>
                    <div class="input-file">
                        <input type="file" name="about_us_image" id="about_us_image">
                        <span class="help-block"></span>
                    </div>

                </div>
                <div class="form-group col-md-6">
                    <div class="image_uploaded">
                        <?php $image = (!empty($about_us->image)) ? base_url('uploads/about_us/' . $about_us->image) : base_url('no-image.jpg'); ?>
                        <img src="<?= $image ?>" width="150" height="80" class="about_us_image"/>
                    </div>
                </div>



            </div>


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
                title_ar: {
                    required: lang.required

                },
                title_en: {
                    required: lang.required

                },
                desc_ar: {
                    required: lang.required

                },
                desc_en: {
                    required: lang.required

                },
            }
        };
</script>
<?php
    global $_require;
    $_require['js'] = array('about_us.js');
?>
