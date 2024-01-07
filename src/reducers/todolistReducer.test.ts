import { v1 } from "uuid";
import { addTodolistAC, removeTododlistAC, todolistReducer } from "./todolistReducer";
import { TodolistType } from "../App";

test("additing new todolist", () => {
	let todolistId1 = v1();
	let todolistId2 = v1();
	const startState: TodolistType[] = [
		{ id: todolistId1, title: "What to learn", filter: "all" },
		{ id: todolistId2, title: "What to buy", filter: "all" },
	];

	const endState = todolistReducer(startState, addTodolistAC("what to read"));
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
