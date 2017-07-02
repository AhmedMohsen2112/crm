<!DOCTYPE html>
<html>
    <head>
        <?php $this->load->view("components/haj_umrah/meta", $data); ?>
    </head>
    <body class="no-overflow" data-color="theme-3">
        <?php $this->load->view("components/haj_umrah/header"); ?>
        <?php $this->load->view("components/haj_umrah/slider"); ?>
        <?php $this->load->view("main_content/haj_umrah/" . $main_content); ?>
        <?php $this->load->view("components/haj_umrah/footer"); ?>

    </body>
</html>