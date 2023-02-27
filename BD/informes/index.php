<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET,POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Conecta a la base de datos  con usuario, contraseña y nombre de la BD
$servidor = "localhost"; $usuario = "root"; $contrasenia = "Ingelecsa2023@@"; $nombreBaseDatos = "ingelecsa";
$conexionBD = new mysqli($servidor, $usuario, $contrasenia, $nombreBaseDatos);


if(isset($_GET["insertar"])){
    $data = json_decode(file_get_contents("php://input"));
    
    //Centro de costos
    $seleccion_tienda=$data->seleccion_tienda;

    $ubicacion=$data->ubicacion;
    $jefe_zonal=$data->jefe_zonal;
    $tipo_mant=$data->tipo_mant;
    $fecha_inicio=$data->fecha_inicio;
    $fecha_termino=$data->fecha_termino;
    
    
    //Observaciones
    $criticidad=$data->criticidad;
    $principal_problema=$data->principal_problema;
    $origen=$data->origen;
    $recomendacion=$data->recomendacion;
    $ubicacion_problema=$data->ubicacion_problema;


    $sqlTienda = mysqli_query($conexionBD,"SELECT cod_tienda FROM tienda WHERE nombre_tienda='$seleccion_tienda'");
    
    $cod_tienda = mysqli_fetch_Column($sqlTienda);

    

    //Insertar datos del centro de costos

    $sqlCentroCost = mysqli_query($conexionBD,"INSERT INTO centro_costos(ubicacion, 
    jefe_zonal, tipo_mant, fecha_inicio, fecha_termino, cod_tienda) VALUES ('$ubicacion', '$jefe_zonal',
    '$tipo_mant', '$fecha_inicio', '$fecha_termino', '$cod_tienda')");

    //Buscar el codigo de la clave forranea del documento
    $sqlCod_doc_centro = mysqli_query($conexionBD,"SELECT cod_doc_centro FROM centro_costos WHERE cod_tienda='$cod_tienda' AND fecha_inicio='$fecha_inicio'");
    $cod_doc_centro = mysqli_fetch_Column($sqlCod_doc_centro);

    
    //Insertamos los datos del documento correspondiente al centro de costos anterior en hoja de servicios

    $sqlHoja_servicios = mysqli_query($conexionBD,"INSERT INTO hoja_servicios(criticidad, principal_problema, origen, 
    recomendacion, ubicacion_problema, cod_doc_centro) VALUES ('$criticidad', '$principal_problema', '$origen',
     '$recomendacion', '$ubicacion_problema', '$cod_doc_centro')");

    echo json_encode(["success"=>1]);
    
    exit();
}




?>