import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput, Keyboard, 
    Platform, SafeAreaView, ScrollView } from 'react-native';
import * as XLSX from 'xlsx';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import React from 'react';
import { Picker } from '@react-native-picker/picker';

class DocGeneration extends React.Component{
    constructor(props){
        super(props)
        this.state={
            nombre_tiendas: [],
            seleccion_tienda: '',
            ubicacion: '',
            jefe_zonal: '',
            tipo_mant: '',
            fecha_inicio: '', 
            fecha_termino: '',

            criticidad: '',
            principal_problema: '',
            origen: '',
            recomendacion: '',
            ubicacion_problema: '',

            api: "192.168.0.154" //Depende de tu direccion IPv4

        }
}

componentDidMount() {


    const {api} = this.state;
    fetch('http://'+api+'/ingelecsa/tienda/')
    .then(respuesta=>respuesta.json())
    .then((datosRespuesta)=>{
        this.setState({ nombre_tiendas: datosRespuesta})
        
    })
    .catch((error)=>{
        console.log(error);
    })
};

render(){

    enviarDatos = ()=> {
        Keyboard.dismiss();

        const {api} = this.state;

        const{seleccion_tienda, ubicacion, jefe_zonal, tipo_mant,
        fecha_inicio, fecha_termino, criticidad, principal_problema,
        origen, recomendacion, ubicacion_problema} = this.state;

        
        
        var datosEnviar = {seleccion_tienda:seleccion_tienda, ubicacion:ubicacion,
        jefe_zonal:jefe_zonal, tipo_mant:tipo_mant, fecha_inicio:fecha_inicio,
        fecha_termino:fecha_termino, criticidad:criticidad, 
        principal_problema:principal_problema,
        origen:origen, recomendacion:recomendacion, 
        ubicacion_problema:ubicacion_problema};
            

        fetch('http://'+api+'/ingelecsa/informes/?insertar=1',{
            method:"POST",
            body:JSON.stringify(datosEnviar)
        }).then(respuesta=>respuesta.json())
        .then((datosRespuesta)=>{
            console.log(datosRespuesta);
            let wb = XLSX.utils.book_new();
            let ws = XLSX.utils.aoa_to_sheet([
                ["Tienda", seleccion_tienda, "Ubicacion", ubicacion],
                ["Jefe de Zona", jefe_zonal, "Tipo Mantención", tipo_mant],
                ["Fecha Inicio", fecha_inicio, "Fecha Fin", fecha_termino],
                ["", "", "", ""],
                ["Criticidad",criticidad, "Principal Problema", principal_problema, 
                "Origen", origen, "Recomendación", recomendacion, "Ubicación", ubicacion_problema]
            ]);
            XLSX.utils.book_append_sheet(wb, ws, "MyFirstSheet", true);
            const base64 = XLSX.write(wb, { type: "base64" });//Escritura de datos en el Excel
            const filename = FileSystem.documentDirectory + "MyExcel.xlsx";
            FileSystem.writeAsStringAsync(filename, base64, {//Crea documento y lo escribe con los datos correspondientes
                encoding: FileSystem.EncodingType.Base64
            }).then(() => {
                Sharing.shareAsync(filename);
            });
            
        })
        .catch(console.log);
    };
    

    let tienda = this.state.nombre_tiendas.map((seleccion_tienda)=>{
        
        return(
            <Picker.Item 
            label={seleccion_tienda.nombre_tienda}
            key={seleccion_tienda.cod_tienda} value={seleccion_tienda.nombre_tienda}></Picker.Item>
        )
    })

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>
            <View style={styles.body}>
            <Text>Hoja de Servicio</Text>
            <Text>Datos Tienda</Text>

            <Text>Tienda</Text>
            <Picker
            selectedValue={this.state.seleccion_tienda}
            onValueChange={(value)=> this.setState({seleccion_tienda:value})}
            style={styles.textInput}>
                {tienda}
            </Picker>
            

            <Text>Ubicacion</Text>
            <TextInput
            style={styles.textInput}
            onChangeText={(ubicacion)=> this.setState({ubicacion})}/>

            <Text>Jefe Zonal</Text>
            <TextInput
            style={styles.textInput}
            onChangeText={(jefe_zonal)=> this.setState({jefe_zonal})}/>

            <Text>Tipo de Servicio</Text>
            <TextInput
            style={styles.textInput}
            onChangeText={(tipo_mant)=> this.setState({tipo_mant})}/>
            
            <Text>Fecha Inicio</Text>
            <TextInput
            style={styles.textInput}
            placeholder={"AA-MM-DD"}
            onChangeText={(fecha_inicio)=> this.setState({fecha_inicio})}/>
            
            <Text>Fecha Termino</Text>
            <TextInput
            style={styles.textInput}
            placeholder={"AA-MM-DD"}
            onChangeText={(fecha_termino)=> this.setState({fecha_termino})}/>
            
     
                <Text>Observaciones</Text>

                <Text>Criticidad</Text>
                <TextInput
                style={styles.textInput}
                onChangeText={(criticidad)=> this.setState({criticidad})}/>

                <Text>Principal Problema</Text>
                <TextInput
                style={styles.textInput}
                onChangeText={(principal_problema)=> this.setState({principal_problema})}/>

                <Text>Origen</Text>
                <TextInput
                style={styles.textInput}
                onChangeText={(origen)=> this.setState({origen})}/>

                <Text>Recomendación</Text>
                <TextInput
                style={styles.textInput}
                onChangeText={(recomendacion)=> this.setState({recomendacion})}/>

                <Text>Ubicación Problema</Text>
                <TextInput
                style={styles.textInput}
                onChangeText={(ubicacion_problema)=> this.setState({ubicacion_problema})}/>


            <Button title="Enviar Informe" onPress={enviarDatos} />
            
            <StatusBar style="auto"/>
            </View>
            <View>
                <Text> </Text>
                <Text> </Text>
            </View>
            </ScrollView>
        </SafeAreaView>
          );
        }
        
    
}export default DocGeneration;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: Platform.OS === "android" ? 35:0,
    },
    body: {
        justifyContent: "center",
        alignItems: "center"
    },
    textInput:{
        justifyContent: "center",
        width: 350,
        height: 35,
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 8,
        borderWidth: 1,
        paddingLeft: 5,
    },
    scrollView: {
        marginHorizontal: 20,
        marginTop:2
    }
  });

