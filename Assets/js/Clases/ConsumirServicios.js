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
         error: function(jqXHR, textStatus, errorThrown){   
            ocultarCarga();          
            tratarFallos(jqXHR, textStatus, errorThrown);               
         }
     });

}

function iniciarSesionAlRegistrar(enlaceUrlHeroku,datosDelNuevoUsuario){
    $.ajax({ //Envia los datos        
        url : enlaceUrlHeroku, //Url
        data : JSON.stringify(datosDelNuevoUsuario), //El formato Json
        method :'POST', //en este caso
        contentType: 'application/json; charset=utf-8',
        dataType : 'json', //El tipo de archivo            
 
        success : function (response){ //Si funciona
            obtenerDatosCompletosPorId(""+response.id,""+response.authToken);                        
        },
        error: function(jqXHR, textStatus, errorThrown){ //Si falla 
            ocultarCarga();                        
            tratarFallos(jqXHR, textStatus, errorThrown);            
        }
    });
 }

function registroExitoso(){

    localStorage.correoTemporal = $(emailRegistro).val();
    localStorage.claveTemporal = $(pass1).val();  
    $(nombreRegistro).val("");
    $(apellidoRegistro).val("");
    $(emailRegistro).val("");
    $(pass1).val("");
    $(pass2).val("");
    $(pass1).css("border","solid #101010");
    $(pass2).css("border","solid #101010");
    $(emailRegistro).css("border","solid #101010");
    $(emailRegistro).css("background-color","#101010");
    $(anoRegistro).val("");
    $(diaRegistro).val("");
    $(mesRegistro).val("");  
    var enlaceUrlHeroku = "https://ignsw201825-snproject.herokuapp.com/user/login"; 
    var jsonConLosDatos = { //Creando JSON Con el formato
        "email"       : ""+localStorage.getItem("correoTemporal"),
        "password"    : ""+btoa(localStorage.getItem("claveTemporal")),    
        }
        iniciarSesionAlRegistrar(enlaceUrlHeroku,jsonConLosDatos);
    localStorage.removeItem("correoTemporal");
    localStorage.removeItem("claveTemporal");
}

function iniciarSesionAlRegistrar(enlaceUrlHeroku,datosDelNuevoUsuario){
    $.ajax({ //Envia los datos         
        url : enlaceUrlHeroku, //Url
        data : JSON.stringify(datosDelNuevoUsuario), //El formato Json
        method :'POST', //en este caso
        contentType: 'application/json; charset=utf-8',
        dataType : 'json', //El tipo de archivo            

        success : function (response){ //Si funciona
           
            obtenerDatosCompletosPorId(""+response.id,""+response.authToken);                         
        },
        error: function( jqXHR, textStatus, errorThrown){ //Si falla 
            ocultarCarga();                        
            tratarFallos( jqXHR, textStatus, errorThrown);            
        }
    });
 }

/* Inicio de session */
 function enviarSolicitudDeLogin(enlaceUrlHeroku){ //Con JQuery Forma Registrar Usuario
    mostrarCarga();
    var resultadoDeCamposFull   = camposDelLoginllenos();
    var resultadoDeCorreoValido = correoValido("#correoLog",0);
    var resultadoDeClaveValida  = longitudClave("#claveLog");
    
    if(resultadoDeCamposFull && resultadoDeCorreoValido && resultadoDeClaveValida ){
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
         sync:false,            

         success : function (response){ //Si funciona
             obtenerDatosCompletosPorId(""+response.id,""+response.authToken);                         
         },
         error: function(jqXHR, textStatus, errorThrown){ //Si falla   
             ocultarCarga();                     
             tratarFallos(jqXHR, textStatus, errorThrown);            
         }
     });
    }else{        
        ocultarCarga();
        if(!resultadoDeCamposFull){mostrarError(7);}
        else if(!resultadoDeCorreoValido){mostrarError(1);}
        else if(!resultadoDeClaveValida){mostrarError(2);}
    }
 }
 
 
 function obtenerDatosCompletosPorId(id,token){
    var urlPeticionEnHeroku = "https://ignsw201825-snproject.herokuapp.com/user/get/"+id;
    $.ajax({ //Envia los datos         
        url : urlPeticionEnHeroku, //Url       
        method :'GET', //en este caso
        contentType: 'application/json; charset=utf-8',
        dataType : 'json', //El tipo de archivo 
        sync:false,           

        success : function (response){ //Si funciona
            
            guardarDatosDelUsuario(response,token);                                  
        },
        error: function(error){ //Si falla                        
            console.log("no se pudieron obtener los datos del id de usuario");            
        }
    });
 }

 function guardarDatosDelUsuario(response,token){
   
    var id                = ""+response.id;    
    var nombre            = ""+response.firstName;
    var apellido          = ""+response.lastName; 
    var fechaDeNAcimiento = ""+response.dateOfBirth;
    var encriptado        = ""+response.password;
    var correo            = ""+response.email;
    //var albums            = ""+JSON.stringify(response.albums).substring(1,JSON.stringify(response.albums).length-1);
    var amigos            = ""+JSON.stringify(response.friends).substring(1,JSON.stringify(response.friends).length-1); 
    var fotoPerfil        = ""+response.profilePicture;   
    
    sessionStorage.setItem("id",id);
    sessionStorage.setItem("token",token);
    sessionStorage.setItem("nombre",nombre);
    sessionStorage.setItem("apellido",apellido);
    sessionStorage.setItem("fechaDeNAcimiento",fechaDeNAcimiento);  
    sessionStorage.setItem("encriptado",encriptado);
    sessionStorage.setItem("correo",correo);    
    sessionStorage.setItem("amigos",amigos); 
    sessionStorage.setItem("fotoPerfil",fotoPerfil);
    
    ocultarCarga();
    window.location="index_User.html";
}


/*Salir*/

function salirDeLaPagina(enlaceUrlHeroku){ 
    $("#cargando").modal();
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
            localStorage.clear();
            window.location = "index.html";                
             },
         error: function(error){ 
            $("#cargando").modal(hide);            
            alert("No pudo hacer logOut");                
         }
     });
}

/*Enviar modificacion de perfil */
function modificarDatosDelUsuario(){ 
    mostrarSpinner("a");

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

    if (((atob(sessionStorage.getItem("encriptado"))!=($(inputPassword5).val())))){
        alert("Clave Actual Incorrecta, intente de nuevo");
        console.log($(inputPassword5).val());
        campoModificado[3] ="";
        ocultarSpinner("a");
    }
    var datosJson = { //Creando JSON Con el formato      
        "firstName"             : ""+campoModificado[0],
        "lastName"              : ""+campoModificado[1],
        "email"                 : ""+campoModificado[2],
        "password"              : ""+btoa(campoModificado[3]),       
        "dateOfBirth"           : ""+$(date1).val().replace(/-/g,"/"),
        "authToken"             : ""+sessionStorage.getItem('token')

    }
    var urlHeroku = "https://ignsw201825-snproject.herokuapp.com/user/update/" + sessionStorage.getItem('id');
    console.log(datosJson);
    $.ajax({ 
            url :urlHeroku,   
            data : JSON.stringify(datosJson),        
            method :'PUT', 
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
                 if ((atob(sessionStorage.getItem("encriptado"))==($(inputPassword5).val()))){
                 alert("Los datos ingresados son incorectos, intente de nuevo");
                 }
                 ocultarSpinner("a");                
            }
    });    
}
    function mostrarResultadoImagen(UrlDeImagen,UrlPaginaDeProsedencia,numeroDeIndice){
        var botonGuardar ;      

        if(document.location.href.indexOf("index_User.html") > -1){
            botonGuardar = "<a id='boton-agregarImg2' href='#' class='btn btn-danger btn-sm' onclick='focusImagen("+'".urlImagenPrincipal'+numeroDeIndice+'"'+","+'"'+UrlPaginaDeProsedencia+'"'+"); verificarInfoAlbums();' >Guardar</a>"; 
        }else{
            botonGuardar = "<a id='boton-agregarImg2' href='#' class='btn btn-danger btn-sm' data-toggle='modal' data-target='#myModal' >Guardar</a>";
        }

        $(".BusquedaOrdenada").append(
            "<script type='text/javascript'>"+
                " function procedencia"+numeroDeIndice+"(){"+
                    "var win = window.open('"+UrlPaginaDeProsedencia+"','_blank');"+
                " if (win) {  "+      
                    " win.focus();"+
                    "} else {  "+      
                    " alert('Please allow popups for this website');"+
                " }"+
            " }"+
            "</script>"+

            "<div id ='cuadro-Busqueda' class='card col-12 col-sm-6 col-md-4 col-lg-3'>"+
                "<div id='cuadro-Contenido' class='card-body' style='padding: .28rem' >"+                           
                    "<img id='imagen-Principal'class='card-img-top urlImagenPrincipal"+numeroDeIndice+"' src='"+UrlDeImagen+"'alt='Busqueda' data-toggle='modal' data-target='#imagen"+numeroDeIndice+"'>"+
                    botonGuardar+ 
                    "<img id='icono-Pagina' src='image/instagramLogo.png' width='40' height='40' onclick='procedencia"+numeroDeIndice+"()' >"+
                "</div>"+      
                
                "<div class='modal fade' id='imagen"+numeroDeIndice+"' tabindex='-1' role='dialog' aria-hidden='true'>"+                              
                    "<div class='modal-dialog modal-lg modal-dialog-centered' role='document'>"+
                    "<img  class='img-fluid rounded mx-auto' src='"+UrlDeImagen+"'alt='Busqueda'>"+          
                    "</div>"+       
                "</div>"+  
            "</div>" 
            );
        
    }
    function mostrarResultadoVideo(UrlDeImagen,UrlDeVideo,UrlPaginaDeProsedencia,numeroDeIndice){
        var botonGuardar ;
        var mensaje = "No esta implementado el guardado de videos aun! proximamente";
        if(document.location.href.indexOf("index_User.html") > -1){
            botonGuardar = "<a id='boton-agregarImg2' href='#' class='btn btn-danger' onclick='focusVideo("+'"'+UrlDeImagen+'",'+'"'+UrlPaginaDeProsedencia+'",'+'"'+UrlDeVideo+'"'+");verificarInfoAlbums();'>Guardar</a>"; 
        }else{
            botonGuardar = "<a id='boton-agregarImg2' href='#' class='btn btn-danger' data-toggle='modal' data-target='#myModal' >Guardar</a>";
        }
        $(".BusquedaOrdenada").append( 
            '<script type="text/javascript">'+
            '$(document).ready(function(){'+           

                "$('#video"+numeroDeIndice+"').on('hide.bs.modal', function(){"+                    
                    '$("#videoResultado'+numeroDeIndice+'").attr("src","");'+
                '});'+
                "$('#video"+numeroDeIndice+"').on('show.bs.modal', function(){"+                    
                    '$("#videoResultado'+numeroDeIndice+'").attr("src","'+UrlDeVideo+'");'+
                '});'+
            '});'+
           " function procedencia"+numeroDeIndice+"(){"+
                "var win = window.open('"+UrlPaginaDeProsedencia+"','_blank');"+
               " if (win) {  "+      
                   " win.focus();"+
                "} else {  "+      
                   " alert('Please allow popups for this website');"+
               " }"+
           " }"+
           "function mantenerOculto"+numeroDeIndice+"(){ console.log('Hola'); $('videoResultado"+numeroDeIndice+"'"+").modal('hide'); $('#videoResultado"+numeroDeIndice+"').attr("+"'"+"src"+"'"+",'');}"+
        '</script>'+            

        "<div id ='cuadro-Busqueda' class='card col-12 col-sm-6 col-md-4 col-lg-3'>"+
            "<div id='cuadro-Contenido' style='padding: .28rem' class='card-body' >"+                           
                "<img id='imagen-Principal' class='card-img-top' src='"+UrlDeImagen+"'alt='Busqueda'>"+
                 botonGuardar+                 
                "<img id='icono-Pagina' src='image/instagramIcon.png' width='40' height='40' onclick='procedencia"+numeroDeIndice+"()' >"+
                "<div data-toggle='modal' data-target='#video"+numeroDeIndice+"' style='z-index: 99;'>"+
                    "<img id='icono-Video' src='image/play.png' width='100' height='100'  style='z-index: 100;' >"+
                "</div>"+
            "</div>"+     

            '<div class="bs-example">'+
                '<div id="video'+numeroDeIndice+'" class="modal fade">'+
                    '<div class="modal-dialog">'+
                        '<div class="modal-content" style="background: rgba(255, 255, 255, 0); border:0px;">'+
                            
                            
                                '<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>'+                        
                            

                                '<div class="modal-body">'+
                                '<iframe id="videoResultado'+numeroDeIndice+'" width="560" height="315" src="" frameborder="0" allowfullscreen></iframe>'+
                                '</div>'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                 '</div>'+     
            "</div>"

            );
    }
    function prepararResultados(listaDeElementos){
        
        $("#particles-js").css("display", "none"); 
        $("#titulo-Seccion").css("display","block");
        $("#titulo-Seccion").css("margin-top","64px");
        $("#separador-Busqueda").css("display","block");
        
        $("#fondo-Imagen").css("position","fixed");
        $("#sinResultados").css("display","none"); 
        $("#cargando-Busquedas").css("display","none");
        console.log(listaDeElementos.length);

        for(var i = 0; i < listaDeElementos.length;i++){

            if( ("" + listaDeElementos[i].type) == "image"){

                mostrarResultadoImagen(listaDeElementos[i].imageUrl,listaDeElementos[i].instagramLink,i);

            }else if(("" + listaDeElementos[i].type) == "video"){  
                console.log(listaDeElementos[i]);              
                mostrarResultadoVideo(listaDeElementos[i].imageUrl,listaDeElementos[i].videoUrl,listaDeElementos[i].instagramLink,i);              
            }
        }
        $("#cargando").modal("hide");
        
    }
    function sinResultados(){   
        $("#particles-js").css("display", "none"); 
        $("#titulo-Seccion").css("display","block");
        $("#separador-Busqueda").css("display","block");
        $("#titulo-Seccion").css("margin-top","64px");
        $("#fondo-Imagen").css("position","fixed"); 
        $("#sinResultados").css("display","block"); 
   }

function enviarPeticionDeBusqueda(enlaceUrlHeroku){ 
    
    $.ajax({

        url : enlaceUrlHeroku,         
        method :'GET', 
        contentType: 'application/json; charset=utf-8',
        dataType : 'json', 

        success : function (response){                        
            console.log("Resultados :" + response[0].imageUrl);
            prepararResultados(response);         
                          
            },
        error: function(XMLHttpRequest, textStatus, errorThrown){  
            $("#cargando").modal("hide");
            if(sessionStorage.getItem("datoBusquedaLocal")){
                sessionStorage.removeItem("datoBusquedaLocal");
            }           
            sinResultados();        
        }
    });
   

}
function procedencia(UrlProcedencia){
    var win = window.open(UrlProcedencia,'_blank');
    if (win) {        
        win.focus();
    } else {        
        alert('Please allow popups for this website');
    }
}
