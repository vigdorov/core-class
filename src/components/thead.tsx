import React from "react";
// Подключаем connect для обертки компонентов и работы с redux
import { connect } from "react-redux";
// Подключаем функции для передачи actions
import * as appActions from "../store/action_creators";
// Подключаем нужные интерфейсы
import {Data, Payload, PreloadedState, ReduxAction} from "../interfaces";

// Пропсы компонента
interface Props {
  data: Data;
  changeSortColumn: (payload: Payload) => ReduxAction;
  sortColumn: string;
}

const Thead: React.FC<Props> = props => {
  /**
   * Метод изменяет по какой колонке будет сортировка
   *
   * @param name - имя колонки, по которой будет сортировка
   */
  const handleClick = (name: string) => {
    props.changeSortColumn({
      sortColumn: name
    });
  };

  let { data } = props,
    headerRow: React.ReactElement[] = [];
  // Генерим заголовки для таблицы
  for (let name in data) {
    headerRow.push(
      <th key={name} scope="col">
        <button className="btn btn-link" onClick={() => handleClick(name)}>
          {name}
        </button>
        {props.sortColumn === name && " + "}
      </th>
    );
  }

  return (
    <thead>
      <tr>{headerRow}</tr>
    </thead>
  );
};

// Привязываем пропсы из глобального store к нашему компоненту
const mapStateToProps = (store: PreloadedState) => {
  return {
    sortColumn: store.app.sortColumn
  };
};

// Привязываем actions к пропсам компонента
const mapDispatchToProps = (dispatch: any) => {
  return {
    changeSortColumn: (payload: any) =>
      dispatch(appActions.changeSortColumn(payload))
  };
};

// Заворачиваем компонент, чтобы данные из store были доступны
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Thead);
