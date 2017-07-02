<!-- slugs -->
<?php $title_slug = 'title_' . $lang_code ?>
<!-- end slugs -->
<div class="modal fade" id="addEditUsers" role="dialog">
    <div class="modal-dialog">

        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title" id="addEditUsersLabel"></h4>
            </div>

            <div class="modal-body">


                <form role="form"  id="addEditUsersForm"  enctype="multipart/form-data">
                    <input type="hidden" name="id" id="id" value="0">
                    <div class="form-body">
                        <div class="form-group form-md-line-input">
                            <input type="text" class="form-control" id="username" name="username" placeholder="<?= _lang('username') ?>">
                            <label for="username"><?= _lang('username') ?></label>
                            <span class="help-block"></span>
                        </div>
                        <div class="form-group form-md-line-input">
                            <div class="input-group input-group-sm">
                                <div class="input-group-control">
                                    <input type="password" class="form-control input-sm" id="password" name="password" placeholder="<?= _lang('password') ?>">
                                    <label for="password"><?= _lang('password') ?></label>
                                </div>
                                <span class="input-group-btn btn-right">
                                    <button class="btn green-haze" type="button" id="show-password"><?= _lang('show') ?></button>
                                    <button class="btn green-haze" type="button" id="random-password"><?= _lang('rondom') ?></button>
                                </span>
                            </div>
                            <span class="help-block"></span>
                        </div>
                        <div class="form-group form-md-line-input">
                            <input type="text" class="form-control" id="email" name="email" placeholder="<?= _lang('email') ?>">
                            <label for="email"><?= _lang('email') ?></label>
                            <span class="help-block"></span>
                        </div>
                        <div class="form-group form-md-line-input">
                            <input type="text" class="form-control" id="address" name="address" placeholder="<?= _lang('address') ?>">
                            <label for="address"><?= _lang('address') ?></label>
                            <span class="help-block"></span>
                        </div>
                        <div class="form-group form-md-line-input">
                            <input type="text" class="form-control" id="phone" name="phone" placeholder="<?= _lang('phone') ?>">
                            <label for="phone"><?= _lang('phone') ?></label>
                            <span class="help-block"></span>
                        </div>

                        <div class="form-group form-md-line-input">
                            <select class="form-control edited" id="groups_id" name="groups_id">
                                <?php foreach ($groups as $key => $value) { ?>
                                        <option  value="<?= $value->id ?>"><?= $value->name ?></option>
                                    <?php } ?>
                            </select>
                            <label for="groups_id"><?= _lang('group') ?></label>
                        </div>
                        <div class="form-group form-md-line-input">
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
        <a class="btn btn-sm btn-info pull-left" style="margin-bottom: 40px;" href="" onclick="Users.add(); return false;"><?= _lang('add_new'); ?> </a>

        <table class="table table-striped table-bordered table-hover table-checkable order-column dataTable no-footer">
            <thead>
                <tr>
                    <th><?= _lang('username'); ?></th>
                    <th><?= _lang('group_name'); ?></th>
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
            'add_user': lang.add_user,
            'edit_user': lang.edit_user,
            messages: {
                username: {
                    required: lang.required

                },
                groups_id: {
                    required: lang.required

                },
                companies_id: {
                    required: lang.required,
                },
                address: {
                    required: lang.required,
                },
                phone: {
                    required: lang.required,
                },
                email: {
                    required: lang.required,
                    email: lang.email_validate,
                },
            }
        };
</script>
<?php
    global $_require;
    $_require['js'] = array('users.js');
?>