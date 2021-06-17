let pagina = 1;

const cita = {
    nombre: "",
    fecha: "",
    hora: "",
    servicios: [],
};

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

    mostrarResumenCita();

    nombreCita();

    fechaCita();

    deshabilitarFecha();

    horaCita();
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

    const objectoServicio = {
        id: parseInt(elemento.dataset.idServicio),
        nombre: elemento.children[0].textContent,
        precio: elemento.children[1].textContent,
    };

    if (elemento.classList.contains("seleccionado")) {
        elemento.classList.remove("seleccionado");

        eliminarServicio(objectoServicio);
    } else {
        elemento.classList.add("seleccionado");

        agregarServicio(objectoServicio);
    }
}

function eliminarServicio(objectoServicio) {
    const { id } = objectoServicio;
    cita.servicios = cita.servicios.filter((servicio) => servicio.id !== id);
}

function agregarServicio(objectoServicio) {
    const { servicios } = cita;
    cita.servicios = [...servicios, objectoServicio];
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

        mostrarResumenCita();
    }

    mostrarSeccion();
}

function mostrarResumenCita() {
    const divResumen = document.querySelector(".contenido-resumen");
    // Borro el contenido HTML previo del DIV de resumen:
    while (divResumen.firstElementChild) {
        divResumen.firstElementChild.remove();
    }

    if (Object.values(cita).includes("")) {
        const noServicios = document.createElement("P");
        noServicios.textContent =
            "Faltan datos de servicios, hora, fecha o nombre.";
        noServicios.classList.add("invalidar-cita");

        divResumen.appendChild(noServicios);

        return;
    }

    // Muestro información dada por cliente en elementos de texto.
    const headingCita = document.createElement("H3");
    headingCita.textContent = "Resumen de Cita";

    const nombreCita = document.createElement("P");
    nombreCita.innerHTML = `<span>Nombre:</span> ${cita.nombre}`;

    const fechaCita = document.createElement("P");
    fechaCita.innerHTML = `<span>Fecha:</span> ${cita.fecha}`;

    const horaCita = document.createElement("P");
    horaCita.innerHTML = `<span>Hora:</span> ${cita.hora}`;

    divResumen.appendChild(headingCita);
    divResumen.appendChild(nombreCita);
    divResumen.appendChild(fechaCita);
    divResumen.appendChild(horaCita);

    // Sección para mostrar los servicios.
    const divServicios = document.createElement("DIV");
    divServicios.classList.add("resumen-servicios");

    const headingServicio = document.createElement("H3");
    headingServicio.textContent = "Resumen de Servicios";
    divServicios.appendChild(headingServicio);

    let cantidad = 0;
    // Recorro la lista de servicios seleccionadas por el usuario y las coloco en un div.
    cita.servicios.forEach((servicio) => {
        const { nombre, precio } = servicio;

        const contenedorServicio = document.createElement("DIV");
        contenedorServicio.classList.add("contenedor-servicio");

        const nombreServicio = document.createElement("P");
        nombreServicio.textContent = nombre;

        const precioServicio = document.createElement("P");
        precioServicio.textContent = precio;
        precioServicio.classList.add("precio");

        // Sumo el precio de cada servicio.
        const totalServicio = precio.split("$");
        console.log(totalServicio);
        cantidad += parseInt(totalServicio[1].trim());

        contenedorServicio.appendChild(nombreServicio);
        contenedorServicio.appendChild(precioServicio);

        divServicios.appendChild(contenedorServicio);
    });

    divResumen.appendChild(divServicios);

    // Agrego cantidad total
    const cantidadTotal = document.createElement("P");
    cantidadTotal.classList.add("total");
    cantidadTotal.innerHTML = `<span>Total a pagar: </span> $ ${cantidad}`;

    divResumen.appendChild(cantidadTotal);
}

function nombreCita() {
    const nombreInput = document.querySelector("#nombre");

    nombreInput.addEventListener("input", function (e) {
        const nombre = e.target.value.trim();

        if (nombre === "" || nombre.length < 3) {
            mostrarAlerta("El nombre no es válido", "error");
        } else {
            const alertaPrevia = document.querySelector(".alerta");
            if (alertaPrevia) {
                alertaPrevia.remove();
            }

            cita.nombre = nombre;
        }
    });
}

function mostrarAlerta(mensaje, tipo) {
    // Verifico si existe una alerta previa.
    const alertaPrevia = document.querySelector(".alerta");
    if (alertaPrevia) {
        return;
    }

    const alerta = document.createElement("DIV");
    alerta.textContent = mensaje;
    alerta.classList.add("alerta");

    if (tipo === "error") {
        alerta.classList.add("error");
    }

    const formulario = document.querySelector(".formulario");
    formulario.appendChild(alerta);

    setTimeout(function () {
        alerta.remove();
    }, 3000);
}

function fechaCita() {
    const fechaInput = document.querySelector("#fecha");

    fechaInput.addEventListener("input", function (event) {
        const fechaSeleccionada = new Date(event.target.value);

        const diaSeleccionado = fechaSeleccionada.getDay();

        if ([5, 6].includes(diaSeleccionado)) {
            mostrarAlerta("No es un día válido", "error");
        } else {
            cita.fecha = event.target.value;
        }
    });
}

function deshabilitarFecha() {
    const fechaInput = document.querySelector("#fecha");

    const fechaActual = new Date();

    const anio = fechaActual.getFullYear();
    let mes = fechaActual.getMonth() + 1;
    let dia = fechaActual.getDate();

    if (mes < 10) {
        mes = `0${mes}`;
    }

    if (dia < 10) {
        dia = `0${dia}`;
    }

    const fechaDeshabilitar = `${anio}-${mes}-${dia}`;

    fechaInput.min = fechaDeshabilitar;
}

function horaCita() {
    const horaInput = document.querySelector("#hora");
    horaInput.addEventListener("input", function (event) {
        const horaCita = event.target.value;
        const hora = horaCita.split(":");

        if (hora[0] < 10 || hora[0] > 18) {
            mostrarAlerta("Hora no válida", "error");

            setTimeout(function () {
                horaInput.value = "";
            }, 2000);
        } else {
            cita.hora = horaCita;
        }
    });
}
