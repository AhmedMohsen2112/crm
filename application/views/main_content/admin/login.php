<!DOCTYPE html>
<!--[if IE 8]> <html lang="en" class="ie8 no-js"> <![endif]-->
<!--[if IE 9]> <html lang="en" class="ie9 no-js"> <![endif]-->
<!--[if !IE]><!-->
<html lang="en">
    <!--<![endif]-->
    <!-- BEGIN HEAD -->

    <head>
        <meta charset="utf-8" />
        <title>Markat|Login</title>
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <meta content="Preview page of Metronic Admin Theme #1 for " name="description" />
        <meta content="" name="author" />
        <!-- BEGIN GLOBAL MANDATORY STYLES -->
        <link href="http://fonts.googleapis.com/css?family=Open+Sans:400,300,600,700&subset=all" rel="stylesheet" type="text/css" />
        <link href="<?= base_url('assets/admin/plugins') ?>/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css" />
        <link href="<?= base_url('assets/admin/plugins') ?>/simple-line-icons/simple-line-icons.min.css" rel="stylesheet" type="text/css" />
        <link href="<?= base_url('assets/admin/plugins') ?>/bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
        <link href="<?= base_url('assets/admin/plugins') ?>/bootstrap-switch/css/bootstrap-switch.min.css" rel="stylesheet" type="text/css" />
        <!-- END GLOBAL MANDATORY STYLES -->
        <!-- BEGIN PAGE LEVEL PLUGINS -->
        <link href="<?= base_url('assets/admin/plugins') ?>/select2/css/select2.min.css" rel="stylesheet" type="text/css" />
        <link href="<?= base_url('assets/admin/plugins') ?>/select2/css/select2-bootstrap.min.css" rel="stylesheet" type="text/css" />
        <!-- END PAGE LEVEL PLUGINS -->
        <!-- BEGIN THEME GLOBAL STYLES -->
        <link href="<?= base_url('assets/admin/css') ?>/components.min.css" rel="stylesheet" id="style_components" type="text/css" />
        <link href="<?= base_url('assets/admin/css') ?>/plugins.min.css" rel="stylesheet" type="text/css" />
        <!-- END THEME GLOBAL STYLES -->
        <!-- BEGIN PAGE LEVEL STYLES -->
        <link href="<?= base_url('assets/admin/css') ?>/login-4.min.css" rel="stylesheet" type="text/css" />
        <!-- END PAGE LEVEL STYLES -->
        <!-- BEGIN THEME LAYOUT STYLES -->
        <!-- END THEME LAYOUT STYLES -->
        <link rel="shortcut icon" href="<?php echo base_url(); ?>/assets/admin/images/favicon.png" />
        <script>
                var config = {
                    base_url: '<?php echo base_url(); ?>',
                    admin_url: '<?php echo base_url('admin'); ?>',
                };
                var lang = {
                    add_new_room_class: '<?= _lang('add_new_room_class'); ?>',
                    alert_message: '<?= _lang('alert_message'); ?>',
                    confirm_message_title: '<?= _lang('are you sure !?'); ?>',
                    deleting_cancelled: '<?= _lang('deleting_cancelled'); ?>',
                    yes: '<?= _lang('yes'); ?>',
                    no: '<?= _lang('no'); ?>',
                    error: '<?= _lang('error'); ?>',
                    try_again: '<?= _lang('try_again'); ?>',
                    required: '<?= _lang('this_field_is_required'); ?>',
                };

                // alert(config.lang);
        </script>
    </head>
    <!-- END HEAD -->

    <body class=" login">
        <!-- BEGIN LOGO -->
        <div class="logo">
            <!--<a href="index.html">-->
                <img src="<?= base_url('no-image.jpg') ?>" alt="" style="width:64px;height:64px;"/> 
            <!--</a>-->
        </div>
        <!-- END LOGO -->
        <!-- BEGIN LOGIN -->
        <div class="content">
            <!-- BEGIN LOGIN FORM -->
            <div id="alert-message" class="alert-danger">

            </div>
            <form class="login-form"  id="login-form"  method="post">
                <h3 class="form-title">Login</h3>
                <div class="alert alert-danger display-hide">
                    <button class="close" data-close="alert"></button>
                    <span> Enter any username and password. </span>
                </div>

                <div class="form-group">
                    <!--ie8, ie9 does not support html5 placeholder, so we just show field title for that-->
                    <label class="control-label visible-ie8 visible-ie9">Username</label>
                    <div class="input-icon">
                        <i class="fa fa-user"></i>
                        <input class="form-control placeholder-no-fix" type="text" autocomplete="off" placeholder="Username" name="username" id="username" />
                    </div>
                    <div class="help-block"></div>

                </div>
                <div class="form-group">
                    <label class="control-label visible-ie8 visible-ie9">Password</label>
                    <div class="input-icon">
                        <i class="fa fa-lock"></i>
                        <input class="form-control placeholder-no-fix" type="password" autocomplete="off" placeholder="Password" name="password" id="password" />
                    </div>
                    <div class="help-block"></div>
                </div>
                <div class="form-actions">
<!--                    <label class="rememberme mt-checkbox mt-checkbox-outline">
                        <input type="checkbox" name="remember" value="1" /> Remember me
                        <span></span>
                    </label>-->
                    <button type="submit" class="btn green pull-right submit-form"> Login </button>
                </div>
            </form>
            <!-- END LOGIN FORM -->

        </div>
        <!-- END LOGIN -->
        <!-- BEGIN COPYRIGHT -->
        <div class="copyright">
                    All Rights Reserved © Markat Co. 2017 | <a target="_blank" href="http://www.atiafco.com/">Powered By Atiafco </a>
        </div>
        <!-- END COPYRIGHT -->
        <!--[if lt IE 9]>
<script src="<?= base_url('assets/admin/plugins') ?>/respond.min.js"></script>
<script src="<?= base_url('assets/admin/plugins') ?>/excanvas.min.js"></script>
<script src="<?= base_url('assets/admin/plugins') ?>/ie8.fix.min.js"></script>
<![endif]-->
        <!-- BEGIN CORE PLUGINS -->
        <script src="<?= base_url('assets/admin/plugins') ?>/jquery.min.js" type="text/javascript"></script>
        <script src="<?= base_url('assets/admin/plugins') ?>/bootstrap/js/bootstrap.min.js" type="text/javascript"></script>
        <script src="<?= base_url('assets/admin/plugins') ?>/js.cookie.min.js" type="text/javascript"></script>
        <script src="<?= base_url('assets/admin/plugins') ?>/jquery-slimscroll/jquery.slimscroll.min.js" type="text/javascript"></script>
        <script src="<?= base_url('assets/admin/plugins') ?>/jquery.blockui.min.js" type="text/javascript"></script>
        <script src="<?= base_url('assets/admin/plugins') ?>/bootstrap-switch/js/bootstrap-switch.min.js" type="text/javascript"></script>
        <!-- END CORE PLUGINS -->
        <!-- BEGIN PAGE LEVEL PLUGINS -->
        <script src="<?= base_url('assets/admin/plugins') ?>/jquery-validation/js/jquery.validate.min.js" type="text/javascript"></script>
        <script src="<?= base_url('assets/admin/plugins') ?>/jquery-validation/js/additional-methods.min.js" type="text/javascript"></script>
        <script src="<?= base_url('assets/admin/plugins') ?>/select2/js/select2.full.min.js" type="text/javascript"></script>
        <script src="<?= base_url('assets/admin/plugins') ?>/backstretch/jquery.backstretch.min.js" type="text/javascript"></script>
        <!-- END PAGE LEVEL PLUGINS -->
        <!-- BEGIN THEME GLOBAL SCRIPTS -->
        <script src="<?= base_url('assets/admin/scripts') ?>/app.min.js" type="text/javascript"></script>
        <!-- END THEME GLOBAL SCRIPTS -->
        <!-- BEGIN PAGE LEVEL SCRIPTS -->
       
        <script src="<?= base_url('assets/admin/scripts') ?>/app.js" type="text/javascript"></script>
         <script src="<?= base_url('assets/admin/scripts') ?>/login-4.min.js" type="text/javascript"></script>
        <script src="<?= base_url('assets/admin/js') ?>/login.js" type="text/javascript"></script>
        <!-- END PAGE LEVEL SCRIPTS -->
        <!-- BEGIN THEME LAYOUT SCRIPTS -->
        <!-- END THEME LAYOUT SCRIPTS -->
    </body>

</html>