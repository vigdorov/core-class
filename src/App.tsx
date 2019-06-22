import React from "react";
// Подключаем connect для обертки компонентов и работы с redux
import { connect } from "react-redux";
// Подключаем функции для передачи actions
import * as appActions from "./store/action_creators";
// Подключаем axios для работы с сервером
import axios from "axios";
// Подключаем нужные интерфейсы
import { responseData, State } from "./interfaces";
import { ChangePagePayload, UpdateDataPayload } from "./store/action_creators";
// Подключаем компонет Таблицы
import Table from "./components/table";
// Подключаем пользовательские стили
import "./style.css";

// Пропсы класса App
interface Props {
  page: number;
  totalPages: number;
  updateData: (payload: UpdateDataPayload) => void;
  changePage: (payload: ChangePagePayload) => void;
}

// Основной компонент приложения
class App extends React.Component<Props> {
  /**
   * Метод для отправки запроса на сервер за данными для таблицы. После
   * получения данных, заносит их в глобальный store
   *
   * @param page - номер запрашиваемой с сервера страницы
   */
  getData = (page: number = 1) => {
    axios("https://reqres.in/api/unknown?page=" + page)
      .then(response => {
        if (response.status === 200) return response.data;
      })
      .then((data: responseData) => {
        this.props.updateData({
          data: data.data,
          page: data.page,
          totalPages: data.total_pages
        });
      })
      .catch(error => console.warn(error));
  };

  // При первом запуске приложения запросить первую страницу данных таблицы
  componentDidMount(): void {
    this.getData(1);
  }

  /**
   * Метод проверяет изменилась ли страница, при обновлении пропсов и если
   * изменилась, то запрашивает данные с сервера для нужной страницы
   *
   * @param prevProps - предыдущие пропсы
   */
  componentDidUpdate(prevProps: Readonly<Props>): void {
    let { page } = this.props;
    if (page !== prevProps.page) {
      this.getData(page);
    }
  }

  /**
   * Рендер приложения
   */
  render() {
    return (
      <div className="container card">
        <div className="card-body">
          <h5>Страница №{this.props.page}</h5>
          <div className="all-pages">
            Всего страниц: {this.props.totalPages}
          </div>
          {this.props.page > 0 && <Table />}
        </div>
      </div>
    );
  }
}

// Привязываем пропсы из глобального store к нашему компоненту
const mapStateToProps = (store: { app: State }) => {
  return {
    page: store.app.page,
    totalPages: store.app.totalPages
  };
};

// Привязываем actions к пропсам компонента
const mapDispatchToProps = (dispatch: any) => {
  return {
    updateData: (payload: UpdateDataPayload) =>
      dispatch(appActions.updateData(payload)),
    changePage: (payload: ChangePagePayload) =>
      dispatch(appActions.changePage(payload))
  };
};

// Заворачиваем компонент, чтобы данные из store были доступны
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
