//namespaces


var nombre = null ;
var descripcion = null ;
var numeroDeFotos = null ;
var identificador = null ;
var listaDeMultiMedia  = [{}];
var listaDeAlbumes = [];


var Album = function(idAlbum){    
        this.id = idAlbum;
     
     this.mostrarInfoAlbum = function(){
        console.log("Nombre: "+nombre);
        console.log("Descripcion: "+descripcion);
        console.log("Numero de fotos: "+numeroDeFotos);
        console.log("ID: "+identificador);
     }
    
    this.getId = function(){
        return this.id;
    }
    this.getNombre = function(){
        return this.nombre;
    }
    this.getDescripcion = function(){
        return this.descripcion;
    }
    this.getNumeroDeFotos = function(){
        return this.numeroDeFotos;
    }    
    this.getListaMedia = function(){
        return listaDeMultiMedia; 
    }

    this.getMediaFoto = function(indice){
        return listaDeMultiMedia[indice].url; 
    }
    this.getMediaProcedencia = function(indice){
        return listaDeMultiMedia[indice].link; 
    }
    this.getMediaId = function(indice){
        return listaDeMultiMedia[indice].id; 
    }
    this.getMediaVideo = function(indice){
        return listaDeMultiMedia[indice].urlVideo; 
    }
    this.getMediaTipo = function(indice){
        return listaDeMultiMedia[indice].type; 
    }

    this.setNombre = function(nombre){
        this.nombre = nombre;
    }
    this.setDescripcion = function(descripcion){
        this.descripcion = descripcion;
    }
    this.setNumeroDeFotos = function(numeroDeFotos){
        this.numeroDeFotos = numeroDeFotos;
    }
   this.setMedia = function(listaImagenes){     
        listaDeMultiMedia = listaImagenes;
        
   }
}
function crearAlbumNuevo(id,token,nombreDelAlbum,descripcion){     
    var albumNuevo = {
        "userId": id,
        "authToken":token,
        "name": nombreDelAlbum, 
        "description": descripcion
     }
     $.ajax({
        url : "https://ignsw201825-snproject.herokuapp.com/album/add", 
        data : JSON.stringify(albumNuevo), 
        method :'POST', 
        contentType: 'application/json; charset=utf-8',
        dataType : 'json',

        success : function (response){            
            console.log("album Creado");                 
            },
        error: function(jqXHR, textStatus, errorThrown){             
            console.log(jqXHR.responseText);              
        }
    });
}

function obtenerDatosDeAlbum(album){              
    var urlParaEnviarPeticion = "https://ignsw201825-snproject.herokuapp.com/album/get/"+album.getId();    
    $.ajax({ //Envia los datos         
            url : urlParaEnviarPeticion, //Url       
            method :'GET', //en este caso
            contentType: 'application/json; charset=utf-8',
            dataType : 'json', //El tipo de archivo            
            
            success : function (response){ //Si funciona
                album.setNombre(""+response.name);
                album.setDescripcion(""+response.description);
                album.setNumeroDeFotos(""+ response.media.length); 
                if(response.media.length !== "0"){
                    console.log("Id del album " + album.getId());
                    $.ajax({ //Extraer lista media       
                        url :"https://ignsw201825-snproject.herokuapp.com/media/getList/"+album.getId(),       
                        method :'GET', //en este caso
                        contentType: 'application/json; charset=utf-8',
                        dataType : 'json', //El tipo de archivo            
                    
                        success : function (response){ //Si funciona 
                            console.log("Listo"); 
                           album.setMedia(response); 
                           for(var i = 0; i < album.getNumeroDeFotos();i++){
                                console.log("Image: "+album.getMediaFoto(i));
                                console.log("Procedencia: "+album.getMediaProcedencia(i));
                                console.log("Tipo: "+album.getMediaTipo(i));
                           }  
                        },
                        error: function(error){ //Si falla                     
                            console.log("no cargos lista de imagenes \n");
                        }
                    });                               
                }                   
                console.log("Guardado");                            
            },
            error: function(jqXHR, textStatus, errorThrown){ //Si falla 
               console.log(jqXHR.responseText);                                      
            }
           
    });      
}

function obtenerListaDeAlbumes(idUsuario){
    var parada = false;
     
    $.ajax({ //Envia los datos         
        url : "https://ignsw201825-snproject.herokuapp.com/album/getList/"+idUsuario,        
        method :'GET', //en este caso
        contentType: 'application/json; charset=utf-8',
        dataType : 'json', //El tipo de archivo            
        
        success : function (response){ //Si funciona                 
            console.log("Lista full: " + response[0].id); 
            var albumFull;           
            for(var elementoDeAlbum = 0; elementoDeAlbum < response.length; elementoDeAlbum++){   //por album 
                console.log(response[elementoDeAlbum].name);   
                var album ={
                    id:response[elementoDeAlbum].id,
                    name:response[elementoDeAlbum].name,
                    description:response[elementoDeAlbum].description, 
                    numbreOfMultimedia:response[elementoDeAlbum].media.length,
                    multiMedia:response[elementoDeAlbum].media   
                };                    
                 listaDeAlbumes.push(album);          
            }              
            
                               
        },
        error: function(jqXHR, textStatus, errorThrown){ //Si falla 
           console.log(jqXHR.responseText);                                                        
        },
        complete:function (jqXHR,textStatus) {
            console.log("termino albumes");           
        }        
    });    
} 
function cargarMultimediaDeALbum(id){
    $.ajax({ //Extraer info Media       
        url :"https://ignsw201825-snproject.herokuapp.com/media/getList/"+id,       
        method :'GET', //en este caso
        contentType: 'application/json; charset=utf-8',
        dataType : 'json', //El tipo de archivo            
        
        success : function (response){ //Si funciona 
            for(var j = 0; j < response.length; j++){
                var media = {
                    id:response[j].id,
                    url:response[j].url,
                    link:response[j].link,
                    type:response[j].type
                };
                listaDeMultiMedia.push(media);
            }
            listaDeAlbumes ={
                album:listaDeAlbumes,   
                media:listaDeMultiMedia                
            };                              
        },
        error: function(error){ //Si falla                     
             console.log("no cargos lista de imagenes \n");
            console.log(error.responseText);
        }      
                            
    });
     //Fin de multimedia  
} 
function mostrarDatos(album){
    console.log("Nombre: " +album.getNombre());
    console.log("descripcion: " +album.getDescripcion());
    console.log("numero de fotos: " +album.getNumeroDeFotos());
    console.log("Lista multimedia " + album.getListaMedia() );
}




/*
 if(response[elementoDeAlbum].media.length > 0){//por multimedia
                    var albumParaCombinar = album;
                    $.ajax({ //Extraer info Media       
                        url :"https://ignsw201825-snproject.herokuapp.com/media/getList/"+response[elementoDeAlbum].id,       
                        method :'GET', //en este caso
                        contentType: 'application/json; charset=utf-8',
                        dataType : 'json', //El tipo de archivo            
                        
                        success : function (response){ //Si funciona 
                            for(var j = 0; j < response.length; j++){
                                var media = {
                                    id:response[j].id,
                                    url:response[j].url,
                                    link:response[j].link,
                                    type:response[j].type
                                };
                                listaDeMultiMedia.push(media);
                            }
                            albumFull ={
                                album:albumParaCombinar,   
                                media:listaDeMultiMedia                
                            }; 
                            listaDeAlbumes.push(albumFull);                    
                        },
                        error: function(error){ //Si falla                     
                             console.log("no cargos lista de imagenes \n");
                            console.log(error.responseText);
                        },
                        complete:function (jqXHR,textStatus) {
                            console.log("Termino Media");
                            if(textStatus === "success"){
                                
                                sessionStorage.setItem("listaAlbumes",JSON.stringify(listaDeAlbumes));
                            }
                        }                     
                    });
                     //Fin de multimedia
                }else{
                    albumFull ={
                        album:album,   
                        media:null                
                    };  
                    listaDeAlbumes.push(albumFull);                                           
                }   
 */