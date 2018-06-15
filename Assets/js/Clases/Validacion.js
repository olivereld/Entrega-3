function mostrarError(errorParametro){
        
    if(errorParametro == 0){
        $("#campos-vacios").css("display","block");
        
        $("#clave-erronea").css("display","none");
        $("#correo-no-registrado").css("display","none");
        $("#campos-vacios-login").css("display","none");
        $("#campo-nacimiento").css("display","none");
        $("#fecha-invalida").css("display","none");
        $("#repeticion-contraseña").css("display","none");
        $("#longitud-contraseña").css("display","none");  
        $("#formato-correo").css("display","none");   
        $("#correo-existente").css("display","none"); 
    }else if(errorParametro == 1){       
        $("#formato-correo").css("display","block");
        
        $("#clave-erronea").css("display","none");
        $("#correo-no-registrado").css("display","none");
        $("#campos-vacios-login").css("display","none");
        $("#fecha-invalida").css("display","none");
        $("#campo-nacimiento").css("display","none");
        $("#repeticion-contraseña").css("display","none");
        $("#campos-vacios").css("display","none");            
        $("#longitud-contraseña").css("display","none");     
        $("#correo-existente").css("display","none");
    }else if(errorParametro == 2){     
        $("#longitud-contraseña").css("display","block"); 
        
        $("#clave-erronea").css("display","none");
        $("#correo-no-registrado").css("display","none");
        $("#campos-vacios-login").css("display","none");
        $("#fecha-invalida").css("display","none");
        $("#campo-nacimiento").css("display","none");
        $("#repeticion-contraseña").css("display","none");
        $("#formato-correo").css("display","none");
        $("#campos-vacios").css("display","none");          
        $("#correo-existente").css("display","none");
    }else if(errorParametro == 3){ 
        $("#repeticion-contraseña").css("display","block");
        
        $("#clave-erronea").css("display","none");
        $("#correo-no-registrado").css("display","none");
        $("#campos-vacios-login").css("display","none");
        $("#fecha-invalida").css("display","none");
        $("#campo-nacimiento").css("display","none");
        $("#longitud-contraseña").css("display","none"); 
        $("#formato-correo").css("display","none");
        $("#campos-vacios").css("display","none");          
        $("#correo-existente").css("display","none");
    }else if(errorParametro == 4){
        $("#campo-nacimiento").css("display","block");

        $("#clave-erronea").css("display","none");
        $("#correo-no-registrado").css("display","none");
        $("#campos-vacios-login").css("display","none");
        $("#fecha-invalida").css("display","none");
        $("#repeticion-contraseña").css("display","none");        
        $("#longitud-contraseña").css("display","none"); 
        $("#formato-correo").css("display","none");
        $("#campos-vacios").css("display","none");          
        $("#correo-existente").css("display","none");
    }else if(errorParametro == 5){        
        $("#fecha-invalida").css("display","block");

        $("#clave-erronea").css("display","none");
        $("#correo-no-registrado").css("display","none");
        $("#campos-vacios-login").css("display","none");
        $("#campo-nacimiento").css("display","none");
        $("#repeticion-contraseña").css("display","none");        
        $("#longitud-contraseña").css("display","none"); 
        $("#formato-correo").css("display","none");
        $("#campos-vacios").css("display","none");          
        $("#correo-existente").css("display","none");
    }else if(errorParametro == 6){        
        $("#correo-existente").css("display","block");

        $("#clave-erronea").css("display","none");
        $("#correo-no-registrado").css("display","none");
        $("#campos-vacios-login").css("display","none");
        $("#fecha-invalida").css("display","none");
        $("#campo-nacimiento").css("display","none");
        $("#repeticion-contraseña").css("display","none");        
        $("#longitud-contraseña").css("display","none"); 
        $("#formato-correo").css("display","none");
        $("#campos-vacios").css("display","none");        
    }else if(errorParametro == 7){        
        $("#campos-vacios-login").css("display","block");

        $("#clave-erronea").css("display","none");
        $("#correo-no-registrado").css("display","none");
        $("#correo-existente").css("display","none");
        $("#fecha-invalida").css("display","none");
        $("#campo-nacimiento").css("display","none");
        $("#repeticion-contraseña").css("display","none");        
        $("#longitud-contraseña").css("display","none"); 
        $("#formato-correo").css("display","none");
        $("#campos-vacios").css("display","none");        
    }else if(errorParametro == 8){   
        $("#correo-no-registrado").css("display","block");

        $("#clave-erronea").css("display","none"); 
        $("#campos-vacios-login").css("display","none");       
        $("#correo-existente").css("display","none");
        $("#fecha-invalida").css("display","none");
        $("#campo-nacimiento").css("display","none");
        $("#repeticion-contraseña").css("display","none");        
        $("#longitud-contraseña").css("display","none"); 
        $("#formato-correo").css("display","none");
        $("#campos-vacios").css("display","none");        
    } else if(errorParametro == 9){ 
        $("#clave-erronea").css("display","block");  

        $("#correo-no-registrado").css("display","none");
        $("#campos-vacios-login").css("display","none");       
        $("#correo-existente").css("display","none");
        $("#fecha-invalida").css("display","none");
        $("#campo-nacimiento").css("display","none");
        $("#repeticion-contraseña").css("display","none");        
        $("#longitud-contraseña").css("display","none"); 
        $("#formato-correo").css("display","none");
        $("#campos-vacios").css("display","none");        
    }                       
    
    $("#errorModal").modal();
}
function tratarFallos( jqXHR, textStatus, errorThrown){

   
    if (jqXHR.status == 0) {

        //console.log('Not connect: Verify Network.');

      } else if (jqXHR.status == 404) {

       // console.log('Requested page not found [404]');

      } else if (jqXHR.status == 500) {

       // console.log('Internal Server Error [500].');

      } else if (textStatus === 'parsererror') {

       // console.log('Requested JSON parse failed.');

      } else if (textStatus === 'timeout') {

       // console.log('Time out error.');

      } else if (textStatus === 'abort') {

       // console.log('Ajax request aborted.');

      } else {
       // console.log('Uncaught Error: ' + jqXHR.responseText);
      }
        //"invalid_date 
    if ( jqXHR.responseText.indexOf("invalid_date")  > - 1){
        mostrarError(5);
    } else if ( jqXHR.responseText.indexOf("email_already_registered") > - 1){
        mostrarError(6);
    }else if (jqXHR.responseText.indexOf("invalid_emai") > -1){
        mostrarError(8);
    }else if (jqXHR.responseText.indexOf("invalid_pass") > -1){
        mostrarError(9);
    }else if (jqXHR.responseText.indexOf("album_name_already_used") > -1){
        $("#errorModal").modal();
    }
    
}
function camposDelLoginllenos(){
    var camposLlenos = true;
       if($(correoLog).val().length <= 0 || $(correoLog).val() == "" ){
           camposLlenos = false;
       }
       if($(claveLog).val().length <= 0 || $(claveLog).val() == "" ){
           camposLlenos = false;
       }
    return camposLlenos;
}

function campoFechaValida(){
    var fechaValida = true;
    console.log($("#diaRegistro").val());
    console.log($("#mesRegistro").val());
    console.log($("#anoRegistro").val());
    if($("#mesRegistro").val() == '00'){        
        fechaValidar = false;   
    }
    if($("#anoRegistro").val() == 'Año'){        
        fechaValida = false;   
    }
    if($("#diaRegistro").val() == ''){        
        fechaValida = false;   
    }

    return fechaValida;
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
        console.log("Campos Llenos");
    }

       return validar;        
}
function longitudClave(parametro){//Las contraseñas deben tener 7 o mas caracteres

    if($(parametro).val().length < 6){               
        return false;
    }else{       
        return true;
    }
}

function comparar(){//comprueba si se repitio correctamente la contraseña
    if($(pass1).val() == $(pass2).val()){
        console.log(" Contraseñas Iguales");
        return true;
    }else{
        console.log(" Contraseñas Diferentes");
        return false;
    }
}

function correoValido(campoEmail,color){//Verifica si un correo es valido

    if($(campoEmail).val().indexOf("@") > -1 && $(campoEmail).val().indexOf(".com") > -1){
        console.log("Email Valido");
        if(color > 0)
            $(campoEmail).css("border","solid #87ee8c");

        return true;
    }else{        
        if(color > 0)
            $(campoEmail).css("border","solid #ec6464");

        return false;
    }
}