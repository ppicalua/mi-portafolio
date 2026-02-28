document.addEventListener("DOMContentLoaded", () => {

    const includes = document.querySelectorAll("[data-include]");

    const loadIncludes = async () => {

        for (const el of includes) {

            const file = el.getAttribute("data-include");

            // 🔒 Solo permitir archivos dentro de /components/
            if (!file.startsWith("components/") || !file.endsWith(".html")) {
                console.warn("Ruta no permitida:", file);
                continue;
            }

            try {
                const response = await fetch(file);
                const html = await response.text();
                el.innerHTML = html;

            } catch (error) {
                el.innerHTML = "Error cargando componente";
                console.error("Include error:", error);
            }
        }

        // 🔥 IMPORTANTE: inicializar scripts dependientes
        initMenuHamburguesa();
    };

    loadIncludes();
});

/* ================================
   MENÚ HAMBURGUESA
================================ */

function initMenuHamburguesa() {

    const toggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('#menu');
    const overlay = document.querySelector('#menu-overlay');

    if (!toggle || !menu || !overlay) return;

    const abrirMenu = () => {
        menu.classList.add('activo');
        overlay.classList.add('activo');
        document.body.style.overflow = 'hidden'; // evita scroll
    };

    const cerrarMenu = () => {
        menu.classList.remove('activo');
        overlay.classList.remove('activo');
        document.body.style.overflow = '';
    };

    toggle.addEventListener('click', abrirMenu);

    overlay.addEventListener('click', cerrarMenu);

    const links = menu.querySelectorAll('a');
    links.forEach(link => link.addEventListener('click', cerrarMenu));

    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) cerrarMenu();
    });
}