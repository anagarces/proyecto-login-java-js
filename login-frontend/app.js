//Esperar que cargue todo el HTML antes de ejecutar el script

document.addEventListener('DOMContentLoaded', () => {

    const loginForm = document.getElementById('login-form');
    const usernameInput = document.getElementById('usuario');
    const passInput = document.getElementById('pass');
    const messageDiv = document.getElementById('message');

    //agregamos un oyente para el evento de envio de formulario
    loginForm.addEventListener('submit', () => {

        //evita el comportamiento por defecto del formulario que recarga la pagina
        event.preventDefault();

        //capturamos los datos del formulario a traves de cada nodo
        const username = usernameInput.value;
        const password = passInput.value;

        console.log("Enviando datos...", {username, password});
        fetch('http://localhost:8080/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username: username,
                                  password: password
            })
        }).then(response => {
            return response.json().then(data => {
                        return { ok: response.ok, data: data };
            });
        }).then(result => {
            messageDiv.textContent = result.data.message;

            if(result.ok){

                console.log('Login exitoso', result.data);
                messageDiv.style.color = 'green';
            } else{
                console.log('Login fallido', result.data);
                messageDiv.style.color = 'red';
            }
        }).catch(error => {
            console.error('Error de red:', error);
            messageDiv.textContent = 'No se pudo conectar al servidor. Vuelve a intentarlo.'
            messageDiv.style.color = 'red';
        })
    });
})