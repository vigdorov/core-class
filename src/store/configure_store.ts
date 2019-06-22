// Подключаем нужны функции из redux
import { createStore, applyMiddleware } from "redux";
// Подключаем thunk
import thunk from "redux-thunk";
// Подключаем средства разработки для redux
import { composeWithDevTools } from "redux-devtools-extension";
// Подключаем reducer
import createRootReducer from "./reducer";

// Конфигурируем store
export default function configureStore() {
  return createStore(
    createRootReducer(),
    composeWithDevTools(applyMiddleware(thunk))
  );
}
