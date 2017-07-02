<meta charset="utf-8" />
<title>Markat</title>
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta content="width=device-width, initial-scale=1" name="viewport" />
<meta content="Markat" name="description" />
<meta content="Markat" name="author" />
<!-- BEGIN GLOBAL MANDATORY STYLES -->
<link href="http://fonts.googleapis.com/css?family=Open+Sans:400,300,600,700&subset=all" rel="stylesheet" type="text/css" />
<link href="<?= base_url('assets/admin/plugins') ?>/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css" />
<link href="<?= base_url('assets/admin/plugins') ?>/simple-line-icons/simple-line-icons.min.css" rel="stylesheet" type="text/css" />
<?php if($lang_code == 'ar'){ ?>
<link href="<?= base_url('assets/admin/plugins') ?>/bootstrap/css/bootstrap-rtl.min.css" rel="stylesheet" type="text/css" />
<?php }else{ ?>
<link href="<?= base_url('assets/admin/plugins') ?>/bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
<?php } ?>
<?php if($lang_code == 'ar'){ ?>
<link href="<?= base_url('assets/admin/plugins') ?>/bootstrap-switch/css/bootstrap-switch-rtl.min.css" rel="stylesheet" type="text/css" />
<?php }else{ ?>
<link href="<?= base_url('assets/admin/plugins') ?>/bootstrap-switch/css/bootstrap-switch.min.css" rel="stylesheet" type="text/css" />
<?php } ?>
<link href="<?= base_url('assets/admin/plugins') ?>/bootstrap-fileinput/bootstrap-fileinput.css" rel="stylesheet" type="text/css" />
<link href="<?= base_url('assets/admin/plugins') ?>/bootstrap-datepicker/css/bootstrap-datepicker3.min.css" rel="stylesheet" type="text/css" />
<link href="<?= base_url('assets/admin/plugins') ?>/bootstrap-toastr/toastr.min.css" rel="stylesheet" type="text/css"/>
<link href="<?= base_url('assets/admin/plugins') ?>/jquery-confirm/css/jquery-confirm.css" rel="stylesheet" type="text/css" />
<link href="<?= base_url('assets/admin/plugins') ?>/datatables/datatables.min.css" rel="stylesheet" type="text/css" />
<?php if($lang_code == 'ar'){ ?>
<link href="<?= base_url('assets/admin/plugins') ?>/datatables/plugins/bootstrap/datatables.bootstrap-rtl.css" rel="stylesheet" type="text/css" />
<?php }else{ ?>
<link href="<?= base_url('assets/admin/plugins') ?>/datatables/plugins/bootstrap/datatables.bootstrap.css" rel="stylesheet" type="text/css" />
<?php } ?>
<!-- END GLOBAL MANDATORY STYLES -->
<!-- BEGIN PAGE LEVEL PLUGINS -->
<link href="<?= base_url('assets/admin/plugins') ?>/bootstrap-daterangepicker/daterangepicker.min.css" rel="stylesheet" type="text/css" />
<link href="<?= base_url('assets/admin/plugins') ?>/morris/morris.css" rel="stylesheet" type="text/css" />
<link href="<?= base_url('assets/admin/plugins') ?>/fullcalendar/fullcalendar.min.css" rel="stylesheet" type="text/css" />
<link href="<?= base_url('assets/admin/plugins') ?>/jqvmap/jqvmap/jqvmap.css" rel="stylesheet" type="text/css" />
<!-- END PAGE LEVEL PLUGINS -->
<!-- BEGIN THEME GLOBAL STYLES -->
<?php if($lang_code == 'ar'){ ?>
<link href="<?= base_url('assets/admin/css') ?>/components-md-rtl.css" rel="stylesheet" id="style_components" type="text/css" />
<?php }else{ ?>
<link href="<?= base_url('assets/admin/css') ?>/components-md.min.css" rel="stylesheet" id="style_components" type="text/css" />
<?php } ?>
<?php if($lang_code == 'ar'){ ?>
<link href="<?= base_url('assets/admin/css') ?>/plugins-md-rtl.css" rel="stylesheet" type="text/css" />
<?php }else{ ?>
<link href="<?= base_url('assets/admin/css') ?>/plugins-md.min.css" rel="stylesheet" type="text/css" />
<?php } ?>
<!-- END THEME GLOBAL STYLES -->
<!-- BEGIN THEME LAYOUT STYLES -->
<?php if($lang_code == 'ar'){ ?>
<link href="<?= base_url('assets/admin/css') ?>/layout-rtl.min.css" rel="stylesheet" type="text/css" />
<?php }else{ ?>
<link href="<?= base_url('assets/admin/css') ?>/layout.min.css" rel="stylesheet" type="text/css" />
<?php } ?>
<?php if($lang_code == 'ar'){ ?>
<link href="<?= base_url('assets/admin/css') ?>/darkblue-rtl.min.css" rel="stylesheet" type="text/css" id="style_color" />
<?php }else{ ?>
<link href="<?= base_url('assets/admin/css') ?>/darkblue.min.css" rel="stylesheet" type="text/css" id="style_color" />
<?php } ?>
<link href="<?= base_url('assets/admin/css') ?>/custom.min.css" rel="stylesheet" type="text/css" />
<!-- END THEME LAYOUT STYLES -->
<link rel="shortcut icon" href="<?php echo base_url(); ?>/assets/admin/images/favicon.png" />







<script>
    var config = {
        base_url: '<?php echo base_url(); ?>',
        admin_url: '<?php echo base_url('admin'); ?>',
        lang_code: '<?= $lang_code ?>',
    };
    var lang = {
        add_user: '<?= _lang('add_user'); ?>',
        edit_user: '<?= _lang('edit_user'); ?>',
        add_group: '<?= _lang('add_group'); ?>',
        edit_group: '<?= _lang('edit_group'); ?>',
        add_country: '<?= _lang('add_country'); ?>',
        edit_country: '<?= _lang('edit_country'); ?>',
        add_company: '<?= _lang('add_company'); ?>',
        edit_company: '<?= _lang('edit_company'); ?>',
        add_program_category: '<?= _lang('add_program_category'); ?>',
        edit_program_category: '<?= _lang('edit_program_category'); ?>',
        add_airlines: '<?= _lang('add_airlines'); ?>',
        edit_airlines: '<?= _lang('edit_airlines'); ?>',
        add_flight_bookings: '<?= _lang('add_flight_bookings'); ?>',
        edit_flight_bookings: '<?= _lang('edit_flight_bookings'); ?>',
        add_hotel_room: '<?= _lang('add_hotel_room'); ?>',
        edit_hotel_room: '<?= _lang('edit_hotel_room'); ?>',
        add_hotel_advantages: '<?= _lang('add_hotel_advantages'); ?>',
        edit_hotel_advantages: '<?= _lang('edit_hotel_advantages'); ?>',
        add_hotel_extra_services: '<?= _lang('add_hotel_extra_services'); ?>',
        edit_hotel_extra_services: '<?= _lang('edit_hotel_extra_services'); ?>',
        add_hotel_room_meals: '<?= _lang('add_hotel_room_meals'); ?>',
        edit_hotel_room_meals: '<?= _lang('edit_hotel_room_meals'); ?>',
        add_hotel: '<?= _lang('add_hotel'); ?>',
        edit_hotel: '<?= _lang('edit_hotel'); ?>',
        add_currency: '<?= _lang('add_currency'); ?>',
        edit_currency: '<?= _lang('edit_currency'); ?>',
        save: '<?= _lang('save'); ?>',
        updated_successfully: '<?= _lang('updated_successfully'); ?>',
        loading: '<?= _lang('loading'); ?>',
        deleting: '<?= _lang('deleting'); ?>',
        delete: '<?= _lang('delete'); ?>',
        uploading: '<?= _lang('uploading'); ?>',
        upload: '<?= _lang('upload'); ?>',
        required: '<?= _lang('this_field_is_required'); ?>',
        email_validate: '<?= _lang('email_is_not_valid'); ?>',
        alert_message: '<?= _lang('alert_message'); ?>',
        confirm_message_title: '<?= _lang('are you sure !?'); ?>',
        deleting_cancelled: '<?= _lang('deleting_cancelled'); ?>',
        yes: '<?= _lang('yes'); ?>',
        no: '<?= _lang('no'); ?>',
        error: '<?= _lang('error'); ?>',
        try_again: '<?= _lang('try_again'); ?>',
        choose_one: '<?= _lang('please_choose_one'); ?>',
        no_file_to_upload: '<?= _lang('no_file_to_upload'); ?>',
    };

    // alert(config.lang);
</script>