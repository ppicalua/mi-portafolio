(function () {

    emailjs.init("d3EkWpUWvMgcKHTqs"); 

    const form = document.getElementById("form-contacto");
    const loader = document.getElementById("loader");
    const exito = document.getElementById("mensaje-exito");
    const error = document.getElementById("mensaje-error");
    const campoSpam = document.getElementById("empresa");

    const tiempoInicio = Date.now();

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        if (campoSpam.value !== "") return;

        if (Date.now() - tiempoInicio < 4000) {
            alert("Por favor espera unos segundos antes de enviar.");
            return;
        }

        const nombre = form.nombre.value.trim();
        const telefono = form.telefono.value.trim();
        const correo = form.correo.value.trim();
        const mensaje = form.mensaje.value.trim();

        // VALIDACIONES

        if (nombre.length < 3) {
            alert("Nombre inválido");
            return;
        }

        if (!/^[a-zA-ZÁÉÍÓÚáéíóúñÑ\s]+$/.test(nombre)) {
            alert("El nombre solo debe contener letras");
            return;
        }

        if (telefono && !/^3\d{9}$/.test(telefono)) {
            alert("Teléfono inválido. Debe ser un celular colombiano.");
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
            alert("Correo inválido");
            return;
        }

        if (mensaje.length < 10) {
            alert("El mensaje es demasiado corto");
            return;
        }

        loader.style.display = "block";
        exito.style.display = "none";
        error.style.display = "none";

        const datos = { nombre, telefono, correo, mensaje };

        emailjs.send("service_8kfdkbm", "template_ad6a1s8", datos)
            .then(() => {

                // Autorespuesta
                emailjs.send("service_8kfdkbm", "template_aj8ejct", datos);

                loader.style.display = "none";
                exito.style.display = "block";

                form.reset();

                const texto = encodeURIComponent(
                    "Hola Pedro, acabo de enviarte un mensaje desde tu sitio web."
                );

                /*setTimeout(() => {
                    window.open("https://wa.me/573232868602?text=" + texto, "_blank");
                }, 2000);*/

            })
            .catch((err) => {
                console.error("Error EmailJS:", err);
                loader.style.display = "none";
                error.style.display = "block";
            });

    });

})();