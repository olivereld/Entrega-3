function cargarDato(urlServidor){
    var id = variablesHeader();
    var enlace = urlServidor;
    var causa = 0;
    console.log("Enviando datos");
    var respuesta = getDat(enlace,id[0],causa);   
}
