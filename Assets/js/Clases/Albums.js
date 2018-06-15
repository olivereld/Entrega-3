
var albumesCargados = false;
var imagenesCargadas = false;
function mostrarAlbums(numeroDeAlbum){
    var id;
    var portada;
    var titulo;    
    var descripcion;   
    var multimedia;

    var posicionNuevoInicio = 0;
    var todoSinMultiMedia;
    var listaMultimedia;

    for(var j = 0; j < 4*5; j++){
        
        var posicionInicial = sessionStorage.getItem("AlbumNro_"+numeroDeAlbum).indexOf('"',posicionNuevoInicio);
        var posicionSiguiente = sessionStorage.getItem("AlbumNro_"+numeroDeAlbum).indexOf('"',posicionInicial+1);
        var palabra = sessionStorage.getItem("AlbumNro_"+numeroDeAlbum).slice(posicionInicial+1,posicionSiguiente);
       
        posicionNuevoInicio = posicionSiguiente;
         if(palabra == "multiMedia"){
                var todoSinMultiMedia = sessionStorage.getItem("AlbumNro_"+numeroDeAlbum).slice(0,posicionInicial);
               
                for(var i = 0; i  < 2; i++){
                    posicionInicial = sessionStorage.getItem("AlbumNro_"+numeroDeAlbum).indexOf('"',posicionNuevoInicio);
                    posicionSiguiente = sessionStorage.getItem("AlbumNro_"+numeroDeAlbum).indexOf('"',posicionInicial+1);         
                    posicionNuevoInicio = posicionSiguiente;
                }                         
                listaMultimedia = sessionStorage.getItem("AlbumNro_"+numeroDeAlbum).slice(posicionInicial+1,posicionSiguiente); 

                break;
            }       
       
    }

    for(var i = 0; i < 4; i++){
        var arregloDeElementos = todoSinMultiMedia.split(",");       
        var datoRelevante = arregloDeElementos[i].slice(arregloDeElementos[i].indexOf(':"')+1,arregloDeElementos[i].lastIndexOf('"'));  
        datoRelevante = datoRelevante.slice(1,datoRelevante.length); 
        if(i==0){            
            id = datoRelevante;
        }else if(i == 1){            
            portada = datoRelevante;
        }else if(i == 2){            
            titulo = datoRelevante;
        }else if(i == 3){            
            descripcion = datoRelevante;
        }
    }   
    var multimediaCadena = listaMultimedia;
    multimedia = listaMultimedia.split(",");

    

    
    if(multimedia.length > 0 && multimedia[0] != ""){           
        if(portada != ""){
            $("#galeria").append(
                " <div id ='cuadro-album'  class='card col-12 col-sm-6 col-md-5 col-lg-5'  onclick='opcionesDeGestionDeAlbum("+numeroDeAlbum+")' tabindex='-1' >"+					                       
                        "<img id='imagen-principal'class='card-img-top' src='"+portada+"' style='max-height: 80%;' alt='Busqueda'>"+
                        '<div id="info-album" class="card-img-overlay">'+
                                '<h5  class="card-title">'+titulo+'</h5>'+
                                '<p class="card-text"">'+descripcion+'</p>'	+						
                        '</div>'+							
                    '</div>'                    		
                                    
                );
        }else
         mostrarAlbumConPortada(numeroDeAlbum,id,portada,titulo,descripcion,multimedia[0],multimediaCadena);
    }else{      

        $("#galeria").append(
        " <div id ='cuadro-album'  class='card col-12 col-sm-6 col-md-5 col-lg-5' onclick='opcionesDeGestionDeAlbum("+numeroDeAlbum+")' tabindex='-1'>"+					                       
                "<img id='imagen-principal'class='card-img-top' src='image/needImage.png' alt='Busqueda'>"+
                '<div id="info-album" class="card-img-overlay">'+
                        '<h5  class="card-title" style="color:black;">'+titulo+'</h5>'+
                        '<p class="card-text" style="color:black;">'+descripcion+'</p>'	+						
                '</div>'+							
            '</div>'                    		
                            
        );
    }
}

function mostrarAlbumConPortada(numeroDeAlbum,id,portada,titulo,descripcion,idMedia,multimediaCadena){
 
    console.log("Id media es " + idMedia);

    $.ajax({ //Envia los datos         
        url :"https://ignsw201825-snproject.herokuapp.com/media/get/"+idMedia,       
        method :'GET', //en este caso
        contentType: 'application/json; charset=utf-8',
        dataType : 'json', //El tipo de archivo            

        success : function (response){ //Si funciona            
                console.log(response);
                console.log(response.url);
                var datosDelAlbum = {
                    "id":""+id,
                    "portada":response.url,
                    "titulo":""+titulo,
                    "descripcion":""+descripcion,
                    "multiMedia":multimediaCadena,                
                };                
                sessionStorage.setItem("AlbumNro_"+numeroDeAlbum,JSON.stringify(datosDelAlbum));
                var ultimaLlave = sessionStorage.getItem("AlbumNro_"+numeroDeAlbum).indexOf("}");
                sessionStorage.setItem("AlbumNro_"+numeroDeAlbum,sessionStorage.getItem("AlbumNro_"+numeroDeAlbum).slice(1,ultimaLlave));
                $("#galeria").append(
                    " <div id ='cuadro-album'  class='card col-12 col-sm-6 col-md-5 col-lg-5' onclick='opcionesDeGestionDeAlbum("+numeroDeAlbum+")' tabindex='-1'>"+					                       
                            "<img id='imagen-principal'class='card-img-top' src='"+response.url+"' alt='Busqueda'>"+
                            '<div id="info-album" class="card-img-overlay">'+
                                    '<h5  class="card-title">'+titulo+'</h5>'+
                                    '<p class="card-text">'+descripcion+'</p>'	+						
                            '</div>'+							
                        '</div>'                    		
                                        
                    );
        },
        error: function(error){ //Si falla                     
            console.log("no cargo la imagen");
        }
    });   

}

function crearNuevoAlbum(){
    $("#galeria").css("display","none");
   
    $("#crear-Album").css("display","block");
}
function volverAPrevizualisarAlbumes(){
    $("#opcion-Album").css("display","none"); 
    $("#galeria-multimedia").css("display","none");   
   
    $("#galeria").css("display","flex");  
    $("#crear-Album").css("display","none");
    
       
}
function actualizarStorageAlbumes(){
    var urlPeticionEnHeroku = "https://ignsw201825-snproject.herokuapp.com/user/get/"+sessionStorage.getItem("id");
    $.ajax({ //Envia los datos         
        url : urlPeticionEnHeroku, //Url       
        method :'GET', //en este caso
        contentType: 'application/json; charset=utf-8',
        dataType : 'json', //El tipo de archivo            

        success : function (response){ //Si funciona
           var albumes = sessionStorage.getItem("albumes").split(",");
           var cantidadAntigua = albumes.length;
           sessionStorage.setItem("albumes",""+JSON.stringify(response.albums).substring(1,JSON.stringify(response.albums).length-1));
           for(var i = 0; i < cantidadAntigua; i++){
                sessionStorage.removeItem("AlbumNro_"+i);
           }           
           actualizarPaginaAlbumes()                               
        },
        error: function(error){ //Si falla                     
             console.log("No se actualizaron los albumes");
        }
    });
}

function obtenerDatosDeAlbum(idAlbum,numeroDeAlbum){
    
    var urlParaEnviarPeticion = "https://ignsw201825-snproject.herokuapp.com/album/get/"+idAlbum;
    
    $.ajax({ //Envia los datos         
        url : urlParaEnviarPeticion, //Url       
        method :'GET', //en este caso
        contentType: 'application/json; charset=utf-8',
        dataType : 'json', //El tipo de archivo            

        success : function (response){ //Si funciona
            console.log(response);
            var datosDelAlbum = {
                "id":""+response.id,
                "portada":"",
                "titulo":""+response.name,
                "descripcion":""+response.description,
                "multiMedia":""+response.media,                
            };
            sessionStorage.setItem("AlbumNro_"+numeroDeAlbum,JSON.stringify(datosDelAlbum));
            var ultimaLlave = sessionStorage.getItem("AlbumNro_"+numeroDeAlbum).indexOf("}");
            sessionStorage.setItem("AlbumNro_"+numeroDeAlbum,sessionStorage.getItem("AlbumNro_"+numeroDeAlbum).slice(1,ultimaLlave));
            console.log(sessionStorage.getItem("AlbumNro_"+numeroDeAlbum));
            mostrarAlbums(numeroDeAlbum);                                          
        },
        error: function(error){ //Si falla 
            console.log("Fallo");                       
            console.log(error);           
        }
    });
}
function guardarNuevoAlbum(){
    var urlParaEnviarPEticion = "https://ignsw201825-snproject.herokuapp.com/album/add";
    var id = ""+sessionStorage.getItem("id");
    var token = "" + sessionStorage.getItem("token");
    var nombreDelAlbum = "" + $("#inputTitulo").val();
    var descripcion = "" + $("#inputDescripcion").val();
   
    var albumACrear = {
        "userId": id,
        "authToken":token,
        "name": nombreDelAlbum, 
        "description": descripcion
     }

     $.ajax({
        url : urlParaEnviarPEticion, 
        data : JSON.stringify(albumACrear), 
        method :'POST', 
        contentType: 'application/json; charset=utf-8',
        dataType : 'json', 

        success : function (response){            
            console.log("album agregado"); 
            actualizarStorageAlbumes();               
            },
        error: function(jqXHR, textStatus, errorThrown){             
            tratarFallos(jqXHR, textStatus, errorThrown);              
        }
    });


}

function PrepararInfoAlbums(){    
    if(albumesCargados == false){
               
        if(sessionStorage.getItem("albumes").length > 0  ){
            if(sessionStorage.getItem("AlbumNro_0") ){
                var cantidadDeIdPorAlbum = sessionStorage.getItem("albumes").split(",");
              
                for(var i = 0; i < cantidadDeIdPorAlbum.length;i++ ){
                    mostrarAlbums(i); 
                } 
                        
            }else if(!albumesCargados){
                var albumPorId = sessionStorage.getItem("albumes").split(",");
                cantidadDeAlbumes = albumPorId.length;       
                for(var i = 0; i < albumPorId.length;i++ ){               
                    obtenerDatosDeAlbum(albumPorId[i],i);}
                } 
            } 
            albumesCargados = true;                 
        }
    }    
    
function opcionesDeGestionDeAlbum(numeroDeAlbum){
        //$(elemento).remove(selector)
        

        var arregloDeElementos = sessionStorage.getItem("AlbumNro_"+numeroDeAlbum).split(",");
        var idAlbum      = arregloDeElementos[0].slice(arregloDeElementos[0].indexOf(':"')+1,arregloDeElementos[0].lastIndexOf('"')); 
        var descripcion  = arregloDeElementos[3].slice(arregloDeElementos[3].indexOf(':"')+1,arregloDeElementos[3].lastIndexOf('"'));
        var titulo       = arregloDeElementos[2].slice(arregloDeElementos[2].indexOf(':"')+1,arregloDeElementos[2].lastIndexOf('"'));

        idAlbum  = idAlbum.slice(1,idAlbum.length);   
        descripcion  = descripcion.slice(1,descripcion.length); 
        titulo  = titulo.slice(1, titulo.length);   
       
        
        console.log("Titulo:" + titulo);
        console.log("Descripcion" + descripcion);

        $("#opcion-Album").css("display","block");    
        $("#galeria-multimedia").css("display","flex"); 
        $("#galeria").css("display","none");   
        
        $(".titulo-album-gestion").text(""+titulo);
        $(".descripcion-album-gestion").text(""+descripcion);         

            var multimedia;
            var posicionNuevoInicio = 0;        
            var listaMultimedia;    
        for(var j = 0; j < 4*5; j++){            
            var posicionInicial = sessionStorage.getItem("AlbumNro_"+numeroDeAlbum).indexOf('"',posicionNuevoInicio);
            var posicionSiguiente = sessionStorage.getItem("AlbumNro_"+numeroDeAlbum).indexOf('"',posicionInicial+1);
            var palabra = sessionStorage.getItem("AlbumNro_"+numeroDeAlbum).slice(posicionInicial+1,posicionSiguiente);
           
            posicionNuevoInicio = posicionSiguiente;
             if(palabra == "multiMedia"){   
                    for(var i = 0; i  < 2; i++){
                        posicionInicial = sessionStorage.getItem("AlbumNro_"+numeroDeAlbum).indexOf('"',posicionNuevoInicio);
                        posicionSiguiente = sessionStorage.getItem("AlbumNro_"+numeroDeAlbum).indexOf('"',posicionInicial+1);         
                        posicionNuevoInicio = posicionSiguiente;
                    }                         
                    listaMultimedia = sessionStorage.getItem("AlbumNro_"+numeroDeAlbum).slice(posicionInicial+1,posicionSiguiente);                                              
                    break;
                }     
           
        }
        multimedia = listaMultimedia.split(",");


        if(!localStorage.getItem("idDeAlbumTarget") && !localStorage.getItem("numeroDeImagenesTarget")){

            localStorage.setItem("idDeAlbumTarget",idAlbum);
            if(multimedia.length > 0 && multimedia[0] != "")
                localStorage.setItem("numeroDeImagenesTarget",multimedia.length);
            else
            localStorage.setItem("numeroDeImagenesTarget","0");

            if(multimedia.length > 0 && multimedia[0] != ""){
                for(var i = 0; i < multimedia.length; i++){
                    mostrarMultimediaDeAlbum(multimedia[i],i);                  
                }
            }
            console.log(5+parseInt(localStorage.getItem("numeroDeImagenesTarget",10) ));     
        }else{ //YA existen
            if(localStorage.getItem("idDeAlbumTarget") != idAlbum){                

                if(localStorage.getItem("numeroDeImagenesTarget") != "0"){
                    console.log("pasando :" + parseInt(localStorage.getItem("numeroDeImagenesTarget",10) ));
                    removerMultimediaDeAlbum(parseInt(localStorage.getItem("numeroDeImagenesTarget",10) ));
                    localStorage.setItem("numeroDeImagenesTarget",multimedia.length);
                }
                localStorage.setItem("idDeAlbumTarget",idAlbum);

                if(multimedia.length > 0 && multimedia[0] != "")
                    localStorage.setItem("numeroDeImagenesTarget",multimedia.length);
                else
                    localStorage.setItem("numeroDeImagenesTarget","0");

                if(multimedia.length > 0 && multimedia[0] != ""){
                    for(var i = 0; i < multimedia.length; i++){
                        mostrarMultimediaDeAlbum(multimedia[i],i);                  
                    }
                } 

            }

        }        
        
}
function removerMultimediaDeAlbum(numeroTotalDeImagenes){ 
    
        for(var i = 0; i < numeroTotalDeImagenes; i++)
        {
            var id_1 = "#script"+i;
            var clase =".ima-"+i
            console.log(id_1);
            console.log(clase);
            $(id_1).remove();
            $(clase).remove();
        }
        
       
        
    
}
    function mostrarMultimediaDeAlbum(idMultimedia,numeroDeimagen){       
        $.ajax({ //Envia los datos         
            url :"https://ignsw201825-snproject.herokuapp.com/media/get/"+idMultimedia,       
            method :'GET', //en este caso
            contentType: 'application/json; charset=utf-8',
            dataType : 'json', //El tipo de archivo            
    
            success : function (response){ //Si funciona            
                $("#galeria-multimedia").append(
                    
                    "<script type='text/javascript' id='script"+numeroDeimagen+"'>"+
                        " function procedencia"+numeroDeimagen+"(){"+
                            "var win = window.open('"+response.link+"','_blank');"+
                        " if (win) {  "+      
                            " win.focus();"+
                            "} else {  "+      
                            " alert('Please allow popups for this website');"+
                        " }"+
                    " }"+
                    "</script>"+

                     "<div id ='cuadro-album'  class='card col-12 col-sm-6 col-md-5 col-lg-5 ima-"+numeroDeimagen+"' tabindex='-1' >"+					                       
                            "<img id='imagen-principal'class='card-img-top' src='"+response.url+"' alt='Busqueda'>"+                            
                            "<img id='icono-Pagina' src='image/instagramIcon.png' width='50' height='50' onclick='procedencia"+numeroDeimagen+"()' >"+						
                            							
                        '</div>'                    		
                                        
                    );             
                    
            },
            error: function(error){ //Si falla                     
                console.log("no cargos lista de imagenes \n:" + error);
            }
        });        
    }

    function editarAlbum(){       
        $("#boton-volver-album").css("display","none");
        $("#boton-editar-album").css("display","none");
        $("#galeria-multimedia").css("display","none");
        $("#boton-eliminar-album").css("display","none");
        $(".titulo-album-gestion").css("display","none");
        $(".descripcion-album-gestion").css("display","none"); 

        $("#boton-guardar-album").css("display","block");
        $("#boton-cancelar-album").css("display","block");
        $("#inputTituloModificable").css("display","block");
        $("#inputDescripcionModificable").css("display","block");

        $("#inputTituloModificable").val($(".titulo-album-gestion").text());
        $("#inputDescripcionModificable").val( $(".descripcion-album-gestion").text());
    }
    function cancelarEdicion(){
        $("#boton-eliminar-album").css("display","block");
        $("#boton-volver-album").css("display","block");
        $("#boton-editar-album").css("display","block");
        $("#galeria-multimedia").css("display","flex"); 
        $(".titulo-album-gestion").css("display","block");
        $(".descripcion-album-gestion").css("display","block"); 

        $("#boton-guardar-album").css("display","none");
        $("#boton-cancelar-album").css("display","none");
        $("#inputTituloModificable").css("display","none");
        $("#inputDescripcionModificable").css("display","none");
    }
    function guardarEdicion(){
        $("#cargando").modal();        
        
        var camposModificados= {
            "userId": "" + sessionStorage.getItem("id"),
            "authToken": "" + sessionStorage.getItem("token"),
            "albumId": "" + localStorage.getItem("idDeAlbumTarget"),
            "name": ""+ $("#inputTituloModificable").val(), 
            "description":"" +  $("#inputDescripcionModificable").val()
        };

        $.ajax({
            url : "https://ignsw201825-snproject.herokuapp.com/album/update", 
            data : JSON.stringify(camposModificados), 
            method :'PUT', 
            contentType: 'application/json; charset=utf-8',
            dataType : 'json',    
            success : function (response){          
                                   
                actualizarStorageAlbumes(); 
                $("#cargando").modal('hide');              
                },
            error: function(error){
                $("#cargando").modal('hide');             
                console.log(error);               
            }
        });    
    }
   
    function eliminarAlbum(){
        // https://ignsw201825-snproject.herokuapp.com/album/remove
        $("#eliminarModal").modal("hide");
        $("#cargando").modal();
        var albumEliminar = {
            "userId": sessionStorage.getItem("id"),
            "authToken": sessionStorage.getItem("token"),
            "albumId":  localStorage.getItem("idDeAlbumTarget")
        };

        $.ajax({
            url : "https://ignsw201825-snproject.herokuapp.com/album/remove", 
            data : JSON.stringify(albumEliminar), 
            method :'DELETE', 
            contentType: 'application/json; charset=utf-8',
            dataType : 'json', 
    
            success : function (response){            
                console.log("album eliminado");
                   
                $("#boton-continuar-modal").css("display","block");
                $("#advertencia-eliminado").css("display","block");
                $("#advertencia-eliminar").css("display","none"); 
                $("#boton-eliminar-modal").css("display","none");  
                $("#boton-cancelar-modal").css("display","none"); 
                localStorage.removeItem("idDeAlbumTarget"); 
                actualizarStorageAlbumes();              

                },
            error: function(error){  
                $("#cargando").modal("hide");           
                console.log(error);               
            }
        });

    }
    function actualizarPaginaAlbumes(){
        location.reload();
    }

   