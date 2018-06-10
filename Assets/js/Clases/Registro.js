  

function campoVacio(){//Comprobara que los campos se llenen
    var validar = true;

    if ($(pass1).val() == ''){
        $(pass1).css("border","solid #ec6464");
        validar = false;
    } 
    if ($(pass2).val() == ''){
        $(pass2).css("border","solid #ec6464");
        validar = false;
    } 
    if($(nombreRegistro).val() == '' ){
        $(nombreRegistro).css("border","solid #ec6464");
        validar = false;
    } 
    if($(apellidoRegistro).val() == ''){
        $(apellidoRegistro).css("border","solid #ec6464");
        validar = false;
    } 
    if($(emailRegistro).val() == ''){
        $(emailRegistro).css("border","solid #ec6464");
        validar = false;   
    }

    if(validar){
        console.log("Campos llenos");
    }else
        alert("Debe llenar todos los");
    return validar;        
}

function longitud(){//Las contraseñas deben tener 7 o mas caracteres

    if($(pass1).val().length < 7){
        console.log("La contraseña es muy corta");
        return false;
    }else{
        console.log("clave de tamaño correcto");
        return true;
    }
}

function comparar(){//comprueba si se repitio correctamente la contraseña
    if($(pass1).val() == $(pass2).val()){
        console.log(" contraseñas Iguales");
        return true;
    }else{
        console.log(" contraseñas Diferentes");
        return false;
    }
}

function correoValido(){//Verifica si un correo es valido
    if($(emailRegistro).val().indexOf("@") > -1 && $(emailRegistro).val().indexOf(".com") > -1){
        console.log("Email valido");
        $(emailRegistro).css("border","solid #87ee8c");
        return true;
    }else{
        console.log("Email Invalido");
        $(emailRegistro).css("border","solid #ec6464");
        return false;
    }
}

//Comunicacion con el servidor -------------------------------------------------------------------------------
function formalizar(urlServidor){
    mostrarCarga();
    var date      = ""+$(fechaRegistro).val();
    var password  = ""+btoa($(pass1).val());
    var password2 = ""+btoa($(pass2).val());   

    if( campoVacio() && longitud() && comparar() && correoValido()){
            
        console.log("Creando JSON");  
        var jsonConRegistroDeUsuario = {      
            "firstName"             : $(nombreRegistro).val(),
            "lastName"              : $(apellidoRegistro).val(),
            "email"                 : $(emailRegistro).val(),
            "password"              : password,
            "confirmationPassword"  : password2,
            "dateOfBirth"           : date     
        }        
        enviarSolicitudDeRegistro(urlServidor,jsonConRegistroDeUsuario); //Ejecuta la funcion enviar que esta de ultima              
     } else{
        ocultarCarga();
        console.error("No se puede crear JSON"); //Si no se cumplen los requisitos
    }
}


