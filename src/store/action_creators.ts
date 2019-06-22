// Подключаем константы actions
import * as ACTIONS from "./actions";
// Подключаем интерфейс глобального хранилища
import { Data } from "../interfaces";

// Интерфейсы для updateData
interface UpdateDataActions {
  type: typeof ACTIONS.DATA_UPDATE;
  payload: UpdateDataPayload;
}

export interface UpdateDataPayload {
  data: Data[];
  page: number;
  totalPages: number;
}

/**
 * Обновляет данные текущей таблицы
 *
 * @param payload - данные таблицы
 */
export function updateData(payload: UpdateDataPayload): UpdateDataActions {
  return {
    type: ACTIONS.DATA_UPDATE,
    payload
  };
}

// Интерфейсы для changePage
interface ChangePageActions {
  type: typeof ACTIONS.CHANGE_PAGE;
  payload: ChangePagePayload;
}

export interface ChangePagePayload {
  page: number;
}

/**
 * Обновляет текущую страницу
 *
 * @param payload - номер страницы
 */
export function changePage(payload: ChangePagePayload): ChangePageActions {
  return {
    type: ACTIONS.CHANGE_PAGE,
    payload
  };
}

// Интерфейсы для changeSortColumn
interface ChangeSortColumnActions {
  type: typeof ACTIONS.CHANGE_SORT_COLUMN;
  payload: ChangeSortColumnPayload;
}

export interface ChangeSortColumnPayload {
  sortColumn: string;
}

/**
 * Обновляет колонкупо которой идет сортировка
 *
 * @param payload - имя колонки
 */
export function changeSortColumn(
  payload: ChangeSortColumnPayload
): ChangeSortColumnActions {
  return {
    type: ACTIONS.CHANGE_SORT_COLUMN,
    payload
  };
}
