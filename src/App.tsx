import React from 'react';
import axios from 'axios';
import { State, responseData} from './interfaces';
import Table from "./components/table";

class App extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);

    this.state = {
      data: [],
      page: 1,
      totalPages: 0,
      sortColumn: 0,
      filterType: '',
      filter: 0
    };
  }

  handleChangePage = (increment: -1 | 1) => {
    let { page, totalPages } = this.state,
          newPage = page;
    if (page === 1 && increment === -1) newPage = totalPages;
    else if (page === totalPages && increment === 1) newPage = 1;
    else newPage += increment;

    this.setState({
      page: newPage
    });
  };

  getData = (page: number = 1) => {
    axios('https://reqres.in/api/unknown?page=' + page)
      .then( response => {
        if (response.status === 200) return response.data;
        else throw (response.status + ' ' + response.statusText);
      })
      .then( (data: responseData) => {
        this.setState({
          data: data.data,
          page: data.page,
          totalPages: data.total_pages
        })
      })
      .catch( error => console.warn(error));
  };

  componentDidUpdate ({}, prevState: Readonly<State>) {
    let { page } = this.state;
    if (prevState.page !== page) {
      this.getData(page);
    }
  }

  componentDidMount () {
    this.getData(1);
  }

  render () {
    return (
      <div>
        {this.state.data[0] && <Table data={[...this.state.data]}/>}
      </div>
    );
  }
}

export default App;
