#! /usr/bin/env node 

import inquirer from 'inquirer'

// Todos Array
let todos: string[] = []
let condition = true

// loop
while (condition) {
    let todoAns = await inquirer.prompt([
        {
            name: "todo",
            message: "What do you want add in your ToDos?",
            type: "input"
        },
        {
            name: "moreTodos",
            message: "What do you want?",
            type: "rawlist",
            choices: ["Add more Tasks", "Update existing Tasks", "Delete Tasks", "Exit and see the list"]
        }
    ])
    
    // Add user input to array
    todos.push(todoAns.todo)
    // Convert array element to single sring with new line
    let stringTodos = todos.map((elem, index) => `${index + 1}. ${elem}`);
    console.log(stringTodos.join('\n'));
    

    // Second option conditions
    // 1. Add more task
    if (todoAns.moreTodos === "Add more Tasks") {
      condition = true
    }

    // 2. Update existing Tasks
    else if (todoAns.moreTodos === "Update existing Tasks") {
        let updateAns = await inquirer.prompt({
            name: "taskIndex",
            message: "Enter the index of task to update",
            type: "number",
            validate: (index) => index > 0 && index <= todos.length
        })
        let newTask = await inquirer.prompt({
            name: "updatedTask",
            message: "Add new task",
            type: "input"
        })
        todos.splice(updateAns.taskIndex - 1, 1, newTask.updatedTask)

        console.log(stringTodos.join('\n'));
    }

    // 3. Delete Tasks
    else if (todoAns.moreTodos === "Delete Tasks") {
        let deleteAns = await inquirer.prompt({
            name: "taskIndex",
            message: "Enter the index of task to delete",
            type: "number",
            validate: (index) => index > 0 && index <= todos.length
        })
        todos.splice(deleteAns.taskIndex - 1, 1)
    }

    // 4. Exit and see the list
    else {
        condition = false
    }
}
