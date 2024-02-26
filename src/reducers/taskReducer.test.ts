import { v1 } from "uuid";
import {
	addTaskAC,
	changeStatusAC,
	changeTaskTitleAC,
	removeTaskAC,
	taskReducer,
} from "./taskReducer";

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
test("correct task should be added to correct array", () => {
	const startState = {
		todolistId1: [
			{ id: "1", title: "CSS", isDone: false },
			{ id: "2", title: "JS", isDone: true },
			{ id: "3", title: "React", isDone: false },
		],
		todolistId2: [
			{ id: "1", title: "bread", isDone: false },
			{ id: "2", title: "milk", isDone: true },
			{ id: "3", title: "tea", isDone: false },
		],
	};

	const action = addTaskAC("juce", "todolistId2");

	const endState = taskReducer(startState, action);

	expect(endState["todolistId1"].length).toBe(3);
	expect(endState["todolistId2"].length).toBe(4);
	expect(endState["todolistId2"][0].id).toBeDefined();
	expect(endState["todolistId2"][0].title).toBe("juce");
	expect(endState["todolistId2"][0].isDone).toBe(false);
});

test("status of specified task should be changed", () => {
	const startState = {
		todolistId1: [
			{ id: "1", title: "CSS", isDone: false },
			{ id: "2", title: "JS", isDone: true },
			{ id: "3", title: "React", isDone: false },
		],
		todolistId2: [
			{ id: "1", title: "bread", isDone: false },
			{ id: "2", title: "milk", isDone: true },
			{ id: "3", title: "tea", isDone: false },
		],
	};

	const action = changeStatusAC("2", false, "todolistId2");

	const endState = taskReducer(startState, action);

	expect(endState["todolistId1"][1].isDone).toBe(true);
	expect(endState["todolistId2"][1].isDone).toBe(false);
});

test("test for changing status of task", () => {
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

	const endState = taskReducer(startState, changeStatusAC("23", false, todolistId1));
	expect(endState[todolistId1][0].isDone).toBe(false);
});

test("test for changing task title", () => {
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

	const endState = taskReducer(startState, changeTaskTitleAC("23", "redux", todolistId1));
	expect(endState[todolistId1][0].title).toBe("redux");
});
