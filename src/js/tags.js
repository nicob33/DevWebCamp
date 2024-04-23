(function(){
    const tagsInput = document.querySelector('#tags_input');
    if(tagsInput) {
        const tagsDiv = document.querySelector('#tags');
        const tagsInputHidden = document.querySelector('[name="tags"]');
        let tags = [];

        //Recuperar del input oculto
        if(tagsInputHidden.value !== '') {
            tags = tagsInputHidden.value.split(',');
            mostrarTags();            
        }

        // Escuchar los cambios en el input
        tagsInput.addEventListener('keypress', guardarTag)
        
        function guardarTag(e) {
            if(e.keyCode === 44) { //el 44 es el key de la ","
                if(e.target.value.trim() === '' || e.target.value < 1){
                    return; //Por si pone espacios y lugo una "," no guarde un campo vacio
                }
                e.preventDefault(); //Para que la "," que presione no se escriba en el input
                tags = [...tags, e.target.value.trim()]; //Guarda lo que escribi antes de la ","
                tagsInput.value = ''; //Deja el campo vacio para agregar el siguiente
                
                mostrarTags();
            }
        }

        function mostrarTags(){
            tagsDiv.textContent = '';
            tags.forEach(tag => {
                const etiqueta = document.createElement('LI');
                etiqueta.classList.add('formulario__tag')
                etiqueta.textContent = tag;
                etiqueta.ondblclick = eliminarTag
                tagsDiv.appendChild(etiqueta);
            })
            actualizarInputHidden();
        }

        function eliminarTag(e) {
            e.target.remove()
            tags = tags.filter(tag => tag !== e.target.textContent) //Borramos el elemento que le dimos doble click, del array de tags
            actualizarInputHidden();
        }

        function actualizarInputHidden(){
            tagsInputHidden.value = tags.toString();
        }
    }
})()
