export class TodoList {
  constructor(){
    this.tasks = [];
  }
  addTask(description){
    const task = {
      id: this.tasks.length + 1,
      description,
      completed: false
    };
    this.tasks.push(task);
  }

  markComplete(id){
    const task = this.tasks.find(task => task.id === id);
    if (task){
      task.completed = true;
    }else{
      console.log('task not found')
    }
  }

  listTasks(){
    if(this.tasks.length === 0 ){
      console.log('no tasks in the list.');
      return;
    }

    this.tasks.forEach(task =>{
      console.log(task.id + '-', task.description, task.completed);
    })
  }

}













