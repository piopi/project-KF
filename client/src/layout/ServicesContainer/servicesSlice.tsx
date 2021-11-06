/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface Service {
  serviceId: number;
  name: string;
  serviceIconUrl: string;
}
const initialState = {
  data: [] as Service[],
  status: 'idle',
};
export const fetchServices = createAsyncThunk('services/fetchServices', async () => {
  const response = await fetch(`http://localhost:3001/api/services`);
  const data = (await response.json()) as Service[];
  return data;
});
const servicesSlice = createSlice({
  name: 'services',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchServices.fulfilled, (state, { payload }) => {
      state.status = 'succeeded';
      state.data = payload;
    });
  },
});

export default servicesSlice.reducer;
