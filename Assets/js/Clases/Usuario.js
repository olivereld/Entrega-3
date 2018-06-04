function cargarDato(urlServidor){
    var id = variablesHeader();
    var enlace = urlServidor;
    var causa = 0;    
    var respuesta = getDat(enlace,id[0],causa);   
}

function actualizar(urlServidor) {
	var id = variablesHeader();	
	var causa = 2;
	console.log("Enviando datos");
	var respuesta = getDat(urlServidor,id[0],causa);
	
}
