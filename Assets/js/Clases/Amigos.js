
function getUser(boolean){	
    $.ajax({
        url: 'https://randomuser.me/api/?results=100&inc=name,picture&noinfo',
        dataType: 'json',
        success: function(data) {
        console.log(data);
        getUserRandom(data);
        //guardarDatos(data);
        }
    });
    
}

function getUserRandom(data){
    var friends= document.getElementById('friends');
    var j=0;
    while (j<100){
       
            friends.innerHTML+= `
            <div class="card" id=cf>
                                
            <div class="col-md-6 float-left px-0 py-auto text-center">
                    <img src="${data.results[j].picture.large}" class="card-img-top img-fluid px-0" alt="">
            </div>
                
            <div class="col-md-6 float-left px-2 pt-1 pb-1">
                <div class="text-center">
                    <p class="rale text-capitalize">${data.results[j].name.first+" "+data.results[j].name.last}</p>
                    <button type="button" class="btn btn-primary btn-sm"><i class="fas fa-plus"></i><i class="fas fa-user"></i></button>
                </div>
            </div>    
                
        </div>
            ` 
          
    j++;
    }
}

function llenarRegistrados(response,data,number){
    var j=0;
    var friends= document.getElementById('friends');
    var users= document.getElementById('users');
    var users2= document.getElementById('users2');
    var icon='<i class="fas fa-plus mr-1"></i><i class="fas fa-user"></i>';
    var color ="primary"
    var funcion ="agregarAmigo"
    if (number==1){
        friends=users2;
        icon='<i class="fas fa-user-times"></i>';
        color="danger";
        funcion="eliminarAmigo";
    }
    while (j<response.length){
        if ((j<6)&(j<response.length)&(users!=null)){
            users.innerHTML+= `
            <div class="card text-white" data-toggle="tooltip" title="" data-original-title="Default tooltip">
                <img src="${data.results[j].picture.large}"   class="card-img" alt="">
                <div class="card-img-overlay pl-2 pt-4">
                    <p class="text-centered pt-5" style="font-size:12px">${response[j].firstName}</p>
                </div>
                
            </div>
            `
        }
            friends.innerHTML+= `
            <div class="card" id=cf-${j} data-copy="${response[j].id}" style="display: none">
                <a href="#" data-toggle="modal" data-target="#modal-${j}" style="color:black;">                             
                <div class="col-md-6 float-left px-0 py-auto text-center">
                        <img src="${data.results[j].picture.large}" class="card-img-top img-fluid px-0" alt="">
                </div>
                </a>
                    
                <div class="col-md-6 float-left px-2 pt-1 pb-1">
                    <div class="text-center">
                    <a href="#" data-toggle="modal" data-target="#modal-${j}" style="color:black;">
                        <p class="rale text-capitalize">${response[j].firstName+" "+response[j].lastName}</p>
                        </a>
                        <button id=bt-${j} type="button" class="btn btn-${color} btn-sm" onclick="${funcion}(${j})">${icon}</button>
                    </div>
                </div> 
                       
            </div>
                        <!-- Modal -->
            <div class="modal fade" id="modal-${j}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-lg rounded" role="document">
                    <div class="modal-content rounded">
                        <div class="modal-header">
                            <h4 class="modal-title rale" id="exampleModalLabel">PERFIL</h4>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="container">
                                <div class="col-md-5 float-left">
                                    <div class="card">
                                        <img src="${data.results[j].picture.large}" alt="" class="card-img-top">
                                    </div>
                                </div>
                                <div class="col-md-7 float-left">
                                    <div class="card">
                                        <div class="card-header rale"><i class="fas fa-user mr-2"></i>${response[j].firstName+" "+response[j].lastName}</div>
                                        <div class="card-body rale"><i class="fas fa-at mr-1"></i>Email: ${response[j].email+'<br><br> <i class="far fa-calendar-alt mr-1"></i> Fecha de nacimiento: '+response[j].dateOfBirth}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
                        
            ` 
         
    j++;
    }
    if (number==0){
        comparar(response.length);
        setTimeout(function(){
            ocultarSpinnerGeneral("textoVariable");
            console.log(document.getElementById("friends").childElementCount)
            if(document.getElementById("friends").childElementCount==0){
                console.log("Entro")
                document.getElementById("textoVariable").innerHTML=`<h5>No se encontraron datos de acuerdo a su busqueda</h5>`;
            } 
            else{
                console.log(primeraLlamada)
                if (!primeraLlamada){
                    document.getElementById("textoVariable").innerHTML=`<h5>Resultados de la busqueda:</h5>`;
                }
                
            } 
            $('.card-columns .card').css("display","");
        }, 1000);
        //primeraLlamada=false;
        
    //getUser()
    }
    else{
        $('.card-columns .card').css("display","");
    }

}

function getImagenMen(response,number){
    $.ajax({
        url: 'https://randomuser.me/api/?results=100&inc=name,picture&gender=male&noinfo',
        dataType: 'json',
        success: function(data) {
        console.log(data);
        llenarRegistrados(response,data,number);
        //guardarDatos(data);
        }
    });
}

function limpiarString(data){
    data= data.replace("[","'")
    data= data.replace("]","'")
    return data;

}

function usuariosRegistrados(number){
    mostrarSpinnerGeneral("textoVariable");
    primeraLlamada=true;
    //console.log(response.length + primeraLlamada);
    $.ajax({
        url : "https://ignsw201825-snproject.herokuapp.com/user/search/a",         
        method :'GET', 
        contentType: 'application/json; charset=utf-8',
        dataType : 'json', 

        success : function (response){   
            console.log(response.length + primeraLlamada);
            //localStorage.setItem("usuariosBusqueda",limpiarString(JSON.stringify(response)));
            getImagenMen(response,number);

            },
        error: function(error){             
            console.log(error); 
                    
        }
    });

    //console.log(JSON.parse(localStorage.getItem("usuariosBusqueda")+));
}

function mostrarSpinner(id){
    var button= document.getElementById("bt-"+id);
    button.innerHTML= `<i class="fas fa-circle-notch fa-spin"></i> `
    console.log($("#bt-"+id).dataType)
}

function mostrarSpinnerGeneral(id){
    var element= document.getElementById(id);
    element.innerHTML= `<i class="fas fa-circle-notch fa-3x fa-spin"></i> `
}

function ocultarSpinner(id){
    var button= document.getElementById("bt-"+id);
    if(id="a"){
        button.innerHTML= `Guardar` 
    }else{
    button.innerHTML= `<i class="fas fa-plus"></i><i class="fas fa-user"></i> `
    }
}

function ocultarSpinnerGeneral(id){
    var element= document.getElementById(id);
    element.innerHTML= ``;
    
}


function  agregarAmigo(cardNumber){
        mostrarSpinner(cardNumber);
        var dato =  "#cf-"+cardNumber;
        var id =    "" +sessionStorage.getItem("id");
        var token = "" +sessionStorage.getItem("token"); 
        var friendId = ""+$(dato).data('copy');
        console.log(friendId);
        var jsonConLosDatos  = { //Creando JSON Con el formato
            "userId"           :id,
            "authToken"    : token, 
            "friendId"     : friendId
        } 
    
         $.ajax({
             url : "https://ignsw201825-snproject.herokuapp.com/user/friend/add", 
             data : JSON.stringify(jsonConLosDatos), 
             method :'POST', 
             contentType: 'application/json; charset=utf-8',
             dataType : 'json', 
    
             success : function (response){ 
                console.log(response);
                $(dato).css("display","none")                
                 },
             error: function(error){
                ocultarSpinner(cardNumber);             
                alert("No pudo agregar amigo");                
             }

             
         });
}

function getListaUsuarios(number){
    
    $.ajax({
        url : "https://ignsw201825-snproject.herokuapp.com/user/friend/getList/"+sessionStorage.getItem("id"),         
        method :'GET', 
        //contentType: 'application/json; charset=utf-8',
        dataType : 'json', 

        success : function (response){ 
            console.log(response.length);
            $(amigos).text(response.length)
            console.log(response);
            getImagenMen(response,number)                          
            },
        error: function(error){             
            console.log(error); 
                    
        }
    });
    
}



function eliminarAmigo(cardNumber){
        var dato =  "#cf-"+cardNumber;  
        var id =    "" +sessionStorage.getItem("id");
        var token = "" +sessionStorage.getItem("token"); 
        var friendId = ""+$(dato).data('copy');
        console.log(friendId);
        mostrarSpinner(cardNumber) ;
        var jsonConLosDatos  = { //Creando JSON Con el formato
            "userId"           :id,
            "authToken"    : token, 
            "friendId"     : friendId
        } 
    
         $.ajax({
             url : "https://ignsw201825-snproject.herokuapp.com/user/friend/remove", 
             data : JSON.stringify(jsonConLosDatos), 
             method :'DELETE', 
             contentType: 'application/json; charset=utf-8',
             dataType : 'json', 
    
             success : function (response){ 
                console.log(response);
                $(dato).css("display","none")
                var numeroAmigos=parseInt(document.getElementById("amigos").innerHTML)-1;
                document.getElementById("amigos").innerHTML= numeroAmigos;
                            
                },
             error: function(error){             
                alert("Error al eliminar");
                ocultarSpinner(cardNumber);

             }
             
         });

}

function buscarAmigo(){
    primeraLlamada=false;
    mostrarSpinnerGeneral("textoVariable");
    palabra= $(busquedaUser).val();
    palabra=palabra.replace(" ","")
    var friends= document.getElementById('friends');
    friends.innerHTML=``

    
        $.ajax({
            url : "https://ignsw201825-snproject.herokuapp.com/user/search/"+palabra,         
            method :'GET', 
            contentType: 'application/json; charset=utf-8',
            dataType : 'json', 
    
            success : function (response){   
                console.log(response.length);
                getImagenMen(response,0);                       
                },
            error: function(error){             
                console.log(error); 
                ocultarSpinnerGeneral("textoVariable");
                document.getElementById("textoVariable").innerHTML=`<h5>No se encontraron datos de acuerdo a su busqueda</h5>`;
                        
            }
        });
    
        //console.log(JSON.parse(localStorage.getItem("usuariosBusqueda")+));
    
}

function comparar (listaUsuarios){
    var i=0;
    var j=0;
    $.ajax({
        url : "https://ignsw201825-snproject.herokuapp.com/user/friend/getList/"+sessionStorage.getItem("id"),         
        method :'GET', 
        //contentType: 'application/json; charset=utf-8',
        dataType : 'json', 

        success : function (response){ 
            console.log(response.length);
                while(i<listaUsuarios){
                    for(j=0;j<response.length; j++){
                        if($("#cf-"+i).data("copy")==response[j].id){
                            
                            var parent=document.getElementById("friends");
                            var child=document.getElementById("cf-"+i);
                            var childModal=document.getElementById("modal-"+i);
                            parent.removeChild(child);
                            parent.removeChild(childModal);
                            console.log(response[j].firstName+" es igual");
                            i++;
                            
                        }

                        if ($("#cf-"+i).data("copy")==sessionStorage.getItem("id")){
                            var parent=document.getElementById("friends");
                            var child=document.getElementById("cf-"+i);
                            var childModal=document.getElementById("modal-"+i);
                            parent.removeChild(child);
                            parent.removeChild(childModal);
                        }
                        
                    }
                    i++;
                } 
                                      
            },
        error: function(error){             
            console.log(error); 
                    
        }
    });
   
    

    
}
