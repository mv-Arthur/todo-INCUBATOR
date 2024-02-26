import React from "react";
import { FilterValuesType } from "./App";
import { AddItemForm } from "./AddItemForm";
import { EditableSpan } from "./EditableSpan";
import { Button, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import { CheckBox } from "./components/checkbox/CheckBox";
import { useDispatch, useSelector } from "react-redux";
import { AppRootState } from "./state/store";
import { addTaskAC, changeStatusAC, changeTaskTitleAC, removeTaskAC } from "./reducers/taskReducer";
import { changeFilterAC } from "./reducers/todolistReducer";
export type TaskType = {
	id: string;
	title: string;
	isDone: boolean;
};

type PropsType = {
	id: string;
	title: string;
	removeTodolist: (id: string) => void;
	changeTodolistTitle: (id: string, newTitle: string) => void;
	filter: FilterValuesType;
};

export function Todolist(props: PropsType) {
	const dispatch = useDispatch();
	const tasks = useSelector<AppRootState, TaskType[]>((state) => state.tasks[props.id]);
	const addTask = (title: string) => {
		dispatch(addTaskAC(title, props.id));
	};
	const onChangeHandler = (actualValue: boolean, id: string) => {
		dispatch(changeStatusAC(id, actualValue, props.id));
	};
	const removeTodolist = () => {
		props.removeTodolist(props.id);
	};
	const changeTodolistTitle = (title: string) => {
		props.changeTodolistTitle(props.id, title);
	};

	const onAllClickHandler = () => dispatch(changeFilterAC("all", props.id));
	const onActiveClickHandler = () => dispatch(changeFilterAC("active", props.id));
	const onCompletedClickHandler = () => dispatch(changeFilterAC("completed", props.id));

	let filteredTasks = tasks;

	if (props.filter === "active") {
		filteredTasks = tasks.filter((t) => t.isDone === false);
	}

	if (props.filter === "completed") {
		filteredTasks = tasks.filter((t) => t.isDone === true);
	}

	return (
		<div>
			<h3>
				<EditableSpan value={props.title} onChange={changeTodolistTitle} />
				<IconButton aria-label="delete" onClick={removeTodolist}>
					<DeleteIcon />
				</IconButton>
			</h3>
			<AddItemForm addItem={addTask} />
			<ul>
				{filteredTasks.map((t) => {
					const onClickHandler = () => dispatch(removeTaskAC(t.id, props.id));

					const onTitleChangeHandler = (newValue: string) => {
						dispatch(changeTaskTitleAC(t.id, newValue, props.id));
					};

					return (
						<li key={t.id} className={t.isDone ? "is-done" : ""}>
							<CheckBox
								isDone={t.isDone}
								CB={(actualValue) => onChangeHandler(actualValue, t.id)}
							/>
							<EditableSpan value={t.title} onChange={onTitleChangeHandler} />
							<IconButton aria-label="delete" onClick={onClickHandler}>
								<DeleteIcon />
							</IconButton>
						</li>
					);
				})}
			</ul>
			<div>
				<Button
					variant={props.filter === "all" ? "contained" : "outlined"}
					onClick={onAllClickHandler}
				>
					All
				</Button>
				<Button
					variant={props.filter === "active" ? "contained" : "outlined"}
					onClick={onActiveClickHandler}
				>
					Active
				</Button>
				<Button
					variant={props.filter === "completed" ? "contained" : "outlined"}
					onClick={onCompletedClickHandler}
				>
					Completed
				</Button>
			</div>
		</div>
	);
}
