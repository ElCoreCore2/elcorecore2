document.getElementById("login-button").addEventListener("click", () => {
    const phone = document.getElementById("phone").value;  // Obtener el número ingresado
    const accessCode = document.getElementById("access-code").value;  // Obtener el código de acceso ingresado

    // Eliminar cualquier espacio y asegurarnos de que el número esté en el formato correcto
    const normalizedPhone = phone.replace(/\s+/g, '');  // Elimina los espacios
    const finalPhone = normalizedPhone.startsWith('+') ? normalizedPhone : `+${normalizedPhone}`;

    console.log(`Número ingresado: ${finalPhone}`);  // Puedes revisar qué número estás enviando

    // Validar si el número de teléfono ingresado está en el formato correcto
    const phonePattern = /^\+?\d{9,15}$/;  // Este patrón valida números con o sin el '+' y con entre 9 y 15 dígitos
    if (!phonePattern.test(finalPhone)) {
        document.getElementById("error-message").textContent = "Número de teléfono inválido.";
        return;  // Detener si el número no es válido
    }

    // Enviar la solicitud de validación al servidor
    fetch('http://localhost:3000/validate-access-code', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            phone: finalPhone,  // Enviar el número sin espacios ni caracteres no deseados
            accessCode: accessCode
        })
    })
    .then(response => response.json())  // Procesar la respuesta del servidor
    .then(data => {
        if (data.valid) {
            sendSMSVerification(finalPhone);  // Si es válido, enviamos el código de verificación por SMS
        } else {
            document.getElementById("error-message").textContent = "Código de acceso incorrecto.";
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById("error-message").textContent = "Error al intentar iniciar sesión.";
    });
});
