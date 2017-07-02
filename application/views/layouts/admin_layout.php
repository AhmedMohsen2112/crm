<!DOCTYPE html>
<html>
    <head>
        <?php $this->load->view("components/admin/meta", $data); ?>
    </head>
    <body class="page-header-fixed page-sidebar-closed-hide-logo page-content-white page-md">
        <div class="page-wrapper">
            <?php $this->load->view("components/admin/header"); ?>
            <div class="page-container">
                <?php $this->load->view("components/admin/side_bar"); ?>
                <div class="page-content-wrapper">
                    <div class="page-content">
                        <?php $this->load->view("components/admin/breadcrumb"); ?>
                        <?php $this->load->view("main_content/admin/" . $main_content); ?>
                    </div>
                </div>

            </div>
            <div class="page-footer">
                <div class="page-footer-inner">
                    All Rights Reserved © Markat Co. 2017 | <a target="_blank" href="http://www.atiafco.com/">Powered By Atiafco </a>
                    
                </div>
                <div class="scroll-to-top">
                    <i class="icon-arrow-up"></i>
                </div>
            </div>
            <?php $this->load->view("components/admin/footer"); ?>

    </body>
</html>