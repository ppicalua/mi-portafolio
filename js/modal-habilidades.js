document.addEventListener("DOMContentLoaded", () => {

    const triggers = document.querySelectorAll('[data-modal]');
    const overlay = document.getElementById('overlay');
    const modales = document.querySelectorAll('.modal');
    const cerrarBtns = document.querySelectorAll('.cerrar');

    triggers.forEach(el => {
        el.addEventListener('click', () => {
            const id = el.dataset.modal;
            const modal = document.getElementById(id);

            overlay.classList.add('active');
            modal.classList.add('active');
        });
    });

    cerrarBtns.forEach(btn => {
        btn.addEventListener('click', cerrarModal);
    });

    overlay.addEventListener('click', cerrarModal);

    function cerrarModal() {
        overlay.classList.remove('active');
        modales.forEach(m => m.classList.remove('active'));
    }

});