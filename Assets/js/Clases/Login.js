

var respuesta = "";

/*
function getNombre(){
    alert("id: " + this.usuario.id + "\nnombre: " + this.usuario.nombre + "\napellido: " + this.usuario.apellido + "\ncorreo: " + this.usuario.correo);
}*/

function crearJson2 (){ //Crea el archivo json para enviar
    var myJson = 
    { //Creando JSON Con el formato
        "email"       : $(correoLog).val(),
        "password"    : $(claveLog).val(),    
    }    
    return myJson; //Devuelve el archivo tipo json
}

function enviarLog(){ //Con JQuery Forma 1
    var data = crearJson2(); //Almacena en una variable el json para luego enviarlo por http   
    console.log("Listo"); 
    $.ajax({ //Envia los datos
            url : 'https://ignsw201825-snproject.herokuapp.com/user/login', //Url
            data : JSON.stringify(data), //El formato Json
            method :'POST', //en este caso
            contentType: 'application/json; charset=utf-8',
            dataType : 'json', //El tipo de archivo            
            
            success : function(response){ //Si funciona   
                //var datos = JSON.stringify(response.dateOfBirth,response.email,response.firstName,response.id,response.lastName);
                window.location="index_User.html?var_="+response.firstName+"&var_="+response.lastName;                             
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