
        var miAudio = new Audio($('#musica').attr("src"));
        var nuevaMusica = true;
        var enReproduccion = false;
        var musicaActual = "";
        var musicaSelect = "";        
        var maximaDuracion = Math.round( ($('#musica')[0].duration)/60);
        var volumenVisible = false;
        
        $("#myRange").bind("change", function() {            
            miAudio.currentTime = $(this).val();
          $("#myRange").attr("max",miAudio.duration);
        });
       
        $("#volumen").bind("change", function() {
            miAudio.volume = $(this).val()/100;
            volumen($(this).val());
          $("#volumen").attr("max",100);
        });

        miAudio.addEventListener('timeupdate',function (){
            curtime = parseInt(miAudio.currentTime, 10); 
            var minutes = parseInt(miAudio.duration / 60, 10);
            var seconds = parseInt(miAudio.duration % 60);      
            var currentMinutes = parseInt(miAudio.currentTime / 60, 10);
            var currentSeconds = parseInt(miAudio.currentTime % 60);
            if(seconds >= 10){
                if(currentSeconds < 10)
                    $( ".duracion" ).replaceWith( ' <span class="duracion"  text="Duracion" >'+currentMinutes+':0'+currentSeconds+'|'+minutes+':'+seconds+'</span>' );
                else
                    $( ".duracion" ).replaceWith( ' <span class="duracion"  text="Duracion" >'+currentMinutes+':'+currentSeconds+'|'+minutes+':'+seconds+'</span>' );
            }else{
                if(currentSeconds < 10)
                    $( ".duracion" ).replaceWith( ' <span class="duracion"  text="Duracion" >'+currentMinutes+':0'+currentSeconds+'|'+minutes+':0'+seconds+'</span>' );
                else
                    $( ".duracion" ).replaceWith( ' <span class="duracion"  text="Duracion" >'+currentMinutes+':'+currentSeconds+'|'+minutes+':0'+seconds+'</span>' );
            }
            $("#myRange").val(curtime); 
            if(currentMinutes === minutes && currentSeconds === seconds){
                terminarCancion();
            }                
        });
        function parametrosReproductor(){
            if(!enReproduccion){
                $('.icon-play3').css('display','none'); 
                $('.icon-pause2').css('display','block');
                miAudio.play();
                enReproduccion = true;    
                $("#myRange").attr("max",miAudio.duration);  
            }
        }

        function detener(){
            if(enReproduccion){
                $('.icon-play3').css('display','block');
                $('.icon-pause2').css('display','none');
                enReproduccion = false;
                miAudio.pause();
            }
        } 
        function terminarCancion(){            
            $('.icon-play3').css('display','block');
            $('.icon-pause2').css('display','none');
            enReproduccion = false;          
        }   

        function mutear(){
            miAudio.volume = 0;
            $("#volumen").val(0);
            $(".icon-volume-mute2").css("display","block");
            $(".icon-volume-mute").css("display","none");
            $(".icon-volume-high").css("display","none");
            $(".icon-volume-low").css("display","none");
            $(".icon-volume-medium").css("display","none");  
        }
        function desmutear(){
            miAudio.volume = 1;
            $("#volumen").val(100);
            $(".icon-volume-high").css("display","block");
            $(".icon-volume-mute2").css("display","none");
        }

        function volumen(nivel){
            if(nivel >= 75){
                $(".icon-volume-high").css("display","block");
                 $(".icon-volume-medium").css("display","none");
                $(".icon-volume-low").css("display","none");
                $(".icon-volume-mute").css("display","none");
                $(".icon-volume-mute2").css("display","none");
                
            }else if (nivel < 75 && nivel >= 50){
                $(".icon-volume-medium").css("display","block");

                $(".icon-volume-high").css("display","none");
                $(".icon-volume-low").css("display","none");
                $(".icon-volume-mute").css("display","none");
                $(".icon-volume-mute2").css("display","none");
            }else if (nivel < 50 && nivel >= 25){
                $(".icon-volume-low").css("display","block");

                 $(".icon-volume-high").css("display","none");
                $(".icon-volume-medium").css("display","none");
                $(".icon-volume-mute").css("display","none");
                $(".icon-volume-mute2").css("display","none");

            }else if (nivel < 25 && nivel >= 1){
                $(".icon-volume-mute").css("display","block");

                $(".icon-volume-mute2").css("display","none");
                $(".icon-volume-high").css("display","none");
                $(".icon-volume-low").css("display","none");
                $(".icon-volume-medium").css("display","none");                
            }else if (nivel == 0){
                $(".icon-volume-mute2").css("display","block");
                $(".icon-volume-mute").css("display","none");
                $(".icon-volume-high").css("display","none");
                $(".icon-volume-low").css("display","none");
                $(".icon-volume-medium").css("display","none");                
            }

        }
        function mostrarVolumen(){ 
            if(!volumenVisible){                        
                volumenVisible = true;
                $(".volumen-audio").removeClass("col-md-1");
                $(".volumen-audio").addClass("col-md-4");                
                $(".duracion-audio").removeClass("col-md-5");
                $(".duracion-audio").addClass("col-md-2");
                $("#volumen").css("width","100%");
            }
        } 
        function ocultarVolumen(){
            if(volumenVisible){
                $(".volumen-audio").removeClass("col-md-4");
                $(".volumen-audio").addClass("col-md-1");                
                $(".duracion-audio").removeClass("col-md-2");
                $(".duracion-audio").addClass("col-md-5");
               $("#volumen").css("width","0%");
                volumenVisible = false;
            }       
        } 
      
                  