
function enviarDat(enlace,data,causa){ //Con JQuery Forma Registrar Usuario
    $.ajax({ //Envia los datos
            url : enlace, //Url
            data : JSON.stringify(data), //El formato Json
            method :'POST', //en este caso
            contentType: 'application/json; charset=utf-8',
            dataType : 'json', //El tipo de archivo            

            success : function (response){ //Si funciona
                   console.log("listo");
                   if(causa == 0){
                        registroExitoso();
                    } else if(causa == 1){
                        iniciarSesion(response);
                    } 
                    
            },
            error: function(error){ //Si falla
                if(causa == 0){
                    registroFallido(error);
                } else if(causa == 1){
                    inicioDeSesionFallida(error);
                }
            }
    });
}

function getDat(enlace,id,causa){ //Con JQuery Forma Registrar Usuario
    console.log(enlace+id);
    $.ajax({ //Envia los datos
            url : enlace + id, //Url            
            method :'GET', //en este caso
            contentType: 'application/json; charset=utf-8',               

            success : function (response){ //Si funciona
                   console.log("listo");
                    if(causa == 0) 
                        document.getElementById("name").innerHTML = response.firstName +" "+ response.lastName;
                    if(causa == 1)
                        window.location="index_User.html?var_="+response.firstName+"&var_="+response.lastName+"&var_="+id;
                    /*if(causa == 2)
                        document.getElementById("inputNombre").setAttribute(value,response.firstName);
                        console.log(response);
                        return response;*/
                    
            },
            error: function(error){ //Si falla
                    errorCargado(error);                 
            }
    });
    
}

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

function iniciarSesion(response){
    window.location="index_User.html?var_="+response.firstName+"&var_="+response.lastName+"&var_="+response.id;
}

function registroFallido(error){ //Si funciona
    alert("Error al registrarse:" + error);     
}

function inicioDeSesionFallida(error){
    respuesta = JSON.stringify(error.responseJSON.message);
    console.log(respuesta);
    if(respuesta == '"' + "Contrasena Incorrecta." + '"'){
        alert("Debe repetir la clave");
    }
    if(respuesta == '"'+"Email no encontrado."+'"'){
        alert("El correo no esta registrado");
    }

}


function errorCargado(error){ //respuesta al cargar los datos
    alert("no pudieron cargar los datos");    
}