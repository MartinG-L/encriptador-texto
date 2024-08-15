addEventListener('DOMContentLoaded', function(){
    const bthEncriptar = document.querySelector('#encriptar');
    const btnDesencriptar = document.querySelector('#desencriptar');
    let keys = {
        e: 'enter',
        i: 'imes', 
        a: 'ai',
        o: 'ober',
        u: 'ufat'
    }

    bthEncriptar.addEventListener('click', encriptar);
    btnDesencriptar.addEventListener('click', desencriptar);

    function encriptar(){
        const texto = document.querySelector('#texto').value;

        let encriptarTexto = "";
        for(i = 0; i < texto.length; i++){
            const letraActual = texto[i];

            if(keys[letraActual]){
                encriptarTexto += keys[letraActual];
            } else {
                encriptarTexto += letraActual;
            }
        }

        mostrarResultado(encriptarTexto);        
    }

    function desencriptar(){
        const texto = document.querySelector('#texto').value;

        let desencriptarTexto = texto;
        // recorremos el objecto
        for (let key in keys) {
            // obtenemos los valores
            const value = keys[key];
            // creamos una expresion regular de cada valor del objecto keys
            const regex = new RegExp(value, 'g'); 
            // reemplazamos la expresion regular por la llave del objeto
            desencriptarTexto = desencriptarTexto.replace(regex, key);
        }

        mostrarResultado(desencriptarTexto);
    }

    function mostrarResultado(encriptacion){
        const texto = document.querySelector('#texto').value;
        const addAlert = document.querySelector('.area_notificaciones');
        limpiarHTML();

        if(texto === ''){
            if(!document.querySelector('.alerta')) {
                const titleAlert = document.createElement('H1');
                titleAlert.textContent = 'Ningún mensaje fue encontrado';
                titleAlert.classList.add('alerta');

                const textAlert = document.createElement('P');
                textAlert.textContent = 'Ingresa el texto que desees desencriptar o encriptar.'
                textAlert.classList.add('alerta'); 

                addAlert.appendChild(titleAlert);
                addAlert.appendChild(textAlert);
            }
        } else {
            if(validarTexto(encriptacion)){
                const resultado = document.createElement('H1');
                resultado.textContent = encriptacion;
                resultado.classList.add('resultado');
                addAlert.appendChild(resultado);

                const btnCopiar = document.createElement('BUTTON');
                btnCopiar.textContent = 'Copiar';
                btnCopiar.classList.add('boton_copiar')
                btnCopiar.onclick = function(){
                    copiarAPortaPapeles(encriptacion)
                };

                addAlert.appendChild(btnCopiar);
            } else {
                const titleAlert = document.createElement('H1');
                titleAlert.textContent = 'Agrega un mensaje valido';
                titleAlert.classList.add('alerta');

                const textAlert = document.createElement('P');
                textAlert.textContent = 'Solo letras minúsculas y sin acentos.'
                textAlert.classList.add('alerta'); 

                addAlert.appendChild(titleAlert);
                addAlert.appendChild(textAlert);
            }
        }
    }

    function limpiarHTML(){
        const notisection = document.querySelector('.area_notificaciones');
        while(notisection.firstChild){
            notisection.removeChild(notisection.firstChild);
        }
    }

    function validarTexto(text) {
        const regex = /^[a-z\s]*$/;

        return regex.test(text);
    }

    function copiarAPortaPapeles(texto){
        navigator.clipboard.writeText(texto)
        .then(() => {
            console.log('Texto copiado al portapapeles');
            alert('Texto copiado con éxito');
        })
        .catch(err => {
            console.error('Error al copiar el texto: ', err);
        });
    }

    
});