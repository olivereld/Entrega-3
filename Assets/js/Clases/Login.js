var respuesta = "";
function crearJson (){ //Crea el archivo json para enviar
    var myJson = 
    { //Creando JSON Con el formato
        "email"       : $(correoLog).val(),
        "password"    : $(claveLog).val(),    
    }    
    return myJson; //Devuelve el archivo tipo json
}

function enviarLog(){ //Con JQuery Forma 1
    var data = crearJson(); //Almacena en una variable el json para luego enviarlo por http    
    $.ajax({ //Envia los datos
            url : 'https://ignsw201825-snproject.herokuapp.com/user/login', //Url
            data : JSON.stringify(data), //El formato Json
            method :'POST', //en este caso
            contentType: 'application/json; charset=utf-8',
            dataType : 'json', //El tipo de archivo            

            success : function(response){ //Si funciona
                   console.log(response);
            },
            error: function(error){ //Si falla             
                respuesta = JSON.stringify(error.responseJSON.message);
                console.log(respuesta);
                if(respuesta == '"' + "Contrasena Incorrecta." + '"'){
                    console.log("Debe repetir la clave");
                }

                if(respuesta == '"'+"Email no encontrado."+'"'){
                    console.log("El correo no esta registrado");
                }

            }
    });
        
}