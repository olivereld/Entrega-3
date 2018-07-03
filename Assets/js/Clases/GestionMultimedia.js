var albumesCargadosMedia = false;

function  mostrarListaDeAlbumes(album,contenedor,numeroDeAlbum){
   
   
    if(album.numeroMultimedia > 0){      
        $(contenedor).append(
            " <div id ='cuadro-album'  class='card col-12 col-sm-6 col-md-3 col-lg-3' onclick='focusAlbum("+numeroDeAlbum+")' tabindex='1' >"+					                       
                 "<img id='imagen-principal'class='card-img-top' src='"+album.portada+"' alt='Busqueda'>"+
                 '<div id="info-album" class="card-img-overlay">'+
                         '<h5  class="card-title">'+album.nombre+'</h5>'+                         						
                 '</div>'+							
             '</div>'                 	                
         ); 

    }else{ 
        $(contenedor).append(
        "<div id ='cuadro-album'  class='card col-12 col-sm-6 col-md-3 col-lg-3' onclick='focusAlbum("+numeroDeAlbum+")' tabindex='1' >"+					                       
            "<img id='imagen-principal'class='card-img-top' src='image/defImagen.png' alt='Busqueda'>"+
            '<div id="info-album" class="card-img-overlay">'+
                '<h5  class="card-title">'+album.nombre+'</h5>'+           						
            '</div>'+							
        '</div>'                    		
        );
    }
     
}

function focusImagen(classImagen,urlProcedecia){
    localStorage.setItem("urlImagenTarget",$(classImagen).attr('src'));
    localStorage.setItem("urlProcedenciaTarget",urlProcedecia);
    localStorage.setItem("typeTarget","imagen");
}
function focusVideo(imagenVideo,urlProcendencia,urlVideo){
    localStorage.setItem("urlImagenTarget",imagenVideo);
    localStorage.setItem("urlProcedenciaTarget",urlProcendencia);
    localStorage.setItem("urlVideoarget",urlVideo);
    localStorage.setItem("typeTarget","video");
}
function focusAudio(urlImagen,urlProcedencia,urlAudio){
    localStorage.setItem("urlImagenTarget",urlImagen);
    localStorage.setItem("urlProcedenciaTarget",urlProcedencia);
    localStorage.setItem("urlAudioTarget",urlAudio);
    localStorage.setItem("typeTarget","audio");
}
function borrarTargets(){
   if(localStorage.getItem("datoBusquedaLocal")){
       var busqueda = localStorage.getItem("datoBusquedaLocal");
       localStorage.clear();
        localStorage.setItem("datoBusquedaLocal",busqueda);
   }else
    localStorage.clear();
}
function focusAlbum(numeroDeAlbum){     
    var album = JSON.parse(sessionStorage.getItem("listaAlbumes"));
    localStorage.setItem("idDeAlbumTarget",album[numeroDeAlbum].id);     
}

function verificarInfoAlbums(){    
    $("#gestionMultimediaModal").modal(); 
    var album = JSON.parse(sessionStorage.getItem("listaAlbumes"));
    if(!albumesCargadosMedia){
        if( album.length > 0  ){
            for(var numeroDeAlbum = 0; numeroDeAlbum < album.length;numeroDeAlbum++ ){
                mostrarListaDeAlbumes(album[numeroDeAlbum],"#galeriaAlbums",numeroDeAlbum); 
            }
        }else{
            console.log("No hay albumes");
        }
        albumesCargadosMedia = true;
    }  

}
function guardarMultimedia(){
    //https://ignsw201825-snproject.herokuapp.com/media/add  0 para instagram, 1 para youtube, 2 para soundcloud

    if(localStorage.getItem("idDeAlbumTarget")){
        var mediaDeAlbum = {};
        if(localStorage.getItem("typeTarget") === "imagen"){
            mediaDeAlbum = {
                "userId": "" + sessionStorage.getItem("id"),
                "albumId": ""+localStorage.getItem("idDeAlbumTarget"),
                "authToken": ""+sessionStorage.getItem("token"),
                "url":""+localStorage.getItem("urlImagenTarget"),
                "link":""+localStorage.getItem("urlProcedenciaTarget"),
                "type": "image" 
            };
        }else if(localStorage.getItem("typeTarget") === "video"){
            mediaDeAlbum = {
                "userId": "" + sessionStorage.getItem("id"),
                "albumId": ""+localStorage.getItem("idDeAlbumTarget"),
                "authToken": ""+sessionStorage.getItem("token"),
                "url":""+localStorage.getItem("urlImagenTarget"),
                "link":""+localStorage.getItem("urlProcedenciaTarget"),
                "videoUrl":localStorage.getItem("urlVideoarget"),
                "type": "video",                
            };

        }else{
            mediaDeAlbum = {
                "userId": "" + sessionStorage.getItem("id"),
                "albumId": ""+localStorage.getItem("idDeAlbumTarget"),
                "authToken": ""+sessionStorage.getItem("token"),
                "url":""+localStorage.getItem("urlImagenTarget"),
                "link":""+localStorage.getItem("urlProcedenciaTarget"),
                "audioUrl":localStorage.getItem("urlAudioTarget"),
                "type": "audio",                
            };

        }

    $.ajax({
        url : "https://ignsw201825-snproject.herokuapp.com/media/add", 
        data : JSON.stringify(mediaDeAlbum), 
        method :'POST', 
        contentType: 'application/json; charset=utf-8',
        dataType : 'json', 

        success : function (response){            
            console.log("media agregado:" + JSON.stringify(response)); 
            sessionStorage.setItem("remporal", JSON.stringify(response));
           document.location.reload(); 
                        
            },
        error: function(jqXHR, textStatus, errorThrown){             
            tratarFallos(jqXHR, textStatus, errorThrown);               
        }
    });
    }else{
        $("#errorModal").modal();
    }
}