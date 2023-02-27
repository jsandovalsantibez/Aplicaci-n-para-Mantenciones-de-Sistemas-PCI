<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET,POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Conecta a la base de datos  con usuario, contraseña y nombre de la BD
$servidor = "localhost"; $usuario = "root"; $contrasenia = "Ingelecsa2023@@"; $nombreBaseDatos = "ingelecsa";
$conexionBD = new mysqli($servidor, $usuario, $contrasenia, $nombreBaseDatos);



$sqlTienda = mysqli_query($conexionBD,"SELECT * FROM tienda ");
if(mysqli_num_rows($sqlTienda) > 0){
    $Tienda = mysqli_fetch_all($sqlTienda,MYSQLI_ASSOC);
    echo json_encode($Tienda);
}
else{ echo json_encode([["success"=>0]]); }


?>