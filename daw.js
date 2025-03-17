document.addEventListener("DOMContentLoaded", () => {
  let celdasClickeadas = [];
  let listaRepro = [];

  let reproduciendo = false;
  let intervalId;

  // Función para crear un botón
  function crearBoton(text, id, clickHandler) {
    const button = document.createElement("button");
    button.textContent = text;
    button.id = id;
    button.addEventListener("click", clickHandler);
    return button;
  }

  // Función para crear el tablero 5x5
  function crearTablero(rows, cols) {
    const tablero = document.createElement("div");
    tablero.classList.add("tablero");

    for (let i = 0; i < rows; i++) {
      let fila = document.createElement("div");
      fila.classList.add("fila");

      for (let j = 0; j < cols; j++) {
        let celda = document.createElement("div");
        celda.classList.add("celda");
        celda.textContent = "Sonido";

        const index = i * cols + j + 1; //
        const audioI = `audios/${index}.wav`;
        celda.dataset.audio = audioI;

        //celda.textContent = `${i},${j}`;
        celda.addEventListener("click", () => {
          console.log("celda Clicked", audioI);

          if (!celdasClickeadas.includes(celda)) {
            celdasClickeadas.push(celda);
            console.log(celdasClickeadas);
          }
          reproducirAudio(audioI);
          contenidoCelda(celda);
        });

        fila.appendChild(celda);
      }

      tablero.appendChild(fila);
    }

    return tablero;
  }

  // Función para reproducir el audio de una celda
  function reproducirAudio(audioSrc, celda) {
    const audio = new Audio(audioSrc);
    audio
      .play()
      .then(() => {
        if (celda) {
          //me estaba dando problemas en consola la variable celda
          //con esta verificación me quito el error de typeError.
          celda.style.backgroundColor = "green";
          celda.textContent = "Reproduciendo";
          audio.onended = () => {
            celda.style.backgroundColor = "orange";
            celda.textContent = "Seleccionada";
          };
        }
      })

      .catch((error) => {
        console.error("Error al reproducir el audio:", error);
      });
  }

  // Función para reproducir la lista de reproducción
  function reproducirLista() {
    if (celdasClickeadas.length === 0 || reproduciendo) return;

    reproduciendo = true;
    let index = 0;

    function siguienteAudio() {
      if (index < celdasClickeadas.length) {
        const celdaActual = celdasClickeadas[index];
        const audioSrc = celdaActual.dataset.audio;
        reproducirAudio(audioSrc, celdaActual);

        index++;
        setTimeout(siguienteAudio, 2000);
      } else {
        reproduciendo = false;
      }
    }

    siguienteAudio();
  }

  // funcion cambia el contenido de celda
  function contenidoCelda(celda) {
    celda.style.backgroundColor = "blue";
    celda.style.borderRadius = "5%";
  }

  //funcion para borrar seleccion de contenidoCelda

  function borrar() {
    console.log("Reiniciando selección...");
    const celdas = document.querySelectorAll(".celda");
    celdas.forEach((celda) => {
      celda.textContent = "Sonido";
      celda.style.backgroundColor = "";
      celda.style.borderRadius = "";
    });
    celdasClickeadas = [];
    clearInterval(intervalId);
    reproduciendo = false;
  }
  // Función para parar la reproducción de audio actual y la lista de reproducción
  //despues de varias vueltas consegui que aun parando lista de repro si volvemos
  //a pulsar reproducir la lista siga guardada y podamos si se desea instertar
  //mas items a ella.
  function parar() {
    if (audioActual) {
      audioActual.pause();
      audioActual.currentTime = 0;
      audioActual = null;
    }
    // Guardar la lista de reproducción antes de pararla
    if (celdasClickeadas.length > 0) {
      listaRepro.push(...celdasClickeadas); //concatenamos lista de reproducción
      //con celdas clickeadas con ...
    }
    //console.log(listaRepro);
    //listaRepro = [celdasClickeadas, listaRepro];
    //celdasClickeadas = [];
    clearInterval(intervalId);
    reproduciendo = false;
  }

  // Función para mostrar temporizador visual
  function mostrarTemporizadorVisual() {
    const temporizador = document.createElement("div");
    temporizador.classList.add("temporizador-visual");

    const arenaGif = document.createElement("img");
    arenaGif.src = "audios/arena.gif";
    arenaGif.alt = "Reloj arena";
    arenaGif.style.width = "48px";

    temporizador.appendChild(arenaGif);

    document.body.appendChild(temporizador);

    setTimeout(() => {
      //clearInterval(intervalId);
      temporizador.remove();
      reproducirLista();
    }, 3000);
  }

  // Función para crear el contenido a la derecha del tablero
  function crearContenidoDerecha() {
    const contenidoDerecha = document.createElement("div");
    contenidoDerecha.classList.add("contenido-derecha");

    // Texto e imagenes de la derecha seccion 1
    const seccion1 = document.createElement("div");
    seccion1.classList.add("seccion1");
    const texto1 = document.createElement("p");
    texto1.textContent = `La música El rock es un amplio género de música 
    popular originado a principios de la década de 1950 en Estados Unidos 
    y que derivaría en un gran rango de diferentes estilos a mediados de 
    los años 1960 y posteriores, particularmente en ese país y 
    Reino Unido​ Tiene sus raíces en el rock and roll de los años 50,
     estilo nacido directamente de géneros como el blues, el rhythm and
      blues (pertenecientes a la música afroamericana) y el country.`;
    const imagen1 = document.createElement("img");
    imagen1.src = "audios/5.jpeg";
    imagen1.alt = "Imagen 1";
    seccion1.appendChild(imagen1);
    seccion1.appendChild(texto1);

    // Imagenes y texto derecha seccion 2
    const seccion2 = document.createElement("div");
    seccion2.classList.add("seccion2");
    const texto2 = document.createElement("p");
    const parrafo1 = document.createElement("p");
    const parrafo2 = document.createElement("p");
    const ritmoNegrita = document.createTextNode("RITMO");

    ritmoNegrita.fontWeight = "bold";

    parrafo1.appendChild(ritmoNegrita);
    const textoResto = document.createTextNode(
      ", Puede definirse generalmente como un "
    );
    parrafo1.appendChild(textoResto);
    parrafo1.textContent += `«movimiento marcado por la sucesión regular de elementos débiles 
   y fuertes, o bien de condiciones opuestas o diferentes».`;
    parrafo2.textContent = `Es decir, un flujo de movimiento, controlado o medido, sonoro o visual,
   generalmente producido por una ordenación de elementos diferentes
   del medio en cuestión.`;

    texto2.appendChild(parrafo1);

    texto2.appendChild(parrafo2);

    const imagen2 = document.createElement("img");
    imagen2.src = "audios/6.jpeg";
    imagen2.alt = "Imagen 2";
    seccion2.appendChild(imagen2);
    seccion2.appendChild(texto2);

    contenidoDerecha.appendChild(seccion1);
    contenidoDerecha.appendChild(seccion2);

    return contenidoDerecha;
  }

  const startButton = crearBoton("Inicio", "inicioB");
  const h1 = document.querySelector("h1");
  //h1.textContent = "Inicio";
  h1.insertAdjacentElement("afterend", startButton);

  startButton.addEventListener("click", () => {
    startButton.remove();

    const principal = document.createElement("div");
    principal.classList.add("principal");

    const tablero = crearTablero(5, 5);
    const contenidoDerecha = crearContenidoDerecha();

    const playButton = crearBoton("Reproducir", "playB", () => {
      mostrarTemporizadorVisual();
      // reproducirLista();
    });

    const recordButton = crearBoton("Parar", "recordB", parar);
    const stopButton = crearBoton("Borrar", "stopB", borrar);

    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("button-container");
    buttonContainer.appendChild(playButton);
    buttonContainer.appendChild(recordButton);
    buttonContainer.appendChild(stopButton);

    principal.appendChild(tablero);
    principal.appendChild(contenidoDerecha);
    tablero.appendChild(buttonContainer);

    document.body.appendChild(principal);
  });
});
