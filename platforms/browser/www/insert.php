<?php 
  $con = mysqli_connect("localhost","id588783_root123","amandarv123","id588783_android") or die ("could not connect database");
  $query = "INSERT INTO data_phone (app_name,device_name,device_model,device_plat,device_uuid,device_ver) 
            VALUES ('Accleration App',
                    '".$_POST["NAME"]."',
                    '".$_POST["MODEL"]."',
                    '".$_POST["PLATFORM"]."',
                    '".$_POST["UUID"]."',
                    '".$_POST["VERSION"]."'
                    )";
  mysqli_query($con,$query);
?>