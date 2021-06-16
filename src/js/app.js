document.addEventListener("DOMContentLoaded", function () {
    iniciarApp();
});

function iniciarApp() {
    mostrarServicios();
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
