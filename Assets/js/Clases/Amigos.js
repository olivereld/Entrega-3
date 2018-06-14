

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
    while (j<response.length){
        if (number==0){
            friends.innerHTML+= `
            <div class="card" id=cf-${j} data-copy="${response[j].id}">
                                
            <div class="col-md-6 float-left px-0 py-auto text-center">
                    <img src="${data.results[j].picture.large}" class="card-img-top img-fluid px-0" alt="">
            </div>
                
            <div class="col-md-6 float-left px-2 pt-1 pb-1">
                <div class="text-center">
                    <p class="rale text-capitalize">${response[j].firstName+" "+response[j].lastName}</p>
                    <button type="button" class="btn btn-primary btn-sm" onclick="agregarAmigo(${j})"><i class="fas fa-plus"></i><i class="fas fa-user"></i></button>
                </div>
            </div>    
                
        </div>
            ` 
         }
         if (number==1){
            if ((j<6)&(j<response.length)){
                users.innerHTML+= `
                <div class="card text-white" data-toggle="tooltip" title="" data-original-title="Default tooltip">
                    <img src="${data.results[j].picture.large}"   class="card-img" alt="">
                    
                </div>
                `
            }

            if(j<response.length){
                users2.innerHTML+= `
                    <div class="card" id=cf-${j} data-copy="${response[j].id}">
                                        
                        <div class="col-md-6 float-left px-0 py-auto text-center">
                                <img src="${data.results[j].picture.large}" class="card-img-top img-fluid px-0" alt="">
                        </div>
                            
                        <div class="col-md-6 float-left px-2 pt-1 pb-1">
                            <div class="text-center">
                                <p class="rale text-capitalize">${response[j].firstName+" "+response[j].lastName}</p>
                                <button type="button" class="btn btn-danger btn-sm" onclick="eliminarAmigo(${j})"><i class="fas fa-times"></i><i class="fas fa-user"></i></button>
                            </div>
                        </div>    
                        
                    </div>
            `
            }
             

         }
    j++;
    }
    if (number==0){
    getUser()}

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
    $.ajax({
        url : "https://ignsw201825-snproject.herokuapp.com/user/search/a",         
        method :'GET', 
        contentType: 'application/json; charset=utf-8',
        dataType : 'json', 

        success : function (response){   
            console.log(response.length);
            //localStorage.setItem("usuariosBusqueda",limpiarString(JSON.stringify(response)));
            getImagenMen(response,number);                       
            },
        error: function(error){             
            console.log(error); 
                    
        }
    });

    //console.log(JSON.parse(localStorage.getItem("usuariosBusqueda")+));
}



function  agregarAmigo(cardNumber){
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
                console.log(response)                
                 },
             error: function(error){             
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
                console.log(response)                
                },
             error: function(error){             
                alert("Error al eliminar");                
             }
             
         });

}
