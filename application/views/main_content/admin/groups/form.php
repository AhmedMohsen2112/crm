<!--Page main group start-->
<section id="min-wrapper">
    <div id="main-content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-12">
                    <!--Top header start-->
                    <h3 class="ls-top-header"><a href="<?= \base_url('admin/groups/show') ?>"><?= $lang['groups']; ?></a></h3>
                    <!--Top header end -->

                    <!--Top breadcrumb start -->
                    <ol class="breadcrumb">
                        <li><a href="<?= \base_url('admin/') ?>"><i class="fa fa-home"></i></a></li>
                        <li class="active"><a href="<?= \base_url('admin/groups/show') ?>"><?= $lang['groups']; ?></a></li>
                    </ol>
                    <!--Top breadcrumb start -->
                </div>
            </div>

            <?php
                $action = '/add';
                if ($view_type != 'add') {
                    if (isset($_id)) {
                        $action = '/edit/' . $_id;
                    }
                }
            ?>

            <div class="row">
                <div class="col-md-12">
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <h3 class="panel-title"><?= $lang['add_new_groups']; ?></h3>
                        </div>
                        <div class="panel-body">


                            <?php if (!empty($error)) { ?>
                                    <div class="alert alert-danger">
                                        <?= $error; ?>
                                    </div>
                                <?php } ?>
                            <!--Table Wrapper Start-->
                            <form action="<?= \base_url('admin/groups') . $action; ?>" method="post" class="form-horizontal ls_form">

                                <div class="form-group">
                                    <label class="col-xs-12 col-sm-4 col-md-2 col-lg-2 control-label text-capitalize"><?= _lang('group_close'); ?></label>
                                    <div class="col-xs-12 col-sm-8 col-md-6 col-lg-6">
                                        <input id="group_close" name="group_close" type="checkbox" class="js-switch" <?php if (isset($edit->group_close) && $edit->group_close == '1') echo 'checked'; ?> value="0">
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label class="col-xs-12 col-sm-4 col-md-2 col-lg-2 control-label text-capitalize"><?= $lang['group_name']; ?></label>
                                    <div class="col-xs-12 col-sm-8 col-md-6 col-lg-6">
                                        <input type="text" class="form-control" id="group_name" name="group_name" value="<?php if (isset($edit->group_name)) echo $edit->group_name; ?>">
                                    </div>
                                </div>



                                <!-- Nav tabs -->
                                <ul class="nav nav-tabs nav-justified icon-tab">
                                    <li class="active text-capitalize"><a class="text-left pull-left" href="#group_general_settings" data-toggle="tab"><i class="fa fa-home"></i> <span>الصلاحيات</span></a></li>
                                    <!--<li class="text-capitalize"><a href="#group_general_settings1" data-toggle="tab"><i class="fa fa-home"></i> <span><?= $lang['site_settings_edit']; ?></span></a></li>-->
                                </ul>

                                <div class="tab-content tab-border container-fluid">
                                    <div class="tab-pane fade active in">
                                        <h3>الصفحات الرئيسية</h3>
                                        <br>
                                        <?php if ($m_pages) { ?>

                                                <?php foreach ($m_pages as $value) { ?>
                                                    <?php if (in_array($value->name, $Main_pages)) { ?>
                                                        <div class="form-group row form-box">
                                                            <label class="col-xs-12 col-sm-12 col-md-2 col-lg-2 text-capitalize text-left pull-left"><span class="text-bold"><?= _lang($value->name); ?></span></label>
                                                            <div class="col-xs-12 col-sm-12 col-md-10 col-lg-10">

                                                                <div class="col-xs-12 col-sm-3 col-md-3 col-lg-3">
                                                                    <label class="col-xs-12 col-sm-12 col-md-12 col-lg-12 text-capitalize"><?= _lang('open'); ?> &nbsp;
                                                                        <input id="users_controll_show" name="group_options[<?= $value->name; ?>][open]" type="checkbox" class="js-switch" <?php
                                                                        if (isset($edit)) {
                                                                            if ($edit->group_options !== null) {
                                                                                if (isset($edit->group_options->{$value->name})) {
                                                                                    if (isset($edit->group_options->{$value->name}->open)) {
                                                                                        if ($edit->group_options->{$value->name}->open == 1) {
                                                                                            echo'checked';
                                                                                        }
                                                                                    }
                                                                                }
                                                                            }
                                                                        }
                                                                        ?> value="1">
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </div>


                                                    <?php } ?>
                                                <?php } ?>
                                            <?php } ?>
                                    </div>
                                    <div class="clearfix"></div>

                                    <!-- Site Settings -->

                                    <div class="tab-pane fade active in" id="group_general_settings">
                                        <h3>الصفحات الفرعية</h3>
                                        <br>
                                        <?php if ($pages_data) { ?>
                                                <?php foreach ($pages_data as $page) { ?>

                                                    <?php if (in_array($page->name, $Sub_pages)) { ?>
                                                        <div class="form-group row form-box">
                                                            <label class="col-xs-12 col-sm-12 col-md-2 col-lg-2 text-capitalize text-left pull-left"><span class="text-bold"><?= _lang($page->name); ?></span></label>
                                                            <div class="col-xs-12 col-sm-12 col-md-10 col-lg-10">

                                                                <div class="col-xs-12 col-sm-3 col-md-3 col-lg-3">
                                                                    <label class="col-xs-12 col-sm-12 col-md-12 col-lg-12 text-capitalize"><?= _lang('open'); ?> &nbsp;
                                                                        <input id="users_controll_show" name="group_options[<?= $page->name; ?>][open]" type="checkbox" class="js-switch" <?php
                                                                        if (isset($edit)) {
                                                                            if ($edit->group_options !== null) {
                                                                                if (isset($edit->group_options->{$page->name})) {
                                                                                    if (isset($edit->group_options->{$page->name}->open)) {
                                                                                        if ($edit->group_options->{$page->name}->open == 1) {
                                                                                            echo'checked';
                                                                                        }
                                                                                    }
                                                                                }
                                                                            }
                                                                        }
                                                                        ?> value="1">
                                                                    </label>
                                                                </div>
                                                                <div class="col-xs-12 col-sm-3 col-md-3 col-lg-3">
                                                                    <label class="col-xs-12 col-sm-12 col-md-12 col-lg-12 text-capitalize"><?= _lang('add'); ?> &nbsp;
                                                                        <input id="users_controll_show" name="group_options[<?= $page->name; ?>][add]" type="checkbox" class="js-switch"  <?php
                                                                        if (isset($edit)) {
                                                                            if ($edit->group_options !== null) {
                                                                                if (isset($edit->group_options->{$page->name})) {
                                                                                    if (isset($edit->group_options->{$page->name}->add)) {
                                                                                        if ($edit->group_options->{$page->name}->add == 1) {
                                                                                            echo 'checked';
                                                                                        }
                                                                                    }
                                                                                }
                                                                            }
                                                                        }
                                                                        ?> value="1">
                                                                    </label>
                                                                </div>
                                                                <div class="col-xs-12 col-sm-3 col-md-3 col-lg-3">
                                                                    <label class="col-xs-12 col-sm-12 col-md-12 col-lg-12 text-capitalize"><?= _lang('edit'); ?> &nbsp;
                                                                        <input id="users_controll_show" name="group_options[<?= $page->name; ?>][edit]" type="checkbox" class="js-switch" <?php
                                                                        if (isset($edit)) {
                                                                            if ($edit->group_options !== null) {
                                                                                if (isset($edit->group_options->{$page->name})) {
                                                                                    if (isset($edit->group_options->{$page->name}->edit)) {
                                                                                        if ($edit->group_options->{$page->name}->edit == 1) {
                                                                                            echo 'checked';
                                                                                        }
                                                                                    }
                                                                                }
                                                                            }
                                                                        }
                                                                        ?> value="1">
                                                                    </label>
                                                                </div>
                                                                <div class="col-xs-12 col-sm-3 col-md-3 col-lg-3">
                                                                    <label class="col-xs-12 col-sm-12 col-md-12 col-lg-12 text-capitalize"><?= _lang('delete'); ?> &nbsp;
                                                                        <input id="users_controll_show" name="group_options[<?= $page->name; ?>][delete]" type="checkbox" class="js-switch" <?php
                                                                        if (isset($edit)) {
                                                                            if ($edit->group_options !== null) {
                                                                                if (isset($edit->group_options->{$page->name})) {
                                                                                    if (isset($edit->group_options->{$page->name}->delete)) {
                                                                                        if ($edit->group_options->{$page->name}->delete == 1) {
                                                                                            echo 'checked';
                                                                                        }
                                                                                    }
                                                                                }
                                                                            }
                                                                        }
                                                                        ?> value="1">
                                                                    </label>
                                                                </div>

                                                            </div>
                                                        </div>
                                                    <?php } ?>

                                                <?php } ?>
                                            <?php } ?>

                                    </div>
                                    <!-- <div class="tab-pane fade" id="group_general_settings1">
                                                    group_general_settings1
                                            </div>-->
                                </div>
                                <br/>



                                <br>
                                <div class="form-group text-center">
                                    <button class="btn btn-sm btn-success" type="submit"><?= $lang['save_data']; ?></button>
                                </div>

                                <!--Table Wrapper Finish-->
                            </form>
                        </div>
                    </div>
                </div>
                <!-- Main Content Element  End-->
            </div>
        </div>

</section>