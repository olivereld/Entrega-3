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

        $(".BusquedaOrdenadaImagen").append(
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
    function mostrarResultadoVideo(UrlDeImagen,UrlDeVideo,UrlPaginaDeProsedencia,numeroDeIndice,paginaImagen,contenedor){
       
        var botonProcedencia;
        var frameVideo = "";
        if(paginaImagen === "instagram"){
            botonProcedencia = "instagramIcon.png";
            frameVideo = '<iframe id="videoResultado'+numeroDeIndice+'_'+contenedor+'" width="640" height="360"  src="" frameborder="0" allowfullscreen></iframe>'
        }else{
            botonProcedencia = "logo-youtube.png";
            frameVideo = '<iframe id="videoResultado'+numeroDeIndice+'_'+contenedor+'" class="youtube-video" frameborder="0" allowfullscreen="1" allow="autoplay; encrypted-media" title="YouTube video player" width="640" height="360" src="'+UrlDeVideo+'"></iframe>'
        }

        var botonGuardar ;
       
        if(document.location.href.indexOf("index_User.html") > -1){
            botonGuardar = "<a id='boton-agregarImg2' href='#' class='btn btn-danger' onclick='focusVideo("+'"'+UrlDeImagen+'",'+'"'+UrlPaginaDeProsedencia+'",'+'"'+UrlDeVideo+'"'+");verificarInfoAlbums();'>Guardar</a>"; 
        }else{
            botonGuardar = "<a id='boton-agregarImg2' href='#' class='btn btn-danger' data-toggle='modal' data-target='#myModal' >Guardar</a>";
        }
        $(".paginaVideo"+contenedor).append( 
            '<script type="text/javascript">'+
            '$(document).ready(function(){'+         

                "$('#video"+numeroDeIndice+"_"+contenedor+"').on('hide.bs.modal', function(){"+                    
                    '$("#videoResultado'+numeroDeIndice+'_'+contenedor+'").attr("src","");'+
                '});'+
                "$('#video"+numeroDeIndice+"_"+contenedor+"').on('show.bs.modal', function(){"+                    
                    '$("#videoResultado'+numeroDeIndice+'_'+contenedor+'").attr("src","'+UrlDeVideo+'");'+
                '});'+
            '});'+
           " function procedencia"+numeroDeIndice+"_"+contenedor+"(){"+
                "var win = window.open('"+UrlPaginaDeProsedencia+"','_blank');"+
               " if (win) {  "+      
                   " win.focus();"+
                "} else {  "+      
                   " alert('Please allow popups for this website');"+
               " }"+
           " }"+
           "function mantenerOculto"+numeroDeIndice+"_"+contenedor+"(){ $('videoResultado"+numeroDeIndice+"_"+contenedor+"').modal('hide'); $('#videoResultado"+numeroDeIndice+"_"+contenedor+"').attr("+"'"+"src"+"'"+",'');}"+
        '</script>'+            

        "<div id ='cuadro-Busqueda' class='card col-12 col-sm-6 col-md-4 col-lg-3'>"+
            "<div id='cuadro-Contenido' style='padding: .28rem' class='card-body' >"+                           
                "<img id='imagen-Principal' class='card-img-top' src='"+UrlDeImagen+"'alt='Busqueda'>"+
                 botonGuardar+                 
                "<img id='icono-Pagina' src='image/"+botonProcedencia+"' width='50' height='50' onclick='procedencia"+numeroDeIndice+"_"+contenedor+"()' >"+
                "<div data-toggle='modal' data-target='#video"+numeroDeIndice+"_"+contenedor+"' style='z-index: 99;'>"+
                    "<img id='icono-Video' src='image/play.png' width='100' height='100'  style='z-index: 100;' >"+
                "</div>"+
            "</div>"+     

            '<div class="bs-example">'+
                '<div id="video'+numeroDeIndice+'_'+contenedor+'" class="modal fade">'+
                    '<div class="modal-dialog">'+
                        '<div class="modal-content" style="background: rgba(255, 255, 255, 0); border:0px;">'+                         
                                '<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>'+                        
                                '<div class="modal-body">'+
                                frameVideo+
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
        
        
        for(var i = 0; i < listaDeElementos.length;i++){
            if( ("" + listaDeElementos[i].type) === "image"){
                mostrarResultadoImagen(listaDeElementos[i].imageUrl,listaDeElementos[i].instagramLink,i);
            }else if(("" + listaDeElementos[i].type) === "video"){  
                             
                mostrarResultadoVideo(listaDeElementos[i].imageUrl,listaDeElementos[i].videoUrl,listaDeElementos[i].instagramLink,i);              
            }
        }
        $("#cargando").modal("hide");        
    }
    var listaDeVideos = [];    
    var totalDeResultadoSinMostrar = 0;    
    var paginaActual = 0;   

    function prepararResultadosYoutube(listaDeElementos){        
        totalDeResultadosSinMostrar =  parseInt( sessionStorage.getItem("todosLosResultadosYoutube"))-listaDeElementos.length; 
        sessionStorage.setItem("todosLosResultadosYoutube",totalDeResultadoSinMostrar);  
        var cadena = ""+ (paginaActual+1);
        if(sessionStorage.getItem("videosPagina"+cadena)){            
            for(var indice = 0;indice < listaDeElementos.length;indice++)
            listaDeVideos.push(listaDeElementos[indice]);
            
            sessionStorage.setItem("videosPagina"+cadena,JSON.stringify(listaDeVideos));
        }else{            
            listaDeVideos = listaDeElementos;
            sessionStorage.setItem("videosPagina"+cadena,JSON.stringify(listaDeVideos));
        }       
        $("#particles-js").css("display", "none"); 
        $("#titulo-Seccion").css("display","block");
        $("#titulo-Seccion").css("margin-top","64px");
        $("#separador-Busqueda").css("display","block");        
        $("#fondo-Imagen").css("position","fixed");
        $("#sinResultados").css("display","none"); 
        $("#cargando-Busquedas").css("display","none");    
        if(listaDeVideos.length <= 10 ){
            var paginaAnterior = paginaActual+1;
            crearPaginaVideos(paginaAnterior);
            paginaActual++;            
            $("#cargaResultadosVideo").css("display","none");
            for(var i = 0; i < listaDeVideos.length;i++){
                url = ("" + listaDeVideos[i].videoUrl).split("=");
                id = url[1];           
                embedVideo =  "https://www.youtube.com/embed/"+id+"?controls=2&amp;rel=0&amp;autohide=1&amp;showinfo=0&amp;modestbranding=1&amp;wmode=transparent&amp;html5=1&amp;enablejsapi=1&amp;widgetid=1"
                mostrarResultadoVideo(listaDeVideos[i].thumbnail,embedVideo,listaDeVideos[i].videoUrl,i,"youtube",paginaAnterior);                 
            }
            listaDeVideos = [];
            $("#cargando").modal("hide");
        }else if(totalDeResultadosSinMostrar > 0 ){     
            siguientePagina(sessionStorage.getItem("youtubeNext"));           
        }        
    }  
    
    function crearPaginaVideos(pagina){
        sessionStorage.setItem("numeroDePaginas",pagina);
        
        $("#paginacion_Video").append(  
            '<div id ="pagina_Video_'+pagina+'"class="tab-pane">'+
            '<div class="row BusquedaOrdenadaVideo card-columns paginaVideo'+pagina+'">'+           
               ' <div id="cargaResultadosVideo" class="card loadingResult" style="display: none; width: 10rem; margin-top: 5%; margin-left:auto; margin-right:auto; background-color: rgba(0, 0, 0, 0); height: auto; border: none;">'+
                    '<img class="card-img-top" src="image/loading.gif" alt="Card image cap"> '+                       
               '</div>' +
                '<div id="sinResultados" class="card" style="width: 18rem; margin-left:auto; margin-right:auto; background-color: rgba(0,0,0,0.2); height: auto;">'+
                ' <img class="card-img-top" src="image/notResult.png" alt="Card image cap">'+
                   ' <div class="card-body" style="color: white">'+
                      '  <h5 class="card-title">No se encontraron resultados</h5>'+
                       ' <p class="card-text">Pruebe realizando otra busqueda con un tag diferente.</p> '+                      
                  '  </div>'+
                '</div>'  +             
            '</div>' +
       ' </div> '        
        );
    }
   
    function sinResultados(){   
        $("#cargando").modal("hide");
        $("#particles-js").css("display", "none"); 
        $("#titulo-Seccion").css("display","block");
        $("#separador-Busqueda").css("display","block");
        $("#titulo-Seccion").css("margin-top","64px");
        $("#fondo-Imagen").css("position","fixed"); 
        $("#sinResultados").css("display","block"); 
   }

