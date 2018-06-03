var nuevaBusqueda = false;
function mostrarResultados(){
if(nuevaBusqueda == true){   
    nuevaBusqueda = false; 
    location.reload();
}else{
    for(var i = 0; i < 12; i++){
    $(".BusquedaOrdenada").append("<div id ='cuadro-Busqueda'><div id='cuadro-Contenido'class='center-block'>"+
            "<div id='titulo-Busqueda'><span class='icon-music'><p> Titulo </p></span></div>"+
            "</div>  </div>");   
        }
        nuevaBusqueda = true;
    }
}