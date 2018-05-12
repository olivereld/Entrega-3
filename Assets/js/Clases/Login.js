
function enviarLog(urlServidor){ //Con JQuery Forma 1
    var data = { //Creando JSON Con el formato
        "email"       : $(correoLog).val(),
        "password"    : $(claveLog).val(),    
    }     //Almacena en una variable el json para luego enviarlo por http 
    causa = 1;
    enviarDat(urlServidor,data,causa);   
}