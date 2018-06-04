
function enviarLog(urlServidor){ //Con JQuery Forma 1
    var data = { //Creando JSON Con el formato
        "email"       : $(correoLog).val(),
        "password"    : btoa($(claveLog).val()),    
    }     //Almacena en una variable el json para luego enviarlo por http 
    causa = 1;
    enviarDat(urlServidor,data,causa);   
}
function logOut(urlServidor){
    var id = ""+sessionStorage.getItem("id");
    var token = ""+sessionStorage.getItem("token");
    var data = { //Creando JSON Con el formato
        "id"           :id,
        "authToken"    : token,   
    }     //Almacena en una variable el json para luego enviarlo por http 
    var causa = 3;
    enviarDat(urlServidor,data,causa);
    sessionStorage.clear();
}
