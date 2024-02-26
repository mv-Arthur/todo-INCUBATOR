import { combineReducers, createStore } from "redux";
import { todolistReducer } from "../reducers/todolistReducer";
import { taskReducer } from "../reducers/taskReducer";

const rootReducer = combineReducers({
	todolists: todolistReducer,
	tasks: taskReducer,
});

export type AppRootState = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer);

//@ts-ignore
window.stroe = store;
