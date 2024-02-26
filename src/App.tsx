import React from "react";
import "./App.css";
import { TaskType, Todolist } from "./Todolist";
import { v1 } from "uuid";
import { AddItemForm } from "./AddItemForm";
import {
	addTodolistAC,
	changeFilterAC,
	changeTodolistTitleAC,
	removeTododlistAC,
} from "./reducers/todolistReducer";
import {
	addEmptyTasksAC,
	addTaskAC,
	changeStatusAC,
	changeTaskTitleAC,
	clearTasksForTodoAC,
	removeTaskAC,
} from "./reducers/taskReducer";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { AppRootState } from "./state/store";

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
	const dispatch = useDispatch();

	const todolists = useSelector<AppRootState, TodolistType[]>((state) => state.todolists);

	function addTodolist(title: string) {
		let newTodolistId = v1();

		dispatch(addTodolistAC(title, newTodolistId));
		dispatch(addEmptyTasksAC(newTodolistId));
	}

	function removeTodolist(id: string) {
		dispatch(removeTododlistAC(id));
		dispatch(clearTasksForTodoAC(id));
	}
	function changeTodolistTitle(id: string, title: string) {
		dispatch(changeTodolistTitleAC(id, title));
	}

	return (
		<div className="App">
			<AddItemForm addItem={addTodolist} />
			{todolists.map((tl) => {
				return (
					<Todolist
						key={tl.id}
						id={tl.id}
						title={tl.title}
						filter={tl.filter}
						removeTodolist={removeTodolist}
						changeTodolistTitle={changeTodolistTitle}
					/>
				);
			})}
		</div>
	);
}

export default App;
