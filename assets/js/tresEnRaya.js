const btn_jugar_O_X = document.querySelectorAll(".btn_jugar_O_X");
const listado_puntajes = document.querySelectorAll(".form-check-input");
const btn_comenzarPartida_tresEnRaya = document.querySelector(".btn_comenzarPartida_tresEnRaya");

const puntaje_maximo = document.querySelector(".puntaje_maximo");
const puntaje_maximo_mobile = document.querySelector(".puntaje_maximo_mobile");

const jugador1 = document.querySelector(".jugador1");
const jugador2 = document.querySelector(".jugador2");
const txt_turno = document.querySelectorAll(".txt_turno");

const puntaje_j1 = document.querySelector(".puntaje_j1");
const puntaje_j2 = document.querySelector(".puntaje_j2");

let puntaje_establecido = 0;
let puntos_j1 = 0;
let puntos_j2 = 0;
let cantidadJugadas = 0;

const btns_x_o = document.querySelectorAll(".btn_x_o");

let turno = true;

//Modal Mensaje Emergente
const modalMensajeEmergente = new bootstrap.Modal(document.getElementById('modalMensajeEmergente'));
const tituloMensajeEmergente = document.querySelector(".tituloMensajeEmergenteTresEnRaya");
const contenidoMensajeEmergente = document.querySelector(".contenidoMensajeEmergenteTresEnRaya");

// Inicializar Botones
btns_x_o.forEach((btn)=>{

    btn.classList.add("opacity-0");
    btn.setAttribute("data-bs-toggle","modal");
    btn.setAttribute("data-bs-target","#modalIniciarJuego"); 

});

//Mostrar Inicio de partida
const mostrarModalInicioPartida = (puntos) =>{

    tituloMensajeEmergente.innerText = "¡La partida ha comenzado!";
    contenidoMensajeEmergente.innerHTML = `<strong>Gana el primer jugador en obtener <span class="fs-20">${puntos}</span> puntos, buena suerte <i class="fa-solid fa-face-smile-wink"></i></strong>`;
    modalMensajeEmergente.show();

    setTimeout(() => {
        modalMensajeEmergente.hide();
    }, 3000);
}

//Mostrar Empate
const mostrarModalEmpate = () =>{

    tituloMensajeEmergente.innerText = "¡Empate!";
    contenidoMensajeEmergente.innerHTML = `<strong>No hay movimientos restantes, intenten nuevamente <i class="fa-regular fa-face-meh"></i></strong>`;
    modalMensajeEmergente.show();

    setTimeout(() => {
        modalMensajeEmergente.hide();
    }, 3000);
}

//Mostrar Victoria
const mostrarModalVictoria = (jugador,puntos) =>{
    tituloMensajeEmergente.innerHTML = 'Victoria <i class="fa-solid fa-face-laugh-beam"></i>';
    contenidoMensajeEmergente.innerHTML = `<strong>Felicitaciones, ${jugador}. Has obtenido los ${puntos} puntos.</strong> <i class="fa-solid fa-hands-clapping"></i></strong>`;
    modalMensajeEmergente.show();

    setTimeout(() => {
        modalMensajeEmergente.hide();
    }, 4000);
}

//Obtener puntaje
const aumentarPuntajes = (turno) =>{

    if(turno == true){

        puntos_j1++;
        puntaje_j1.innerText = puntos_j1.toString();
    }

    if(turno == false){

        puntos_j2++;
        puntaje_j2.innerText = puntos_j2.toString();
    }
}

//Deshabilitar botones después de terminar una ronda
const bloquearBotones = () => {
            
    btns_x_o.forEach((btn)=>{
        
        if(!btn.classList.contains("btn_deshabilitado2")){
            btn.classList.add("btn_deshabilitado2");
        }

    });
}

//Limpiar botones
const limpiarBotonesPresionados = (btn,clase) => {

    if(btn.classList.contains(`${clase}`)){

        btn.classList.remove(`${clase}`);
        btn.innerText = "";
    }

    btn.classList.remove("btn_deshabilitado2");
    btn.classList.add("opacity-0");
    btn.innerText = "*";
}

//Restaurar botones después de terminar una ronda
const restaurarBotones = () => {

    btns_x_o.forEach((btn)=>{
        
        limpiarBotonesPresionados(btn,"j1");
        limpiarBotonesPresionados(btn,"j2");
        limpiarBotonesPresionados(btn,"j1_ganador");
        limpiarBotonesPresionados(btn,"j2_ganador");

    });

    cantidadJugadas = 0;
}

//Restaurar puntaje
const restaurarPuntajes = () => {

    puntaje_maximo.innerText = "?";
    puntaje_maximo_mobile.innerText = "?";
    puntaje_establecido = 0;
    puntos_j1 = 0;
    puntos_j2 = 0;
    puntaje_j1.innerText = "0";
    puntaje_j2.innerText = "0";

    btns_x_o.forEach((btn)=>{ 
        btn.setAttribute("data-bs-toggle","modal");
        btn.setAttribute("data-bs-target","#modalIniciarJuego"); 
    });
        
    btn_jugar_O_X.forEach((btn_jugar)=>{
        btn_jugar.classList.remove("btn_deshabilitado");
    });

    if(jugador1.classList.contains("turno_jugador1")){
        jugador1.classList.remove("turno_jugador1");
    }

    if(jugador2.classList.contains("turno_jugador2")){
        jugador2.classList.remove("turno_jugador2");
    }
    
}

//Validar meta alcanzada
const validarMeta = (turno) => {

    if(turno == true && puntos_j1 == puntaje_establecido){

        mostrarModalVictoria("j1",puntaje_establecido);
        restaurarPuntajes();

        txt_turno.forEach((txt)=>{
            txt.classList.add("opacity-0");
        });
    }

    if(turno == false && puntos_j2  == puntaje_establecido){

        mostrarModalVictoria("j2",puntaje_establecido);
        restaurarPuntajes();

        txt_turno.forEach((txt)=>{
            txt.classList.add("opacity-0");
        });
    }
}

//Validar línea hecha por el jugador
const validarLinea = (btns,jugador) => { return btns[0].classList.contains(`${jugador}`) && btns[1].classList.contains(`${jugador}`) && btns[2].classList.contains(`${jugador}`); }

//Línea horizontal 1
const rellenarHorizontal_1 = (jugador,turno) => {
            
    const lineaHorizontal1 = [btns_x_o[0],btns_x_o[1],btns_x_o[2]];

    if(validarLinea(lineaHorizontal1,jugador)){
        
        for(let i = 0; i < 3; i++){

            btns_x_o[i].classList.remove(`${jugador}`);
            btns_x_o[i].classList.add(`${jugador}_ganador`);
        }

        aumentarPuntajes(turno);
        bloquearBotones();

        setTimeout(() => {
            restaurarBotones();
        }, 2000);

        validarMeta(turno);

    } 
}

//Línea horizontal 2
const rellenarHorizontal_2 = (jugador,turno) => {
            
    const lineaHorizontal2 = [btns_x_o[3],btns_x_o[4],btns_x_o[5]];

    if(validarLinea(lineaHorizontal2,jugador)){

        for(let i = 3; i < 6; i++){

            btns_x_o[i].classList.remove(`${jugador}`);
            btns_x_o[i].classList.add(`${jugador}_ganador`);
        }

        aumentarPuntajes(turno);
        bloquearBotones();

        setTimeout(() => {
            restaurarBotones();
        }, 2000);

        validarMeta(turno);
    }
}

//Línea horizontal 3
const rellenarHorizontal_3 = (jugador,turno) => {
            
    const lineaHorizontal3 = [btns_x_o[6],btns_x_o[7],btns_x_o[8]];

    if(validarLinea(lineaHorizontal3,jugador)){

        for(let i = 6; i < 9; i++){

            btns_x_o[i].classList.remove(`${jugador}`);
            btns_x_o[i].classList.add(`${jugador}_ganador`);
        }

        aumentarPuntajes(turno);
        bloquearBotones();

        setTimeout(() => {
            restaurarBotones();
        }, 2000);

        validarMeta(turno);
    }
}

//Línea vertical 1
const rellenarVertical_1 = (jugador,turno) => {

    const lineaVertical1 = [btns_x_o[0],btns_x_o[3],btns_x_o[6]];

    if(validarLinea(lineaVertical1,jugador)){

        for(let i = 0; i < lineaVertical1.length; i++){

            lineaVertical1[i].classList.remove(`${jugador}`);
            lineaVertical1[i].classList.add(`${jugador}_ganador`);
        }

        aumentarPuntajes(turno);
        bloquearBotones();

        setTimeout(() => {
            restaurarBotones();
        }, 2000);

        validarMeta(turno);
    }
}

//Línea vertical 2
const rellenarVertical_2 = (jugador,turno) => {

    const lineaVertical2 = [btns_x_o[1],btns_x_o[4],btns_x_o[7]];

    if(validarLinea(lineaVertical2,jugador)){

        for(let i = 0; i < lineaVertical2.length; i++){

            lineaVertical2[i].classList.remove(`${jugador}`);
            lineaVertical2[i].classList.add(`${jugador}_ganador`);
        }

        aumentarPuntajes(turno);
        bloquearBotones();

        setTimeout(() => {
            restaurarBotones();
        }, 2000);

        validarMeta(turno);
    }
}

//Línea vertical 3
const rellenarVertical_3 = (jugador,turno) => {

    const lineaVertical3 = [btns_x_o[2],btns_x_o[5],btns_x_o[8]];

    if(validarLinea(lineaVertical3,jugador)){

        for(let i = 0; i < lineaVertical3.length; i++){

            lineaVertical3[i].classList.remove(`${jugador}`);
            lineaVertical3[i].classList.add(`${jugador}_ganador`);
        }

        aumentarPuntajes(turno);
        bloquearBotones();

        setTimeout(() => {
            restaurarBotones();
        }, 2000);

        validarMeta(turno);

    }
}

//Línea diagonal 1
const rellenarDiagonal_1 = (jugador,turno) => {

    const lineaDiagonal1 = [btns_x_o[0],btns_x_o[4],btns_x_o[8]];

    if(validarLinea(lineaDiagonal1,jugador)){

        for(let i = 0; i < lineaDiagonal1.length; i++){

            lineaDiagonal1[i].classList.remove(`${jugador}`);
            lineaDiagonal1[i].classList.add(`${jugador}_ganador`);
        }

        aumentarPuntajes(turno);
        bloquearBotones();

        setTimeout(() => {
            restaurarBotones();
        }, 2000);

        validarMeta(turno);
    }
}

//Línea diagonal 2
const rellenarDiagonal_2 = (jugador,turno) => {

    const lineaDiagonal2 = [btns_x_o[2],btns_x_o[4],btns_x_o[6]];

    if(validarLinea(lineaDiagonal2,jugador)){

        for(let i = 0; i < lineaDiagonal2.length; i++){

            lineaDiagonal2[i].classList.remove(`${jugador}`);
            lineaDiagonal2[i].classList.add(`${jugador}_ganador`);
        }

        aumentarPuntajes(turno);
        bloquearBotones();

        setTimeout(() => {
            restaurarBotones();
        }, 2000);

        validarMeta(turno);
    }
}

//¿Empate?
const validarEmpate = (btn) => btn.classList.contains("j1_ganador") || btn.classList.contains("j2_ganador");

const empate = (btn) => {

    cantidadJugadas++;

    if(cantidadJugadas == 9){

        if(!validarEmpate(btn)){

            bloquearBotones();

            setTimeout(() => {
                restaurarBotones();
            }, 2000);

            cantidadJugadas = 0;

            mostrarModalEmpate();
        }   
    }
}

//Marcar casilla con Cruz o Círculo
const marcarCasilla = (btn,jugador,simbolo) =>{

    btn.classList.remove("opacity-0");
    btn.classList.add(`${jugador}`);
    btn.innerText = `${simbolo}`;
    btn.classList.add("btn_deshabilitado2")
}

//Establecer Puntaje
const establecerPuntajePartida = (radioButton,valorPuntaje) =>{
    
    if(radioButton.checked){
        puntaje_establecido = valorPuntaje;
        puntaje_maximo.innerText = puntaje_establecido.toString();
        puntaje_maximo_mobile.innerText = puntaje_establecido.toString();
    }
}

//Selección puntaje máximo
listado_puntajes.forEach((rbtn_puntaje)=>{ 
            
    rbtn_puntaje.addEventListener("click",()=>{

        if(btn_comenzarPartida_tresEnRaya.classList.contains("btn_deshabilitado")){
            
            btn_comenzarPartida_tresEnRaya.classList.remove("btn_deshabilitado");
        }
    });
});

//Comenzar Partida
btn_comenzarPartida_tresEnRaya.addEventListener("click",()=>{
        
    btns_x_o.forEach((btn)=>{ 
        btn.setAttribute("data-bs-toggle","")
        btn.setAttribute("data-bs-target","");
    });

    btn_jugar_O_X.forEach((btn_jugar)=>{
        btn_jugar.classList.add("btn_deshabilitado");
    });
    
    establecerPuntajePartida(listado_puntajes[0],2);
    establecerPuntajePartida(listado_puntajes[1],3);
    establecerPuntajePartida(listado_puntajes[2],5);
    establecerPuntajePartida(listado_puntajes[3],10);

    mostrarModalInicioPartida(puntaje_establecido);

    jugador1.classList.add("turno_jugador1");

    txt_turno.forEach((txt)=>{
        txt.classList.remove("opacity-0");
        txt.classList.add("txt_jugador1");
        txt.innerText = "Es tu turno, Jugador 1";
    });
});

//¿Cruz o Círculo? (dependiendo del turno del jugador)
btns_x_o.forEach((btn)=>{

    btn.addEventListener("click",()=>{

        if(btn.getAttribute("data-bs-target") == ""){

            if(turno == true){

                marcarCasilla(btn,"j1","X");

                rellenarHorizontal_1("j1",turno);
                rellenarHorizontal_2("j1",turno);
                rellenarHorizontal_3("j1",turno);
            
                rellenarVertical_1("j1",turno);
                rellenarVertical_2("j1",turno);
                rellenarVertical_3("j1",turno);

                rellenarDiagonal_1("j1",turno);
                rellenarDiagonal_2("j1",turno);

                empate(btn);
                
                if(puntos_j1 == puntaje_establecido){
                    
                    turno = true;
                }else{
                    turno = false;
                    jugador1.classList.remove("turno_jugador1");
                    jugador2.classList.add("turno_jugador2");

                    txt_turno.forEach((txt)=>{
                        txt.classList.remove("txt_jugador1");
                        txt.classList.add("txt_jugador2");
                        txt.innerText = "Es tu turno, Jugador 2";
                    });

                }


            }else{

                marcarCasilla(btn,"j2","O");

                rellenarHorizontal_1("j2",turno);
                rellenarHorizontal_2("j2",turno);
                rellenarHorizontal_3("j2",turno);
            
                rellenarVertical_1("j2",turno);
                rellenarVertical_2("j2",turno);
                rellenarVertical_3("j2",turno);

                rellenarDiagonal_1("j2",turno);
                rellenarDiagonal_2("j2",turno);

                empate(btn);

                turno = true;

                if(puntos_j2 != puntaje_establecido){

                    jugador2.classList.remove("turno_jugador2");
                    jugador1.classList.add("turno_jugador1");

                    txt_turno.forEach((txt)=>{
                        txt.classList.remove("txt_jugador2");
                        txt.classList.add("txt_jugador1");
                        txt.innerText = "Es tu turno, Jugador 1";
                    });

                }else{
                    txt_turno.forEach((txt)=>{
                        txt.classList.remove("txt_jugador2");
                    });
                }
                                
            }
        }

    });

});