
var nuevaBusqueda = false;


function buscarPalabra(){   
    
    var url = "https://ignsw201825-snproject.herokuapp.com/search/instagram?q=";
    var palabraABuscar = $('#barra-Navegacion').val();

    if(nuevaBusqueda){
        sessionStorage.setItem("busquedaRealizada",palabraABuscar);    
        location.reload();
    }

    var elementoABuscar = palabraABuscar.split(" ");     
    for(var i = 0; i < elementoABuscar.length; i++)
    url = url + elementoABuscar[i];   
    
     localStorage.setItem("datoBusquedaLocal",url);    
     enviarPeticionDeBusqueda(url);
     nuevaBusqueda = true;
   
}
function cambiarValorDeNuevaBusqueda(){
    nuevaBusqueda = true;
}




