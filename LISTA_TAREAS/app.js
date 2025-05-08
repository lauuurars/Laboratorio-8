
// Seleccionar los elemento x id del DOM: ingresar-tarea, boton-agregar y lista-tareas

const ingresarTarea = document.getElementById("ingresar-tarea")
const botonAgregar = document.getElementById("boton-agregar")
const listaTareas = document.getElementById("lista-tareas")


// Obtener tareas del localStorage
function obtenerTareasLocalStorage() {
    const tareas = localStorage.getItem("tareas");
    if (tareas) {
        return JSON.parse(tareas);
    } else {
        return [];
    }
}

// Guardar tareas en localStorage
function guardarTareasLocalStorage(tareas) {
    localStorage.setItem("tareas", JSON.stringify(tareas)); //serializamos el array de tareas
}


// Renderizar la lista de tareas en el DOM
function mostrarTareas() {
    const tareas = obtenerTareasLocalStorage();
    listaTareas.innerHTML = "";

    tareas.forEach((tarea, index) => {
        //Se crea el contenedor de la tarea
        const divTarea = document.createElement("div");
        divTarea.classList.add("tarea");

        //Se crea el párrafo de texto
        const p = document.createElement("p");
        p.classList.add("texto-tarea");
        if (tarea.completada) {
            p.classList.add("completada");
        }
        p.textContent = tarea.texto;

        //Se crean los botones
        const divBotones = document.createElement("div");
        divBotones.classList.add("botones-tarea");

        const btnOk = document.createElement("button");
        btnOk.classList.add("btn_ok");
        btnOk.innerText = "✔️";
        btnOk.onclick = () => completarTarea(index);

        const btnEliminar = document.createElement("button");
        btnEliminar.classList.add("btn_eliminar");
        btnEliminar.innerText = "❌";
        btnEliminar.onclick = () => eliminarTarea(index);

        //Agregamos los botones dentro del contenedor divBotones
        divBotones.appendChild(btnOk); 
        divBotones.appendChild(btnEliminar);

        //Agregamos los elementos dentro del contenedor divTarea
        divTarea.appendChild(p);
        divTarea.appendChild(divBotones);

        //Agregamos el contenedor divTarea dentro de la listaTareas
        listaTareas.appendChild(divTarea);
    });
}

// Marcar la Tarea como completada
function completarTarea(index) {
    const tareas = obtenerTareasLocalStorage();
    tareas[index].completada = !tareas[index].completada; //Cambiamos el estado de la tarea
    guardarTareasLocalStorage(tareas); //Se guarda el nuevo estado en el LocalStorage
    mostrarTareas();
}

// Eliminar la Tarea correspondiente
function eliminarTarea(index) {
    const tareas = obtenerTareasLocalStorage();
    tareas.splice(index, 1); //Se elimina la tarea del array
    guardarTareasLocalStorage(tareas);
    mostrarTareas();
}

// Crear una nueva Tarea
function nuevaTarea() {
    const textoTarea = ingresarTarea.value.trim(); //Obtenemos el valor del input
    if (textoTarea === "") {
        alert("Por favor ingresa una tarea.");
        return;
    }

    const tareas = obtenerTareasLocalStorage();
    tareas.push({ texto: textoTarea, completada: false }); //Agregamos la nueva tarea al array
    guardarTareasLocalStorage(tareas); //Guardamos el nuevo array en el LocalStorage
    mostrarTareas(); //Mostramos las tareas actualizadas
    ingresarTarea.value = ""; //Limpiamos el input
}

// Escuchar el boton Agregar y en el evento click llamar a nuevaTarea
botonAgregar.addEventListener('click', nuevaTarea)

// Escuchar el inputTarea y en el evento keypress con la tecla Enter
// llamar a nuevaTarea
ingresarTarea.addEventListener('keypress', (e) => {
    if (e.key === 'Enter'){
        nuevaTarea(); 
    }
})

// Cargar tareas al iniciar con mostrarTareas
mostrarTareas()

