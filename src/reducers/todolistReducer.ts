import { v1 } from "uuid";
import { TodolistType } from "../App";

export const todolistReducer = (state: TodolistType[], action: TodolistReducerType): TodolistType[] => {
	switch (action.type) {
		case "ADD-TODODLIST": {
			const newTodoId = v1();
			const newTodolist = { id: newTodoId, title: action.payload.title, filter: "all" as const };
			return [newTodolist, ...state];
		}

		case "REMOVE-TODOLISt": {
			return state.filter((el) => el.id !== action.payload.id);
		}

		case "CHANGE-TODO-TITLE": {
			const todolist = state.find((tl) => tl.id === action.payload.id);
			if (todolist) {
				todolist.title = action.payload.title;
			}
			return state;
		}

		default: {
			return state;
		}
	}
};

type TodolistReducerType = AddTodoListACType | RemoveTodolistACType | ChangeTodolistTitleACType;

type AddTodoListACType = ReturnType<typeof addTodolistAC>;

export const addTodolistAC = (title: string) => {
	return {
		type: "ADD-TODODLIST",
		payload: {
			title: title,
		},
	} as const;
};

type RemoveTodolistACType = ReturnType<typeof removeTododlistAC>;

export const removeTododlistAC = (id: string) => {
	return {
		type: "REMOVE-TODOLISt",
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
