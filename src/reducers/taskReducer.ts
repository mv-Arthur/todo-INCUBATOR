import { v1 } from "uuid";
import { TasksStateType } from "../App";
//livesycle component
// 3 стадии изменения ui в компоненте ререндер реконсилатион комит

export let todolistId1 = v1();
export let todolistId2 = v1();

const initialState = {
	[todolistId1]: [
		{ id: v1(), title: "HTML&CSS", isDone: true },
		{ id: v1(), title: "JS", isDone: true },
	],
	[todolistId2]: [
		{ id: v1(), title: "Milk", isDone: true },
		{ id: v1(), title: "React Book", isDone: true },
	],
};

export const taskReducer = (
	state: TasksStateType = initialState,
	action: TaskReducerType
): TasksStateType => {
	switch (action.type) {
		case "REMOVE-TASK": {
			let todolistTasks = state[action.payload.todolistId];
			state[action.payload.todolistId] = todolistTasks.filter(
				(el) => el.id !== action.payload.id
			);
			return { ...state };
		}
		case "ADD-TASK": {
			let task = { id: v1(), title: action.payload.title, isDone: false };
			let todolistTasks = state[action.payload.todolistId];
			state[action.payload.todolistId] = [task, ...todolistTasks];
			return { ...state };
		}
		case "CHANGE-STATUS": {
			const stateCopy = { ...state };
			const tasks = stateCopy[action.payload.todolistId];
			stateCopy[action.payload.todolistId] = tasks.map((t) =>
				t.id === action.payload.id ? { ...t, isDone: !t.isDone } : t
			);
			return stateCopy;
		}
		case "CHANGE-TASK-TITLE": {
			const stateCopy = { ...state };
			const tasks = stateCopy[action.payload.todolistId];
			stateCopy[action.payload.todolistId] = tasks.map((t) =>
				t.id === action.payload.id ? { ...t, title: action.payload.newTitle } : t
			);
			return stateCopy;
		}

		case "EMPTY-TASKS": {
			const updated = {
				...state,
				[action.payload.todolistId]: [],
			};
			return updated;
		}

		case "CLEAR-TASKS": {
			delete state[action.payload.todolistId];
			return { ...state };
		}

		default: {
			return state;
		}
	}
};

type TaskReducerType =
	| RemoveTaskACType
	| AddTaskACType
	| ChangeStatusACType
	| ChangeTaskTitleACType
	| AddEmptyTasksACType
	| ClearTasksForTodoACType;

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
// порядок свойств в обьекте
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

type AddEmptyTasksACType = ReturnType<typeof addEmptyTasksAC>;

export const addEmptyTasksAC = (todolistId: string) => {
	return {
		type: "EMPTY-TASKS",
		payload: {
			todolistId: todolistId,
		},
	} as const;
};

type ClearTasksForTodoACType = ReturnType<typeof clearTasksForTodoAC>;

export const clearTasksForTodoAC = (todolistId: string) => {
	return {
		type: "CLEAR-TASKS",
		payload: {
			todolistId: todolistId,
		},
	} as const;
};
