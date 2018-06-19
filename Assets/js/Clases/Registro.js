

//Comunicacion con el servidor -------------------------------------------------------------------------------
function formalizar(urlServidor){
    mostrarCarga();
    var date      = ""+$(anoRegistro).val()+"/"+$(mesRegistro).val()+"/"+$(diaRegistro).val()+"";
    var password  = ""+btoa($(pass1).val());
    var password2 = ""+btoa($(pass2).val());
    var genero    = verificarGenero();

    var resultadoDeValidacionCamposVacios  = campoVacio();
    var resultadoDeValidacionLongitudClave = longitudClave("#pass1");
    var resultadoDeValidacionClavesIguales = comparar();
    var resultadoDeValidacionCorreoValido  = correoValido("#emailRegistro",1);
    var resultadoDeValidacionFecha         = campoFechaValida();

    if( resultadoDeValidacionCamposVacios  &&
        resultadoDeValidacionLongitudClave &&
        resultadoDeValidacionClavesIguales &&
        resultadoDeValidacionCorreoValido  &&
        resultadoDeValidacionFecha ){
            
        console.log("Creando JSON");  
        var jsonConRegistroDeUsuario = {      
            "firstName"             : $(nombreRegistro).val(),
            "lastName"              : $(apellidoRegistro).val(),
            "email"                 : $(emailRegistro).val(),
            "password"              : password,
            "confirmationPassword"  : password2,
            "dateOfBirth"           : date, 
            "gender"                :genero,    
        }        
        enviarSolicitudDeRegistro(urlServidor,jsonConRegistroDeUsuario); //Ejecuta la funcion enviar que esta de ultima              
        
    } else{
        ocultarCarga();
        if (!resultadoDeValidacionCamposVacios){     mostrarError(0);}
        else if (!resultadoDeValidacionCorreoValido){  mostrarError(1);}
        else if (!resultadoDeValidacionLongitudClave){ mostrarError(2);}
        else if (!resultadoDeValidacionClavesIguales){  mostrarError(3);} 
        else if (!resultadoDeValidacionFecha){mostrarError(4);}       
        console.error("No se puede crear JSON"); //Si no se cumplen los requisitos
    }
}

function verificarGenero(){
    var genero;

    if($("#radio1").prop('checked')){
        genero = "male";
    }else
        genero = "female";

    console.log(genero);

    return genero;
}


