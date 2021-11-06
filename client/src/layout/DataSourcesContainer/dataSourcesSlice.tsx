/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface DataSource {
  dataId: number;
  dataName: string;
  dataCurrency: string;
}
const initialState = {
  data: [] as DataSource[],
  status: 'idle',
};
export const fetchDataSource = createAsyncThunk('dataSources/fetchdataSources', async (serviceId: number) => {
  const response = await fetch(`http://localhost:3001/api/datasources?serviceId=${serviceId}`);
  const data = (await response.json()) as DataSource[];
  return data;
});
const dataSourcesSlice = createSlice({
  name: 'dataSources',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchDataSource.fulfilled, (state, { payload }) => {
      state.status = 'succeeded';
      state.data = [...state.data, ...payload];
    });
  },
});

export default dataSourcesSlice.reducer;
