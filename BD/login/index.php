<?php

// Conecta a la base de datos  con usuario, contraseña y nombre de la BD
$servidor = "localhost"; $usuario = "root"; $contrasenia = "Ingelecsa2023@@"; $nombreBaseDatos = "ingelecsa";
$conexionBD = new mysqli($servidor, $usuario, $contrasenia, $nombreBaseDatos);

$data = json_decode(file_get_contents("php://input"));

$correo = $data->correo;
$empleado_passw = $data->empleado_passw;



$resultado = mysqli_query($conexionBD, "SELECT * FROM empleado WHERE correo='$correo' AND empleado_passw='$empleado_passw'");

$nums = mysqli_num_rows($resultado);

$rs= mysqli_fetch_array($resultado);



if($nums==1){
    http_response_code(200);
    $outp = "";
    
    $outp .= '{"rut":"'  .$rs["rut"]. '",';
    $outp .= '"Nombre":"'    .$rs["nombre"].'",';
    $outp .= '"Correo":"'    .$rs["correo"].'",';
    $outp .= '"Cargo":"'    .$rs["cargo"].'",';
    $outp .= '"Status":"200"}';

    echo $outp;
    

}

else{
    http_response_code(202);
}


/*
if($nums==1){
    echo json_encode('ok');
    exit();
    

}else{
    echo json_encode("Hubo un error");
    exit();
};
*/
?>