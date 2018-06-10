var nuevaBusqueda = false;
function mostrarResultados(){
if(nuevaBusqueda == true){   
    nuevaBusqueda = false;
    location.reload();
}else{

     $("#particles-js").css("display", "none"); 
     $("#titulo-Seccion").css("display","block");
     $("#separador-Busqueda").css("display","block");
     $("#titulo-Seccion").css("margin-top","50px");
     $("#fondo-Imagen").css("position","fixed");

    for(var i = 0; i < 80; i++){
    $(".BusquedaOrdenada").append("<div id ='cuadro-Busqueda'><div id='cuadro-Contenido'class='center-block'>"+
            "<div id='titulo-Busqueda'><p> Titulo </p></div>"+
            "</div>  </div>");   
        }
        nuevaBusqueda = true;
    }
}