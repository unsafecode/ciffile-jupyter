import { SharedMap } from "fluid-framework";
import { AzureClient } from "@fluidframework/azure-client";
import { InsecureTokenProvider } from "@fluidframework/test-client-utils"

// import React
import * as React from 'react';

// a React app named FluidToDo that implements a todo list using state
export class FluidToDo extends React.Component<{}> {
    constructor(props) {
        super(props);
        this.state = {
            todoList: [],
            newTodo: "",
        };
    }

    // a method to setup the Fluid Relay connection and container
    async setupFluidRelay() {
        // create a new AzureClient instance
        const client = new AzureClient({
            connection: {
                type: "local",
                tokenProvider: new InsecureTokenProvider("", { id: "userId" }),
                endpoint: "http://localhost:7070",
            }
        });

        // define contaner schema as any[]
        const containerSchema = {
            name: "todo-container",
            initialObjects: { list: SharedMap }
        };

        // create a new container
        const { container } = await client.createContainer(containerSchema);

        // get the shared map
        this.sharedMap = container.initialObjects.list;
    }

    // a function that will update the state of the React app
    updateState = (newState) => {
        this.setState(newState);
    };

    // a function that will update the state of the React app
    // and the shared map
    updateStateAndMap = (newState) => {
        this.setState(newState, () => {
            this.updateFluidMap();
        });
    };

    // a function that will update the shared map
    updateFluidMap = () => {
        this.sharedMap.set("todoList", this.state.todoList);
    };

    // a function that will add a new todo item to the list
    addTodo = (todo) => {
        const todoList = this.state.todoList.concat(todo);
        this.updateStateAndMap({ todoList, newTodo: "" });
    };

    // a function that will remove a todo item from the list
    removeTodo = (index) => {
        const todoList = this.state.todoList.slice();
        todoList.splice(index, 1);
        this.updateStateAndMap({ todoList });
    };

    // a function that will update the value of a todo item
    updateTodo = (index, value) => {
        const todoList = this.state.todoList.slice();
        todoList[index] = value;
        this.updateStateAndMap({ todoList });
    };

    // a function that will update the value of the new todo item
    // that is being added to the list
    updateNewTodo = (event) => {
        const newTodo = event.target.value;
        this.updateState({ newTodo });
    };

    // a function that will render the todo list
    renderTodoList = () => {
        return this.state.todoList.map((todo, index) => {
            return (
                <div key={index}>
                    <input
                        type="text"
                        value={todo}
                        onChange={(event) => this.updateTodo(index, event.target.value)}
                    />
                    <button onClick={() => this.removeTodo(index)}>Remove</button>
                </div>
            );
        });
    };

    // a function that will render the new todo item input
    renderNewTodo = () => {
        return (
            <div>
                <input
                    type="text"
                    value={this.state.newTodo}
                    onChange={this.updateNewTodo}
                />
                <button onClick={() => this.addTodo(this.state.newTodo)}>
                    Add
                </button>
            </div>
        );
    }
    // a function that will render the React app
    render() {
        return (
            <div>
                <h1>Fluid To Do</h1>
                {this.renderTodoList()}
                {this.renderNewTodo()}
            </div>
        );
    }
}
