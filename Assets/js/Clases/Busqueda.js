

var nuevaBusqueda = false;


function buscarPalabra(){

   

    var url = "https://ignsw201825-snproject.herokuapp.com/search/instagram?q=";
    var palabraABuscar = $('#barra-Navegacion').val()
    var elementoABuscar = palabraABuscar.split(" ");
    console.log("Buscando");
    for(var i = 0; i < elementoABuscar.length; i++)
    url = url + elementoABuscar[i];   
    
     enviarPeticionDeBusqueda(url);
     nuevaBusqueda = true;
   
}


