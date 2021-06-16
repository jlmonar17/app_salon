let pagina = 1;

document.addEventListener("DOMContentLoaded", function () {
    iniciarApp();
});

function iniciarApp() {
    mostrarServicios();

    mostrarSeccion();

    cambiarSeccion();

    paginaAnterior();

    paginaSiguiente();

    mostrarOcultarBotonesPaginador();
}

function cambiarSeccion() {
    const enlaces = document.querySelectorAll(".tabs button");

    enlaces.forEach(function (enlace) {
        enlace.addEventListener("click", function (e) {
            e.preventDefault();
            pagina = parseInt(e.target.dataset.paso);

            mostrarSeccion();

            mostrarOcultarBotonesPaginador();
        });
    });
}

function mostrarSeccion() {
    // No mostrar seccion anterior
    const seccionAnterior = document.querySelector(".mostrar-seccion");
    if (seccionAnterior) {
        seccionAnterior.classList.remove("mostrar-seccion");
    }

    // No marcar tab anterior
    const tabAnterior = document.querySelector(".activo");
    if (tabAnterior) {
        tabAnterior.classList.remove("activo");
    }

    // Mostrar sección actual seleccionada
    const seccion = document.querySelector(`#pagina-${pagina}`);
    seccion.classList.add("mostrar-seccion");

    // Marcar tab actual seleccionado
    const tab = document.querySelector(`[data-paso="${pagina}"]`);
    tab.classList.add("activo");
}

async function mostrarServicios() {
    try {
        const consulta = await fetch("./servicios.json");
        const data = await consulta.json();

        const { servicios } = data;

        const serviciosDiv = document.querySelector("#servicios");

        servicios.forEach((servicio) => {
            const { id, nombre, precio } = servicio;

            // DOM Scripting
            // Creo elemento DIV padre
            const servicioDiv = document.createElement("DIV");
            servicioDiv.classList.add("servicio");
            servicioDiv.dataset.idServicio = id;
            servicioDiv.onclick = seleccionarServicio;

            // Creo elemento para nombre de servicio
            const nombreServicio = document.createElement("P");
            nombreServicio.textContent = nombre;
            nombreServicio.classList.add("nombre-servicio");

            // Creo elemento para padre de servicio
            const precioServicio = document.createElement("P");
            precioServicio.textContent = `$ ${precio}`;
            precioServicio.classList.add("precio-servicio");

            // Agrego datos del servicio al div padre
            servicioDiv.appendChild(nombreServicio);
            servicioDiv.appendChild(precioServicio);

            // Agrego div al HTML
            serviciosDiv.appendChild(servicioDiv);
        });
    } catch (error) {
        console.log(error);
    }
}

function seleccionarServicio(event) {
    let elemento;

    // Validación para verificar si se hizo click sobre el div o uno de los elementos hijo.
    if (event.target.tagName !== "DIV") {
        elemento = event.target.parentElement;
    } else {
        elemento = event.target;
    }

    if (elemento.classList.contains("seleccionado")) {
        elemento.classList.remove("seleccionado");
    } else {
        elemento.classList.add("seleccionado");
    }
}

function paginaAnterior() {
    const botonAnterior = document.querySelector("#anterior");
    botonAnterior.addEventListener("click", function () {
        pagina--;

        mostrarOcultarBotonesPaginador();
    });
}

function paginaSiguiente() {
    const botonSiguiente = document.querySelector("#siguiente");
    botonSiguiente.addEventListener("click", function () {
        pagina++;

        mostrarOcultarBotonesPaginador();
    });
}

function mostrarOcultarBotonesPaginador() {
    const botonAnterior = document.querySelector("#anterior");
    const botonSiguiente = document.querySelector("#siguiente");

    if (pagina === 1) {
        botonSiguiente.classList.remove("ocultar");
        botonAnterior.classList.add("ocultar");
    } else if (pagina === 2) {
        botonAnterior.classList.remove("ocultar");
        botonSiguiente.classList.remove("ocultar");
    } else {
        botonSiguiente.classList.add("ocultar");
        botonAnterior.classList.remove("ocultar");
    }

    mostrarSeccion();
}
