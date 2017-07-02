<!--[if lt IE 9]>
<script src="<?= base_url('assets/admin/plugins') ?>/respond.min.js"></script>
<script src="<?= base_url('assets/admin/plugins') ?>/excanvas.min.js"></script>
<script src="<?= base_url('assets/admin/plugins') ?>/ie8.fix.min.js"></script>
<![endif]-->
<!-- BEGIN CORE PLUGINS -->
<script src="<?= base_url('assets/admin/plugins') ?>/jquery.min.js" type="text/javascript"></script>
<script src="<?= base_url('assets/admin/plugins') ?>/jquery-validation/js/jquery.validate.min.js" type="text/javascript"></script>
<script src="<?= base_url('assets/admin/plugins') ?>/jquery-validation/js/additional-methods.min.js" type="text/javascript"></script>
<script src="<?= base_url('assets/admin/plugins') ?>/jquery-confirm/js/jquery-confirm.js" type="text/javascript"></script>

<script src="<?= base_url('assets/admin/plugins') ?>/bootstrap/js/bootstrap.min.js" type="text/javascript"></script>
<script src="<?= base_url('assets/admin/plugins') ?>/bootbox/bootbox.min.js" type="text/javascript"></script>
<script src="<?= base_url('assets/admin/plugins') ?>/js.cookie.min.js" type="text/javascript"></script>
<script src="<?= base_url('assets/admin/plugins') ?>/jquery-slimscroll/jquery.slimscroll.min.js" type="text/javascript"></script>
<script src="<?= base_url('assets/admin/plugins') ?>/jquery.blockui.min.js" type="text/javascript"></script>
<script src="<?= base_url('assets/admin/plugins') ?>/bootstrap-switch/js/bootstrap-switch.min.js" type="text/javascript"></script>
<script src="<?= base_url('assets/admin/plugins') ?>/bootstrap-confirmation/bootstrap-confirmation.min.js" type="text/javascript"></script>
<script src="<?= base_url('assets/admin/plugins') ?>/bootstrap-fileinput/bootstrap-fileinput.js" type="text/javascript"></script>
<script src="<?= base_url('assets/admin/plugins') ?>/bootstrap-datepicker/js/bootstrap-datepicker.min.js" type="text/javascript"></script>
<script src="<?= base_url('assets/admin/scripts') ?>/datatable.js" type="text/javascript"></script>
<script src="<?= base_url('assets/admin/plugins') ?>/datatables/datatables.min.js" type="text/javascript"></script>
<script src="<?= base_url('assets/admin/plugins') ?>/datatables/plugins/bootstrap/datatables.bootstrap.js" type="text/javascript"></script>
<!-- END CORE PLUGINS -->

<!-- BEGIN PAGE LEVEL PLUGINS -->
<script src="<?= base_url('assets/admin/plugins') ?>/bootstrap-toastr/toastr.min.js" type="text/javascript"></script>
<script src="<?= base_url('assets/admin/plugins') ?>/moment.min.js" type="text/javascript"></script>
<script src="<?= base_url('assets/admin/plugins') ?>/bootstrap-daterangepicker/daterangepicker.min.js" type="text/javascript"></script>
<script src="<?= base_url('assets/admin/plugins') ?>/morris/morris.min.js" type="text/javascript"></script>
<script src="<?= base_url('assets/admin/plugins') ?>/morris/raphael-min.js" type="text/javascript"></script>

<script src="<?= base_url('assets/admin/plugins') ?>/fullcalendar/fullcalendar.min.js" type="text/javascript"></script>
<script src="<?= base_url('assets/admin/plugins') ?>/horizontal-timeline/horizontal-timeline.js" type="text/javascript"></script>
<script src="<?= base_url('assets/admin/plugins') ?>/flot/jquery.flot.min.js" type="text/javascript"></script>
<script src="<?= base_url('assets/admin/plugins') ?>/flot/jquery.flot.resize.min.js" type="text/javascript"></script>
<!-- END PAGE LEVEL PLUGINS -->

<!-- BEGIN PAGE LEVEL GLOBAL -->
<script src="<?= base_url('assets/admin/scripts') ?>/app.min.js" type="text/javascript"></script>
<!-- END PAGE LEVEL GLOBAL -->

<!-- BEGIN PAGE LEVEL SCRIPTS -->
<script src="<?= base_url('assets/admin/scripts') ?>/dashboard.min.js" type="text/javascript"></script>
<script src="<?= base_url('assets/admin/scripts') ?>/table-datatables-managed.min.js" type="text/javascript"></script>
<script src="<?= base_url('assets/admin/scripts') ?>/datatable.js" type="text/javascript"></script>
<script src="<?= base_url('assets/admin/scripts') ?>/ui-confirmations.min.js" type="text/javascript"></script>
<script src="<?= base_url('assets/admin/scripts') ?>/ui-toastr.min.js" type="text/javascript"></script>
<!-- END PAGE LEVEL SCRIPTS -->
<!-- BEGIN THEME LAYOUT SCRIPTS -->
<script src="<?= base_url('assets/admin/scripts') ?>/layout.min.js" type="text/javascript"></script>
<script src="<?= base_url('assets/admin/scripts') ?>/demo.min.js" type="text/javascript"></script>
<script src="<?= base_url('assets/admin/scripts') ?>/quick-sidebar.min.js" type="text/javascript"></script>
<script src="<?= base_url('assets/admin/scripts') ?>/quick-nav.min.js" type="text/javascript"></script>
<script src="<?= base_url('assets/admin/scripts') ?>/jquery.form.min.js" type="text/javascript"></script>
<script src="<?= base_url('assets/admin/js') ?>/my.js" type="text/javascript"></script>
<!-- END THEME LAYOUT SCRIPTS -->



<?php
    global $_require;
    if (!empty($_require)) {
        foreach ($_require as $key => $value) {
            $path = 'assets/admin/' . $key;
            foreach ($value as $file) {
                echo '<script src="' . base_url($path . '/' . $file) . '"></script>';
            }
        }
    }
?>