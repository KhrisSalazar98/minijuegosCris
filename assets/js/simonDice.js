const btn_colores = document.querySelectorAll(".btn_color");

const btn_jugar_SD = document.querySelectorAll(".btn_jugar_SD");

const rb_rondas = document.querySelectorAll(".form-check-input");

const rondas = document.querySelector(".rondas");
const txt_partida = document.querySelector(".txt_partida_SD");

let ronda = 1;
let aciertos = 0;
let btns_patron = [];
let meta = 0;

//Modal Mensaje Emergente
const modalMensajeEmergente = new bootstrap.Modal(document.getElementById('modalMensajeEmergente'));
const tituloMensajeEmergente = document.querySelector(".tituloMensajeEmergente");
const contenidoMensajeEmergente = document.querySelector(".contenidoMensajeEmergenteSD");

//Mostrar Inicio de partida
const mostrarModalInicioPartida = (rondas) =>{

    tituloMensajeEmergente.innerText = "¡La partida ha comenzado!";
    contenidoMensajeEmergente.innerHTML = `<strong>Debes completar las ${rondas} rondas compuestas por los patrones de colores, buena suerte <i class="fa-solid fa-face-smile-wink"></i></strong>`;
    modalMensajeEmergente.show();

    setTimeout(() => {
        modalMensajeEmergente.hide();
    }, 4000);
}

//Mostrar Partida Fallida
const mostrarModalPartidaFallida = () =>{

    tituloMensajeEmergente.innerHTML = 'Intento Fallido... <i class="fa-solid fa-face-sad-cry"></i>';
    contenidoMensajeEmergente.innerHTML = `<strong>El patrón es incorrecto, intenta nuevamente.</strong>`;
    modalMensajeEmergente.show();

    setTimeout(() => {
        modalMensajeEmergente.hide();
    }, 3000);
}

//Mostrar Victoria
const mostrarModalVictoria = (rondas) =>{
    tituloMensajeEmergente.innerHTML = 'Victoria <i class="fa-solid fa-face-laugh-beam"></i>';
    contenidoMensajeEmergente.innerHTML = `<strong>Felicitaciones. Has sobrevivido las ${rondas} rondas.</strong> <i class="fa-solid fa-hands-clapping"></i></strong>`;
    modalMensajeEmergente.show();

    btn_jugar_SD[0].classList.remove("btn_deshabilitado");
    btn_jugar_SD[0].classList.remove("d-none");
    btn_jugar_SD[1].classList.add("d-none");

    aciertos = 0;

    deshabilitarBotones();

    setTimeout(() => {
        modalMensajeEmergente.hide();
    }, 3000);
}

const deshabilitarBotones = () => {
    btn_colores.forEach((btn_color)=>{ btn_color.classList.add("btn_deshabilitado");})
}

deshabilitarBotones();

const habilitarBotones = () => {
    btn_colores.forEach((btn_color)=>{ btn_color.classList.remove("btn_deshabilitado");})
}

const deshabilitarBotones2 = () => {
    btn_colores.forEach((btn)=>{btn.classList.add("btn_deshabilitado2");});
}

const habilitarBotones2 = () => {
    btn_colores.forEach((btn)=>{btn.classList.remove("btn_deshabilitado2");});
}

//Selección de rondas
rb_rondas.forEach((radioButton)=>{ 
            
    radioButton.addEventListener("click",()=>{

        if(btn_jugar_SD[2].classList.contains("btn_deshabilitado")){
            btn_jugar_SD[2].classList.remove("btn_deshabilitado");
        }
    });
});

//Establecer Cantidad de Rondas
const establecerCantidadRondas = (radioButton,rondas) =>{
    
    if(radioButton.checked){
        mostrarModalInicioPartida(rondas);
        meta = rondas;
    }
}

//Comenzar Partida
btn_jugar_SD[2].addEventListener("click",()=>{

    rondas.classList.remove("opacity-0");
    txt_partida.classList.add("opacity-0");
    
    establecerCantidadRondas(rb_rondas[0],5);
    establecerCantidadRondas(rb_rondas[1],10);
    establecerCantidadRondas(rb_rondas[2],15);

    btn_jugar_SD[0].classList.add("btn_deshabilitado");
    btn_jugar_SD[0].classList.add("d-none");
    btn_jugar_SD[1].classList.remove("d-none");

    habilitarBotones();

    deshabilitarBotones2();

});

//Ejecutar patron de colores
const patron = (ronda) => {

    if(ronda > 1){
        deshabilitarBotones2();
    }

    for(let i = 0; i < ronda; i++){
        setTimeout(()=>{

            let x = Math.floor(Math.random()*7);
        
            setTimeout(()=>{
                btn_colores[x].classList.add("active");
            },1000);
        
            setTimeout(()=>{
                btn_colores[x].classList.remove("active");

                if(i == (ronda-1)){
                    habilitarBotones2();
                }

            },1500);

            btns_patron.push(btn_colores[x]);
        
        },1000*(i+1));
    
    }

    aciertos = 0;
    
    if(!btn_jugar_SD[1].classList.contains("btn_deshabilitado")){
        btn_jugar_SD[1].classList.add("btn_deshabilitado");
    }
    
}

btn_jugar_SD[1].addEventListener("click",()=>{
   
    patron(ronda);
});


//Validar botones acertados
const validarAciertos = (aciertos) => {

    if(aciertos == ronda){
        
        if(ronda == 1){
            btns_patron.length = 0;
        }

        if(ronda == meta){

            rondas.lastElementChild.innerText = "1";
            rondas.classList.add("opacity-0");
            txt_partida.classList.remove("opacity-0");
    
            mostrarModalVictoria(ronda);

            ronda = 1;
            btns_patron.length = 0;

        }else{
    
            btns_patron.shift();
            
            ronda++;
    
            rondas.lastElementChild.innerText = ronda.toString();
            patron(ronda);
           
        }
    
    }else{
        btns_patron.shift();
    }
}

//Botón correcto
const validarBotonCorrecto = (btn) => {
    
    if(btn == btns_patron[0]){
        
        aciertos++;
        validarAciertos(aciertos);
    
    }else{
        aciertos = 0;
        btns_patron.length = 0;
        ronda = 1;
        rondas.lastElementChild.innerText = ronda.toString();
        mostrarModalPartidaFallida();
        btn_jugar_SD[1].classList.remove("btn_deshabilitado");
        deshabilitarBotones2();
    }

}

//Botones de colores
btn_colores.forEach((btn)=>{
    
    btn.addEventListener("click",()=>{

        validarBotonCorrecto(btn);    
    });

})