<?php include("../includes/config.php"); ?>
<?php  session_start();?>
<script type="text/javascript" src="js/jquery-1.3.js"></script>
<script type="text/javascript" src="js/jquery.ui.all.js"></script>
<script type="text/javascript" src="includes/dtree.js"></script>
<script type="text/javascript" src="validate.js"></script>
<link rel="StyleSheet" href="css/css.css" type="text/css" />
<div id='calendar' style='display:inline; position:absolute; z-index:999999px'></div>



<?php
$row_user=mysql_fetch_array(mysql_query("SELECT
employees.branch_id
FROM
users
Inner Join employees ON users.employee_id = employees.id WHERE users.id='$_SESSION[login_user_id]'"));
$branch_id=$row_user['branch_id'] ;


$row_branch=mysql_fetch_array(mysql_query("SELECT name FROM our_branchs where id='$branch_id'"));
$branch_name=$row_branch['name'] ;

?>

<?php
if($_SESSION["user"] != ''&&isset($_SESSION["user"]))
{
include("card_functions.php");
include("../lang/arabic.php"); 
$page = $_GET['page'];
$id = $_GET['id'];
$branch_id = $_GET['branch_name'];
$cash_name = $_GET['cash_name'];
//print
if($_GET['action']=="updatex") {
    $sql="UPDATE cash_supply SET  print=1 WHERE id=$id"; //or die(mysql_error());
    $upd=mysql_query($sql);
}

//copy
if($_GET['action']=="updatey") {
    $sql="UPDATE cash_supply SET  copy=1 WHERE id=$id"; //or die(mysql_error());
    $upd=mysql_query($sql);
}


if($_GET['action']=="enter") {
    $reciept = $_GET['reciept'];
    $cash_or_check = $_GET['cash_or_check'];
    $date = $_GET['date'];
    $amount_num = $_GET['amount_num'];
    $cash_id = $_GET['cash_name'];
    if($cash_or_check==1)
	{
        $check_num = $_REQUEST['check_num'];
        $check_date = $_REQUEST['check_date'];
        $bank = $_REQUEST['bank'];
        $update=", check_num='$check_num' , check_date='$check_date', bank='$bank'";
    }
    
	$sql1="SELECT
		Max(cash_supply.reciept) as reciepte
		FROM
		cash_create
		Inner Join cash_supply ON cash_supply.cash_id = cash_create.id
		WHERE
		cash_create.branch_id =  '$branch_id' AND
		cash_supply.cash_id =  '$cash_name' AND reciept IS NOT NULL AND receit_type='0'";
	//$sql1="select max(reciept) as reciepte from cash_supply where reciept IS NOT NULL AND receit_type=0";
	if ($result=mysql_query($sql1)) {
        if($row=mysql_fetch_array($result)) {
            $reciept=$row['reciepte'];
            $reciept++;
        }
		$date=date("Y-m-d"); 
        $sql="UPDATE cash_supply SET reciept='$reciept',cash_id = '$cash_id',order_or_receipt='1',`date`='$date' $update WHERE id=$id and receit_type=0 and reciept is NULL"; 
        //or die(mysql_error());echo "ttt=$sql";
        $upd=mysql_query($sql);


        //****************************************To save in history****************************************

        //select currency
        /*$result=mysql_query("select rate FROM currency where id in(SELECT currency_id FROM cash_supply where id='$id') ");
        if($row=mysql_fetch_array($result)) {
            $currency_rate = $row['rate'];
            $amount_num*= $currency_rate;
        }*/
        //select store
        $sql_test="select * from receipt_date_amount where cash_supply_id='$id' and cash_id='$_GET[cash_name]'";
        $res_test=mysql_query($sql_test);
        if(mysql_num_rows($res_test)<=0){
        $sqlx="select cash_id,amount_num FROM cash_supply where id='$id'";
        $result=mysql_query($sqlx);
        if($row=mysql_fetch_array($result)) {
            $cash_id=$row['cash_id'];
			$amount_num=$row['amount_num'];
            $sqlx="select cash_id FROM receipt_date_amount where cash_id='$cash_id'";
            $result=mysql_query($sqlx);
            $nrow= mysql_num_rows($result);
            if($nrow >0)//store exist in history
            {
                //echo"store exit in history" ;
                //check if date exist in history of that store
                $sqlx="select cash_id FROM receipt_date_amount where cash_id='$cash_id' AND date='$date'";
                $result=mysql_query($sqlx);
                $nrow= mysql_num_rows($result);
                if($nrow >0)//date exist in history of that store
                {
                    //echo"date exist in history of that store";
                    //get current credit
                    $sqlx="select total_amount FROM receipt_date_amount where cash_id='$cash_id' AND date='$date'";
                    $result=mysql_query($sqlx);
                    $row=mysql_fetch_array($result);
                    $total_amount=$row['total_amount']+$amount_num;
					$sql="UPDATE receipt_date_amount SET total_amount='$total_amount', cash_supply_id='$id',receipt_type=0 where cash_id='$cash_id' AND date='$date'";
                    mysql_query($sql);
                }
                else
                {
                    //get last credit of last date
                    $sqlx="select total_amount FROM receipt_date_amount where cash_id='$cash_id' order by date DESC";
                    $result=mysql_query($sqlx);
                    if($row=mysql_fetch_array($result)) {
                        $total_amount=$row['total_amount']+$amount_num;//last amount + current amount
                        	
                        mysql_query("INSERT INTO receipt_date_amount(date,total_amount,cash_id,cash_supply_id,receipt_type) VALUES('$date','$total_amount','$cash_id','$id','0')");
                    }
                }
            }
            else//store not exist in history
            {
                $sqlx="select cash_credit FROM cash_create where id='$cash_id'";
                $result=mysql_query($sqlx);
                $row=mysql_fetch_array($result);
                $cash_credit=$row['cash_credit']+$amount_num;//&#65533;&#65533;&#65533;&#65533;&#65533; &#65533;&#65533;&#65533;&#65533; &#65533;&#65533;&#65533; &#65533;&#65533;&#65533;&#65533;&#65533; &#65533;&#65533; &#65533;&#65533;&#65533;&#65533; &#65533;&#65533;&#65533;&#65533;&#65533;&#65533;&#65533;&#65533;
                mysql_query("INSERT INTO receipt_date_amount(date,total_amount,cash_id,cash_supply_id,receipt_type) VALUES('$date','$cash_credit','$cash_id','$id','0')");
            }
        }}

        //****************************************End save in history****************************************
        if($upd) {
            $error[]= "<span class=\"con\" >".$lang['updateSuccess']."</span>";
        }else {
            $error[]= "<span class=\"con\" >".$lang['updateFailed']."</span>";
        }
    }
}
?>

<?php

if($_GET['id']=='undefined')
    $_GET['id']='';
if(isset($_GET['id'])&&$_GET['id']!=''&&$_GET['id']!='undefined') {
    $sql1="select * from cash_supply where id=$id";
    if ($result=mysql_query($sql1)) {
        if($row=mysql_fetch_array($result)) {
            $print=$row['print'];
            $copy=$row['copy'];
            $date=$row['date'];
        }
    }
//    if ($print==0 && !is_null($date)) {
        ?>
<!--
<table align="left" ><tr>
        <td align=\"center\" ><input type='button' class=\"ibutton5\" value="<?php //echo $lang['print'];?>"
                                     onClick="showCustomer('print','<?php //echo $page;?>',<?php //echo $id;?>,this.form);" ></td>
-->
                  <?php
//                }
//                if ($copy==0 && !is_null($date)) {
                    ?>
<!--
<td align=\"center\" ><input type='button' class=\"ibutton5\" value="<?php //echo $lang['print_copy'];?>"
                                     onClick="showCustomer('copy','<?php //echo $page;?>',<?php //echo $id;?>,this.form);" ></td>
    </tr></table>
-->
        <?php
   // }
}
?>
<form action="">
<table align="center" dir="<?php echo $_GET['rtl'];?>">
    <tr>
        <td colspan="2" class="title1">
            <?php echo $lang['rs_recieved'];?><br/><br/><br/>
        </td>
    </tr>
    
        <tr>
            <td>
                <input type="text" name="id" value="<?php echo $_GET['id'];?>" size="2"/>
            </td>
            <td>
                <?php echo $lang['rs_request_num'];?>
            </td>
        </tr>
        <input type="hidden" name="selectOperation" value="search"/>
        <tr><td colspan="2">
                <input type="button" value="<?php echo $lang['show'];?>" onClick="showCustomer('show','<?php echo $page;?>','',this.form)"/>
            </td>
        </tr>
    
</table></form>

<?php

if(isset($_GET['id'])&&$_GET['id']!='') {
$dateF=date("Y-m-d");
    $sql="SELECT `date`, amount_num, employee, amount_char, cash_or_check, check_date,bank,check_num,note,reciept,currency_id FROM cash_supply where id='$id' and receit_type=0 and print_date='$dateF'" ;

    if ($result=mysql_query($sql)) {
        if($row=mysql_fetch_array($result)) {
            $id=$_GET['id'] ;
            $amount_num=$row['amount_num'] ;
            $amount_char=$row['amount_char'] ;
            $customer_name=$row['employee'] ;
            $cash_or_check=$row['cash_or_check'] ;
            $reciept=$row['reciept'] ;
			$currency_id=$row['currency_id'] ;
            $date=$row['date'] ;
            //$branch_name = $row['branch_name'];
            //echo $branch_name;
            if($cash_or_check==1)//check
            {
                $check_date=$row['check_date'] ;
                $bank=$row['bank'] ;
                $check_num=$row['check_num'] ;
            }
            $note=$row['note'] ;
            /*list($year, $month, $day) = split('[-]', $date);
            $dateF = "$day-$month-$year ";*/
			$dateF=date("d-m-Y");

            //echo"<div id=print>";
            if($cash_or_check==0)
                echo"<div align=center>$lang[rs_cash_printed]</div>";
            else
                echo"<div align=center dir=\"rtl\">$lang[rs_check_printed]</div>";
            echo"<div align=right dir=\"rtl\">$lang[print_date]&nbsp;$dateF&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;$reciept</div>";
            echo"<div align=right dir=\"rtl\">$lang[print_received]&nbsp; $customer_name</div>";
			$sqlcurr="SELECT * FROM currency WHERE id='$currency_id'";
			if ($resultcurr=mysql_query($sqlcurr)) {
				while($rowcurr=mysql_fetch_array($resultcurr)) {
					$curr_name=$rowcurr['name'] ;
				}
			}

			list($amount1, $amount2) = split('[.]', $amount_num);
				if($amount2==00000)
				{
					echo"<div align=right dir=\"rtl\">$lang[print_mount]&nbsp;$amount1&nbsp;$curr_name</div>";
				}
				else
				{
					echo"<div align=right dir=\"rtl\">$lang[print_mount]&nbsp;$amount_num&nbsp;$curr_name</div>";
				}
            if($cash_or_check==1) {
                echo"<div align=right dir=\"ltr\">$lang[rs_check_num_print]&nbsp; $check_num</div>";
                echo"<div align=right dir=\"ltr\">$lang[rs_check_date_print]&nbsp; $check_date</div>";
                echo"<div align=right dir=\"rtl\">$lang[rs_check_bank_print]&nbsp; $bank</div>";
            }
            echo"<div align=right dir=\"rtl\">$lang[rs_value_print]&nbsp;$note </div>";
    if ($print==0 && !is_null($date)) {
        ?>
<table align="left" ><tr>
        <td align="center" >
		<input type="hidden" name="currency_id" value="<?php echo $currency_id;?>" />
		<input type='button'  value="<?php echo $lang['print'];?>"
                                     onClick="showCustomer('print','<?php echo $page;?>',<?php echo $id;?>,this.form);" ></td>
                    <?php
                }
                if ($copy==0 && !is_null($date))
				{
                    ?>
        <td align="center" ><input type='button'  value="<?php echo $lang['print_copy'];?>"
                                     onClick="showCustomer('copy','<?php echo $page;?>',<?php echo $id;?>,this.form);" ></td>
    </tr></table>
        <?php
    }


	if($_GET['action']=="print")
	{
		echo"<div align=\"right\"><a href='#' onclick=\"printdiv('print');
		showCustomer('updatex','$page','$id')\">Click here for print</a></div>";
	}

	if($_GET['action']=="copy")
	{
		echo"<div align=\"right\"><a href='#' onclick=\"printdiv_copy('printC');
		showCustomer('updatey','$page','$id')\">Click here for print</a></div>";

	}
	?>
<br/><br/>
            <?php

            if(empty( $reciept )) {
                ?>
<form action=""> 
    <table align="center" dir="<?php echo $lang['dir'];?>">
    
        <tr> <td class="header"> <?php echo $lang[rs_cash_branch]?> </td>
            <td class="inputform"><input type="hidden" name="currency_id" value="$currency_id" />
                <select name="branch_name" disabled="disabled" onchange="this.form.action.value='show';showCustomer('show','<?php echo $page;?>','',this.form);">
                    <option value=""><?php echo $lang[choose]?></option>
                            <?php
							
							
//get branch id from user login
$row_user=mysql_fetch_array(mysql_query("SELECT
employees.branch_id
FROM
users
Inner Join employees ON users.employee_id = employees.id WHERE users.id='$_SESSION[login_user_id]'"));
                         $branch_id=$row_user['branch_id'] ;
							
                            $sql="SELECT * FROM our_branchs" ;
                            if ($result=mysql_query($sql)) {
                                while($row=mysql_fetch_array($result)) {
                                    $id=$row['id'] ;
                                    $branch_name=$row['name'] ;
                                    if ($branch_id==$id) {
                                        $select="selected";
                                    }
                                    else {
                                        $select="";
                                    }
                                    echo "<option value='$id' $select>".$branch_name."</option>";
                                }
                            }
                            ?>
                </select></td></tr>

        <tr> <td class="header"> <?php echo $lang[rs_cash_name]?> </td>
            <td class="inputform">
            <?php
            $sql="SELECT * FROM cash_create where branch_id='$branch_id' AND currency_id='$currency_id'" ;
            ?>
    <select name="cash_name" >
        <option value=""><?php echo $lang[choose]?></option>
                <?php
                if ($result=mysql_query($sql)) {
                    while($row=mysql_fetch_array($result)) {
                        $id=$row['id'] ;
                        $cash_name=$row['cash_name'] ;
                        echo "<option value='$id' >".$cash_name."</option>";
                    }
                }
                ?>
                </select></td></tr>
        <tr>
            <td align="right"><?php echo $lang['rs_cash_pound'];?></td>
			<?php list($amount1, $amount2) = split('[.]', $amount_num);
							if($amount2==00000)
							{
								echo"<td style=\"border:double;border-color:#003399;\" id=\"amount_num\">$amount1</td>";
							}
							else
							{
								echo"<td style=\"border:double;border-color:#003399;\" id=\"amount_num\">$amount_num</td>";
							}
			?>
           
        </tr>
<?php 
	$dateF=date("d-m-Y");
?>
        <tr>
            <td align="right"><?php echo $lang['pm_date_print'];?></td>
<!--            <td><input name="date" id="dateid" size="11" onclick="getcalander(this);return false;"></td>
-->			<td style="border:double;border-color:#003399;" id="date"><?php echo $dateF;?></td>
        </tr>
		<?php
		//to allow user enter check details
		if($cash_or_check==1) {
			echo"
	<tr> 
		<td class=header> $lang[rs_check_num] </td>
		<td class=inputform><input type ='text' name = 'check_num' value='$check_num' ></td>
	</tr> 
	<tr>
		 <td class=header> $lang[rs_check_date] </td>
		<td class=inputform>
			<input type='text' name='check_date' id='check_dateid' value='$check_date' onclick=\"getcalander(this);return false;\"></td>
	</tr> 
	<tr> 
		<td class=header> $lang[rs_bank] </td>
		<td class=inputform><input type ='text' name = 'bank' value='$bank' ></td>
	</tr> 
                            ";
                        }
                        ?>
        <input type="hidden" name="cash_or_check" value="<?php echo $cash_or_check;?>"/>
        <input type="hidden" name="id" value="<?php echo $_GET['id'];?>"/>
        <tr><td colspan="2">
			<?php
			if($cash_or_check==0) {?>
	<input type="button" value="<?php echo $lang['rec_enter'];?>" 
	onClick="if(validate(branch_name,'select')&&validate(cash_name,'select'))
	showCustomer('enter','<?php echo $page;?>','',this.form)"/>
				<?php
			}
			else {
				?>
	<input type="button" value="<?php echo $lang['rec_enter'];?>" 
	onClick="if(validate(branch_name,'select')&&validate(cash_name,'select')&&validate(check_num,'num')&&validate(check_date,'date')&&validate(bank,'req'))
	showCustomer('enter','<?php echo $page;?>','',this.form)"/>
				<?php
			}
			?>
            </td></tr>
</table></form>
                <?php
            }
            else {
            }
            ?>
            <?php
        }
        else {
            echo "<div align='center'>".$lang['insertData']."</div>";
        }
    }
}
?>
<?php 
//grid code-------------------------------------------------------------- 
$check_date=NULL ; 
$bank=NULL ; 
$check_num=NULL ;
$date_now=date('Y-m-d');
$sql="SELECT * FROM cash_supply where receit_type='0' and order_or_receipt='0' and print_date='$date_now' order by id DESC" ;
$result=mysql_query($sql);
if ($result) {
    echo "
<table border=\"1\" class=\"mtable\"  align=\"center\" dir=\"rtl\" cellpadding=\"0\" width=\"900\" cellspacing=0>";
    echo "<tr>

<th align=\"center\" width=\"50\"> $lang[rs_request_num] </th> 
<th align=\"center\" width=\"150\"> $lang[tourism_or_card_other_store] </th> 
<th align=\"center\" width=\"150\"> $lang[rs_amount_num] </th> 
<th align=\"center\" width=\"150\"> $lang[rs_note] </th> 
<th align=\"center\" width=\"80\"> $lang[rs_cash_or_check] </th> 
<th align=\"center\" width=\"100\"> $lang[rs_check_num] </th> 
<th align=\"center\" width=\"100\"> $lang[rs_check_date] </th> 
<th align=\"center\" width=\"100\"> $lang[rs_bank] </th> 

</tr></table>"; 

    $i=1;
    while($row=mysql_fetch_array($result)) {
        $id=$row['id'] ;
        $date=$row['date'] ;
        $amount_num=$row['amount_num'] ;
        $currency_id=$row['currency_id'] ;
		
		$sqlcurr="SELECT * FROM currency WHERE id='$currency_id'";
		if ($resultcurr=mysql_query($sqlcurr)) {
			while($rowcurr=mysql_fetch_array($resultcurr)) {
				$name=$rowcurr['name'] ;
			}
		}
		
        $amount_char=$row['amount_char'] ;
        $reciept=$row['reciept'] ;
        $note=$row['note'] ;
        $cash_or_check=$row['cash_or_check'] ;
		$card_id=$row['card_id'] ;
		$tj_form6_id=$row['tj_form6_id'] ;
		$sqlF="SELECT
tourism_company.name,
tj_form6.file_num
FROM
tj_form6
Inner Join tourism_company ON tj_form6.tourism_company_id = tourism_company.id
WHERE
tj_form6.id =  '$tj_form6_id'";
				if ($resultF=mysql_query($sqlF)) {
					if($rowF=mysql_fetch_array($resultF)) {
						$tourism_company=$rowF['name']."(".$rowF['file_num'].")" ;
						
					}
				}

        if($cash_or_check==1)//check
        {
            $check_date=$row['check_date'] ;
            $bank=$row['bank'] ;
            $check_num=$row['check_num'] ;
        }
        else {
            $check_date=NULL ;
            $bank=NULL ;
            $check_num=NULL ;
        }


echo "<form><table border=\"1\" class=\"mtable\"  align=\"center\" dir=\"rtl\" cellpadding=\"0\" width=\"900\" cellspacing=0>
<tr>
<input type=\"hidden\" name=\"action2\" value=\"cardform_other\">
<input type=\"hidden\" name=\"action1\" value=\"0\">
<td align=\"center\" width=\"50\"> $id </td>";
echo"<td align=\"center\" width=\"150\">";
if($card_id)	
 echo"$card_id &nbsp;</td>";
else if($tj_form6_id)
 {
 	echo"$tourism_company &nbsp;</td>";
 }
else
echo"$lang[rs_others] </td>";

list($amount1, $amount2) = split('[.]', $amount_num);
	if($amount2==00)
	{
		echo"<td width=\"150\" align=\"center\" style=\"text-align:center\"> $name&nbsp;$amount1</td>";
	}
	else
	{
		echo"<td width=\"150\" align=\"center\" style=\"text-align:center\"> $name&nbsp;$amount_num</td>";
	} 
	
        echo"<td width=\"150\" align=\"center\" > $note &nbsp;</td>
<td align=\"center\" width=\"80\">"; 
        if($cash_or_check==0)
            echo"$lang[rs_cash]";

        else
            echo"$lang[rs_check]";
        echo"</td>
<td align=\"center\" width=\"100\"> $check_num &nbsp;</td> 
<td align=\"center\" width=\"100\"> $check_date &nbsp;</td> 
<td align=\"center\" width=\"100\"> $bank &nbsp;</td>
</tr></table></form>";

        $i++;
        $reciept=NULL;


        $reciept=NULL;
    }

    echo "";

}

?>

<?php
//for printing
if($_GET['action']=="print") {

    $sql="SELECT `date`, amount_num,amount_LE , currency_id, employee, amount_char, cash_or_check, check_date,bank,check_num,note,reciept,card_id FROM cash_supply where id='$_GET[id]' and receit_type=0" ;
    if ($result=mysql_query($sql)) {
        if($row=mysql_fetch_array($result)) {
            $id=$_GET['id'] ;
            $amount_num=$row['amount_num'] ;
            $amount_char=$row['amount_char'] ;
            $customer_name=$row['employee'] ;
            $cash_or_check=$row['cash_or_check'] ;
            $reciept=$row['reciept'] ;
			$currency_id=$row['currency_id'] ;
            $date=$row['date'] ;
			$card_id=$row['card_id'] ;		
				
            if($cash_or_check==1)//check
            {
                $check_date=$row['check_date'] ;
                $bank=$row['bank'] ;
                $check_num=$row['check_num'] ;
            }
            $note=$row['note'] ;
            $dateF=date("d-m-Y");

			$sqlcurr="SELECT * FROM currency WHERE id ='$currency_id'";
			if ($resultcurr=mysql_query($sqlcurr))
			{	
				while($rowcurr=mysql_fetch_array($resultcurr))
					  {
						$pound_name = $rowcurr['pound_name'];
						$piaster_name = $rowcurr['piaster_name'];	
					  }
			}
			
			list($amount1, $amount2) = split('[.]', $amount_num);
			
            echo"<div id=print style=\"visibility:hidden\">";
            echo"<div align=\"center\"><img src=\"images/header_pdf2.JPG\"></div>";
			echo"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
			<div align=\"right\" dir=\"rtl\"><b>$branch_name</b></div>";	
            if($cash_or_check==0)
                echo"<div align=\"center\"><b>$lang[rs_cash_printed]</b></div><br/></br></br>";
            else
                echo"<div align=\"center\" dir=\"rtl\"><b>$lang[rs_check_printed]</b></div><br/></br></br>";
echo"<div align=\"right\" dir=\"rtl\"><b>$lang[print_date]</b>&nbsp;$dateF&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;NO:$reciept</div></br>


		    <div style=\"position:absolute;right:600px;top:220px\"><b>$piaster_name</b></div>
			<div style=\"position:absolute;right:700px;top:220px\"><b>$pound_name</b></div>
			<div style=\"position:absolute;right:600px;top:240px\">$amount2</div>
			<div style=\"position:absolute;right:700px;top:240px\">$amount1</div>";
			
            echo"<div align=right dir=\"rtl\"><b>$lang[print_received]</b>&nbsp; $customer_name</div><br/>";
			
			$sqlcurr="SELECT * FROM currency WHERE id='$currency_id'";
			if ($resultcurr=mysql_query($sqlcurr)) {
				while($rowcurr=mysql_fetch_array($resultcurr)) {
					$name=$rowcurr['name'] ;
					$ps_name=$rowcurr['piaster_name'];
				}
			}
			
			$amount_ch=explode("-",$amount_char);
			if(count($amount_ch)>1)
			{
				$amount_char=$amount_ch[0]."&nbsp;$name&nbsp;\E6&nbsp;".$amount_ch[1]."&nbsp;$ps_name&nbsp;";
			}
			else
			{
				$amount_char=$amount_char."&nbsp;$name";
			}

			$amount_LE = $row['amount_LE'] ;
		echo"<div align=right dir=\"rtl\"><b>$lang[print_mount]</b>$amount_LE ( $amount_char&nbsp;<b>$lang[rs_pound_only] )</b></div><br/>";	
		
		echo"<div align=right dir=\"rtl\"><b> $lang[rs_total_amount_pound]</b> &nbsp; : &nbsp;&nbsp; $amount_LE &nbsp;<b>$lang[rs_pound_only]</b></div><br/>";
            if($cash_or_check==1) {
                echo"<div align=right dir=\"rtl\"><b>$lang[rs_check_num_print]</b>&nbsp; $check_num</div><br/>";
                echo"<div align=right dir=\"rtl\"><b>$lang[rs_check_date_print]</b>&nbsp; $check_date</div><br/>";
                echo"<div align=right dir=\"rtl\"><b>$lang[rs_check_bank_print]</b>&nbsp; $bank</div><br/>";
            }
             echo"<div align=right dir=\"rtl\"> <b>$lang[rs_value_print]</b>$note&nbsp;</div></br></br>";
             echo"<div align=center dir=\"rtl\"><b>$lang[print_cash_head] </b>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>$lang[print_calc_name]</b></div>";

$sql="select * from employees where id in (select employee_id from users where id='".$_SESSION['login_user_id']."')";
		$res=mysql_query($sql);
		$row_em=mysql_fetch_array($res);
		echo "<br><br><div align=right dir=\"rtl\"> ".$lang['employee']."&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>".$row_em['employee']."</b></div>";
		
		$sql="select * from employees where id in (select employee_id from users where id='".$_SESSION['login_user_id']."')";
		$res_emp=mysql_query($sql);
		$row_emp=mysql_fetch_array($res_emp);
		echo "<div align=right dir=\"rtl\"> ".$lang['employee']."&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>".$row_emp['employee']."</b></div></div>";

            echo"</div>";

            // echo"<div align=\"center\"><a href='#' onclick=\"printdiv('print');showCustomer('updatex','$page','$id')\">Click here for print</a></div>";
        }
    }

}


//for printing copy
if($_GET['action']=="copy") {
    $sql="SELECT `date`, amount_num,amount_LE, employee,currency_id, amount_char, cash_or_check, check_date,bank,check_num,note,reciept FROM cash_supply where id='$_GET[id]' and receit_type=0" ;
    if ($result=mysql_query($sql)) {
        if($row=mysql_fetch_array($result)) {
            $id=$_GET['id'] ;
            $amount_num=$row['amount_num'] ;
            $amount_char=$row['amount_char'] ;
            $customer_name=$row['employee'] ;
            $cash_or_check=$row['cash_or_check'] ;
            $reciept=$row['reciept'] ;
            $date=$row['date'] ;
			$currency_id=$row['currency_id'] ;
            if($cash_or_check==1)//check
            {
                $check_date=$row['check_date'] ;
                $bank=$row['bank'] ;
                $check_num=$row['check_num'] ;
            }
            $note=$row['note'] ; 
           $dateF=date("d-m-Y");

			$sqlcurr="SELECT * FROM currency WHERE id ='$currency_id'";
			if ($resultcurr=mysql_query($sqlcurr))
			{	
				while($rowcurr=mysql_fetch_array($resultcurr))
					  {
						$pound_name = $rowcurr['pound_name'];
						$piaster_name = $rowcurr['piaster_name'];	
					  }
			}
			
			list($amount1, $amount2) = split('[.]', $amount_num);
			
            echo"<div id=printC style=\"visibility:hidden\">";
            echo"<div align=\"center\"><img src=\"images/header_pdf2.JPG\"></div>";
			echo"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
			<div align=\"right\" dir=\"rtl\"><b>$branch_name</b></div>";	
            if($cash_or_check==0)
                echo"<div align=\"center\"><b>$lang[rs_cash_printed]</b></div><br/></br></br>";
            else
                echo"<div align=\"center\" dir=\"rtl\"><b>$lang[rs_check_printed]</b></div><br/></br></br>";
echo"<div align=\"right\" dir=\"rtl\"><b>$lang[print_date]</b>&nbsp;$dateF&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;NO:$reciept</div></br>


		    <div style=\"position:absolute;right:600px;top:220px\"><b>$piaster_name</b></div>
			<div style=\"position:absolute;right:700px;top:220px\"><b>$pound_name</b></div>
			<div style=\"position:absolute;right:600px;top:240px\">$amount2</div>
			<div style=\"position:absolute;right:700px;top:240px\">$amount1</div>";
           echo"<div align=\"right\" dir=\"rtl\"><b>$lang[print_received]</b>&nbsp; $customer_name</div><br/>";
			
			$sqlcurr="SELECT * FROM currency WHERE id='$currency_id'";
			if ($resultcurr=mysql_query($sqlcurr)) {
				while($rowcurr=mysql_fetch_array($resultcurr)) {
					$name=$rowcurr['name'] ;
					$ps_name=$rowcurr['piaster_name'];
				}
			}
			
			$amount_ch=explode("-",$amount_char);
			if(count($amount_ch)>1)
			{
				$amount_char=$amount_ch[0]."&nbsp;$name&nbsp;\E6&nbsp;".$amount_ch[1]."&nbsp;$ps_name&nbsp;";
			}
			else
			{
				$amount_char=$amount_char."&nbsp;$name";
			}
$sqlcurr_name="SELECT * FROM currency WHERE id='1'";
			$rowcurr_name =  mysql_fetch_array(mysql_query($sqlcurr_name)) ;
$name_currency_le=$rowcurr_name['name'] ;
$amount_LE = $row['amount_LE'] ;
			
			echo"<div align=right dir=\"rtl\"><b>$lang[print_mount]</b>$amount_LE $name_currency_le  ( $amount_char&nbsp;<b>$lang[rs_pound_only] )</b></div><br/>";	 	
		echo"<div align=right dir=\"rtl\"><b>$lang[rs_total_amount_pound]</b> &nbsp; : &nbsp;&nbsp; $amount_LE &nbsp;<b>$lang[rs_pound_only]</b></div><br/>";
			    if($cash_or_check==1) {
                echo"<div align=right dir=\"rtl\"><b>$lang[rs_check_num_print]</b>&nbsp; $check_num</div></br>";
                echo"<div align=right dir=\"rtl\"><b>$lang[rs_check_date_print]</b>&nbsp; $check_date</div></br>";
				echo"<div align=right dir=\"rtl\"><b>$lang[rs_check_bank_print]</b>&nbsp; $bank</div><br/>";
            }
             echo"<div align=right dir=\"rtl\"> <b>$lang[rs_value_print]</b>$note&nbsp;</div></br></br>";
            echo"<div align=center dir=\"rtl\"><b>$lang[print_cash_head] </b>
			&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>$lang[print_calc_name]</b></div>";

$sql="select * from employees where id in (select employee_id from users where id='".$_SESSION['login_user_id']."')";
		$res=mysql_query($sql);
		$row_em=mysql_fetch_array($res);
echo "<br><br><div align=right dir=\"rtl\">".$lang['employee']."&nbsp;&nbsp;&nbsp;<b>".$row_em['employee']."</b></div>";
		
		$sql="select * from employees where id in (select employee_id from users where id='".$_SESSION['login_user_id']."')";
		$res_emp=mysql_query($sql);
		$row_emp=mysql_fetch_array($res_emp);
echo "<div align=right dir=\"rtl\"> ".$lang['employee']."&nbsp;&nbsp;&nbsp;<b>".$row_emp['employee']."</b></div></div>";

            echo"</div>";

        }
    }

}

/*********************/
}
?>	
