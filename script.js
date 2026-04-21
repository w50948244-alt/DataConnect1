let numeroSecreto = 0;
let intentos = 0;
let juegoActivo = false;



function generarNumero() {
  numeroSecreto = Math.floor(Math.random() * 10) + 1;
  intentos = 0;
  juegoActivo = true;

  actualizarMensaje("🎯 Número generado, Intenta pegarlo", "#38bdf8", 10);
  document.getElementById("intentos").innerText = "";

  animarInput();
}


function intentar() {
  if (!juegoActivo) {
    alertaBonita("Dale en precionar primero 🎲");
    return;
  }

  let input = document.getElementById("numero");
  let valor = input.value;

  if (valor === "") {
    alertaBonita("Ingresa un número");
    return;
  }

  valor = parseInt(valor);
  intentos++;

  let diferencia = Math.abs(numeroSecreto - valor);
  let progreso = Math.max(5, 100 - diferencia * 15);

  if (valor === numeroSecreto) {
    actualizarMensaje("🎉 ¡Felicidades! Pegaste el número", "#22c55e", 100);
    document.getElementById("intentos").innerText =
      "Lo lograste en " + intentos + " intento(s)";
    
    efectoExito();
    juegoActivo = false;

  } else if (diferencia === 1) {
    actualizarMensaje("🔥 ¡MUY cerca!", "#facc15", progreso);
    vibrar(input);

  } else if (diferencia <= 3) {
    actualizarMensaje("😮 Estás cerca", "#fb923c", progreso);
    vibrar(input);

  } else {
    actualizarMensaje("❄️ Estás lejos", "#60a5fa", progreso);
    vibrar(input);
  }

  input.value = "";
}



function reiniciar() {
  numeroSecreto = 0;
  intentos = 0;
  juegoActivo = false;

  actualizarMensaje("Juego reiniciado. sigue jugando ", "#94a3b8", 0);
  document.getElementById("intentos").innerText = "";
}



function actualizarMensaje(texto, color, progreso) {
  let mensaje = document.getElementById("mensaje");
  mensaje.innerText = texto;
  mensaje.style.color = color;

  mensaje.style.transform = "scale(1.1)";
  setTimeout(() => {
    mensaje.style.transform = "scale(1)";
  }, 200);

  let barra = document.getElementById("barra");
  if (barra) {
    barra.style.width = progreso + "%";
  }
}



function alertaBonita(texto) {
  let mensaje = document.getElementById("mensaje");
  mensaje.innerText = texto;
  mensaje.style.color = "#ef4444";

  vibrar(mensaje);
}



function vibrar(elemento) {
  elemento.style.transform = "translateX(5px)";
  setTimeout(() => elemento.style.transform = "translateX(-5px)", 50);
  setTimeout(() => elemento.style.transform = "translateX(0)", 100);
}


function efectoExito() {
  document.body.style.background = "linear-gradient(135deg, #022c22, #065f46)";
  
  setTimeout(() => {
    document.body.style.background = "linear-gradient(135deg, #020617, #0f172a)";
  }, 1500);
}



function animarInput() {
  let input = document.getElementById("numero");
  input.focus();
  input.style.boxShadow = "0 0 15px #38bdf8";

  setTimeout(() => {
    input.style.boxShadow = "none";
  }, 800);
}



const elementos = document.querySelectorAll(".card, .stats div");

window.addEventListener("scroll", () => {
  elementos.forEach(el => {
    let top = el.getBoundingClientRect().top;
    let alturaPantalla = window.innerHeight;

    if (top < alturaPantalla - 50) {
      el.classList.add("show");
    }
  });
});