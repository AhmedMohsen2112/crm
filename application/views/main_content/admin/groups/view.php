<!--Page main section start-->
<section id="min-wrapper">
	<div id="main-content">
		<div class="container-fluid">
			<div class="row">
				<div class="col-md-12">

					<!--Top breadcrumb start -->
					<ol class="breadcrumb">
						<li><a href="<?= \base_url('admin/') ?>"><i class="fa fa-home"></i></a></li>
						<li class="active"><a href="<?= \base_url('admin/groups/show') ?>"><?= $lang['groups']; ?></a></li>
					</ol>
					<!--Top breadcrumb start -->
				</div>
			</div>

			<a class="btn btn-sm btn-info pull-right" href="<?= \base_url('admin/groups/add') ?>"><?= $lang['add']; ?> <?= $lang['group']; ?></a>
			<br>
			<br>
			<div class="row">
				<div class="col-md-12">
					<div class="panel panel-default">
						<div class="panel-heading">
							<h3 class="panel-title"><?= $lang['groups']; ?></h3>
						</div>
						<div class="panel-body">
							<!--Table Wrapper Start-->
							<div class="ls-editable-table table-responsive ls-table">
								<table class="table table-bordered table-striped table-bottomless" id="ls-editable-table">
									<thead>
										<tr>
											<th><?= $lang['group_name']; ?></th>
											<th><?= $lang['controll']; ?></th>
										</tr>
									</thead>
									<tbody>
										<?php foreach ($group_list as $group_key => $group) { ?>
												<tr <?php if ($group->group_close == '1') echo 'style="background-color: #F3C7C7;"'; ?>>
													<td <?php if ($group->group_close == '1') echo 'style="background-color: #F3C7C7;"'; ?>><?= $group->group_name; ?></td>
													<td <?php if ($group->group_close == '1') echo 'style="background-color: #F3C7C7;"'; ?> class="col-xs-2 col-sm-2 col-md-2 col-lg-2">
														<a class="btn btn-xs btn-warning" title="<?= $lang['edit']; ?>" href="<?= \base_url('admin/groups/edit') . '/' . $group->group_id; ?>"><i class="fa fa-pencil-square-o"></i> </a>
														<a class="btn btn-xs btn-danger" title="<?= $lang['delete']; ?>" href="<?= \base_url('admin/groups/delete') . '/' . $group->group_id; ?>"><i class="fa fa-minus"></i></a>
													</td>
												</tr>
											<?php } ?>
									</tbody>
								</table>
							</div>
							<!--Table Wrapper Finish-->
						</div>
					</div>
				</div>
			</div>

		</div>
	</div>



</section>