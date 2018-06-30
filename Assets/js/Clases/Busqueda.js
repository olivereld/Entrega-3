var busquedasEchas = 0;
var instagram_result,youtube_result,spotify_result = false;

var nuevaBusqueda = false;

function buscarPalabra(){
    var urlInstragram = "https://ignsw201825-snproject.herokuapp.com/search/instagram?q=";//instagram    
    var palabraABuscar = $('.barra-Navegacion').val();  
    var urlYouTube = "https://ignsw201825-snproject.herokuapp.com/search/youtube?q=chocolate" + youtubeParametros(palabraABuscar);
    if(!nuevaBusqueda){
        if(palabraABuscar != "" ){   
            $("#cargando").modal();
            $(".loadingResult").css("display","flex");
            if(nuevaBusqueda){
                sessionStorage.setItem("busquedaRealizada",palabraABuscar);    
                location.reload();
            }
            urlInstragram = instagramParametros(urlInstragram,palabraABuscar); 
            sessionStorage.setItem("datoBusquedaLocalInstragram",urlInstragram); 
            enviarPeticionDeBusqueda(urlInstragram,"instagram");
            enviarPeticionDeBusqueda(urlYouTube,"youtube");
            nuevaBusqueda = true;
        }else{
            $("#errorModal").modal();
            mostrarError(10);
        }
    }else{
        this.location.reload();
    }
}

function cambiarValorDeNuevaBusqueda(){
    nuevaBusqueda = true;
}

function instagramParametros(url,busqueda){
    var elementoABuscar = busqueda.split(" ");     
    for(var i = 0; i < elementoABuscar.length; i++)
    url = url + elementoABuscar[i];    
    return url;
}
function youtubeParametros(busqueda){
    var elementoABuscar = busqueda.replace(" ","+");  
    return elementoABuscar;
}

//Busquedas
function enviarPeticionDeBusqueda(enlaceUrlHeroku,pagina){
    sessionStorage.setItem("finDePagina","10000");  
   try{
    $.ajax({
        url : enlaceUrlHeroku,         
        method :'GET', 
        contentType: 'application/json; charset=utf-8',
        dataType : 'json', 

        success : function (response){
            busquedasEchas++;                          
            busquedasFinalizadas(true,pagina); 
            if(pagina === "youtube"){                        
                $("#menu1").css("display","block");
                $("#paginacion_Video").css("display","block");
                $("#paginasVideo").css("display","block");
                var listaResultados = response.items;               
                var paginacionSiguiente = response.nextPageToken;   
                var paginacionAnterior =  response.prevPageToken;
                sessionStorage.setItem("todosLosResultadosYoutube",""+response.totalResults);
                sessionStorage.setItem("youtubeNext",""+paginacionSiguiente);
                sessionStorage.setItem("youtubePrev",""+paginacionAnterior);
                prepararResultadosYoutube(listaResultados); 
            }else if(pagina === "instagram"){               
                prepararResultados(response); 
            }         
                            
            },
        error: function(XMLHttpRequest, textStatus, errorThrown){  
            busquedasEchas++;  
            
            if(sessionStorage.getItem("datoBusquedaLocal")){
                sessionStorage.removeItem("datoBusquedaLocal");
            }           
            busquedasFinalizadas(false,pagina);            
        }
    });   
   }catch(error){
    alert(error);
   }
   

}
function procedencia(UrlProcedencia){
    var win = window.open(UrlProcedencia,'_blank');
    if (win) {        
        win.focus();
    } else {        
        alert('Please allow popups for this website');
    }
}

function busquedasFinalizadas(resultadosDevueltos,pagina){   
    if(pagina === "instagram"){
        if(!resultadosDevueltos)
            $(".not_Found_Imagen").css("display","block");
        instagram_result = resultadosDevueltos;
        $("#cargaResultadosImagen").css("display","none");
    }else if(pagina === "youtube"){
        if(!resultadosDevueltos)
            $(".not_Found_Video").css("display","block");
        youtube_result = resultadosDevueltos;
        $("#cargaResultadosVideo").css("display","none");
    }else if(pagina === "spotify"){
        if(!resultadosDevueltos)
            $(".not_Found_Music").css("display","block");
        spotify_result === resultadosDevueltos;
        $("#cargaResultadosMusica").css("display","none");
    }
    if(busquedasEchas === 2){
       
        busquedasEchas = 0;
    }    
}

function siguientePagina(token){  
    try{
        $.ajax({
            url : "https://ignsw201825-snproject.herokuapp.com/search/youtube?q=parametro_de_busqueda&&pageToken="+token,         
            method :'GET', 
            contentType: 'application/json; charset=utf-8',
            dataType : 'json', 
    
            success : function (response){              
                var listaResultados = response.items;               
                var paginacionSiguiente = response.nextPageToken;   
                var paginacionAnterior =  response.prevPageToken;
                sessionStorage.setItem("todosLosResultadosYoutube",""+response.totalResults);
                sessionStorage.setItem("youtubeNext",""+paginacionSiguiente);
                sessionStorage.setItem("youtubePrev",""+paginacionAnterior);
                prepararResultadosYoutube(listaResultados);          
                },
            error: function(XMLHttpRequest, textStatus, errorThrown){ 
                if (XMLHttpRequest.responseText.indexOf("no_result_found") > -1){
                    finalDeBusqueda();
                }                         
            }
        });   
    } catch(error){
        alert(error);
    }
   
}
