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

<<<<<<< HEAD
            enviarPeticionDeBusqueda(urlInstragram,"instagram");
            enviarPeticionDeBusqueda(urlYouTube,"youtube");

            nuevaBusqueda = true;
        }else{
            $("#errorModal").modal();
            mostrarError(10);
        }
=======
        var elementoABuscar = palabraABuscar.split(" ");     
        for(var i = 0; i < elementoABuscar.length; i++)
        url = url + elementoABuscar[i];   
        
        sessionStorage.setItem("datoBusquedaLocal",url);    
        enviarPeticionDeBusqueda(url);
        nuevaBusqueda = true;
>>>>>>> 1c8e88eeb2496d0c22072bfb51a3dca5d63f8e6e
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
   
    $.ajax({
        url : enlaceUrlHeroku,         
        method :'GET', 
        contentType: 'application/json; charset=utf-8',
        dataType : 'json', 

        success : function (response){
            busquedasEchas++;                          
            busquedasFinalizadas(true,pagina); 
            if(pagina === "youtube"){                
                console.log(response);
                var listaResultados = response.items;               
                var paginacionSiguiente = response.nextPageToken;   
                var paginacionAnterior =  response.prevPageToken;
                sessionStorage.setItem("todosLosResultadosYoutube",""+response.totalResults);
                sessionStorage.setItem("youtubeNext",""+paginacionSiguiente);
                sessionStorage.setItem("youtubePrev",""+paginacionAnterior);
                prepararResultadosYoutube(listaResultados); 
            }else if(pagina === "instagram"){
                $("#cargaResultadosImagen").css("display","none");
                prepararResultados(response); 
            }         
                            
            },
        error: function(XMLHttpRequest, textStatus, errorThrown){  
            busquedasEchas++;  
            
            if(sessionStorage.getItem("datoBusquedaLocal")){
                sessionStorage.removeItem("datoBusquedaLocal");
            }           
            busquedasFinalizadas(false,pagina);       
            alert("Fallo: " + JSON.stringify(XMLHttpRequest));
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

function busquedasFinalizadas(resultadosDevueltos,pagina){   
    if(pagina === "instagram"){
       
        instagram_result = resultadosDevueltos;
    }else if(pagina === "youtube"){
        
        youtube_result = resultadosDevueltos;
    }else if(pagina === "spotify"){
        spotify_result === resultadosDevueltos;
    }
    if(busquedasEchas === 2){
        if(!instagram_result && !youtube_result ){
            sinResultados();            
        }
        busquedasEchas = 0;
    }    
}

function siguientePagina(token){   
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
            alert("Fallo: " + JSON.stringify(XMLHttpRequest));
        }
    });   
}
