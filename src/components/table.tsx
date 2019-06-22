import React from "react";
// Подключаем connect для обертки компонентов и работы с redux
import { connect } from "react-redux";
// Подключаем функции для передачи actions
import * as appActions from "../store/action_creators";
// Подключаем нужные интерфейсы
import { Data } from "../interfaces";
import { ChangePagePayload } from "../store/action_creators";
// Подключаем компоненты заголовков и тела таблицы
import Thead from "./thead";
import Tbody from "./tbody";

// Пропсы для компоненты
interface Props {
  data: Data[];
  page: number;
  sortColumn: string;
  totalPages: number;
  changePage: (payload: ChangePagePayload) => void;
}

const Table: React.FC<Props> = props => {
  /**
   * Метод перелистывания страницы таблицы. Метод отслеживает, чтобы не было
   * обращений к несуществующей странице.
   *
   * @param increment - переменная отвечает за шаг перелистывание страницы
   */
  const handleChangePage = (increment: -1 | 1) => {
    let { page, totalPages, changePage } = props,
      newPage = page;
    if (page === 1 && increment === -1) newPage = totalPages;
    else if (page === totalPages && increment === 1) newPage = 1;
    else newPage += increment;

    changePage({
      page: newPage
    });
  };

  // Копируем массив, чтобы не сломать ничего при сортировке
  let data = [...props.data];

  /**
   * Функция для сортировки данных по указанному в объекте свойству
   *
   * @param a - первый объет для сравнения
   * @param b - второй объет для сравнения
   * @param name - свойства для сравнения
   */
  function compare(a: any, b: any, name: string) {
    if (a[name] < b[name]) return -1;
    if (a[name] > b[name]) return 1;
    return 0;
  }

  // Сортируем массив в соответствии с выбранным полем в таблице
  data.sort((a, b) => compare(a, b, props.sortColumn));

  return (
    <React.Fragment>
      <table className="table table-bordered table-hover">
        <Thead data={data[0]} />
        <Tbody data={data} />
      </table>
      <div className="row justify-content-center">
        <button
          className="btn btn-primary left-btn"
          onClick={() => handleChangePage(-1)}
        >
          left
        </button>
        <button className="btn btn-primary" onClick={() => handleChangePage(1)}>
          right
        </button>
      </div>
    </React.Fragment>
  );
};

// Привязываем пропсы из глобального store к нашему компоненту
const mapStateToProps = (store: any) => {
  return {
    data: [...store.app.data],
    page: store.app.page,
    totalPages: store.app.totalPages,
    sortColumn: store.app.sortColumn
  };
};

// Привязываем actions к пропсам компонента
const mapDispatchToProps = (dispatch: any) => {
  return {
    changePage: (payload: any) => dispatch(appActions.changePage(payload))
  };
};

// Заворачиваем компонент, чтобы данные из store были доступны
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Table);
