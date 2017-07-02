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
                            <?php if ($m_pages) { ?>
                                    <div class="form-group form-md-checkboxes col-md-12">
                                        <label><?= _lang('main_pages') ?></label>
                                        <div class="md-checkbox-inline">
                                            <?php foreach ($m_pages as $page) { ?>
                                                <div class="md-checkbox has-success">
                                                    <?php $m_page_id = $page->name . '_' . 'open' ?>
                                                    <input type="checkbox" id="<?= $m_page_id ?>" name="group_options[<?= $page->name; ?>][open]" value="1" class="md-check">
                                                    <label for="<?= $m_page_id ?>">
                                                        <span class="inc"></span>
                                                        <span class="check"></span>
                                                        <span class="box"></span><?= $page->name ?></label>
                                                </div>
                                            <?php } ?>
                                        </div>
                                    </div>
                                <?php } ?>
                        </div>
                        <div class="row">
                            <?php if ($s_pages) { ?>
                                    <?php foreach ($s_pages as $page) { ?>
                                        <div class="form-group form-md-checkboxes col-md-4">
                                            <label><?= $page->name ?></label>
                                            <div class="md-checkbox-inline">
                                                <div class="md-checkbox has-success">
                                                    <?php $s_open_id = $page->name . '_' . 'open' ?>
                                                    <input type="checkbox" id="<?= $s_open_id ?>" name="group_options[<?= $page->name; ?>][open]" value="1" class="md-check">
                                                    <label for="<?= $s_open_id ?>">
                                                        <span class="inc"></span>
                                                        <span class="check"></span>
                                                        <span class="box"></span> <?= _lang('open') ?> </label>
                                                </div>
                                                <div class="md-checkbox has-error">
                                                    <?php $s_add_id = $page->name . '_' . 'add' ?>
                                                    <input type="checkbox" id="<?= $s_add_id ?>" name="group_options[<?= $page->name; ?>][add]" value="1" class="md-check">
                                                    <label for="<?= $s_add_id ?>">
                                                        <span></span>
                                                        <span class="check"></span>
                                                        <span class="box"></span> <?= _lang('add') ?> </label>
                                                </div>
                                                <div class="md-checkbox has-info">
                                                    <?php $s_edit_id = $page->name . '_' . 'edit' ?>
                                                    <input type="checkbox" id="<?= $s_edit_id ?>" name="group_options[<?= $page->name; ?>][edit]" value="1" class="md-check">
                                                    <label for="<?= $s_edit_id ?>">
                                                        <span class="inc"></span>
                                                        <span class="check"></span>
                                                        <span class="box"></span> <?= _lang('edit') ?> </label>
                                                </div>
                                                <div class="md-checkbox has-info">
                                                    <?php $s_delete_id = $page->name . '_' . 'delete' ?>
                                                    <input type="checkbox" id="<?= $s_delete_id ?>" name="group_options[<?= $page->name; ?>][delete]" value="1" class="md-check">
                                                    <label for="<?= $s_delete_id ?>">
                                                        <span class="inc"></span>
                                                        <span class="check"></span>
                                                        <span class="box"></span><?= _lang('delete') ?> </label>
                                                </div>
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
        <h3 class="panel-title"><?= _lang('users'); ?></h3>
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