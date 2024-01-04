import { v1 } from "uuid";
import { addTaskAC, removeTaskAC, taskReducer } from "./taskReducer";

test("reducer must return new state without task, searched by id", () => {
	let todolistId1 = v1();
	let todolistId2 = v1();

	const startState = {
		[todolistId1]: [
			{ id: "23", title: "HTML&CSS", isDone: true },
			{ id: v1(), title: "JS", isDone: true },
		],
		[todolistId2]: [
			{ id: v1(), title: "Milk", isDone: true },
			{ id: v1(), title: "React Book", isDone: true },
		],
	};
	const endState = taskReducer(startState, removeTaskAC("23", todolistId1));
	expect(endState[todolistId1].length).toBe(1);
	expect(endState[todolistId1][0].title).toBe("JS");
});

test("test for additing new task for todolist", () => {
	let todolistId1 = v1();
	let todolistId2 = v1();

	const startState = {
		[todolistId1]: [
			{ id: "23", title: "HTML&CSS", isDone: true },
			{ id: v1(), title: "JS", isDone: true },
		],
		[todolistId2]: [
			{ id: v1(), title: "Milk", isDone: true },
			{ id: v1(), title: "React Book", isDone: true },
		],
	};
	const endState = taskReducer(startState, addTaskAC("buy ak-47", todolistId1));
	expect(endState[todolistId1].length).toBe(3);
	expect(endState[todolistId1][0].title).toBe("buy ak-47");
});
