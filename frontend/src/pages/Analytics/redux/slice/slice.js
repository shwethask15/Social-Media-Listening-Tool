import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import urls from "../utils/urls";


const liveVerbatimsUrl = urls.LiveVerbatimsListUrl;
const snapshotViewUrl = urls.SnapShotViewUrl;

const initialState = {
  liveVerbatimsData: [],
  SSVMapData: [],
  loading: false,
  error: "",
};


// Async thunk for fetching live verbatims
export const fetchLiveVerbatimsData = createAsyncThunk(
  "liveVerbatims/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(liveVerbatimsUrl);
      console.log('datalll',response.data.Live_Verbatims_List)
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : "Network error");
    }
  }
);

export const fetchSnapShotViewData = createAsyncThunk(
  "mapData/fetchMapData",
  async (type, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${snapshotViewUrl}${type}`);
      console.log('data: ',response.data[type])
      return response.data[type];
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : "Network error");
    }
  }
);

const analyticsSlice = createSlice({
  name: "analyticsPage",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLiveVerbatimsData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLiveVerbatimsData.fulfilled, (state, action) => {
        state.loading = false;
        state.liveVerbatimsData = action.payload;
        state.error = "";
      })
      .addCase(fetchLiveVerbatimsData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchSnapShotViewData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSnapShotViewData.fulfilled, (state, action) => {
        state.loading = false;
        state.SSVMapData = action.payload;
        state.error = "";
      })
      .addCase(fetchSnapShotViewData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })      
  },
});

const analyticsReducer = analyticsSlice.reducer;
export default analyticsReducer;
