function cargarDato(urlServidor){
    var id = variablesHeader();
    var enlace = urlServidor;
    var causa = 0;
    console.log("Enviando datos");
    var respuesta = getDat(enlace,id[0],causa);   
}

function actualizar() {
	var id = variablesHeader();
	var enlace="https://ignsw201825-snproject.herokuapp.com/user/get/"
	enlace=enlace;
	var causa = 0;
	console.log("Enviando datos");
	var respuesta = getDat(enlace,id[0],causa);
	
}
