
function mostrarAlbums(response){
    var titulo = "" + response.name;
    var descripcion = "" + response.description;   
    $("#galeria").append(
        '<div class="card  mb-3" style="max-width: 17rem; position: relative;">'+
                        '<div class="card text-white bg-dark mb-2" style="max-width: 15rem; position: relative; float:left; border:none; ">'+
                            '<img class="card-img" src="image/3.jpg" alt="Card image" style="opacity: 0;">'+
                            '<div class="card-img-overlay">'+
                                        '<div class="card-header" style="background: #111111b6; ">'+titulo+'</div>'+
                                        '<div class="card-body" style="background: #111111b6;">'+
                                        '<h5 class="card-title">'+descripcion+'</h5>'+
                                    '	<p class="card-text">Usted puede agregar contenido multimedia si lo desea.</p>'+
                                    '</div>'+
                            '</div>'+									
                        '</div>'+								
                    '</div>'								
                        
    );
}

function crearNuevoAlbum(){
    $("#opcion-Album").css("display","none");
    $("#cuadro-album-nuevo").css("display","none");
    $("#cuadro-album").css("display","none");
    $("#crear-Album").css("display","block");
}
function volverAPrevizualisarAlbumes(){
    $("#opcion-Album").css("display","block");
    $("#cuadro-album-nuevo").css("display","block");
    $("#cuadro-album").css("display","block");
    $("#crear-Album").css("display","none");
    PrepararInfoAlbums()
}
function actualizarStorageAlbumes(){
    var urlPeticionEnHeroku = "https://ignsw201825-snproject.herokuapp.com/user/get/"+sessionStorage.getItem("id");
    $.ajax({ //Envia los datos         
        url : urlPeticionEnHeroku, //Url       
        method :'GET', //en este caso
        contentType: 'application/json; charset=utf-8',
        dataType : 'json', //El tipo de archivo            

        success : function (response){ //Si funciona
           sessionStorage.setItem("albumes",""+JSON.stringify(response.albums).substring(1,JSON.stringify(response.albums).length-1));
           location.reload;                    
        },
        error: function(error){ //Si falla                     
             console.log("No se actualizaron los albumes");
        }
    });
}
function obtenerDatosDeAlbum(idAlbum){
    
    var urlParaEnviarPeticion = "https://ignsw201825-snproject.herokuapp.com/album/get/"+idAlbum;
    $.ajax({ //Envia los datos         
        url : urlParaEnviarPeticion, //Url       
        method :'GET', //en este caso
        contentType: 'application/json; charset=utf-8',
        dataType : 'json', //El tipo de archivo            

        success : function (response){ //Si funciona
            console.log(response.name);
            mostrarAlbums(response);                                          
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
            console.log(response);
            console.log("album agregado"); 
            actualizarStorageAlbumes();
            volverAPrevizualisarAlbumes();         
            },
        error: function(error){             
            console.log(error);               
        }
    });


}

function agregarImagenEnElAlbum(){

}
function agregarVideoEnElAlbum(){

}
function PrepararInfoAlbums(){
    if(sessionStorage.getItem("albumes").length > 0){
        var albumPorId = sessionStorage.getItem("albumes").split(",");
        cantidadDeAlbumes = albumPorId.length;        
       
        for(var i = 0; i < albumPorId.length;i++ ){               
            obtenerDatosDeAlbum(albumPorId[i]);
        }
    }
}
