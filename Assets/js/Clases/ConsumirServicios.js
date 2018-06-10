/* Registro del usuario */
function enviarSolicitudDeRegistro(enlaceUrlHeroku,jsonConLosDatos){ 
     
     $.ajax({
         url : enlaceUrlHeroku, 
         data : JSON.stringify(jsonConLosDatos), 
         method :'POST', 
         contentType: 'application/json; charset=utf-8',
         dataType : 'json', 

         success : function (response){ 
             console.log("listo");            
             registroExitoso();                 
             },
         error: function(error){             
             registroFallido(error);               
         }
     });
     
}

function registroExitoso(){
    ocultarCarga();    
     $(nombreRegistro).val("");
     $(apellidoRegistro).val("");
     $(emailRegistro).val("");
     $(pass1).val("");
     $(pass2).val("");
     $(pass1).css("border","solid #101010");
     $(pass2).css("border","solid #101010");
     $(emailRegistro).css("border","solid #101010");
     $(emailRegistro).css("background-color","#101010");
     $(fechaRegistro).val("");
}

function registroFallido(error){
    ocultarCarga(); 
    alert("Error al registrarse:" + error);
}


/* Inicio de session */
 function enviarSolicitudDeLogin(enlaceUrlHeroku){ //Con JQuery Forma Registrar Usuario
    mostrarCarga();
     var jsonConLosDatos = { //Creando JSON Con el formato
         "email"       : $(correoLog).val(),
         "password"    : btoa($(claveLog).val()),    
         }      

     $.ajax({ //Envia los datos
         
         url : enlaceUrlHeroku, //Url
         data : JSON.stringify(jsonConLosDatos), //El formato Json
         method :'POST', //en este caso
         contentType: 'application/json; charset=utf-8',
         dataType : 'json', //El tipo de archivo            

         success : function (response){ //Si funciona
             guardarDatosDelUsuario(response);                         
         },
         error: function(error){ //Si falla                        
             inicioDeSesionFallida(error);            
         }
     });
 }
 function guardarDatosDelUsuario(response){

    var id                = ""+response.id;
    var token             = ""+response.authToken;
    var nombre            = ""+response.firstName;
    var apellido          = ""+response.lastName; 
    var fechaDeNAcimiento = ""+ response.dateOfBirth;

    sessionStorage.setItem("id",id);
    sessionStorage.setItem("token",token);
    sessionStorage.setItem("nombre",nombre);
    sessionStorage.setItem("apellido",apellido);
    sessionStorage.setItem("fechaDeNAcimiento",fechaDeNAcimiento);  
    ocultarCarga();
    window.location="index_User.html?var_="+response.firstName+"&var_="+response.lastName+"&var_="+response.id+"&var_="+response.authToken;
}
function inicioDeSesionFallida(error){
    ocultarCarga();
    respuesta = JSON.stringify(error.responseJSON.message);
    console.log(respuesta);
    if(respuesta == '"' + "invalid_pass" + '"'){
        alert("Contraseña erronea");
    }
    if(respuesta == '"'+"invalid_mail"+'"'){
        alert("El correo no esta registrado");
    }
}
/*Salir*/

function salirDeLaPagina(enlaceUrlHeroku){ 
    var id =    "" +sessionStorage.getItem("id");
    var token = "" +sessionStorage.getItem("token");
    var jsonConLosDatos  = { //Creando JSON Con el formato
        "id"           :id,
        "authToken"    : token,   
    } 

     $.ajax({
         url : enlaceUrlHeroku, 
         data : JSON.stringify(jsonConLosDatos), 
         method :'POST', 
         contentType: 'application/json; charset=utf-8',
         dataType : 'json', 

         success : function (response){ 
            sessionStorage.clear();
            window.location = "index.html";                
             },
         error: function(error){             
            alert("No pudo hacer logOut");                
         }
     });
}

/*Enviar modificacion de perfil */
function modificarDatosDelUsuario(){ 

    var  campoModificado=["","","","",""];

    if($(inputNombre).val().length > 0){
         campoModificado[0] = $(inputNombre).val();    
   }else
         campoModificado[0] = "";
   
   if($(inputApellido).val().length > 0){
         campoModificado[1] = $(inputApellido).val();    
   }else
         campoModificado[1] = "";

   if($(inputEmail4).val().length > 0){
         campoModificado[2] = $(inputEmail4).val();    
   }else
         campoModificado[2] = "";

   if($(inputPassword4).val().length > 0){
         campoModificado[3] = $(inputPassword4).val();    
   }else
         campoModificado[3] = "";

    var datosJson = { //Creando JSON Con el formato      
        "firstName"             : ""+campoModificado[0],
        "lastName"              : ""+campoModificado[1],
        "email"                 : ""+campoModificado[2],
        "password"              : ""+btoa(campoModificado[3]),       
        "dateOfBirth"           : ""+sessionStorage.getItem('fechaDeNAcimiento'),
        "authToken"             : ""+sessionStorage.getItem('token')

    }
    var urlHeroku = "https://ignsw201825-snproject.herokuapp.com/user/update/" + sessionStorage.getItem('id');
    console.log(datosJson);
    $.ajax({ 
            url :urlHeroku, //Url    
            data : JSON.stringify(datosJson),        
            method :'PUT', //en este caso
            contentType: 'application/json; charset=utf-8', 
            dataType :'json',           

            success : function (response){ //Si funciona
                   sessionStorage.setItem("nombre",campoModificado[0]);
                   sessionStorage.setItem("apellido",campoModificado[1]);
                   sessionStorage.setItem("fechaDeNAcimiento",sessionStorage.getItem('fechaDeNAcimiento'));
                   location.reload();
                   console.log("listo");                   
            },
            error: function(error){ //Si falla
                 console.log(error);                
            }
    });    
}

