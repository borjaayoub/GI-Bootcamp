import { TodoList } from "./todo.js";

let myList = new TodoList()

myList.addTask('Buy groceries')
myList.addTask("Finish homework");
myList.addTask("Call a friend");
myList.addTask("Do laundry");

myList.markComplete(2);
myList.markComplete(3);

myList.listTasks();
