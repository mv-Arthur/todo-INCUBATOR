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
			const todolistTasks = state[action.payload.todolistId];
			const task = todolistTasks.find((el) => el.id === action.payload.id);
			if (task) {
				task.isDone = action.payload.isDone;
			}
			return state;
		}
		case "CHANGE-TASK-TITLE": {
			const tododlistTasks = state[action.payload.todolistId];
			const task = tododlistTasks.find((el) => el.id === action.payload.id);
			if (task) {
				task.title = action.payload.newTitle;
			}
			return state;
		}

		default: {
			return state;
		}
	}
};

type TaskReducerType = RemoveTaskACType | AddTaskACType | ChangeStatusACType | ChangeTaskTitleACType;

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

export const changeStatusAC = (id: string, isDone: boolean, todolistId: string) => {
	return {
		type: "CHANGE-STATUS",
		payload: {
			id: id,
			isDone: isDone,
			todolistId: todolistId,
		},
	} as const;
};

type ChangeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>;

export const changeTaskTitleAC = (id: string, newTitle: string, todolistId: string) => {
	return {
		type: "CHANGE-TASK-TITLE",
		payload: {
			id: id,
			newTitle: newTitle,
			todolistId: todolistId,
		},
	} as const;
};
