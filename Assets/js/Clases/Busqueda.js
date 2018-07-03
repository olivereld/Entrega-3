var busquedasEchas = 0;
var instagram_result,youtube_result,spotify_result = false;
var busquedaActual = "";
var nuevaBusqueda = false;

function buscarPalabra(palabraABuscar){
    busquedaActual = palabraABuscar; 
    localStorage.setItem("finDeBusquedaVideo",10000);
    localStorage.setItem("finDeBusquedaMusica",10000);
    //instagram      
    var urlInstragram  = "https://ignsw201825-snproject.herokuapp.com/search/instagram?q=";
    var urlYouTube     = "https://ignsw201825-snproject.herokuapp.com/search/youtube?q=" + youtubeParametros(palabraABuscar);
    var urlSpotify     = "https://ignsw201825-snproject.herokuapp.com/search/spotify?q=" + youtubeParametros(palabraABuscar);
    if(!nuevaBusqueda){       
        if(palabraABuscar != "" ){
            localStorage.removeItem("busquedaNueva");
            $("#particles-js").css("display", "none"); 
            $("#titulo-Seccion").css("display","block");
            $("#titulo-Seccion").css("margin-top","64px");
            $("#separador-Busqueda").css("display","block");        
            $("#fondo-Imagen").css("position","fixed");
            
            tabs("video"); 
            $("#checkYoutube").prop( "checked", true );
            $("#checkYoutube" ).prop( "disabled", true );
            $("#checkSpotify").prop( "checked", false );
            $("#checkSpotify" ).prop( "disabled", false );
            $("#checkInstagram").prop( "checked", false );
            $("#checkInstagram" ).prop( "disabled", false );
        
            $('#cargando').modal();
            $(".loadingResult").css("display","flex");
            if(nuevaBusqueda){
                sessionStorage.setItem("busquedaRealizada",palabraABuscar);    
                location.reload();
            }
            urlInstragram = instagramParametros(urlInstragram,palabraABuscar);         
            enviarPeticionDeBusqueda(urlYouTube,"youtube");
            enviarPeticionDeBusqueda(urlSpotify,"spotify");
            enviarPeticionDeBusqueda(urlInstragram,"instagram");
            nuevaBusqueda = true;
        }else{           
            mostrarError(10);
        }
    }else{
        if($('.barra-Navegacion').val() != "")
            localStorage.setItem("busquedaNueva",$('.barra-Navegacion').val());
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
            if(pagina === "youtube"){  //YOUTUBE                         
                imprimirResultadosVideo(response.nextPageToken, response.items);               
            }else if(pagina === "instagram"){ //INSTAGRAM              
                prepararResultados(response); 
            }else if(pagina === "spotify"){  //SPOTIFY             
                console.log(response);
                prepararResultadosSpotify(response.nextPageOffset,response.tracks);
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
    }
    else if(pagina === "youtube"){
        if(!resultadosDevueltos){
            $("#paginacion_Video").append(  
                '<div id ="pagina_Video"class="tab-pane">'+
                    '<div class="row BusquedaOrdenadaVideo card-columns paginaVideo">'+           
                         '<div id="sinResultados" class="card not_Found_Video" style="width: 18rem; margin-left:auto; margin-right:auto; background-color: rgba(0,0,0,0.2); height: auto;">'+
                        ' <img class="card-img-top" src="image/notResult.png" alt="Card image cap">'+
                           ' <div class="card-body" style="color: white">'+
                              '  <h5 class="card-title">No se encontraron resultados</h5>'+                                                    
                          '  </div>'+
                        '</div>'  +             
                    '</div>' +
               ' </div> '        
                );
            $(".not_Found_Video").css("display","block");
        }           
        youtube_result = resultadosDevueltos;
        $("#cargaResultadosVideo").css("display","none");
    }
    else if(pagina === "spotify"){
        if(!resultadosDevueltos){
            $("#paginacion_Musica").append(  
                '<div id ="pagina_Musica"class="tab-pane">'+
                    '<div class="row BusquedaOrdenadaMusica card-columns paginaMusica">'+           
                         '<div id="sinResultados" class="card not_Found_Music" style="width: 18rem; margin-left:auto; margin-right:auto; background-color: rgba(0,0,0,0.2); height: auto;">'+
                        ' <img class="card-img-top" src="image/notResult.png" alt="Card image cap">'+
                           ' <div class="card-body" style="color: white">'+
                              '  <h5 class="card-title">No se encontraron resultados</h5>'+
                                                   
                          '  </div>'+
                        '</div>'  +             
                    '</div>' +
               ' </div> '        
                );
            $(".not_Found_Music").css("display","block");
        }
           
        spotify_result === resultadosDevueltos;
        $("#cargaResultadosMusica").css("display","none");
    }
    if(busquedasEchas === 3){
        $('#cargando').modal("hide");
        busquedasEchas = 0;
    }    
}

function siguientePaginaVideo(paginaActual,token){      
    var parametroABuscar = youtubeParametros(busquedaActual); 
    if(token != "null"){   
        try{
            $.ajax({
                url : "https://ignsw201825-snproject.herokuapp.com/search/youtube?q="+parametroABuscar+"&pageToken="+token,         
                method :'GET', 
                contentType: 'application/json; charset=utf-8',
                dataType : 'json', 
        
                success : function (response){              
                    var listaDeElementos    = response.items;               
                    var paginacionSiguiente = response.nextPageToken;                  
                    imprimirResultadosVideo(paginacionSiguiente,listaDeElementos);
                    },
                error: function(XMLHttpRequest, textStatus, errorThrown){ 
                    if (XMLHttpRequest.responseText.indexOf("no_result_found") > -1){
                        $("#finDeResultadoVideo").css("display","block");
                    localStorage.setItem("finDeBusquedaVideo",paginaActual);
                    }                         
                }
            });   
        } catch(error){
            alert(error);
        }  
    } else{
        $("#finDeResultadoVideo").css("display","block");
        localStorage.setItem("finDeBusquedaVideo",paginaActual);
    }
}
function siguientePaginaMusica(paginaActual,offset){   
    var parametroABuscar = youtubeParametros(busquedaActual);   
    if(offset != "null"){
        try{
            $.ajax({
                url :' https://ignsw201825-snproject.herokuapp.com/search/spotify?q='+parametroABuscar+'&offset='+offset,         
                method :'GET', 
                contentType: 'application/json; charset=utf-8',
                dataType : 'json', 
        
                success : function (response){        
                    console.log(response);      
                    var listaDeElementos    = response.tracks;               
                    var paginacionSiguiente = response.nextPageOffset;                  
                    prepararResultadosSpotify(paginacionSiguiente,listaDeElementos);
                    },
                error: function(XMLHttpRequest, textStatus, errorThrown){                    
                        $("#finDeResultadoMusic").css("display","block");
                        localStorage.setItem("finDeBusquedaMusica",paginaActual);
                                            
                }
            });   
        } catch(error){
            alert(error);
        }  
    }else{
        $("#finDeResultadoMusic").css("display","block");
        localStorage.setItem("finDeBusquedaMusica",paginaActual);
    }
}
   
/*TODO: --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
    
function mostrarResultadoImagen(UrlDeImagen,urlPaginaDeProcedencia,numeroDeIndice){
        var botonGuardar ;      

        if(document.location.href.indexOf("index_User.html") > -1){
            botonGuardar = "<a id='boton-agregarImg2' href='#' class='btn btn-danger btn-sm' onclick='focusImagen("+'".urlImagenPrincipal'+numeroDeIndice+'"'+","+'"'+urlPaginaDeProcedencia+'"'+"); verificarInfoAlbums();' >Guardar</a>"; 
        }else{
            botonGuardar = "<a id='boton-agregarImg2' href='#' class='btn btn-danger btn-sm' data-toggle='modal' data-target='#myModal' >Guardar</a>";
        }

        $(".BusquedaOrdenadaImagen").append(
            "<script type='text/javascript'>"+
                " function procedencia"+numeroDeIndice+"(){"+
                    "var win = window.open('"+urlPaginaDeProcedencia+"','_blank');"+
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
            //mostrarResultadoInstaVideo(listaDeElementos[i].imageUrl,listaDeElementos[i].videoUrl,listaDeElementos[i].instagramLink,i);              
        }
    }
    $("#cargando").modal("hide");        
}


function mostrarResultadoVideo(UrlDeImagen,UrlDeVideo,urlPaginaDeProcedencia,numeroDeIndice,paginaImagen,contenedor){       
        var botonProcedencia;
        var frameVideo = "";
        if(paginaImagen === "instagram"){
            botonProcedencia = "instagramIcon.png";
            frameVideo = '<iframe id="videoResultado'+numeroDeIndice+'" width="640" height="360"  src="" frameborder="0" allowfullscreen></iframe>'
        }else{
            botonProcedencia = "logo-youtube.png";
            frameVideo = '<iframe id="videoResultado'+numeroDeIndice+'_'+contenedor+'" class="youtube-video" frameborder="0" allowfullscreen="1" allow="autoplay; encrypted-media" title="YouTube video player" width="640" height="360" src="'+UrlDeVideo+'"></iframe>'
        }
        var botonGuardar ;
        if(document.location.href.indexOf("index_User.html") > -1){
            botonGuardar = "<a id='boton-agregarImg2' href='#' class='btn btn-danger' onclick='focusVideo("+'"'+UrlDeImagen+'",'+'"'+urlPaginaDeProcedencia+'",'+'"'+UrlDeVideo+'"'+");verificarInfoAlbums();'>Guardar</a>"; 
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
                    '$(".reproductor").css("height","px");'+
                     '$("#reproductor-embebido").attr("src","");'+                   
                    '$("#videoResultado'+numeroDeIndice+'_'+contenedor+'").attr("src","'+UrlDeVideo+'");'+
                '});'+
            '});'+
           " function procedencia"+numeroDeIndice+"_"+contenedor+"(){"+
                "var win = window.open('"+urlPaginaDeProcedencia+"','_blank');"+
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
                "<img class='img-fluid' id='icono-Pagina' src='image/"+botonProcedencia+"' width='50' height='50' onclick='procedencia"+numeroDeIndice+"_"+contenedor+"()' >"+
                "<div data-toggle='modal' data-target='#video"+numeroDeIndice+"_"+contenedor+"' style='z-index: 99;'>"+
                    "<img id='icono-Video' src='image/play.png' width='100' height='100'  style='z-index: 100;' onmouseover='$(this).css("+'"opacity"'+","+'"1"'+");' onmouseout='$(this).css("+'"opacity"'+","+'"0.5"'+");'>"+
                "</div>"+
            "</div>"+     

            '<div class="bs-example">'+
                '<div id="video'+numeroDeIndice+'_'+contenedor+'" class="modal fade">'+
                    '<div class="modal-dialog modal-lg modal-dialog-centered">'+
                        '<div class="modal-content" style="background: rgba(255, 255, 255, 0); border:0px;">'+                         
                                '<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>'+                        
                                '<div class="modal-body text-center">'+
                                frameVideo+
                                '</div>'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                 '</div>'+     
            "</div>"
            );
}
function crearPaginaVideos(pagina){              
    $("#paginacion_Video").append(  
    '<div id ="pagina_Video_'+pagina+'"class="tab-pane">'+
        '<div class="row BusquedaOrdenadaVideo card-columns paginaVideo'+pagina+'">'+           
           ' <div id="cargaResultadosVideo" class="card loadingResult video_loading'+pagina+'" style="display: none; width: 10rem; margin-top: 5%; margin-left:auto; margin-right:auto; background-color: rgba(0, 0, 0, 0); height: auto; border: none;">'+
                '<img class="card-img-top" src="image/loading.gif" alt="Card image cap"> '+                       
           '</div>' +
            '<div id="sinResultados" class="card not_Found_Video" style="width: 18rem; margin-left:auto; margin-right:auto; background-color: rgba(0,0,0,0.2); height: auto;">'+
            ' <img class="card-img-top" src="image/notResult.png" alt="Card image cap">'+
               ' <div class="card-body" style="color: white">'+
                  '  <h5 class="card-title">No se encontraron resultados</h5>'+
                   ' <p class="card-text">Pruebe realizando otra busqueda con un tag diferente.</p> '+                      
              '  </div>'+
            '</div>'  +             
        '</div>' +
   ' </div> '        
    );
    localStorage.setItem("paginaActualVideo",pagina);       
}
   
var paginasEchasVideo = 0;
function imprimirResultadosVideo(tokenNext,listaDeElementos){
    paginasEchasVideo++;    
    crearPaginaVideos(paginasEchasVideo);
    for(var indice = 0; indice < listaDeElementos.length;indice++){
        var url = ("" + listaDeElementos[indice].videoUrl).split("=");
        var id = url[1];           
        var embedVideo =  "https://www.youtube.com/embed/"+id+"?controls=2&amp;rel=0&amp;autohide=1&amp;showinfo=0&amp;modestbranding=1&amp;wmode=transparent&amp;html5=1&amp;enablejsapi=1&amp;widgetid=1"
        mostrarResultadoVideo(listaDeElementos[indice].thumbnail,embedVideo,listaDeElementos[indice].videoUrl,indice,"youtube",paginasEchasVideo);
    } 
    localStorage.setItem("youtubeNext",tokenNext);
} 

    //TODO: terminar
var paginasEchasMusica = 0;
function prepararResultadosSpotify(urlNext,listaDeElementos){
    paginasEchasMusica++;
    crearPaginaMusica(paginasEchasMusica);

    for(var index = 0; index < listaDeElementos.length;index++){
        var id = ((listaDeElementos[index].url).split("track/"))[1];
        mostrarResultadoMusica(listaDeElementos[index].albumImageUrl,listaDeElementos[index].url,listaDeElementos[index].artists,listaDeElementos[index].name,listaDeElementos[index].album,id,index,paginasEchasMusica);
    }
    localStorage.setItem("spotifyNext",urlNext);
}



function crearPaginaMusica(pagina){
    $("#paginacion_Musica").append(
       "<div id='pagina_musica_"+pagina+"'class='tab-pane' >"+
            '<div class="row BusquedaOrdenadaMusica card-columns paginaMusica'+pagina+'">'+           
                '<div id="cargaResultadosMusica" class="card loadingResult music_loading'+pagina+'" style="display: none; width: 10rem; margin-top: 5%; margin-left:auto; margin-right:auto; background-color: rgba(0, 0, 0, 0); height: auto; border: none;">'+
                   ' <img class="card-img-top" src="image/loading.gif" alt="Card image cap">'+                    
                '</div>'+
                '<div id="sinResultados" class="card not_Found_Music" style="width: 18rem; margin-left:auto; margin-right:auto; background-color: rgba(0,0,0,0.2);">'+
                    '<img class="card-img-top" src="image/notResult.png" alt="Card image cap">'+
                    '<div class="card-body" style="color: white">'+
                        '<h5 class="card-title">No se encontraron resultados</h5>'+
                        '<p class="card-text">Pruebe realizando otra busqueda con un tag diferente.</p>' +                      
                   ' </div>'+
             '   </div>  '+
        '    </div> '+
        "</div>"
    );
    localStorage.setItem("paginaActualMusica",pagina); 
}
   
function mostrarResultadoMusica(urlImagen,urlProcedencia,artista,titulo,tituloAlbum,track,numeroDeIndice,contenedor){
        var botonGuardar ;           
        if(document.location.href.indexOf("index_User.html") > -1){
            botonGuardar = "<a id='boton-agregarImg2' href='#' class='btn btn-danger btn-sm' onclick='focusAudio("+'"'+urlImagen+'","'+urlProcedencia+'","'+track+'"'+"); verificarInfoAlbums();'>Guardar</a>"; 
        }else{
            botonGuardar = "<a id='boton-agregarImg2' href='#' class='btn btn-danger btn-sm' data-toggle='modal' data-target='#myModal' >Guardar</a>";
        }
        $(".paginaMusica"+contenedor).append(
            "<script type='text/javascript'>"+
               "function procedencia"+numeroDeIndice+"_"+contenedor+"(){"+
                    "var win = window.open('"+urlProcedencia+"','_blank');"+
                    "if (win) { " +      
                         "win.focus();"+
                    "} else {  "+  
                         "alert('Please allow popups for this website');"+
                    "}"+
                "}"+
            "</script>"+
            "<div id ='cuadro-Busqueda' class='card col-12 col-sm-6 col-md-4 col-lg-3' >"+
                "<div id='cuadro-Contenido' class='card-body' style='padding: .30rem;'  > " +
                     '<span id="titulo1_1" style="position:absolute;color: white;background: rgba(0, 0, 0, 0.405); width: 97%;">'+artista+'</br>'+titulo+'-'+tituloAlbum+'</span>'+
                     "<img id='imagen-Principal'class='card-img-top urlImagenPrincipal"+numeroDeIndice+"_"+contenedor+"' src='"+urlImagen+"'alt='Busqueda'>"+
                     botonGuardar+
                     "<img id='icono-Pagina' src='image/spotify-logo.png' width='40' height='40' onclick='procedencia"+numeroDeIndice+"_"+contenedor+"()'>"+
                     "<img id='icono-Musica' src='image/play.png' width='100' height='100'  style=' z-index: 100;' onclick='colocarEnReproductor("+'"'+track+'"'+");' onmouseover='$(this).css("+'"opacity"'+","+'"1"'+");' onmouseout='$(this).css("+'"opacity"'+","+'"0.5"'+");'>"+
                "</div>"+
            "</div>"
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