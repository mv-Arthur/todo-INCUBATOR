import { FilterValuesType, TodolistType } from "../App";
import { todolistId1, todolistId2 } from "./taskReducer";

const initialState: TodolistType[] = [
	{ id: todolistId1, title: "What to learn", filter: "all" },
	{ id: todolistId2, title: "What to buy", filter: "all" },
];

export const todolistReducer = (
	state: TodolistType[] = initialState,
	action: TodolistReducerType
): TodolistType[] => {
	switch (action.type) {
		case "ADD-TODODLIST": {
			const newTodoId = action.payload.newTodolistId;
			const newTodolist = { id: newTodoId, title: action.payload.title, filter: "all" as const };
			return [newTodolist, ...state];
		}

		case "REMOVE-TODOLIST": {
			return state.filter((el) => el.id !== action.payload.id);
		}

		case "CHANGE-TODO-TITLE": {
			const todolist = state.find((tl) => tl.id === action.payload.id);
			if (todolist) {
				todolist.title = action.payload.title;
			}
			return [...state];
		}

		case "CHANGE-FILTER": {
			const todolist = state.find((el) => el.id === action.payload.todolistId);
			if (todolist) {
				todolist.filter = action.payload.value;
			}
			return [...state];
		}

		default: {
			return state;
		}
	}
};

type TodolistReducerType =
	| AddTodoListACType
	| RemoveTodolistACType
	| ChangeTodolistTitleACType
	| ChangeFilterACType;

type AddTodoListACType = ReturnType<typeof addTodolistAC>;

export const addTodolistAC = (title: string, newTodolistId: string) => {
	return {
		type: "ADD-TODODLIST",
		payload: {
			title: title,
			newTodolistId: newTodolistId,
		},
	} as const;
};

type RemoveTodolistACType = ReturnType<typeof removeTododlistAC>;

export const removeTododlistAC = (id: string) => {
	return {
		type: "REMOVE-TODOLIST",
		payload: {
			id: id,
		},
	} as const;
};

type ChangeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>;

export const changeTodolistTitleAC = (id: string, title: string) => {
	return {
		type: "CHANGE-TODO-TITLE",
		payload: {
			id: id,
			title: title,
		},
	} as const;
};

type ChangeFilterACType = ReturnType<typeof changeFilterAC>;

export const changeFilterAC = (value: FilterValuesType, todolistId: string) => {
	return {
		type: "CHANGE-FILTER",
		payload: {
			value: value,
			todolistId: todolistId,
		},
	} as const;
};
