
    

function formalizar(){    

    if( campoVacio() && //Comprueba si esta algun campo sin completar
        longitud()   && //Comprueba si las contraseñas tienen la longitud correcto
        comparar()   && //comprueba si las contraseñas son iguales
        correoValido()){//comprueba que el correo tiene @ y termina en .com
            //Si se cumplen los campos anteriores
            console.log("Creando JSON");  
            //enviar(); //Ejecuta la funcion enviar que esta de ultima
              
        } else
            console.error("No se puede crear JSON"); //Si no se cumplen los requisitos
}

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

//Comunicacion con el servidor  
function crearJson (){ //Crea el archivo json para enviar
    var myJson = { //Creando JSON Con el formato

        "firstName"             : $(nombreRegistro).val(),
        "lastName"              : $(apellidoRegistro).val(),
        "email"                 : $(emailRegistro).val(),
        "password"              : $(pass1).val(),
        "confirmationPassword"  : $(pass2).val()

    }    
    return myJson; //Devuelve el archivo tipo json
}

function enviar(){ //Con JQuery Forma 1
    var data = crearJson(); //Almacena en una variable el json para luego enviarlo por http
    console.log("Echo");
    $.ajax({ //Envia los datos
            url : 'https://ignsw201825-snproject.herokuapp.com/user/register', //Url
            data : JSON.stringify(data), //El formato Json
            method :'POST', //en este caso
            contentType: 'application/json; charset=utf-8',
            dataType : 'json', //El tipo de archivo            

            success : function(response){ //Si funciona
                   console.log("listo");
            },
            error: function(error){ //Si falla
                console.log("fallo");
            }
    });
}
