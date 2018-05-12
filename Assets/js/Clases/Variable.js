function variablesHeader(){
    var paramstr = window.location.search.substr(1);                           
    var paramarr = paramstr.split ("&");                           
    var auxiliar = [];

    for(var i = 0; i < paramarr.length; i++ ){
         auxiliar[i]= (paramarr[i].split("="))[1];
        console.log(auxiliar);
    }
    return auxiliar;
} 