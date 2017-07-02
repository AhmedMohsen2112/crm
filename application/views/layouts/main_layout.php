<!DOCTYPE html>
<html>
    <head>
        <?php $this->load->view("components/meta", $data); ?>
    </head>
    <body class="load-full-screen pattern2">

        <?php $this->load->view("components/header"); ?>
        <?php $this->load->view("main_content/" . $main_content); ?>
        <?php $this->load->view("components/footer"); ?>



    </body>
</html>