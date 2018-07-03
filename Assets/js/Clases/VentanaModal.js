function generarModalParaErrores(){
    $(".mensajes-de-error").append(
                   ' <div id= "formato-correo">'+
                            '<h4 class="text-danger">Formato de correo invalido</h4>'+
                           ' <p>Porfavor coloque una direccion de correo valida</p>'+
                    '</div>'+
                   ' <div id="correo-existente">'+
                       ' <h4  class="text-danger">Correo en uso</h4>'+
                        '<p>El correo que usted coloco ya se encuentra registrado en el sistema, pruebe con uno diferente</p>'+
                    '</div>'+

                   ' <div id="campos-vacios">'+
                        '<h4  class="text-danger">Campos en blanco</h4>'+
                       ' <p>Usted debe llenar todos los campos para ser registrado en el sistema</p>'+ 
                    '</div>'+

                   ' <div id= "longitud-contraseña">'+
                           '<h4  class="text-danger">Error en la contraseña</h4>'+
                            '<p>La contraseña debe cumplir con minimo: <p class="text-danger"> 6 caracteres</p> </p>'+
                   '</div>'+

                   ' <div id= "repeticion-contraseña">'+
                           ' <h4  class="text-danger">Error al repetir la contraseña</h4>'+
                             '<p>Repita su contraseña de manera cuidadosa</p>'+
                    '</div>' +   
                     
                     '<div id= "campo-nacimiento">'+
                            '<h4  class="text-danger">Error en la fecha de nacimiento</h4>'+
                             '<p>Debe indicar su fecha de nacimiento cuidadosamente</p>'+
                    ' </div>' + 

                     '<div id= "fecha-invalida">'+
                            ' <h4  class="text-danger">Fecha invalida</h4>'+
                            ' <p>Usted introdujo una fecha de nacimiento que no es valida</p>'+
                     '</div>'+ 

                    ' <div id= "campos-vacios-login">'+
                            '<h4  class="text-danger">Campos en blanco</h4>'+
                            '<p>Debe llenar los campos para iniciar sesion</p>'+
                   ' </div> '+

                    '<div id= "correo-no-registrado">'+
                            '<h4  class="text-danger">El correo no esta registrado</h4>'+
                           ' <p>El correo que usted introdujo no se encuentra registrado en el sistema</p>'+
                    '</div>' +

                    '<div id= "clave-erronea">'+
                            '<h4  class="text-danger">Error en la contraseña</h4>'+
                            '<p>La contraseña es erronea</p>'+
                    '</div> '+
                    '<div id= "busqueda-vacia">'+
                            '<h4  class="text-danger">Debe escribir al menos una palabra</h4>'+
                            '<p>Se debe escribir algo en la barra de busqueda para poder realizarla</p>'+
                    '</div> '+

                    '<div id= "nombre-albumRepetido-repetido">'+
                            '<h4  class="text-danger">Ya tiene un album con ese nombre</h4>'+
                            '<p>Porfavor elija otro nombre para su album</p>'+
                    '</div> '

    );
}