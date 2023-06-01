const tituloLetras = document.querySelectorAll(".tituloLetra");
        
for(let i = 0; i<tituloLetras.length; i++){        
    setTimeout(()=>{
        tituloLetras[i].style.opacity = "1";
    },200*(i+1));
}