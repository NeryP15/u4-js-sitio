const APP_NOMBRE = "tú Galeria Cinematografica";
const APP_VERSION = "1.0.0";
const ANIO = new Date().getFullYear();

let contadorVisitas = 0;
let usuarioActivo = "invitado";
let esMovil = /Mobi|Android/i.test(navigator.userAgent);

function sumar(a,b){return Number(a)+Number(b);}
function multiplicar(a,b){return Number(a)*Number(b);}

function evaluarNumero(n){
  n=Number(n);
  if(isNaN(n)) return "No es un número";
  if(n>0) return "positivo";
  else if(n<0) return "negativo";
  return "cero";
}

function obtenerDia(numero){
  switch(Number(numero)){
    case 0: return "Domingo"; case 1: return "Lunes"; case 2: return "Martes";
    case 3: return "Miércoles"; case 4: return "Jueves"; case 5: return "Viernes";
    case 6: return "Sábado"; default: return "Desconocido";
  }
}

class Util{
  static formatearMoneda(n, locale="es-MX", currency="MXN"){
    return new Intl.NumberFormat(locale,{style:"currency",currency}).format(Number(n||0));
  }
}

function mostrarHora(){
  const el=document.getElementById("reloj"); if(!el) return;
  const now=new Date(); const hh=String(now.getHours()).padStart(2,"0");
  const mm=String(now.getMinutes()).padStart(2,"0"); const ss=String(now.getSeconds()).padStart(2,"0");
  el.textContent=`${hh}:${mm}:${ss}`;
}
setInterval(mostrarHora,1000);

function cargarVisitas(){ const v=Number(localStorage.getItem("visitas")||"0"); contadorVisitas=v; actualizarVisitas(); }
function incrementarVisitas(){ contadorVisitas++; localStorage.setItem("visitas",String(contadorVisitas)); actualizarVisitas(); }
function actualizarVisitas(){ const out=document.getElementById("totalVisitas"); if(out) out.textContent=String(contadorVisitas); }

function bienvenida(){
  const salida=document.getElementById("salida");
  if(salida){ const ua=esMovil?"móvil":"escritorio";
    salida.innerHTML=`Bienvenido <strong>${usuarioActivo}</strong> a <em>${APP_NOMBRE}</em> v${APP_VERSION} — ${ANIO} · Navegas en ${ua}.`; }
}

function activarNavegacion(){
  const current=document.body.dataset.page;
  document.querySelectorAll("nav a[data-page]").forEach(a=>{ if(a.dataset.page===current) a.classList.add("activo"); });
}

function prepararCambioColor(){
  const cont=document.getElementById("cambioColor"); if(!cont) return;
  cont.addEventListener("click",e=>{ if(!(e.target instanceof HTMLElement)) return; const c=e.target.dataset.color; if(c){ document.body.style.backgroundColor=c; }});
}

function prepararNotas(){
  const form=document.getElementById("formNotas"); const ul=document.getElementById("listaNotas"); const err=document.getElementById("errorNota");
  if(!form||!ul) return;
  form.addEventListener("submit",e=>{ e.preventDefault(); const input=form.querySelector("input[name='nota']"); const txt=(input?.value||'').trim();
    if(!txt){ if(err){err.textContent="Escribe una nota"; err.style.display="block";} return; }
    if(err) err.style.display="none"; const li=document.createElement("li"); li.textContent=txt; ul.appendChild(li); input.value=""; });
}

function prepararFormularioContacto(){
  const form=document.getElementById("formContacto"); if(!form) return; const msgOk=document.getElementById("msgOk");
  form.addEventListener("submit",e=>{ e.preventDefault(); let valido=true;
    function setError(id,msg){ const input=document.getElementById(id); const errorEl=document.getElementById("err_"+id); if(input&&errorEl){ input.classList.add("error"); errorEl.textContent=msg; errorEl.style.display="block"; }}
    function clearError(id){ const input=document.getElementById(id); const errorEl=document.getElementById("err_"+id); if(input&&errorEl){ input.classList.remove("error"); errorEl.textContent=""; errorEl.style.display="none"; }}
    const nombre=document.getElementById("nombre"); clearError("nombre"); if(!nombre||nombre.value.trim().length<2){ setError("nombre","Ingresa tu nombre"); valido=false; }
    const email=document.getElementById("email"); clearError("email"); if(!email||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)){ setError("email","Email inválido"); valido=false; }
    const mensaje=document.getElementById("mensaje"); clearError("mensaje"); if(!mensaje||mensaje.value.trim().length<5){ setError("mensaje","Mensaje muy corto"); valido=false; }
    if(valido){ if(msgOk){ msgOk.textContent="Formulario enviado con éxito."; msgOk.style.display="block"; } form.reset(); }
  });
}

function prepararBuscadorServicios(){
  const input=document.getElementById("buscador"); const lista=document.getElementById("listaServicios"); if(!input||!lista) return;
  input.addEventListener("input",()=>{ const q=input.value.toLowerCase(); lista.querySelectorAll("li").forEach(li=>{ li.style.display=li.textContent.toLowerCase().includes(q)?"":"none"; }); });
}

function renderPerfil(){
  const cont=document.getElementById("perfil"); if(!cont) return; const perfil={ nombre:"Comedias", rol:"Fan del cine", peliculas:42 };
  cont.innerHTML=`<div class="tarjeta"><h3>${perfil.nombre}</h3><p>Rol: ${perfil.rol}</p><p>Películas favoritas: ${perfil.peliculas}</p><p>Ejemplo precio: ${Util.formatearMoneda(199)}</p></div>`;
}

function prepararBotonVisitas(){ const b=document.getElementById("btnVisitas"); if(!b) return; b.addEventListener("click", incrementarVisitas); }

document.addEventListener("DOMContentLoaded",()=>{
  activarNavegacion(); bienvenida(); mostrarHora(); cargarVisitas(); prepararBotonVisitas(); prepararCambioColor();
  prepararNotas(); prepararFormularioContacto(); prepararBuscadorServicios(); renderPerfil();
});

console.log("app.js cargado correctamente");

document.addEventListener("DOMContentLoaded", function () {
  // 🔘 Bienvenida interactiva
  const boton = document.getElementById("botonBienvenida");

  if (boton) {
    boton.addEventListener("click", function () {
      const nombre = prompt("¡Hola! ¿Cuál es tu nombre?");
      
      if (nombre) {
        alert(`Bienvenido/a, ${nombre}. ¡Disfruta del contenido!`);
        console.log(`Usuario ingresó el nombre: ${nombre}`);
      } else {
        alert("No ingresaste tu nombre, pero igual puedes explorar el sitio.");
        console.log("Usuario no ingresó ningún nombre.");
      }
    });
  } else {
    console.warn("No se encontró el botón con ID 'botonBienvenida'");
  }

  const perfil = {
    nombre: "Nery",
    profesion: "Desarrollador Web",
    intereses: [
      "Accesibilidad",
      "Visualización de datos",
      "Presentación creativa"
    ]
  };

  const perfilHTML = `
    <h3 style="margin-top:20px;">👤 Perfil del creador</h3>
    <p><strong>Nombre:</strong> ${perfil.nombre}</p>
    <p><strong>Profesión:</strong> ${perfil.profesion}</p>
    <p><strong>Intereses:</strong></p>
    <ul style="list-style-type: disc; padding-left: 20px;">
      ${perfil.intereses.map(interes => `<li>${interes}</li>`).join("")}
    </ul>
  `;

});

