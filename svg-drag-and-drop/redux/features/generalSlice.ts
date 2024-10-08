import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '@/redux/store';

interface IGeneralState {
  processes: IProcess[];
}

// Initial state
const initialState: IGeneralState = {
  processes: [],
};

const generalSlice = createSlice({
  name: 'general',
  initialState,
  reducers: {
    setItems(
      state,
      {
        payload: { data, itemName },
      }: { payload: { data: unknown; itemName: string } }
    ) {
      //@ts-expect-error 'string' can be used to index state
      state[itemName] = [...state[itemName], data];
    },
    editProcess(state, { payload }) {
      const targetProcessIndex = state.processes.findIndex(
        (p) => p.id === payload.id
      );     

      state.processes[targetProcessIndex] = payload;
    },
    removeProcess(state, { payload }) {
      const updatedProcesses = state.processes.filter(
        (p) => p.id !== payload
      );      

      state.processes = updatedProcesses;
    },
    replaceProcesses(state, { payload }) {
      state.processes = payload;
    },
    setDataFromStorage(
      state,
      {
        payload: { data, name },
      }: { payload: { data: unknown | IProcess[]; name: string } }
    ) {
      if (!data) return state;

      state.processes = data as IProcess[];
    },
  },
});

export const { removeProcess, setDataFromStorage, setItems, replaceProcesses, editProcess } =
  generalSlice.actions;

export const selectProcesses = (state: RootState) =>
  state.generalSlice.processes;

export default generalSlice.reducer;
