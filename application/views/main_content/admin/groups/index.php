<!-- slugs -->
<?php $title_slug = 'title_' . $lang_code ?>
<!-- end slugs -->
<div class="modal fade" id="addEditGroups" role="dialog">
    <div class="modal-dialog modal-lg">

        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title" id="addEditGroupsLabel"></h4>
            </div>

            <div class="modal-body">


                <form role="form"  id="addEditGroupsForm"  enctype="multipart/form-data">
                    <input type="hidden" name="id" id="id" value="0">
                    <div class="form-body">
                        <div class="row">
                            <div class="form-group form-md-line-input col-md-6">
                                <input type="text" class="form-control" id="name" name="name" placeholder="<?= _lang('name') ?>">
                                <span class="help-block"></span>
                            </div>
                            <div class="form-group form-md-line-input col-md-6">
                                <select class="form-control edited" id="active" name="active">
                                    <option  value="1"><?= _lang('active') ?></option>
                                    <option  value="0"><?= _lang('not_active') ?></option>

                                </select>

                            </div>
                        </div>
                        <div class="row">
                            <?php if (count($modules_actions) > 0) { ?>
                                    <?php foreach ($modules_actions as $module) { ?>
                                        <div class="form-group form-md-checkboxes col-md-4">
                                            <label><?= $module->name ?></label>
                                            <div class="md-checkbox-inline">
                                                <?php if (count($module->actions) > 0) { ?>
                                                    <?php foreach ($module->actions as $action) { ?>
                                                        <div class="md-checkbox has-success">
                                                            <?php $s_open_id = $module->name . '_' . $action ?>
                                                            <input type="checkbox" id="<?= $s_open_id ?>" name="group_options[<?= $module->name; ?>][<?= $action ?>]" value="1" class="md-check">
                                                            <label for="<?= $s_open_id ?>">
                                                                <span class="inc"></span>
                                                                <span class="check"></span>
                                                                <span class="box"></span> <?= $action ?> </label>
                                                        </div>
                                                    <?php } ?>
                                                <?php } ?>
                                            </div>
                                        </div>
                                    <?php } ?>
                                <?php } ?>
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
<div class="panel panel-default">
    <div class="panel-heading">
        <h3 class="panel-title"><?= _lang('groups'); ?></h3>
    </div>
    <div class="panel-body">
        <!--Table Wrapper Start-->
        <a class="btn btn-sm btn-info pull-left" style="margin-bottom: 40px;" href="" onclick="Groups.add(); return false;"><?= _lang('add_new'); ?> </a>

        <table class="table table-striped table-bordered table-hover table-checkable order-column dataTable no-footer">
            <thead>
                <tr>
                    <th><?= _lang('group_name'); ?></th>
                    <th><?= _lang('active'); ?></th>
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
            'add_group': lang.add_group,
            'edit_group': lang.edit_group,
            messages: {
                name: {
                    required: lang.required

                },
            }
        };
</script>
<?php
    global $_require;
    $_require['js'] = array('groups.js');
?>