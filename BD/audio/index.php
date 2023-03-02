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

    $sqlAudio = mysqli_query($conexionBD,"SELECT audio.id_disp_audio, audio.localizacion, audio.estado, tienda.cod_tienda FROM tienda INNER JOIN datos_central ON
    tienda.cod_tienda = datos_central.cod_tienda INNER JOIN audio ON datos_central.modelo = audio.modelo WHERE tienda.cod_tienda='$cod_tienda'");
    
    if(mysqli_num_rows($sqlAudio) > 0){
        $Audio = mysqli_fetch_all($sqlAudio,MYSQLI_ASSOC);
        echo json_encode($Audio);
        exit();
    }
    else{ echo json_encode([["success"=>0]]); }
    
    
}
if(isset($_GET["update1"])){
    $data = json_decode(file_get_contents("php://input"));

    $id = $data->id;
    $loca = $data-> loca;
    $tienda = $data->tienda;

    $sqlActualizar = mysqli_query($conexionBD, "UPDATE audio SET estado='Revisado', detalle='' WHERE id_disp_audio='$id' AND localizacion='$loca'");

    $sqlAudio = mysqli_query($conexionBD,"SELECT audio.id_disp_audio, audio.localizacion, audio.estado, tienda.cod_tienda FROM tienda INNER JOIN datos_central ON
    tienda.cod_tienda = datos_central.cod_tienda INNER JOIN audio ON datos_central.modelo = audio.modelo WHERE tienda.cod_tienda='$tienda'");

    if(mysqli_num_rows($sqlAudio) > 0){
        $Audio = mysqli_fetch_all($sqlAudio,MYSQLI_ASSOC);
        echo json_encode($Audio);
        exit();
    }
    else{ echo json_encode([["success"=>0]]); }
    
}

if(isset($_GET["update2"])){
    
    $data = json_decode(file_get_contents("php://input"));

    $Id = $data->Id;
    $detalle = $data->detalle;
    $loca = $data->localizacion;
    $cod_tienda = $data->cod_tienda;

    $sqlActualizar = mysqli_query($conexionBD, "UPDATE audio SET estado='No Aplica', detalle='$detalle' WHERE id_disp_audio='$Id' AND localizacion='$loca'");

    $sqlAudio = mysqli_query($conexionBD,"SELECT audio.id_disp_audio, audio.localizacion, audio.estado, tienda.cod_tienda FROM tienda INNER JOIN datos_central ON
    tienda.cod_tienda = datos_central.cod_tienda INNER JOIN audio ON datos_central.modelo = audio.modelo WHERE tienda.cod_tienda='$cod_tienda'");

    if(mysqli_num_rows($sqlAudio) > 0){
        $Audio = mysqli_fetch_all($sqlAudio,MYSQLI_ASSOC);
        echo json_encode($Audio);
        exit();
    }
    else{ echo json_encode([["success"=>0]]); }

}


?>