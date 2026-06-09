import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import apiClient from "../../core/apiClient";
import type { RootState } from "../index";
import type { FetchedOrder } from "../../interfaces/historyTypes/history";

interface HistoryState {
  orders: FetchedOrder[];
  status: "idle" | "loading" | "succeeded" | "failed";
  selectedStoreId: string;
}

export const fetchHistory = createAsyncThunk<{ data: FetchedOrder[] }, string | undefined>(
  "history/fetchHistory",
  async (storeId) => {
    const url = storeId ? `order/store/${storeId}` : "order";
    const response = await apiClient.get(url);
    return response.data;
  },
);

const initialState: HistoryState = {
  orders: [],
  status: "idle",
  selectedStoreId: "",
};

const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    setSelectedStoreId(state, action: PayloadAction<string>) {
      state.selectedStoreId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHistory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchHistory.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orders = action.payload.data;
      })
      .addCase(fetchHistory.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { setSelectedStoreId } = historySlice.actions;

export const selectOrders = (state: RootState) => state.history.orders;
export const selectHistoryStatus = (state: RootState) => state.history.status;
export const selectSelectedStoreId = (state: RootState) => state.history.selectedStoreId;

export default historySlice.reducer;
