import { createStore } from "redux";
import rootReducer from "./rootReducer";
import { composeWithDevTools } from "redux-devtools-extension";

const store = createStore(rootReducer, composeWithDevTools());

// let store = createStore(
//   reducer,
//   window.devToolsExtension && window.devToolsExtension()
// );

export default store;
