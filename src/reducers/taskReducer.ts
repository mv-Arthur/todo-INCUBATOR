import { v1 } from "uuid";
import { TasksStateType } from "../App";

export const taskReducer = (state: TasksStateType, action: TaskReducerType): TasksStateType => {
	switch (action.type) {
		case "REMOVE-TASK": {
			let todolistTasks = state[action.payload.todolistId];
			state[action.payload.todolistId] = todolistTasks.filter((el) => el.id !== action.payload.id);
			return state;
		}
		case "ADD-TASK": {
			let task = { id: v1(), title: action.payload.title, isDone: false };
			let todolistTasks = state[action.payload.todolistId];
			state[action.payload.todolistId] = [task, ...todolistTasks];
			return state;
		}
		case "CHANGE-STATUS": {
			return;
		}
		default: {
			return state;
		}
	}
};

type TaskReducerType = RemoveTaskACType | AddTaskACType | ChangeStatusACType;

type RemoveTaskACType = ReturnType<typeof removeTaskAC>;

export const removeTaskAC = (id: string, todolistId: string) => {
	return {
		type: "REMOVE-TASK",
		payload: {
			id: id,
			todolistId: todolistId,
		},
	} as const;
};

type AddTaskACType = ReturnType<typeof addTaskAC>;

export const addTaskAC = (title: string, todlistId: string) => {
	return {
		type: "ADD-TASK",
		payload: {
			title: title,
			todolistId: todlistId,
		},
	} as const;
};

type ChangeStatusACType = ReturnType<typeof changeStatusAC>;

export const changeStatusAC = (id: string, newTitle: string, todolistId: string) => {
	return {
		type: "CHANGE-STATUS",
		payload: {
			id: id,
			newTitle: newTitle,
			todolistId: todolistId,
		},
	} as const;
};
