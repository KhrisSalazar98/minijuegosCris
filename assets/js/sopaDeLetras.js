const btn_letras = document.querySelectorAll(".btn_letra");
const btn_jugar = document.querySelector(".btn_jugar");
const rb_sopaDeLetras = document.querySelectorAll(".rb_sopaDeLetras");
const btn_comenzarPartida = document.querySelector(".btn_comenzarPartida");

const count_down_timer_falso = document.querySelector('#count-down-timer-falso');
const element = document.querySelector('#count-down-timer');

const palabras_encontradas = document.querySelectorAll(".palabra");

const puntos = document.querySelector(".puntos");
let acumulador = 0;

//Modal Mensaje Emergente
const modalMensajeEmergente = new bootstrap.Modal(document.getElementById('modalMensajeEmergente'));
const tituloMensajeEmergente = document.querySelector(".tituloMensajeEmergente");
const contenidoMensajeEmergente = document.querySelector(".contenidoMensajeEmergenteSopaLetras");

const palabra1 = [btn_letras[207],btn_letras[191],btn_letras[175],btn_letras[159],btn_letras[143],btn_letras[127],btn_letras[111],btn_letras[95],btn_letras[79]];
const palabra2 = [btn_letras[48],btn_letras[65],btn_letras[82],btn_letras[99],btn_letras[116],btn_letras[133],btn_letras[150],btn_letras[167],btn_letras[184],btn_letras[201]];
const palabra3 = [btn_letras[101],btn_letras[102],btn_letras[103],btn_letras[104],btn_letras[105],btn_letras[106],btn_letras[107],btn_letras[108]];
const palabra4 = [btn_letras[37],btn_letras[38],btn_letras[39],btn_letras[40],btn_letras[41],btn_letras[42]];
const palabra5 = [btn_letras[90],btn_letras[106],btn_letras[122],btn_letras[138],btn_letras[154]];
const palabra6 = [btn_letras[164],btn_letras[165],btn_letras[166],btn_letras[167],btn_letras[168],btn_letras[169],btn_letras[170],btn_letras[171]];
const palabra7 = [btn_letras[17],btn_letras[33],btn_letras[49],btn_letras[65],btn_letras[81],btn_letras[97],btn_letras[113],btn_letras[129],btn_letras[145],btn_letras[161]];

//Inicializar Letras
btn_letras.forEach((letra)=>{
    letra.classList.add("letras_deshabilitadas");
});

//Generar palabras aleatorias
const  generarLetraRandom = () => {
    const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result1= ' ';
    const charactersLength = characters.length;
    
    result1 = characters.charAt(Math.floor(Math.random() * charactersLength));

    return result1;
}

const compararPalabra1 = (letra) => {
    return letra != palabra1[0] && letra != palabra1[1] && letra != palabra1[2] && letra != palabra1[3] && letra != palabra1[4] && letra != palabra1[5] && letra != palabra1[6] && letra != palabra1[7] && letra != palabra1[8];
}

const compararPalabra2 = (letra) => {
    return letra != palabra2[0] && letra != palabra2[1] && letra != palabra2[2] && letra != palabra2[3] && letra != palabra2[4] && letra != palabra2[5] && letra != palabra2[6] && letra != palabra2[7] && letra != palabra2[8] && letra != palabra2[9];
}

const compararPalabra3 = (letra) => {
    return letra != palabra3[0] && letra != palabra3[1] && letra != palabra3[2] && letra != palabra3[3] && letra != palabra3[4] && letra != palabra3[5] && letra != palabra3[6] && letra != palabra3[7];
}

const compararPalabra4 = (letra) => {
    return letra != palabra4[0] && letra != palabra4[1] && letra != palabra4[2] && letra != palabra4[3] && letra != palabra4[4] && letra != palabra4[5];
}

const compararPalabra5 = (letra) => {
    return letra != palabra5[0] && letra != palabra5[1] && letra != palabra5[2] && letra != palabra5[3] && letra != palabra5[4];
}

const compararPalabra6 = (letra) => {
    return letra != palabra6[0] && letra != palabra6[1] && letra != palabra6[2] && letra != palabra6[3] && letra != palabra6[4] && letra != palabra6[5] && letra != palabra6[6] && letra != palabra6[7];
}

const compararPalabra7 = (letra) => {
    return letra != palabra7[0] && letra != palabra7[1] && letra != palabra7[2] && letra != palabra7[3] && letra != palabra7[4] && letra != palabra7[5] && letra != palabra7[6] && letra != palabra7[7] && letra != palabra7[8] && letra != palabra7[9];
}

btn_letras.forEach((letra)=>{

    if(compararPalabra1(letra) && compararPalabra2(letra) && compararPalabra3(letra) && compararPalabra4(letra) && compararPalabra5(letra) && compararPalabra6(letra) && compararPalabra7(letra)){

        letra.innerText = generarLetraRandom();

    }
});

//Mostrar Inicio de partida
const mostrarModalInicioPartida = (minutos) =>{

    tituloMensajeEmergente.innerText = "¡La partida ha comenzado!";
    contenidoMensajeEmergente.innerHTML = `<strong>Tienes <span class="fs-20">${minutos}</span> minutos para encontrar las 7 palabras ocultas, buena suerte.</strong>`;
    modalMensajeEmergente.show();

    setTimeout(() => {
        modalMensajeEmergente.hide();
    }, 4000);
}

//Mostrar partida completa
const mostrarModalPartidaCompleta = () =>{

    tituloMensajeEmergente.innerHTML = '¡Felicitaciones! <i class="fa-solid fa-face-laugh-beam"></i>';
    contenidoMensajeEmergente.innerHTML = '<strong>Lo lograste, has encontrado las 7 palabras. Gracias por jugar <i class="fa-solid fa-thumbs-up"></i></strong>';
    modalMensajeEmergente.show();

}

//Mostrar partida fallida
const mostrarModalPartidaFallida = () =>{

    tituloMensajeEmergente.innerHTML = 'Intento Fallido... <i class="fa-solid fa-face-sad-cry"></i>';
    contenidoMensajeEmergente.innerHTML = '<strong>Se acabó el tiempo. Has perdido, intenta nuevamente.</strong>';
    modalMensajeEmergente.show();

}

//Selección cuenta regresiva
rb_sopaDeLetras.forEach((radioButton)=>{ 
            
    radioButton.addEventListener("click",()=>{

        if(btn_comenzarPartida.classList.contains("btn_deshabilitado")){
            btn_comenzarPartida.classList.remove("btn_deshabilitado");
        }
    });
});

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

            mostrarModalPartidaFallida();

            count_down_timer_falso.classList.remove("d-none");
            element.classList.add("d-none");

            btn_letras.forEach((letra)=>{
                letra.classList.add("letras_deshabilitadas");
            });

            setTimeout(() => {
                location.reload();
            }, 4000);
                            
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
btn_comenzarPartida.addEventListener("click",()=>{
    
    establecerCuentaRegresiva(rb_sopaDeLetras[0],5);
    establecerCuentaRegresiva(rb_sopaDeLetras[1],10);
    establecerCuentaRegresiva(rb_sopaDeLetras[2],15);

    btn_letras.forEach((letra)=>{
        letra.classList.remove("letras_deshabilitadas");
    });

    btn_jugar.classList.add("btn_deshabilitado");
    
});

//Función palabra correcta
function obtenerPalabraCorrecta(letras){

    letras.forEach((letra)=>{
        letra.classList.remove("btn_letra_click");
        letra.classList.add("palabra_correcta");
    });

}

//Palabra 1
const validarPalabra1 = ()=>{
    return palabra1[0].classList.contains("btn_letra_click") &&
    palabra1[1].classList.contains("btn_letra_click") &&
    palabra1[2].classList.contains("btn_letra_click") &&
    palabra1[3].classList.contains("btn_letra_click") &&
    palabra1[4].classList.contains("btn_letra_click") &&
    palabra1[5].classList.contains("btn_letra_click") &&
    palabra1[6].classList.contains("btn_letra_click") &&
    palabra1[7].classList.contains("btn_letra_click") &&
    palabra1[8].classList.contains("btn_letra_click");

}

//Palabra 2
const letra_compartida1 = () =>{
    return palabra2[1].classList.contains("btn_letra_click") || palabra2[1].classList.contains("palabra_correcta");
}

const validarPalabra2 = ()=>{
    return palabra2[0].classList.contains("btn_letra_click") &&
    palabra2[2].classList.contains("btn_letra_click") &&
    palabra2[3].classList.contains("btn_letra_click") &&
    palabra2[4].classList.contains("btn_letra_click") &&
    palabra2[5].classList.contains("btn_letra_click") &&
    palabra2[6].classList.contains("btn_letra_click") &&
    palabra2[8].classList.contains("btn_letra_click") &&
    palabra2[9].classList.contains("btn_letra_click");
}

//Palabra 3
const letra_compartida2 = () =>{
    return palabra3[5].classList.contains("btn_letra_click") || palabra3[5].classList.contains("palabra_correcta");
}

const validarPalabra3 = ()=>{
    return palabra3[0].classList.contains("btn_letra_click") &&
    palabra3[2].classList.contains("btn_letra_click") &&
    palabra3[3].classList.contains("btn_letra_click") &&
    palabra3[4].classList.contains("btn_letra_click") &&
    palabra3[6].classList.contains("btn_letra_click") &&
    palabra3[7].classList.contains("btn_letra_click");
   
}

//Palabra 4
const validarPalabra4 = ()=>{
    return palabra4[0].classList.contains("btn_letra_click") &&
    palabra4[1].classList.contains("btn_letra_click") &&
    palabra4[2].classList.contains("btn_letra_click") &&
    palabra4[3].classList.contains("btn_letra_click") &&
    palabra4[4].classList.contains("btn_letra_click") &&
    palabra4[5].classList.contains("btn_letra_click");
   
}

//Palabra 5
const validarPalabra5 = ()=>{
    return palabra5[0].classList.contains("btn_letra_click") &&
    palabra5[2].classList.contains("btn_letra_click") &&
    palabra5[3].classList.contains("btn_letra_click") &&
    palabra5[4].classList.contains("btn_letra_click");
   
}

//Palabra 6
const letra_compartida3 = () =>{
    return palabra6[3].classList.contains("btn_letra_click") || palabra6[3].classList.contains("palabra_correcta");
}

const validarPalabra6 = ()=>{
    return palabra6[0].classList.contains("btn_letra_click") &&
    palabra6[1].classList.contains("btn_letra_click") &&
    palabra6[2].classList.contains("btn_letra_click") &&
    palabra6[4].classList.contains("btn_letra_click") &&
    palabra6[5].classList.contains("btn_letra_click") &&
    palabra6[6].classList.contains("btn_letra_click") &&
    palabra6[7].classList.contains("btn_letra_click");
   
}

//Palabra 7
const validarPalabra7 = ()=>{
    return palabra7[0].classList.contains("btn_letra_click") &&
    palabra7[1].classList.contains("btn_letra_click") &&
    palabra7[2].classList.contains("btn_letra_click") &&
    palabra7[4].classList.contains("btn_letra_click") &&
    palabra7[5].classList.contains("btn_letra_click") &&
    palabra7[6].classList.contains("btn_letra_click") &&
    palabra7[7].classList.contains("btn_letra_click") &&
    palabra7[8].classList.contains("btn_letra_click") &&
    palabra7[9].classList.contains("btn_letra_click");
   
}

//Juego ganado
function juegoGanado(puntos){
        
    if(puntos == 7){
    
        mostrarModalPartidaCompleta();

        count_down_timer_falso.classList.remove("d-none");
        element.classList.add("d-none");

        btn_letras.forEach((letra)=>{
            letra.classList.add("letras_deshabilitadas");
        });

        setTimeout(() => {
            location.reload();
        }, 4000);
    
    
    }
}

btn_letras.forEach((letra)=>{
            
    letra.addEventListener("click",()=>{
        
        if(letra.classList.contains("btn_letra")){
        
            letra.classList.remove("btn_letra");
            letra.classList.add("btn_letra_click");
    
        }else{

            letra.classList.remove("btn_letra_click");
            letra.classList.add("btn_letra");

        }

        //Obtener palabra 1
        if(validarPalabra1()){

            obtenerPalabraCorrecta(palabra1);

            palabras_encontradas[0].innerHTML = 'Asterales <i class="fa-solid fa-circle-check"></i>';
        
            acumulador++;

            puntos.innerText = acumulador.toString();

            juegoGanado(acumulador);
        
        }

        //Obtener palabra 2
        if(letra_compartida1() && letra_compartida3() && validarPalabra2()){

            obtenerPalabraCorrecta(palabra2);

            palabras_encontradas[1].innerHTML = 'Balbisiana <i class="fa-solid fa-circle-check"></i>';
        
            acumulador++;

            puntos.innerText = acumulador.toString();

            juegoGanado(acumulador);
        }

        //Obtener palabra 3
        if(letra_compartida2() && validarPalabra3()){

            obtenerPalabraCorrecta(palabra3);

            palabras_encontradas[2].innerHTML = 'Conferir <i class="fa-solid fa-circle-check"></i>';
        
            acumulador++;

            puntos.innerText = acumulador.toString();

            juegoGanado(acumulador);
        }

        //Obtener palabra 4
        if(validarPalabra4()){

            obtenerPalabraCorrecta(palabra4);

            palabras_encontradas[3].innerHTML = 'Daucus <i class="fa-solid fa-circle-check"></i>';
        
            acumulador++;

            puntos.innerText = acumulador.toString();

            juegoGanado(acumulador);
        }

        //Obtener palabra 5
        if(letra_compartida2() && validarPalabra5()){

            obtenerPalabraCorrecta(palabra5);

            palabras_encontradas[4].innerHTML = 'Oryza <i class="fa-solid fa-circle-check"></i>';
        
            acumulador++;

            puntos.innerText = acumulador.toString();

            juegoGanado(acumulador);
        }

        //Obtener palabra 6
        if(letra_compartida3() && validarPalabra6()){

            obtenerPalabraCorrecta(palabra6);

            palabras_encontradas[5].innerHTML = 'Rutáceas <i class="fa-solid fa-circle-check"></i>';
        
            acumulador++;

            puntos.innerText = acumulador.toString();

            juegoGanado(acumulador);
        }
        
        //Obtener palabra 7
        if(letra_compartida1() && validarPalabra7()){

            obtenerPalabraCorrecta(palabra7);

            palabras_encontradas[6].innerHTML = 'Urbanizado <i class="fa-solid fa-circle-check"></i>';
        
            acumulador++;

            puntos.innerText = acumulador.toString();

            juegoGanado(acumulador);
        }


    });
});