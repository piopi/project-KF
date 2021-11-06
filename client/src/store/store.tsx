import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import servicesReducer from '../layout/ServicesContainer/servicesSlice';
import dataSourcesReducer from '../layout/DataSourcesContainer/dataSourcesSlice';
import visualizationsReducer from '../layout/VisualizationContainer/visualizationSlice';

const store = configureStore({
  reducer: {
    services: servicesReducer,
    dataSources: dataSourcesReducer,
    visualizations: visualizationsReducer,
  },
});
type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export default store;
