import React from "react";
import "./App.css";
import { TaskType, Todolist } from "./Todolist";
import { v1 } from "uuid";
import { AddItemForm } from "./AddItemForm";
import { addTodolistAC, changeFilterAC, changeTodolistTitleAC, removeTododlistAC, todolistReducer } from "./reducers/todolistReducer";
import { addEmptyTasksAC, addTaskAC, changeStatusAC, changeTaskTitleAC, clearTasksForTodoAC, removeTaskAC, taskReducer } from "./reducers/taskReducer";

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
	id: string;
	title: string;
	filter: FilterValuesType;
};

export type TasksStateType = {
	[key: string]: Array<TaskType>;
};

function App() {
	function removeTask(id: string, todolistId: string) {
		dispatchTasks(removeTaskAC(id, todolistId));
	}

	function addTask(title: string, todolistId: string) {
		dispatchTasks(addTaskAC(title, todolistId));
	}

	function changeStatus(id: string, isDone: boolean, todolistId: string) {
		dispatchTasks(changeStatusAC(id, isDone, todolistId));
	}

	function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
		dispatchTasks(changeTaskTitleAC(id, newTitle, todolistId));
	}

	function addTodolist(title: string) {
		let newTodolistId = v1();

		dispatchTodolists(addTodolistAC(title, newTodolistId));
		dispatchTasks(addEmptyTasksAC(newTodolistId));
	}

	function changeFilter(value: FilterValuesType, todolistId: string) {
		dispatchTodolists(changeFilterAC(value, todolistId));
	}

	function removeTodolist(id: string) {
		dispatchTodolists(removeTododlistAC(id));
		dispatchTasks(clearTasksForTodoAC(id));
	}
	function changeTodolistTitle(id: string, title: string) {
		dispatchTodolists(changeTodolistTitleAC(id, title));
	}

	let todolistId1 = v1();
	let todolistId2 = v1();

	let [todolists, dispatchTodolists] = React.useReducer(todolistReducer, [
		{ id: todolistId1, title: "What to learn", filter: "all" },
		{ id: todolistId2, title: "What to buy", filter: "all" },
	]);

	let [tasks, dispatchTasks] = React.useReducer(taskReducer, {
		[todolistId1]: [
			{ id: v1(), title: "HTML&CSS", isDone: true },
			{ id: v1(), title: "JS", isDone: true },
		],
		[todolistId2]: [
			{ id: v1(), title: "Milk", isDone: true },
			{ id: v1(), title: "React Book", isDone: true },
		],
	});

	return (
		<div className="App">
			<AddItemForm addItem={addTodolist} />
			{todolists.map((tl) => {
				let allTodolistTasks = tasks[tl.id];
				let tasksForTodolist = allTodolistTasks;

				if (tl.filter === "active") {
					tasksForTodolist = allTodolistTasks.filter((t) => t.isDone === false);
				}
				if (tl.filter === "completed") {
					tasksForTodolist = allTodolistTasks.filter((t) => t.isDone === true);
				}

				return (
					<Todolist
						key={tl.id}
						id={tl.id}
						title={tl.title}
						tasks={tasksForTodolist}
						removeTask={removeTask}
						changeFilter={changeFilter}
						addTask={addTask}
						changeTaskStatus={changeStatus}
						filter={tl.filter}
						removeTodolist={removeTodolist}
						changeTaskTitle={changeTaskTitle}
						changeTodolistTitle={changeTodolistTitle}
					/>
				);
			})}
		</div>
	);
}

export default App;
