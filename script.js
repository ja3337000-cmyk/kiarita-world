/* =========================
   FRASES
========================= */

const frases = [
    "Hoy va a ser un día bonito 💗",
    "Nunca olvides lo increíble que eres 🌷",
    "Pusheen te manda un abracito 🐱💕",
    "Todo estará bien ✨",
    "Sonríe, Kiarita 💗",
    "Eres una personita muy especial 🌸",
    "Un día a la vez 🌷"
];


function mostrarFrase() {

    const fraseElemento =
        document.getElementById("frase");

    let ultimaFrase =
        localStorage.getItem("ultimaFrase");

    let disponibles =
        frases.filter(frase => frase !== ultimaFrase);

    let fraseNueva =
        disponibles[
            Math.floor(Math.random() * disponibles.length)
        ];

    fraseElemento.textContent = fraseNueva;

    localStorage.setItem(
        "ultimaFrase",
        fraseNueva
    );
}


/* =========================
   NAVEGACIÓN
========================= */

function mostrarPantalla(id) {

    const pantallas =
        document.querySelectorAll(".pantalla");

    pantallas.forEach(pantalla => {
        pantalla.classList.remove("activa");
    });

    document
        .getElementById(id)
        .classList.add("activa");


    if (id === "notas") {
        mostrarNotas();
    }

    if (id === "fechas") {
        mostrarFechas();
    }

    if (id === "tareas") {
        mostrarTareas();
    }

    if (id === "recuerdos") {
        mostrarRecuerdos();
    }

    if (id === "juegos") {
        volverJuegos();
    }

    if (id === "inicio") {
        actualizarInicio();
    }
}


/* =========================
   NOTAS
========================= */

function guardarNota() {

    const texto =
        document
            .getElementById("notaTexto")
            .value
            .trim();

    if (!texto) return;

    let notas =
        JSON.parse(
            localStorage.getItem("notas")
        ) || [];

    notas.push({
        texto: texto
    });

    localStorage.setItem(
        "notas",
        JSON.stringify(notas)
    );

    document.getElementById("notaTexto").value = "";

    mostrarNotas();
    actualizarInicio();
}


function mostrarNotas() {

    const contenedor =
        document.getElementById("listaNotas");

    let notas =
        JSON.parse(
            localStorage.getItem("notas")
        ) || [];

    contenedor.innerHTML = "";

    notas.forEach((nota, index) => {

        const div =
            document.createElement("div");

        div.className = "nota";

        div.innerHTML = `
            <span>
                ${escapeHTML(nota.texto)}
            </span>

            <button onclick="eliminarNota(${index})">
                🗑️
            </button>
        `;

        contenedor.appendChild(div);
    });
}


function eliminarNota(index) {

    let notas =
        JSON.parse(
            localStorage.getItem("notas")
        ) || [];

    notas.splice(index, 1);

    localStorage.setItem(
        "notas",
        JSON.stringify(notas)
    );

    mostrarNotas();
    actualizarInicio();
}


/* =========================
   FECHAS
========================= */

function guardarFecha() {

    const titulo =
        document
            .getElementById("fechaTitulo")
            .value
            .trim();

    const fecha =
        document.getElementById("fecha").value;

    if (!titulo || !fecha) return;

    let fechas =
        JSON.parse(
            localStorage.getItem("fechas")
        ) || [];

    fechas.push({
        titulo: titulo,
        fecha: fecha
    });

    localStorage.setItem(
        "fechas",
        JSON.stringify(fechas)
    );

    document.getElementById("fechaTitulo").value = "";

    document.getElementById("fecha").value = "";

    mostrarFechas();
    actualizarInicio();
}


function mostrarFechas() {

    const contenedor =
        document.getElementById("listaFechas");

    let fechas =
        JSON.parse(
            localStorage.getItem("fechas")
        ) || [];

    contenedor.innerHTML = "";

    fechas.forEach((fecha, index) => {

        const div =
            document.createElement("div");

        div.className = "fecha";

        div.innerHTML = `
            <div class="fecha-info">

                <strong>
                    ${escapeHTML(fecha.titulo)}
                </strong>

                <span>
                    ${formatearFecha(fecha.fecha)}
                </span>

            </div>

            <button onclick="eliminarFecha(${index})">
                🗑️
            </button>
        `;

        contenedor.appendChild(div);
    });
}


function eliminarFecha(index) {

    let fechas =
        JSON.parse(
            localStorage.getItem("fechas")
        ) || [];

    fechas.splice(index, 1);

    localStorage.setItem(
        "fechas",
        JSON.stringify(fechas)
    );

    mostrarFechas();
    actualizarInicio();
}


function formatearFecha(fecha) {

    const partes = fecha.split("-");

    return `${partes[2]}/${partes[1]}/${partes[0]}`;
}


/* =========================
   TAREAS
========================= */

function guardarTarea() {

    const texto =
        document
            .getElementById("tareaTexto")
            .value
            .trim();

    if (!texto) return;

    let tareas =
        JSON.parse(
            localStorage.getItem("tareas")
        ) || [];

    tareas.push({
        texto: texto,
        completada: false
    });

    localStorage.setItem(
        "tareas",
        JSON.stringify(tareas)
    );

    document.getElementById("tareaTexto").value = "";

    mostrarTareas();
}


function mostrarTareas() {

    const contenedor =
        document.getElementById("listaTareas");

    let tareas =
        JSON.parse(
            localStorage.getItem("tareas")
        ) || [];

    contenedor.innerHTML = "";

    tareas.forEach((tarea, index) => {

        const div =
            document.createElement("div");

        div.className = "tarea";

        if (tarea.completada) {
            div.classList.add("completada");
        }

        div.innerHTML = `

            <input
                type="checkbox"
                ${tarea.completada ? "checked" : ""}
                onchange="cambiarTarea(${index})"
            >

            <span>
                ${escapeHTML(tarea.texto)}
            </span>

            <button onclick="eliminarTarea(${index})">
                🗑️
            </button>

        `;

        contenedor.appendChild(div);
    });
}


function cambiarTarea(index) {

    let tareas =
        JSON.parse(
            localStorage.getItem("tareas")
        ) || [];

    tareas[index].completada =
        !tareas[index].completada;

    localStorage.setItem(
        "tareas",
        JSON.stringify(tareas)
    );

    mostrarTareas();
}


function eliminarTarea(index) {

    let tareas =
        JSON.parse(
            localStorage.getItem("tareas")
        ) || [];

    tareas.splice(index, 1);

    localStorage.setItem(
        "tareas",
        JSON.stringify(tareas)
    );

    mostrarTareas();
}


/* =========================
   RECUERDOS
========================= */

async function guardarRecuerdo() {

    const titulo =
        document
            .getElementById("recuerdoTitulo")
            .value
            .trim();

    const archivo =
        document
            .getElementById("recuerdoImagen")
            .files[0];

    const descripcion =
        document
            .getElementById("recuerdoDescripcion")
            .value
            .trim();


    if (!titulo || !archivo) {

        alert(
            "Ponle un título y selecciona una foto 💗"
        );

        return;
    }


    try {

        const imagen =
            await convertirImagen(archivo);

        let recuerdos =
            JSON.parse(
                localStorage.getItem("recuerdos")
            ) || [];


        recuerdos.push({

            titulo: titulo,

            imagen: imagen,

            descripcion: descripcion

        });


        localStorage.setItem(
            "recuerdos",
            JSON.stringify(recuerdos)
        );


        document.getElementById(
            "recuerdoTitulo"
        ).value = "";


        document.getElementById(
            "recuerdoImagen"
        ).value = "";


        document.getElementById(
            "recuerdoDescripcion"
        ).value = "";


        mostrarRecuerdos();
        actualizarInicio();


    } catch (error) {

        alert(
            "No se pudo guardar la imagen 😿"
        );

    }
}


function convertirImagen(archivo) {

    return new Promise((resolve, reject) => {

        const lector =
            new FileReader();


        lector.onload = function(event) {

            const imagen =
                new Image();


            imagen.onload = function() {

                const canvas =
                    document.createElement("canvas");

                const maximo = 900;

                let ancho = imagen.width;

                let alto = imagen.height;


                if (
                    ancho > maximo ||
                    alto > maximo
                ) {

                    if (ancho > alto) {

                        alto =
                            alto *
                            (maximo / ancho);

                        ancho = maximo;

                    } else {

                        ancho =
                            ancho *
                            (maximo / alto);

                        alto = maximo;
                    }
                }


                canvas.width = ancho;

                canvas.height = alto;


                const contexto =
                    canvas.getContext("2d");


                contexto.drawImage(
                    imagen,
                    0,
                    0,
                    ancho,
                    alto
                );


                const resultado =
                    canvas.toDataURL(
                        "image/jpeg",
                        0.75
                    );


                resolve(resultado);
            };


            imagen.onerror = reject;

            imagen.src =
                event.target.result;
        };


        lector.onerror = reject;

        lector.readAsDataURL(archivo);

    });
}


function mostrarRecuerdos() {

    const contenedor =
        document.getElementById(
            "listaRecuerdos"
        );

    let recuerdos =
        JSON.parse(
            localStorage.getItem("recuerdos")
        ) || [];


    contenedor.innerHTML = "";


    recuerdos.forEach((recuerdo, index) => {

        const div =
            document.createElement("div");


        div.className = "recuerdo";


        div.innerHTML = `

            <img
                src="${recuerdo.imagen}"
                alt="Recuerdo"
            >

            <h3>
                ${escapeHTML(recuerdo.titulo)}
            </h3>

            <p>
                ${escapeHTML(recuerdo.descripcion)}
            </p>

            <button
                onclick="eliminarRecuerdo(${index})"
            >
                🗑️ Eliminar
            </button>

        `;


        contenedor.appendChild(div);

    });
}


function eliminarRecuerdo(index) {

    let recuerdos =
        JSON.parse(
            localStorage.getItem("recuerdos")
        ) || [];


    recuerdos.splice(index, 1);


    localStorage.setItem(
        "recuerdos",
        JSON.stringify(recuerdos)
    );


    mostrarRecuerdos();
    actualizarInicio();
}


/* =====================================================
   JUEGOS
===================================================== */


/* =========================
   MENÚ DE JUEGOS
========================= */

function abrirJuego(juego) {

    document.querySelector(".seccion-box").style.display = "none";

    document
        .getElementById("juegoCorazones")
        .classList.remove("activo");

    document
        .getElementById("juegoMemoria")
        .classList.remove("activo");

    document
        .getElementById("juegoPusheen")
        .classList.remove("activo");

    document
        .getElementById("juegoAtrapaPusheen")
        .classList.remove("activo");


    if (juego === "corazones") {

        document
            .getElementById("juegoCorazones")
            .classList.add("activo");

        prepararCorazones();
    }


    if (juego === "memoria") {

        document
            .getElementById("juegoMemoria")
            .classList.add("activo");

        iniciarMemoria();
    }


    if (juego === "pusheen") {

        document
            .getElementById("juegoPusheen")
            .classList.add("activo");

        prepararPusheen();
    }


    if (juego === "atrapaPusheen") {

        document
            .getElementById("juegoAtrapaPusheen")
            .classList.add("activo");

        prepararAtrapaPusheen();
    }
}


function volverJuegos() {

    detenerCorazones();

    detenerPusheen();

    detenerAtrapaPusheen();

    document
        .getElementById("juegoCorazones")
        .classList.remove("activo");

    document
        .getElementById("juegoMemoria")
        .classList.remove("activo");

    document
        .getElementById("juegoPusheen")
        .classList.remove("activo");

    document
        .getElementById("juegoAtrapaPusheen")
        .classList.remove("activo");


    document.querySelector(".seccion-box").style.display =
        "block";
}


/* =====================================================
   JUEGO 1: ATRAPA CORAZONES
===================================================== */

let puntosCorazones = 0;

let tiempoCorazones = 20;

let intervaloCorazones = null;

let temporizadorCorazones = null;

let jugandoCorazones = false;


function prepararCorazones() {

    puntosCorazones = 0;

    tiempoCorazones = 20;

    jugandoCorazones = false;

    document.getElementById(
        "puntosCorazones"
    ).textContent = "0";

    document.getElementById(
        "tiempoCorazones"
    ).textContent = "20";


    document.getElementById(
        "botonCorazones"
    ).textContent = "💗 INICIAR";


    document.getElementById(
        "areaCorazones"
    ).innerHTML = `
        <div class="mensaje-juego">
            Pulsa INICIAR para comenzar 💗
        </div>
    `;
}


function iniciarCorazones() {

    if (jugandoCorazones) return;

    detenerCorazones();

    puntosCorazones = 0;

    tiempoCorazones = 20;

    jugandoCorazones = true;


    document.getElementById(
        "puntosCorazones"
    ).textContent = "0";


    document.getElementById(
        "tiempoCorazones"
    ).textContent = "20";


    document.getElementById(
        "botonCorazones"
    ).textContent = "🎮 Jugando...";


    document.getElementById(
        "areaCorazones"
    ).innerHTML = "";


    crearCorazon();


    intervaloCorazones =
        setInterval(() => {

            crearCorazon();

        }, 650);


    temporizadorCorazones =
        setInterval(() => {

            tiempoCorazones--;

            document.getElementById(
                "tiempoCorazones"
            ).textContent =
                tiempoCorazones;


            if (tiempoCorazones <= 0) {

                terminarCorazones();

            }

        }, 1000);
}


function crearCorazon() {

    if (!jugandoCorazones) return;


    const area =
        document.getElementById(
            "areaCorazones"
        );


    const corazon =
        document.createElement("button");


    corazon.className =
        "corazon-juego";


    const corazones = [
        "💗",
        "💖",
        "💕",
        "💓",
        "💘"
    ];


    corazon.textContent =
        corazones[
            Math.floor(
                Math.random() *
                corazones.length
            )
        ];


    const maxX =
        area.clientWidth - 45;

    const maxY =
        area.clientHeight - 45;


    corazon.style.left =
        Math.max(
            5,
            Math.random() * maxX
        ) + "px";


    corazon.style.top =
        Math.max(
            5,
            Math.random() * maxY
        ) + "px";


    corazon.onclick = function() {

        if (!jugandoCorazones) return;

        puntosCorazones++;


        document.getElementById(
            "puntosCorazones"
        ).textContent =
            puntosCorazones;


        corazon.remove();

    };


    area.appendChild(corazon);


    setTimeout(() => {

        if (corazon.parentNode) {
            corazon.remove();
        }

    }, 1200);
}


function terminarCorazones() {

    jugandoCorazones = false;

    clearInterval(intervaloCorazones);

    clearInterval(temporizadorCorazones);


    document.getElementById(
        "areaCorazones"
    ).innerHTML = `
        <div class="mensaje-juego">
            ⏰ ¡Se acabó el tiempo!<br><br>
            💗 Hiciste ${puntosCorazones} puntos
        </div>
    `;


    document.getElementById(
        "botonCorazones"
    ).textContent = "🔄 JUGAR DE NUEVO";
}


function detenerCorazones() {

    clearInterval(intervaloCorazones);

    clearInterval(temporizadorCorazones);

    intervaloCorazones = null;

    temporizadorCorazones = null;

    jugandoCorazones = false;
}


/* =====================================================
   JUEGO 2: MEMORIA
===================================================== */

let cartasMemoria = [];

let primeraCarta = null;

let segundaCarta = null;

let bloqueadoMemoria = false;

let parejasEncontradas = 0;


function iniciarMemoria() {

    const tablero =
        document.getElementById(
            "tableroMemoria"
        );


    const mensaje =
        document.getElementById(
            "mensajeMemoria"
        );


    tablero.innerHTML = "";

    mensaje.textContent = "";

    primeraCarta = null;

    segundaCarta = null;

    bloqueadoMemoria = false;

    parejasEncontradas = 0;


    const simbolos = [
        "💗",
        "🌸",
        "🐱",
        "⭐",
        "🍓",
        "🎀",
        "🌷",
        "🩷"
    ];


    cartasMemoria =
        [...simbolos, ...simbolos];


    cartasMemoria.sort(
        () => Math.random() - 0.5
    );


    cartasMemoria.forEach(
        (simbolo, index) => {

            const carta =
                document.createElement("button");


            carta.className =
                "carta-memoria";


            carta.dataset.valor =
                simbolo;


            carta.dataset.index =
                index;


            carta.textContent =
                "❔";


            carta.onclick = function() {

                descubrirCarta(carta);

            };


            tablero.appendChild(carta);

        }
    );
}


function descubrirCarta(carta) {

    if (bloqueadoMemoria) return;

    if (
        carta.classList.contains("descubierta") ||
        carta.classList.contains("encontrada")
    ) {
        return;
    }


    carta.classList.add("descubierta");

    carta.textContent =
        carta.dataset.valor;


    if (!primeraCarta) {

        primeraCarta = carta;

        return;

    }


    segundaCarta = carta;

    bloqueadoMemoria = true;


    if (
        primeraCarta.dataset.valor ===
        segundaCarta.dataset.valor
    ) {

        primeraCarta.classList.add(
            "encontrada"
        );

        segundaCarta.classList.add(
            "encontrada"
        );


        parejasEncontradas++;

        primeraCarta = null;

        segundaCarta = null;

        bloqueadoMemoria = false;


        if (parejasEncontradas === 8) {

            document.getElementById(
                "mensajeMemoria"
            ).textContent =
                "🎉 ¡Encontraste todas las parejas! 💗";
        }


    } else {

        setTimeout(() => {

            primeraCarta.classList.remove(
                "descubierta"
            );

            segundaCarta.classList.remove(
                "descubierta"
            );


            primeraCarta.textContent =
                "❔";

            segundaCarta.textContent =
                "❔";


            primeraCarta = null;

            segundaCarta = null;

            bloqueadoMemoria = false;

        }, 750);

    }
}


/* =====================================================
   JUEGO 3: ¿DÓNDE ESTÁ PUSHEEN?
===================================================== */

let nivelPusheen = 1;

let puntosPusheen = 0;

let posicionPusheen = 0;

let jugandoPusheen = false;


function prepararPusheen() {

    nivelPusheen = 1;

    puntosPusheen = 0;

    posicionPusheen = 0;

    jugandoPusheen = false;


    document.getElementById(
        "nivelPusheen"
    ).textContent = "1";


    document.getElementById(
        "puntosPusheen"
    ).textContent = "0";


    document.getElementById(
        "mensajePusheen"
    ).textContent =
        "Pulsa INICIAR para comenzar 🐱";


    document.getElementById(
        "tableroPusheen"
    ).innerHTML = "";
}


function iniciarPusheen() {

    nivelPusheen = 1;

    puntosPusheen = 0;

    jugandoPusheen = true;


    document.getElementById(
        "nivelPusheen"
    ).textContent = nivelPusheen;


    document.getElementById(
        "puntosPusheen"
    ).textContent = puntosPusheen;


    crearTableroPusheen();
}


function crearTableroPusheen() {

    const tablero =
        document.getElementById(
            "tableroPusheen"
        );


    tablero.innerHTML = "";


    const lado =
        nivelPusheen + 1;

    const cantidad =
        lado * lado;


    tablero.style.gridTemplateColumns =
        `repeat(${lado}, 1fr)`;


    posicionPusheen =
        Math.floor(
            Math.random() * cantidad
        );


    for (let i = 0; i < cantidad; i++) {

        const casilla =
            document.createElement("button");


        casilla.className =
            "casilla-pusheen";


        casilla.textContent =
            "🎁";


        casilla.onclick = function() {

            elegirCasillaPusheen(
                i,
                casilla
            );

        };


        tablero.appendChild(casilla);

    }


    document.getElementById(
        "mensajePusheen"
    ).textContent =
        `Nivel ${nivelPusheen} — ¡Encuentra a Pusheen! 🐾`;
}


function elegirCasillaPusheen(
    posicion,
    casilla
) {

    if (!jugandoPusheen) return;


    if (posicion === posicionPusheen) {

        casilla.innerHTML =
            '<img src="pusheen.jpg" class="imagen-pusheen-juego">';

        casilla.classList.add(
            "encontrado"
        );


        puntosPusheen++;


        document.getElementById(
            "puntosPusheen"
        ).textContent =
            puntosPusheen;


        document.getElementById(
            "mensajePusheen"
        ).textContent =
            "¡Lo encontraste! 🥹💗";


        jugandoPusheen = false;


        setTimeout(() => {

            nivelPusheen++;


            if (nivelPusheen > 4) {

                document.getElementById(
                    "mensajePusheen"
                ).textContent =
                    "🏆 ¡GANASTE! ¡Encontraste a Pusheen en los 4 niveles!";


                document.getElementById(
                    "tableroPusheen"
                ).innerHTML = `
                    <div style="
                        grid-column: 1 / -1;
                        text-align: center;
                        padding: 20px;
                    ">

                        <img
                            src="pusheen.jpg"
                            class="imagen-pusheen-juego"
                            style="
                                width: 150px;
                                height: 150px;
                            "
                        >

                        <div style="
                            font-size: 45px;
                            margin-top: 10px;
                        ">
                            💗🏆
                        </div>

                    </div>
                `;

                return;
            }


            document.getElementById(
                "nivelPusheen"
            ).textContent =
                nivelPusheen;


            jugandoPusheen = true;


            crearTableroPusheen();

        }, 900);


    } else {

        casilla.textContent =
            "❌";

        casilla.classList.add(
            "fallo"
        );


        document.getElementById(
            "mensajePusheen"
        ).textContent =
            "No está aquí 😹 ¡Busca otra casilla!";

    }
}


function detenerPusheen() {

    jugandoPusheen = false;
}


/* =====================================================
   JUEGO 4: ATRAPA A PUSHEEN
===================================================== */

let puntosAtrapaPusheen = 0;

let tiempoAtrapaPusheen = 20;

let intervaloAtrapaPusheen = null;

let temporizadorAtrapaPusheen = null;

let jugandoAtrapaPusheen = false;


function prepararAtrapaPusheen() {

    detenerAtrapaPusheen();

    puntosAtrapaPusheen = 0;

    tiempoAtrapaPusheen = 20;

    document.getElementById(
        "puntosAtrapaPusheen"
    ).textContent = "0";

    document.getElementById(
        "tiempoAtrapaPusheen"
    ).textContent = "20";

    document.getElementById(
        "botonAtrapaPusheen"
    ).textContent = "🐾 INICIAR";

    document.getElementById(
        "areaAtrapaPusheen"
    ).innerHTML = `
        <div class="mensaje-juego">
            Pulsa INICIAR para comenzar 🐾
        </div>
    `;
}


function iniciarAtrapaPusheen() {

    if (jugandoAtrapaPusheen) return;

    detenerAtrapaPusheen();

    puntosAtrapaPusheen = 0;

    tiempoAtrapaPusheen = 20;

    jugandoAtrapaPusheen = true;


    document.getElementById(
        "puntosAtrapaPusheen"
    ).textContent = "0";

    document.getElementById(
        "tiempoAtrapaPusheen"
    ).textContent = "20";

    document.getElementById(
        "botonAtrapaPusheen"
    ).textContent = "🐾 Jugando...";


    document.getElementById(
        "areaAtrapaPusheen"
    ).innerHTML = "";


    crearPusheenAtrapar();


    intervaloAtrapaPusheen =
        setInterval(() => {

            crearPusheenAtrapar();

        }, 850);


    temporizadorAtrapaPusheen =
        setInterval(() => {

            tiempoAtrapaPusheen--;

            document.getElementById(
                "tiempoAtrapaPusheen"
            ).textContent =
                tiempoAtrapaPusheen;


            if (tiempoAtrapaPusheen <= 0) {

                terminarAtrapaPusheen();

            }

        }, 1000);
}


function crearPusheenAtrapar() {

    if (!jugandoAtrapaPusheen) return;


    const area =
        document.getElementById(
            "areaAtrapaPusheen"
        );


    const pusheen =
        document.createElement("img");


    pusheen.src =
        "pusheen.jpg";


    pusheen.className =
        "pusheen-atrapable";


    const maxX =
        area.clientWidth - 80;

    const maxY =
        area.clientHeight - 80;


    pusheen.style.left =
        Math.max(
            5,
            Math.random() * maxX
        ) + "px";


    pusheen.style.top =
        Math.max(
            5,
            Math.random() * maxY
        ) + "px";


    pusheen.onclick = function() {

        if (!jugandoAtrapaPusheen) return;


        puntosAtrapaPusheen++;


        document.getElementById(
            "puntosAtrapaPusheen"
        ).textContent =
            puntosAtrapaPusheen;


        pusheen.remove();

    };


    area.appendChild(pusheen);


    setTimeout(() => {

        if (pusheen.parentNode) {

            pusheen.remove();

        }

    }, 900);
}


function terminarAtrapaPusheen() {

    jugandoAtrapaPusheen = false;


    clearInterval(
        intervaloAtrapaPusheen
    );

    clearInterval(
        temporizadorAtrapaPusheen
    );


    document.getElementById(
        "areaAtrapaPusheen"
    ).innerHTML = `
        <div class="mensaje-juego">
            ⏰ ¡Se acabó el tiempo!<br><br>
            🐾 Atrapaste ${puntosAtrapaPusheen} Pusheen
        </div>
    `;


    document.getElementById(
        "botonAtrapaPusheen"
    ).textContent =
        "🔄 JUGAR DE NUEVO";
}


function detenerAtrapaPusheen() {

    clearInterval(
        intervaloAtrapaPusheen
    );

    clearInterval(
        temporizadorAtrapaPusheen
    );


    intervaloAtrapaPusheen = null;

    temporizadorAtrapaPusheen = null;

    jugandoAtrapaPusheen = false;
}


/* =========================
   SEGURIDAD
========================= */

function escapeHTML(texto) {

    const div =
        document.createElement("div");

    div.textContent = texto;

    return div.innerHTML;
}


/* =========================
   INICIO
========================= */

function actualizarInicio() {

    const notas =
        JSON.parse(
            localStorage.getItem("notas")
        ) || [];

    const recuerdos =
        JSON.parse(
            localStorage.getItem("recuerdos")
        ) || [];

    const fechas =
        JSON.parse(
            localStorage.getItem("fechas")
        ) || [];


    /* Contador de notas */

    document.getElementById(
        "contadorNotas"
    ).textContent =
        notas.length;


    /* Contador de recuerdos */

    document.getElementById(
        "contadorRecuerdos"
    ).textContent =
        recuerdos.length;


    /* Próxima fecha */

    const elementoFecha =
        document.getElementById(
            "proximaFecha"
        );


    if (fechas.length === 0) {

        elementoFecha.textContent =
            "No hay fechas guardadas todavía 🌷";

        return;
    }


    const hoy =
        new Date();

    hoy.setHours(0, 0, 0, 0);


    const fechasFuturas =
        fechas.filter(fecha => {

            const fechaObjeto =
                new Date(
                    fecha.fecha + "T00:00:00"
                );

            return fechaObjeto >= hoy;

        });


    if (fechasFuturas.length === 0) {

        elementoFecha.textContent =
            "No hay fechas próximas 🌸";

        return;
    }


    fechasFuturas.sort(
        (a, b) =>
            new Date(a.fecha) -
            new Date(b.fecha)
    );


    const proxima =
        fechasFuturas[0];


    elementoFecha.innerHTML = `
        <strong>
            ${escapeHTML(proxima.titulo)}
        </strong>
        · ${formatearFecha(proxima.fecha)}
    `;
}


/* =========================
   INICIAR APP
========================= */

mostrarFrase();

mostrarNotas();

mostrarFechas();

mostrarTareas();

mostrarRecuerdos();

actualizarInicio();