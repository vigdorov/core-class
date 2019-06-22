export interface State {
  data: Data[];
  page: number;
  totalPages: number;
  sortColumn: string;
  filterType: string;
  filter: number;
}

export interface PreloadedState {
  app: State
}

export interface Payload {
  data?: Data[];
  page?: number;
  totalPages?: number;
  sortColumn?: string;
  filterType?: string;
  filter?: number;
}

export interface Data {
  id: number;
  name: string;
  year: number;
  color: string;
  pantone_value: string;
}

export interface responseData {
  data: Data[];
  page: number;
  per_page: number;
  total: 12;
  total_pages: 4;
}

export interface ReduxAction {
  type: string;
  payload: Payload;
}