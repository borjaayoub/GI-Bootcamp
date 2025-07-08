let tasks = [];
let nextTaskId = 0;
const submit = document.getElementsByTagName('button')[0];
const input = document.getElementsByTagName('input')[0];
const listTasks = document.getElementsByClassName('listTasks')[0];

function deleteTask(taskDiv) {
    listTasks.removeChild(taskDiv);
    if (listTasks.children.length === 0) {
        listTasks.style.visibility = 'hidden';
    }
}

function addTask() {
    if (input.value !== '') {
        const taskObj = {
            task_id: nextTaskId++,
            text: input.value,
            done: false
        };
        tasks.push(taskObj);

        const taskDiv = document.createElement('div');
        taskDiv.className = 'task-item';
        taskDiv.setAttribute('data-task-id', taskObj.task_id);

        const delBtn = document.createElement('button');
        delBtn.innerHTML = '<i class="fa-solid fa-square-xmark" style="color: #ff0000;"></i>';
        delBtn.className = 'delete-btn';
        delBtn.addEventListener('click', () => {
            deleteTask(taskDiv);
        });

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.addEventListener('change', function() {
            doneTask(taskObj.task_id, label, this.checked);
        });

        const label = document.createElement('label');
        label.textContent = input.value;

        taskDiv.appendChild(delBtn);
        taskDiv.appendChild(checkbox);
        taskDiv.appendChild(label);

        listTasks.appendChild(taskDiv);
        listTasks.style.visibility = 'visible';
        

        input.value = "";
        input.focus();
    }
}

function doneTask(taskId, labelElem, isChecked) {
    const task = tasks.find(t => t.task_id === taskId);
    if (task) {
        task.done = isChecked;
        if (isChecked) {
            labelElem.style.color = 'red';
            labelElem.style.textDecoration = 'line-through';
        } else {
            labelElem.style.color = '';
            labelElem.style.textDecoration = '';
        }
    }
}

submit.addEventListener('click', e => {
    e.preventDefault();
    addTask();
});

addTask()