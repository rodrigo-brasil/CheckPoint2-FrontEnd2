const div_search = document.getElementById('search');
const input_addTask = document.getElementById('addTaskInput');
const addForm = document.getElementById('addForm');
const section_Addtask = document.getElementById('sectionAddTodo');
const date = new Date();
const todos = [];
let idGlobal = 0;



function addTodotoArray(obj) {
    obj.id = idGlobal;
    todos.push(obj);
    createTask(obj, idGlobal++);
}


/* FUNÇÃO CRIAR CARD */
function createTask(obj, id) {
    const div_task = document.createElement('div');
    div_task.classList.add('task');
    if (obj.completed == true) {
        div_task.classList.add('tachado');
    }
    div_task.innerHTML = `
        <input class="check" type="checkbox" name="" id="">
        <p class="title-task">${obj.title}</p>
        <div class="options">
            <span class="id-task">id: ${id}</span>
           
            <button class="delete-button" data-idTask="${id}">
                <i class="fas fa-trash-alt"></i>
            </button>
            <div class="modal-delete-todo">
               <div class="container-sim-nao">
                    <p>Deseja realmente excluir?</p>
                        <div>
                            <button class="sim-delete" type="button" >SIM</button>
                            <button class="nao-delete" type="button" >NÃO</button>
                        </div> 
                    </div>
                </div>
            </div>`

    document.getElementById('todoContainer').appendChild(div_task);
    removeTask();
}

/* Função Remover ToDo */

function removeTask() {
    let simDelete = document.querySelectorAll('.sim-delete');
    let task = document.querySelectorAll('.task');
    let naoDelete = document.querySelectorAll('.nao-delete');
    let deleteModal = document.querySelectorAll('.modal-delete-todo');
    let deleteButton = document.querySelectorAll('.delete-button');
    for(let i=0; i < task.length; i++ ){
        simDelete[i].addEventListener('click', () => {
            task[i].remove();
        })
        naoDelete[i].addEventListener('click', () => {
            deleteModal[i].style.display = "none";        
        })
        deleteButton[i].addEventListener('click', () => {
            deleteModal[i].style.display = "flex";           
        })
    }
}

removeTask();


/* FUNÇÃO DELETAR CARD */

/* function deletarTodo(id){
    let elemento = todos.find(todo =>todo.id === id)
    let index = todos.indexOf(elemento);
     todos.splice(index, 1)
    
} */


/* Função validar inputs */
function validarInputs(input) {
    if (input.value.trim() == '') {
        alert('Campo vazio');
        return false;
    }
    return true;

}





// Event listeners
div_search.addEventListener('click', function (e) {
    document.getElementById('searchInput').classList.add('active');
});

input_addTask.addEventListener('focus', function (e) {
    document.getElementById('extras').classList.add('active');
    document.getElementById('data').value = date.toLocaleDateString();
});

input_addTask.addEventListener('keydown', function (e) {
    while (input_addTask.scrollHeight > input_addTask.offsetHeight) {
        input_addTask.rows += 1;
    }
});

addForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const inputsValido = Array.from(addForm.querySelectorAll('input, textarea')).every(input => validarInputs(input));
    if (inputsValido) {
        const form = e.target;
        const formData = new FormData(form);
        const obj = {};
        formData.forEach((value, key) => obj[key] = value);
        addTodotoArray(obj);
        document.getElementById('extras').classList.remove('active');
        form.reset();
    }
});

// Global events listener
document.addEventListener('click', function (e) {
    if (!e.target.closest('#sectionAddTodo')) {
        document.getElementById('extras').classList.remove('active');
        input_addTask.rows = 1;
    }

    if(!e.target.closest('#search')){
        document.getElementById('searchInput').classList.remove('active');
    }

    

  
       /*  if(e.target.closest('.task .delete-button')){
            const button =  e.target.closest('.task .delete-button')
            const task = button.parentElement.parentElement;
            task.remove();
            const id = task.dataset["idTask"]
            deletarTodo(id)
            console.log(todos);  
        } */
 
    


});

/* FUNÇÃO DARK MODE */
function mudarCor(cb) {

elemento = document.getElementById("fundo");
    
elemento.style.backgroundColor = cb.checked ? "#e8eaed" : "#202124";
elemento.style.color = cb.checked ? "#202124" : "#e8eaed";
    
};