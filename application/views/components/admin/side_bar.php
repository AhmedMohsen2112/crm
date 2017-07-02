<div class="page-sidebar-wrapper">
    <div class="page-sidebar navbar-collapse collapse">
        <ul class="page-sidebar-menu  page-header-fixed " data-keep-expanded="false" data-auto-scroll="true" data-slide-speed="200" style="padding-top: 20px">
            <li class="sidebar-toggler-wrapper hide">
                <div class="sidebar-toggler">
                    <span></span>
                </div>
            </li>
            <!-- END SIDEBAR TOGGLER BUTTON -->
            <li class="sidebar-search-wrapper">

            </li>
            <?php
                if (count($main_pages) > 0) {
                    foreach ($main_pages as $value) {
                        if (main_page_one_parent_id($page_link_name) == $value->id) {
                            $main_menu_active = "active";
                        } else {
                            $main_menu_active = "";
                        }
                        ?>
                        <?php if (check_permission($value->name, 'open')) { ?>

                            <?php $pages_sub = sub_pages($value->id); ?>
                            <li class="nav-item start <?= $main_menu_active; ?>">
                                <?php $url = ($pages_sub) ? 'javascript:;' : base_url("admin/$value->controller") ?>
                                <a href="<?= $url ?>" class="nav-link nav-toggle">
                                    <i class="icon-home"></i>
                                    <span class="title"><?= _lang($value->name); ?></span>
                                    <?php if ($pages_sub) { ?>
                                        <span class="arrow"></span>
                                    <?php } ?>
                                </a>
                                <?php if ($pages_sub) { ?>
                                    <ul class="sub-menu">
                                        <?php
                                        foreach ($pages_sub as $value_page) {
                                            if ($page_link_name == $value_page->controller) {
                                                $active_li = "active";
                                            } else {
                                                $active_li = "";
                                            }
                                            ?>

                                            <?php if (check_permission($value_page->name, 'open')) { ?>
                                                <li class="<?php echo $active_li; ?>">
                                                    <a  class="nav-link " href="<?= base_url("admin/$value_page->controller") ?>"> <?= _lang($value_page->name); ?>
                                                    </a>
                                                </li>
                                            <?php } ?>

                                        <?php } ?>
                                    </ul>
                                <?php } ?>

                            </li>

                        <?php } ?>
                        <?php
                    }
                }
            ?>

        </ul>
        <!-- END SIDEBAR MENU -->
        <!-- END SIDEBAR MENU -->
    </div>
    <!-- END SIDEBAR -->
</div>