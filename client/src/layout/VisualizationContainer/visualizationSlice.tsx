/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const url = process.env.REACT_APP_API_URL || '';
export interface Visualization {
  dataEntryName: string;
  data: number[];
  dataCurrency: string;
}
const initialState = {
  data: [] as Visualization[],
  status: 'idle',
};
export const fetchVisualization = createAsyncThunk(
  'visualizations/fetchVisualization',
  async (dataSourceId: number) => {
    const response = await fetch(`${url}/api/dataentries?dataId=${dataSourceId}&limit=10`);
    const data = (await response.json()) as Visualization;
    return data;
  },
);
const visualizationsSlice = createSlice({
  name: 'visualizations',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchVisualization.fulfilled, (state, { payload }) => {
      state.status = 'succeeded';
      state.data = [...state.data, payload];
    });
  },
});

export default visualizationsSlice.reducer;
