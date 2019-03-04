let myTodo = (function() {
function ToDo(todoText, completed) {
    this.todoText = todoText,
    this.completed = completed;
};
let todoList = {
    todos: [],
    addTodo: function (todoText, completed) {
        this.todos.push(new ToDo(todoText, completed));
    },
    toggleAll: function() {
        if(this.todos.every(function(index) {
        return index.completed === true;
        })) {
            this.todos.forEach(function(index) {
            return index.completed = false;
        })
        } else {
            this.todos.forEach(function(index) {
            return index.completed = true;
        })
        }
    },
    changeTodo: function (index, todo) {
        this.todos[index].todoText = todo;
    },
    deleteTodo: function(index) {
        this.todos.splice(index, 1);
    },
    toggleCompleted: function(index) {
        this.todos[index].completed = !this.todos[index].completed;
    }   
};
let handlers = {
    toggleAll: function() {
        todoList.toggleAll();
        view.displayTodos();

    },
    addTodo: function() {
        let input = document.getElementById("input");
        if(input.value === "") {
            alert("Type something!");
        } else {
            todoList.addTodo(input.value, false);
            input.value = ""; 
        }

        view.displayTodos();
    },
    changeTodo: function() {
        let index = document.getElementById("changeInputPosition");
        let text = document.getElementById("changeInputText");
        todoList.changeTodo(index.valueAsNumber - 1, text.value);
        index.value = "";
        text.value = "";
        view.displayTodos();
    },
    deleteTodo: function(index) {
        todoList.deleteTodo(index);
        view.displayTodos();
    },
    toggleCompleted: function() {
        let input = document.getElementById("toggleInputPosition");
        if(input.value === "") {
            alert("Type something!");
        } else {
            todoList.toggleCompleted(input.valueAsNumber - 1);
            input.value = "";
            view.displayTodos();
        }
    }

}

let view = {
    displayTodos: function () {
        let todoOl = document.querySelector("ol");
        todoOl.innerHTML = "";
        todoList.todos.forEach(function(e, index, array) {
            let todoLi = document.createElement("li");
            todoOl.appendChild(todoLi);
            if(e.completed === true) {
                todoLi.textContent = "(X)" + " " + e.todoText;
            } else {
                todoLi.textContent = "( )" + " " + e.todoText;
            }
            todoLi.id = index; 
            todoLi.appendChild(this.createDeleteButton());
        }, this);
        
    },
    createDeleteButton: function() {
        let deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "deleteButton";
        return deleteButton;
    },
    setUpEventListeners: function() {
        let todosOl = document.querySelector("ol");
        todosOl.addEventListener("click", function(event) {
            let elementClicked = event.target;
            if(elementClicked.className === "deleteButton") {
                console.log(typeof(parseInt(event.target.parentElement.id)));
                handlers.deleteTodo(parseInt(event.target.parentElement.id));
            }   
        });
    }
};
    view.setUpEventListeners();
return {
    addTodo: function() {
        handlers.addTodo();
    },
    changeTodo: function() {
        handlers.changeTodo();
    },
    deleteTodo: function() {
        handlers.deleteTodo();
    },
    toggleCompleted: function() {
        handlers.toggleCompleted();
    },
    toggleAll: function() {
        handlers.toggleAll();
    }
}        
})();
