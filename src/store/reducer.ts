// Подключаем для возможности использовать несколько reducer
import { combineReducers } from "redux";
import * as ACTIONS from "./actions";
import { State, ReduxAction } from "../interfaces";

// Первоначальная инициализация глобального store
export const initialState: State = {
  data: [],
  page: 0,
  totalPages: 0,
  sortColumn: '',
  filterType: "",
  filter: 0
};

// Редюсер для обработки actions
function rootReducer(store: State = initialState, action: ReduxAction) {
  switch (action.type) {
    case ACTIONS.CHANGE_PAGE:
      return { ...store, ...action.payload };
    case ACTIONS.CHANGE_SORT_COLUMN:
      return { ...store, ...action.payload };
    case ACTIONS.DATA_UPDATE:
      return { ...store, ...action.payload };
    default:
      return store;
  }
}

// Объединяем редюсеры в один, у нас и так один, но пусть будет
export default () =>
  combineReducers({
    app: rootReducer
  });
