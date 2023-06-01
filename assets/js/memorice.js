const btn_jugar_memorice = document.querySelectorAll(".btn_jugar_memorice");

const count_down_timer_falso = document.querySelector('#count-down-timer-falso');
const element = document.querySelector('#count-down-timer');

const rb_minutos = document.querySelectorAll(".form-check-input");

const row_tarjetas = document.querySelector("#row_tarjetas");
const fb_inner = document.querySelectorAll(".flip-box-inner");

const jugador1 = document.querySelector(".jugador1");
const jugador2 = document.querySelector(".jugador2");
const txt_turno = document.querySelector(".txt_turno_memorice");

const puntaje_j1 = document.querySelector(".puntaje_j1");
const puntaje_j2 = document.querySelector(".puntaje_j2");

let puntos_j1 = 0;
let puntos_j2 = 0;

let acumulador = 0;

let tarjetasVolteadas = [];

let turno = true;

//Modal Mensaje Emergente
const modalMensajeEmergente = new bootstrap.Modal(document.getElementById('modalMensajeEmergente'));
const tituloMensajeEmergente = document.querySelector(".tituloMensajeEmergente");
const contenidoMensajeEmergente = document.querySelector(".contenidoMensajeEmergenteMemorice");

//Mostrar Inicio de partida
const mostrarModalInicioPartida = (minutos) =>{

    tituloMensajeEmergente.innerText = "¡La partida ha comenzado!";
    contenidoMensajeEmergente.innerHTML = `<strong>Ambos jugadores tienen <span class="fs-20">${minutos}</span> minutos para obtener la mayor cantidad de pares de tarjetas posibles, buena suerte <i class="fa-solid fa-face-smile-wink"></i></strong>`;
    modalMensajeEmergente.show();

    setTimeout(() => {
        modalMensajeEmergente.hide();
    }, 4000);
}

//Mostrar Empate
const mostrarModalEmpate = () =>{

    tituloMensajeEmergente.innerText = "¡Empate!";
    contenidoMensajeEmergente.innerHTML = `<strong>Ambos jugadores obtuvieron la misma cantidad de puntos <i class="fa-regular fa-face-meh"></i></strong>`;
    modalMensajeEmergente.show();

    setTimeout(() => {
        modalMensajeEmergente.hide();
    }, 3000);
}

//Mostrar Victoria
const mostrarModalVictoria = (jugador,puntos) =>{
    tituloMensajeEmergente.innerHTML = 'Victoria <i class="fa-solid fa-face-laugh-beam"></i>';
    contenidoMensajeEmergente.innerHTML = `<strong>Felicitaciones, ${jugador}. Has obtenido ${puntos} puntos.</strong> <i class="fa-solid fa-hands-clapping"></i></strong>`;
    modalMensajeEmergente.show();

    setTimeout(() => {
        modalMensajeEmergente.hide();
    }, 4000);
}

//Deshabilitar tarjetas
const deshabilitarTarjetas = () =>{
    fb_inner.forEach((tarjeta)=>{
        tarjeta.classList.add("btn_deshabilitado");
    });
}

deshabilitarTarjetas();

//Habilitar tarjetas
const habilitarTarjetas = () =>{
    fb_inner.forEach((tarjeta)=>{
        tarjeta.classList.remove("btn_deshabilitado");
    });
}

//Revolver Tarjetas
const randomTarjetas = (element) => {
    for (var i = element.children.length; i >= 0; i--) {
        element.appendChild(element.children[Math.random() * i | 0]);
    }
}

//Selección cuenta regresiva
rb_minutos.forEach((radioButton)=>{ 
            
    radioButton.addEventListener("click",()=>{

        if(btn_jugar_memorice[1].classList.contains("btn_deshabilitado")){
            btn_jugar_memorice[1].classList.remove("btn_deshabilitado");
        }
    });
});

//Finalizar partida
const finalizarPartida = () => {

    count_down_timer_falso.classList.remove("d-none");
    element.classList.add("d-none");

    setTimeout(() => {
        location.reload();
    }, 4000);
}

//Cuenta regresiva
function paddedFormat(num) { return num < 10 ? "0" + num : num; }

function startCountDown(duration, element) {

    let secondsRemaining = duration;
    let min = 0;
    let sec = 0;

    let countInterval = setInterval(function () {

    min = parseInt(secondsRemaining / 60);
    sec = parseInt(secondsRemaining % 60);

    element.textContent = `${paddedFormat(min)}:${paddedFormat(sec)}`;

    secondsRemaining = secondsRemaining - 1;

    if (secondsRemaining < 0) { clearInterval(countInterval) };

        //¿se acabó el tiempo?
        if(min == 0 && sec == 0){

            if(puntos_j1 > puntos_j2){
                mostrarModalVictoria("Jugador 1",puntos_j1);
            }

            if(puntos_j1 < puntos_j2){
                mostrarModalVictoria("Jugador 2",puntos_j2);
            }

            if(puntos_j1 == puntos_j2){
                mostrarModalEmpate();
            }
            
            finalizarPartida();
                            
        }
     
     }, 1000);

}

function formatoConteo(minutos) {

    let time_minutes = minutos; // Value in minutes
    let time_seconds = 0; // Value in seconds

    let duration = time_minutes * 60 + time_seconds;


    element.textContent = `${paddedFormat(time_minutes)}:${paddedFormat(time_seconds)}`;

    element.classList.remove('d-none');
    count_down_timer_falso.classList.add('d-none');

    startCountDown(--duration, element);   
};



//Establecer Cuenta regresiva
const establecerCuentaRegresiva = (radioButton,minutos) =>{
    
    if(radioButton.checked){
        formatoConteo(minutos);
        mostrarModalInicioPartida(minutos);
    }
}

//Comenzar Partida
btn_jugar_memorice[1].addEventListener("click",()=>{
    
    establecerCuentaRegresiva(rb_minutos[0],1);
    establecerCuentaRegresiva(rb_minutos[1],3);
    establecerCuentaRegresiva(rb_minutos[2],5);
    establecerCuentaRegresiva(rb_minutos[3],7);

    randomTarjetas(row_tarjetas);
    

    btn_jugar_memorice[0].classList.add("btn_deshabilitado");

    setTimeout(()=>{

        jugador1.classList.add("turno_jugador1");
        txt_turno.classList.remove("opacity-0");
        txt_turno.classList.add("txt_jugador1");
        txt_turno.innerText = "Es tu turno, Jugador 1";
   
    },700);

    habilitarTarjetas();
    
});


//Validar victoria
const validarVictoria = (acumulador) => {

    if(acumulador == 24 && puntos_j1 > puntos_j2){

        mostrarModalVictoria("Jugador 1",puntos_j1);

        finalizarPartida();
    }

    if(acumulador == 24 && puntos_j1 < puntos_j2){

        mostrarModalVictoria("Jugador 2",puntos_j2);

        finalizarPartida();
    }

    if(acumulador == 24 && puntos_j1 == puntos_j2){
        mostrarModalEmpate();
        finalizarPartida();
    }
}


//Aumentar puntaje
const aumentarPuntaje = (turno) => {

    if(turno == true){

        puntos_j1++;
        puntaje_j1.innerText = puntos_j1.toString();

        acumulador += 2;

        validarVictoria(acumulador);

    }else{

        puntos_j2++;
        puntaje_j2.innerText = puntos_j2.toString();

        acumulador += 2;

        validarVictoria(acumulador);

    }
}

//Comparar tarjetas volteadas
const compararTarjetas = (tarjetasVolteadas) => {
    return tarjetasVolteadas[1].lastElementChild.lastElementChild.lastElementChild.classList[0] == tarjetasVolteadas[0].lastElementChild.lastElementChild.lastElementChild.classList[0]
}

//Marcar tarjetas
const marcarTarjetasIguales = (tarjetasVolteadas,turno) => {

    if(turno == true){

        tarjetasVolteadas.forEach((tarjeta)=>{
            tarjeta.lastElementChild.lastElementChild.classList.remove("caras_tarjeta");
            tarjeta.lastElementChild.lastElementChild.classList.add("caras_tarjeta_j1");
        });
    }

    if(turno == false){
        
        tarjetasVolteadas.forEach((tarjeta)=>{
            tarjeta.lastElementChild.lastElementChild.classList.remove("caras_tarjeta");
            tarjeta.lastElementChild.lastElementChild.classList.add("caras_tarjeta_j2");
        });
    }
}

//¿Las tarjetas son iguales?
const validarParDeTarjetas = (tarjetasVolteadas,turno) => {
    
    if(compararTarjetas(tarjetasVolteadas)){
        
        marcarTarjetasIguales(tarjetasVolteadas,turno);

        tarjetasVolteadas.length = 0;

        aumentarPuntaje(turno);

    }else{

        fb_inner.forEach((tarjeta)=>{tarjeta.classList.add("btn_deshabilitado2");});

        setTimeout(()=>{

            tarjetasVolteadas.forEach((t_volteada)=>{t_volteada.classList.remove("fb_inner_180deg")});
            tarjetasVolteadas.length = 0;
            fb_inner.forEach((tarjeta)=>{tarjeta.classList.remove("btn_deshabilitado2");});

        },700); 

    }
}

//Ocultar las 2 tarjetas volteadas por turno
const ocultarTarjetas = (tarjetasVolteadas) =>{

    if(tarjetasVolteadas.length == 2){

        if(turno == true){

            validarParDeTarjetas(tarjetasVolteadas,turno);

            turno = false;

            setTimeout(()=>{

                jugador1.classList.remove("turno_jugador1");
                jugador2.classList.add("turno_jugador2");

                txt_turno.classList.remove("txt_jugador1");
                txt_turno.classList.add("txt_jugador2");
                txt_turno.innerText = "Es tu turno, Jugador 2";

            },700);


        }else{
            
            validarParDeTarjetas(tarjetasVolteadas,turno);

            turno = true;

            setTimeout(()=>{
                
                jugador2.classList.remove("turno_jugador2");
                jugador1.classList.add("turno_jugador1");

                txt_turno.classList.remove("txt_jugador2");
                txt_turno.classList.add("txt_jugador1");
                txt_turno.innerText = "Es tu turno, Jugador 1";

            },700);
            
        }

    }
}


//Voltear tarjetas por turno
fb_inner.forEach((tarjeta)=>{
    
    tarjeta.addEventListener("click",()=>{
        
        if(!tarjeta.classList.contains("fb_inner_180deg")){

            tarjeta.classList.add("fb_inner_180deg");
            tarjetasVolteadas.push(tarjeta);

            ocultarTarjetas(tarjetasVolteadas);
            
        }
            
    });

});