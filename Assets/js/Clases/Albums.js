
var albumesCargados = false;
var imagenesCargadas = false;

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
                                   
            document.location.reload(); 
            $("#cargando").modal('hide');              
            },
        error: function(error){
            $("#cargando").modal('hide');             
            console.log(error);               
        }
       });    
}
function eliminarMedia(){   
    $("#eliminarModalMedia").modal("hide");
    $("#cargando").modal();    

    var mediaEliminar = {    
        "userId": sessionStorage.getItem("id"),        
        "albumId":localStorage.getItem("idDeAlbumTarget"),
        "mediaId":localStorage.getItem("mediaIdTarget"),
        "authToken": sessionStorage.getItem("token"),
    };
    $.ajax({
        url : "https://ignsw201825-snproject.herokuapp.com/media/remove", 
        data : JSON.stringify(mediaEliminar), 
        method :'DELETE', 
        contentType: 'application/json; charset=utf-8',
        dataType : 'json',
    
        success : function (response){  
            $("#cargando").modal("hide");    
            localStorage.removeItem("mediaIdTarget"); 
            sessionStorage.removeItem("listaAlbumes");
            document.location.reload();

        },
        error: function(error){  
            $("#cargando").modal("hide");           
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
        "albumId":localStorage.getItem("idDeAlbumTarget")
    };

    $.ajax({
        url : "https://ignsw201825-snproject.herokuapp.com/album/remove", 
        data : JSON.stringify(albumEliminar), 
        method :'DELETE', 
        contentType: 'application/json; charset=utf-8',
        dataType : 'json',
    
        success : function (response){        
            $("#boton-continuar-modal").css("display","block");
            $("#advertencia-eliminado").css("display","block");
            $("#advertencia-eliminar").css("display","none"); 
            $("#boton-eliminar-modal").css("display","none");  
            $("#boton-cancelar-modal").css("display","none"); 

            sessionStorage.removeItem("listaAlbumes");
            document.location.reload();
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

// FUNCIONES DE REMPLAZO PARA LAS OPTMIZAR EL CODIGO-----------------------------------------------------------------------------
function albumesDelUsuario(){ //REMPLAZO    
    if(albumesCargados == false){      
            obtenerAlbumes(sessionStorage.getItem("id"),mostrarAlbumesEnElPerfil);   
            albumesCargados = true;          
    }    
} //REMPLAZO 
function obtenerAlbumes(idUsuario,callback){ //Obtener todos los albumes
    var listaDeAlbumes = [];
    $.ajax({ //Envia los datos         
        url : "https://ignsw201825-snproject.herokuapp.com/album/getList/"+idUsuario,        
        method :'GET', //en este caso
        contentType: 'application/json; charset=utf-8',
        dataType : 'json', //El tipo de archivo
        async:true,            
        
        success : function (response){ //Si funciona          
            for(var elementoDeAlbum = 0; elementoDeAlbum < response.length; elementoDeAlbum++){   //por album 
                var portada = null; 
                
                var album ={
                    id:response[elementoDeAlbum].id,
                    nombre:response[elementoDeAlbum].name,
                    descripcion:response[elementoDeAlbum].description, 
                    portada:portada,
                    numeroMultimedia:response[elementoDeAlbum].media.length,
                    multiMedia:response[elementoDeAlbum].media   
                }; 
                 listaDeAlbumes.push(album);          
            }
            sessionStorage.setItem("listaAlbumes",JSON.stringify(listaDeAlbumes));
            album = JSON.parse(sessionStorage.getItem("listaAlbumes"));
            $("#cantidad-Albumes").text( "" + album.length);
            if(callback != undefined){
                for(var i = 0; i < album.length; i++){
                    cargarMultimediaDeALbum(album[i],i,callback);
                }
            }

        },
        error: function(jqXHR, textStatus, errorThrown){ //Si falla 
           console.log(jqXHR.responseText);                                                        
        },
        complete:function (jqXHR,textStatus) {                     
        }        
    });    
}
function cargarMultimediaDeALbum(album,numeroActual,callback){
    console.log("Cargando imagen");
    if(album.numeroMultimedia > 0 ){
        $.ajax({ //Extraer info Media       
            url :"https://ignsw201825-snproject.herokuapp.com/media/getList/"+album.id,       
            method :'GET', //en este caso
            contentType: 'application/json; charset=utf-8',
            dataType : 'json', //El tipo de archivo 
            async:true,           
            
            success : function (response){ //Si funciona 
                var listaDeMultiMedia = [];
               console.log(response);
                for(var j = 0; j < response.length; j++){
                    var media = {
                        id:response[j].id,
                        url:response[j].url,
                        link:response[j].link,
                        type:response[j].type
                    };
                    listaDeMultiMedia.push(media);
                }
                album.multiMedia = listaDeMultiMedia;
                album.portada = listaDeMultiMedia[0].url;
                var lista = JSON.parse(sessionStorage.getItem("listaAlbumes"));
                lista[numeroActual] = album;
                sessionStorage.setItem("listaAlbumes",JSON.stringify(lista)); 
                callback(numeroActual);
            },
            error: function(error){ //Si falla                  
                console.log(error.responseText);
            }      
                                
        });
    }else{
        callback(numeroActual);
    }
     //Fin de multimedia  
} 
function  mostrarAlbumesEnElPerfil(albumActual){
    var album = JSON.parse(sessionStorage.getItem("listaAlbumes"))[albumActual]; 
    console.log("Portada :" + album.portada); 
    if(album.portada != null ){     
            console.log("Mostrando contenido");
            $("#galeria").append(
                " <div id ='cuadro-album'  class='card col-12 col-sm-6 col-md-5 col-lg-5'  onclick='gestionDeALbumDelUsuario("+albumActual+")' tabindex='-1' >"+					                       
                        "<img id='imagen-principal'class='card-img-top' src='"+ album.portada +"' style='max-height: 80%;' alt='Busqueda'>"+
                        '<div id="info-album" class="card-img-overlay">'+
                                '<h5  class="card-title">'+album.nombre+'</h5>'+
                                '<p class="card-text"">'+album.descripcion+'</p>'	+						
                        '</div>'+							
                    '</div>'                  		                 
            );
    }else{
         console.log("Sin fotos");
        $("#galeria").append(
        " <div id ='cuadro-album'  class='card col-12 col-sm-6 col-md-5 col-lg-5' onclick='gestionDeALbumDelUsuario("+albumActual+")' tabindex='-1'>"+					                       
                "<img id='imagen-principal'class='card-img-top' src='image/defImagen.png' alt='Busqueda'>"+
                '<div id="info-album" class="card-img-overlay">'+
                        '<h5  class="card-title" style="color:black;">'+album.nombre+'</h5>'+
                        '<p class="card-text" style="color:black;">'+album.descripcion+'</p>'	+						
                '</div>'+							
            '</div>'                    		
                            
        );
    }
}
function mostrarMultimediaDeAlbum2(multimedia,numeroDeimagen,tipo){       
        var icono = "";
        if(tipo === "imagen"){
            icono =  "image/instagramLogo.png";
        }else if(tipo === "video"){
            icono =  "image/logo-youtube.png";
        }else if(tipo === "audio"){
            icono =  "image/spotify-logo.png";
        }
        $("#galeria-multimedia").append(                    
            "<script type='text/javascript' id='script"+numeroDeimagen+"'>"+
                " function procedencia"+numeroDeimagen+"(){"+
                    "var win = window.open('"+multimedia.link+"','_blank');"+
                " if (win) {  "+      
                    " win.focus();"+
                    "} else {  "+      
                    " alert('Please allow popups for this website');"+
                " }"+
            " }"+
            "</script>"+
            "<div id ='cuadro-album'  class='card col-12 col-sm-6 col-md-5 col-lg-5 ima-"+numeroDeimagen+"' tabindex='-1' onclick='focusMedia("+'"'+multimedia.id+'"'+")' >"+					                       
                 "<img id='imagen-principal'class='card-img-top' src='"+multimedia.url+"' alt='Busqueda'>"+                            
                 "<img id='icono-Pagina' src='"+icono+"' width='50' height='50' onclick='procedencia"+numeroDeimagen+"()' >"+	
                 "<img id='icono-Borrar' src='image/delete.png' width='50' height='50' data-toggle='modal' data-target='#eliminarModalMedia' >"+					           							
            '</div>'                   
        ); 
                     
}
function guardarNuevoAlbum2(){
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
            obtenerAlbumes(sessionStorage.getItem("id"));
            document.location.reload();                         
            },
        error: function(jqXHR, textStatus, errorThrown){             
            tratarFallos(jqXHR, textStatus, errorThrown);              
        }
    });
}
function gestionDeALbumDelUsuario(numeroDeAlbum){         
    var album = JSON.parse(sessionStorage.getItem("listaAlbumes"))[numeroDeAlbum];   
    localStorage.setItem("idDeAlbumTarget",album.id);
    limpiarVistaDeContenidoDeAlbum();

    $("#opcion-Album").css("display","block");    
    $("#galeria-multimedia").css("display","flex"); 
    $("#galeria").css("display","none");
    $(".titulo-album-gestion").text(""+album.nombre);
    $(".descripcion-album-gestion").text(""+album.descripcion);
    var multimedia = album.multiMedia;

    if(multimedia.length > 0){
        for(var numeroDeMultimedia = 0; numeroDeMultimedia < multimedia.length; numeroDeMultimedia++){
            mostrarMultimediaDeAlbum2(multimedia[numeroDeMultimedia],numeroDeMultimedia,multimedia[numeroDeMultimedia].type);                  
        }
    }  
     
}
function limpiarVistaDeContenidoDeAlbum(){     
    document.getElementById('galeria-multimedia').innerHTML='';
}
function focusMedia(id){
    localStorage.setItem("mediaIdTarget",id);
}
// FUNCIONES DE REMPLAZO PARA LAS OPTMIZAR EL CODIGO-----------------------------------------------------------------------------