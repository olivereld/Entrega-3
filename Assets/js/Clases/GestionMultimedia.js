var albumesCargadosMedia = false;


function  mostrarListaDeAlbumes(numeroDeAlbum,contenedor){
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

        console.log("Palabra: " + palabra);
       
        posicionNuevoInicio = posicionSiguiente;
         if(palabra == "multiMedia"){
                var palabraInicialSinMedia = sessionStorage.getItem("AlbumNro_"+numeroDeAlbum).slice(0,posicionInicial);
                console.log("Todo lo de atras: " + palabraInicialSinMedia);
                for(var i = 0; i  < 2; i++){
                    posicionInicial = sessionStorage.getItem("AlbumNro_"+numeroDeAlbum).indexOf('"',posicionNuevoInicio);
                    posicionSiguiente = sessionStorage.getItem("AlbumNro_"+numeroDeAlbum).indexOf('"',posicionInicial+1);         
                    posicionNuevoInicio = posicionSiguiente;
                }                         
                listaMultimedia = sessionStorage.getItem("AlbumNro_"+numeroDeAlbum).slice(posicionInicial+1,posicionSiguiente);  
                
                for(var i = 0; i  < 2; i++){
                    posicionInicial = sessionStorage.getItem("AlbumNro_"+numeroDeAlbum).indexOf('"',posicionNuevoInicio);
                    posicionSiguiente = sessionStorage.getItem("AlbumNro_"+numeroDeAlbum).indexOf('"',posicionInicial+1);         
                    posicionNuevoInicio = posicionSiguiente;
                }
                var palabraFinalSinMedia = sessionStorage.getItem("AlbumNro_"+numeroDeAlbum).slice(posicionInicial,sessionStorage.getItem("AlbumNro_"+numeroDeAlbum).length);
                todoSinMultiMedia = palabraInicialSinMedia+palabraFinalSinMedia;
                               
                 
                                                       
                break;
            }       
       
    }

    for(var i = 0; i < 4; i++){
        var arregloDeElementos = todoSinMultiMedia.split(","); 

        console.log(arregloDeElementos);      
        var datoRelevante = arregloDeElementos[i].slice(arregloDeElementos[i].indexOf(':"')+1,arregloDeElementos[i].lastIndexOf('"')); 
         
        datoRelevante = datoRelevante.slice(1,datoRelevante.length); 
        if(i==0){            
            id = datoRelevante;
        }else if(i == 1){            
            portada = datoRelevante;
        }else if(i == 2){            
            titulo = "hola";//datoRelevante;
        }else if(i == 3){            
            descripcion = datoRelevante;
        }
    }   
    var multimediaCadena = listaMultimedia;
    multimedia = listaMultimedia.split(",");

    if(multimedia.length > 0 && multimedia[0] != ""){
        if(portada != ""){   
        $(contenedor).append(
            " <div id ='cuadro-album'  class='card col-12 col-sm-6 col-md-5 col-lg-5' onclick='focusAlbum("+numeroDeAlbum+")' tabindex='1' >"+					                       
                 "<img id='imagen-principal'class='card-img-top' src='"+portada+"' alt='Busqueda'>"+
                 '<div id="info-album" class="card-img-overlay">'+
                         '<h5  class="card-title">'+titulo+'</h5>'+
                         						
                 '</div>'+							
             '</div>'                 	                
         );
        }else
         mostrarAlbumConPortada(numeroDeAlbum,id,portada,titulo,descripcion,multimedia[0],multimediaCadena,contenedor);
    }else{
 
        $(contenedor).append(
        " <div id ='cuadro-album'  class='card col-12 col-sm-6 col-md-5 col-lg-5' onclick='focusAlbum("+numeroDeAlbum+")' >"+					                       
                "<img id='imagen-principal'class='card-img-top' src='image/needImage.png' alt='Busqueda'>"+
                '<div id="info-album" class="card-img-overlay">'+
                        '<h5  class="card-title">'+titulo+'</h5>'+
                        						
                '</div>'+							
            '</div>'                    		
                            
        );
    }
}
function mostrarAlbumConPortada(numeroDeAlbum,id,portada,titulo,descripcion,idMedia,multimediaCadena,contenedor){
 
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
                $(contenedor).append(
                    " <div id ='cuadro-album'  class='card col-12 col-sm-6 col-md-5 col-lg-5' onclick='focusAlbum("+numeroDeAlbum+")' >"+					                       
                    "<img id='imagen-principal'class='card-img-top' src='"+response.url+"' alt='Busqueda'>"+
                    '<div id="info-album" class="card-img-overlay">'+
                            '<h5  class="card-title">'+titulo+'</h5>'+                            					
                    '</div>'+							
                '</div>'                      		
                                        
                    );
        },
        error: function(error){ //Si falla                     
            console.log("no cargo la imagen");
        }
    });   

}

function cargarDatosDeAlbum(idAlbum,numeroDeAlbum){    
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
            mostrarListaDeAlbumes(numeroDeAlbum,"#galeriaAlbums");                                          
        },
        error: function(error){ //Si falla 
            console.log("Fallo");                       
            console.log(error);           
        }
    });
}

function focusImagen(classImagen,urlProcedencia){
    localStorage.setItem("urlImagenTarget",$(classImagen).attr('src'));
    localStorage.setItem("urlProcedenciaTarget",urlProcedencia);
}

function focusAlbum(numeroDeAlbum){
    var posicionNuevoInicio = 0;
    var datosCompletos = "";
    for(var j = 0; j < 4*5; j++){        
        var posicionInicial = sessionStorage.getItem("AlbumNro_"+numeroDeAlbum).indexOf('"',posicionNuevoInicio);
        var posicionSiguiente = sessionStorage.getItem("AlbumNro_"+numeroDeAlbum).indexOf('"',posicionInicial+1);
        var palabra = sessionStorage.getItem("AlbumNro_"+numeroDeAlbum).slice(posicionInicial+1,posicionSiguiente);
       
        posicionNuevoInicio = posicionSiguiente;
         if(palabra == "multiMedia"){
                var palabrasSinMultiMedia = "" + sessionStorage.getItem("AlbumNro_"+numeroDeAlbum).slice(0,posicionInicial);
                var palabraFinalSinMedia = "";
                for(var i = 0; i  < 2; i++){
                    posicionInicial = sessionStorage.getItem("AlbumNro_"+numeroDeAlbum).indexOf('"',posicionNuevoInicio);
                    posicionSiguiente = sessionStorage.getItem("AlbumNro_"+numeroDeAlbum).indexOf('"',posicionInicial+1);         
                    posicionNuevoInicio = posicionSiguiente;
                }                         
                listaMultimedia = sessionStorage.getItem("AlbumNro_"+numeroDeAlbum).slice(posicionInicial+1,posicionSiguiente);
                for(var i = 0; i  < 2; i++){
                    posicionInicial = sessionStorage.getItem("AlbumNro_"+numeroDeAlbum).indexOf('"',posicionNuevoInicio);
                    posicionSiguiente = sessionStorage.getItem("AlbumNro_"+numeroDeAlbum).indexOf('"',posicionInicial+1);         
                    posicionNuevoInicio = posicionSiguiente;
                }
                palabraFinalSinMedia ="" + sessionStorage.getItem("AlbumNro_"+numeroDeAlbum).slice(posicionInicial,sessionStorage.getItem("AlbumNro_"+numeroDeAlbum).length);
                datosCompletos = palabrasSinMultiMedia + palabraFinalSinMedia;                               
                break;
         }       
       
    }
    for(var i = 0; i < 3; i++){
        var arregloDeElementos = datosCompletos.split(",");       
        var datoRelevante = arregloDeElementos[i].slice(arregloDeElementos[i].indexOf(':"')+1,arregloDeElementos[i].lastIndexOf('"'));  
        datoRelevante = datoRelevante.slice(1,datoRelevante.length);        
        
        if(i == 0){
            localStorage.setItem("idDeAlbumTarget",datoRelevante);
        }
    }   
}

function verificarInfoAlbums(){    
    $("#gestionMultimediaModal").modal();          
    if(!albumesCargadosMedia){
        if(sessionStorage.getItem("albumes").length > 0  ){
            if(sessionStorage.getItem("AlbumNro_0") ){
                var cantidadDeIdPorAlbum = sessionStorage.getItem("albumes").split(",");
                
                for(var i = 0; i < cantidadDeIdPorAlbum.length;i++ ){
                    mostrarListaDeAlbumes(i,"#galeriaAlbums"); 
                }
                            
            }else {
                var albumPorId = sessionStorage.getItem("albumes").split(",");
                cantidadDeAlbumes = albumPorId.length;       
                for(var i = 0; i < albumPorId.length;i++ ){               
                    cargarDatosDeAlbum(albumPorId[i],i);}
            } 
        } 
        albumesCargadosMedia = true;
    }

}
function guardarMultimedia(){
    //https://ignsw201825-snproject.herokuapp.com/media/add  0 para instagram, 1 para youtube, 2 para soundcloud
    
    var mediaDeAlbum = {
        "userId": "" + sessionStorage.getItem("id"),
        "albumId": ""+localStorage.getItem("idDeAlbumTarget"),
        "authToken": ""+sessionStorage.getItem("token"),
        "url":""+localStorage.getItem("urlImagenTarget"),
        "link":""+localStorage.getItem("urlProcedenciaTarget"),
        "type": "image" 
    };

    $.ajax({
        url : "https://ignsw201825-snproject.herokuapp.com/media/add", 
        data : JSON.stringify(mediaDeAlbum), 
        method :'POST', 
        contentType: 'application/json; charset=utf-8',
        dataType : 'json', 

        success : function (response){            
            console.log("media agregado:" + JSON.stringify(response)); 
            actualizarStorageAlbumes(); 
                        
            },
        error: function(error){             
            console.log(error);               
        }
    });

}