function enviarDat(enlace,data,causa){ //Con JQuery Forma Registrar Usuario
    $.ajax({ //Envia los datos
            url : enlace, //Url
            data : JSON.stringify(data), //El formato Json
            method :'POST', //en este caso
            contentType: 'application/json; charset=utf-8',
            dataType : 'json', //El tipo de archivo            

            success : function (response){ //Si funciona
                   console.log("listo");
                   ajaxStart();
                   if(causa == 0){
                        registroExitoso();
                    } else if(causa == 1){
                        iniciarSesion(response);
                    }else if (causa == 2){
                        cargarDato('https://ignsw201825-snproject.herokuapp.com/user/get/');
                    }
                    ajaxStop();
            },
            error: function(error){ //Si falla
                ajaxStart();
                if(causa == 0){
                    registroFallido(error);
                } else if(causa == 1){
                    inicioDeSesionFallida(error);
                }
                ajaxStop();
            }
    });
}

$(document).ready(function () {
    $(document).ajaxStart(function () {
        $("loading").show();
    }).ajaxStop(function () {
        $("loading").hide();
    });
});

function getDat(enlace,id,causa){ //Con JQuery Forma Registrar Usuario
    console.log("Usando el ajax para enviar " +enlace + id);
    $.ajax({ //Envia los datos
            url :enlace+id, //Url            
            method :'GET', //en este caso
            contentType: 'application/json; charset=utf-8',            

            success : function (response){ //Si funciona
                   console.log("listo");
                    if(causa == 0) 
                        document.getElementById("name").innerHTML = response.firstName +" "+ response.lastName;
                    if(causa == 1)
                        window.location="index_User.html?var_="+response.firstName+"&var_="+response.lastName+"&var_="+id;
                    if(causa == 2) {                       
                        var array =[response.firstName,response.lastName,response.email,response.password];
                        modificarCampos(array,id);                        
                    }                                
            },
            error: function(error){ //Si falla
                    errorCargado(error);                 
            }
    });
    
}
function modificarDat(enlace,data,causa){ //Con JQuery Forma Registrar Usuario
    $.ajax({ //Envia los datos
            url : enlace, //Url
            data : JSON.stringify(data), //El formato Json
            method :'PUT', //en este caso
            contentType: 'application/json; charset=utf-8',
            dataType : 'json', //El tipo de archivo            

            success : function (response){ //Si funciona  
                    console.log("campos modificados");                 
                     cargarDato('https://ignsw201825-snproject.herokuapp.com/user/get/');
                     alert("Datos Modificados Exitosamente!");
                     modificacionExitosa();                     
            },
            error: function(error){ //Si falla               
            }
    });
}
//Condiciones de datos
function registroExitoso(){ //Si funciona
    console.log("listo");
     $(nombreRegistro).val("");
     $(apellidoRegistro).val("");
     $(emailRegistro).val("");
     $(pass1).val("");
     $(pass2).val("");

     $(pass1).css("border","solid #101010");
     $(pass2).css("border","solid #101010");
     $(emailRegistro).css("border","solid #101010");
     $(emailRegistro).css("background-color","#101010");
}

function modificacionExitosa() {
     $(inputNombre).val("");
     $(inputApellido).val("");
     $(inputEmail4).val("");
     $(inputPassword4).val("");    
}

function iniciarSesion(response){
    var nombre = ""+response.firstName;
    var apellido = ""+response.lastName;
    var id = ""+response.id;
    var token = ""+response.authToken;
    sessionStorage.setItem("nombre",nombre);
    sessionStorage.setItem("apellido",apellido);
    sessionStorage.setItem("id",id);
    sessionStorage.setItem("token",token);   
    window.location="index_User.html?var_="+response.firstName+"&var_="+response.lastName+"&var_="+response.id+"&var_="+response.authToken;
}

function registroFallido(error){ //Si funciona
    alert("Error al registrarse:" + error);     
}

function inicioDeSesionFallida(error){
    respuesta = JSON.stringify(error.responseJSON.message);
    console.log(respuesta);
    if(respuesta == '"' + "invalid_pass" + '"'){
        alert("Debe repetir la clave");
    }
    if(respuesta == '"'+"invalid_mail"+'"'){
        alert("El correo no esta registrado");
    }

}

function errorCargado(error){ //respuesta al cargar los datos
    alert("No se logro cargar los datos:" + error);    
}

function modificarCampos(antiguosDatos,id){
   
    if($(inputNombre).val().length > 0){
        antiguosDatos[0] = $(inputNombre).val();    
    }
    if($(inputApellido).val().length > 0){
        antiguosDatos[1] = $(inputApellido).val();    
    }
    if($(inputEmail4).val().length > 0){
        antiguosDatos[2] = $(inputEmail4).val();    
    }    
    if($(inputPassword4).val().length > 0){
        antiguosDatos[3] = $(inputPassword4).val();    
    }  
    var url = "https://ignsw201825-snproject.herokuapp.com/user/update/"+id;
    var myJson = { //Creando JSON Con el formato      
        "firstName"             : antiguosDatos[0],
        "lastName"              : antiguosDatos[1],
        "email"                 : antiguosDatos[2],
        "password"              : antiguosDatos[3],       
        "dateOfBirth"           : "22/05/94"        
    } 
    modificarDat(url,myJson,2);

}
