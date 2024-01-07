import { v1 } from "uuid";
import { addTodolistAC, changeFilterAC, changeTodolistTitleAC, removeTododlistAC, todolistReducer } from "./todolistReducer";
import { TodolistType } from "../App";

test("additing new todolist", () => {
	let todolistId1 = v1();
	let todolistId2 = v1();
	const startState: TodolistType[] = [
		{ id: todolistId1, title: "What to learn", filter: "all" },
		{ id: todolistId2, title: "What to buy", filter: "all" },
	];
	const newTodolistId = v1();
	const endState = todolistReducer(startState, addTodolistAC("what to read", newTodolistId));
	expect(endState.length).toBe(3);
	expect(endState[0].title).toBe("what to read");
});

test("removing one todolist by id", () => {
	let todolistId1 = v1();
	let todolistId2 = v1();
	const startState: TodolistType[] = [
		{ id: todolistId1, title: "What to learn", filter: "all" },
		{ id: todolistId2, title: "What to buy", filter: "all" },
	];

	const endState = todolistReducer(startState, removeTododlistAC(todolistId2));

	expect(endState.length).toBe(1);
});

test("change todos title", () => {
	let todolistId1 = v1();
	let todolistId2 = v1();
	const startState: TodolistType[] = [
		{ id: todolistId1, title: "What to learn", filter: "all" },
		{ id: todolistId2, title: "What to buy", filter: "all" },
	];

	const endState = todolistReducer(startState, changeTodolistTitleAC(todolistId1, "what to do"));
	expect(endState[0].title).toBe("what to do");
});

test("change todos filter", () => {
	let todolistId1 = v1();
	let todolistId2 = v1();
	const startState: TodolistType[] = [
		{ id: todolistId1, title: "What to learn", filter: "all" },
		{ id: todolistId2, title: "What to buy", filter: "all" },
	];

	const endState = todolistReducer(startState, changeFilterAC("completed", todolistId1));
	expect(endState[0].filter).toBe("completed");
});
