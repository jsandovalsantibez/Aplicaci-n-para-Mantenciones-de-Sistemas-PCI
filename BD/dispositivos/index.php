<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET,POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Conecta a la base de datos  con usuario, contraseña y nombre de la BD
$servidor = "localhost"; $usuario = "root"; $contrasenia = "@@Macc22"; $nombreBaseDatos = "ingelecsa";
$conexionBD = new mysqli($servidor, $usuario, $contrasenia, $nombreBaseDatos);
if(isset($_GET["insertar"])){
    
    $data = json_decode(file_get_contents("php://input"));

    $sqlTienda = mysqli_query($conexionBD,"SELECT cod_tienda FROM tienda WHERE nombre_tienda='$data'");
    $cod_tienda = mysqli_fetch_Column($sqlTienda);

    $sqlDispositivos = mysqli_query($conexionBD,"SELECT dispositivos.identificador, dispositivos.localizacion, dispositivos.estado, tienda.cod_tienda FROM tienda INNER JOIN datos_central ON
    tienda.cod_tienda = datos_central.cod_tienda INNER JOIN dispositivos ON datos_central.modelo = dispositivos.modelo WHERE tienda.cod_tienda='$cod_tienda'");
    
    if(mysqli_num_rows($sqlDispositivos) > 0){
        $Dispositivos = mysqli_fetch_all($sqlDispositivos,MYSQLI_ASSOC);
        echo json_encode($Dispositivos);
        exit();
    }
    else{ echo json_encode([["success"=>0]]); }
    
    
}
if(isset($_GET["update1"])){
    
    $data = json_decode(file_get_contents("php://input"));
    
    $ident = $data->ident;
    $loca = $data-> loca;
    $tienda= $data->tienda;

    $sqlActualizar = mysqli_query($conexionBD, "UPDATE dispositivos SET estado='Revisado', detalle='' WHERE identificador='$ident' AND localizacion='$loca'");

    $sqlDispositivos = mysqli_query($conexionBD,"SELECT dispositivos.identificador, dispositivos.localizacion, dispositivos.estado, tienda.cod_tienda FROM tienda INNER JOIN datos_central ON
    tienda.cod_tienda = datos_central.cod_tienda INNER JOIN dispositivos ON datos_central.modelo = dispositivos.modelo WHERE tienda.cod_tienda='$tienda'");
    
    if(mysqli_num_rows($sqlDispositivos) > 0){
        $Dispositivos = mysqli_fetch_all($sqlDispositivos,MYSQLI_ASSOC);
        echo json_encode($Dispositivos);
        exit();
    }
    else{ echo json_encode([["success"=>0]]); }

    
}

if(isset($_GET["update2"])){
    
    $data = json_decode(file_get_contents("php://input"));
    
    $ident = $data->identificador;
    $detalle = $data->detalle;
    $loca = $data->localizacion;
    $cod_tienda = $data->cod_tienda;

    $sqlActualizar = mysqli_query($conexionBD, "UPDATE dispositivos SET estado='No Aplica', detalle='$detalle' WHERE identificador='$ident' AND localizacion='$loca'");
    
    $sqlDispositivos = mysqli_query($conexionBD,"SELECT dispositivos.identificador, dispositivos.localizacion, dispositivos.estado, tienda.cod_tienda FROM tienda INNER JOIN datos_central ON
    tienda.cod_tienda = datos_central.cod_tienda INNER JOIN dispositivos ON datos_central.modelo = dispositivos.modelo WHERE tienda.cod_tienda='$cod_tienda'");
    
    if(mysqli_num_rows($sqlDispositivos) > 0){
        $Dispositivos = mysqli_fetch_all($sqlDispositivos,MYSQLI_ASSOC);
        echo json_encode($Dispositivos);
        exit();
    }
    else{ echo json_encode([["success"=>0]]); }

}


?>