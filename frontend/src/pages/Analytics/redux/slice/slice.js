import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import urls from "../utils/urls";
import axiosInstance from "../../../../Components/redux/axiosInstance";

const liveVerbatimsUrl = urls.liveVerbatimsListUrl;
const snapshotViewUrl = urls.snapShotViewUrl;
const trendAnalysisBaseUrl = urls.trendAnalysisUrl; // Base URL for trend analysis

const initialState = {
  liveVerbatimsData: [],
  SSVMapData: [],
  trendAnalysisData: [],
  loading: false,
  error: "",
};

// Async thunk for fetching live verbatims
export const fetchLiveVerbatimsData = createAsyncThunk(
  "liveVerbatims/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(liveVerbatimsUrl);
      console.log('datalll', response.data.Live_Verbatims_List);
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
      const response = await axiosInstance.get(`${snapshotViewUrl}${type}`);
      console.log('data: ', response.data[type]);
      return response.data[type];
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : "Network error");
    }
  }
);

// Async thunk for fetching trend analysis data with dynamic type
export const fetchTrendAnalysisData = createAsyncThunk(
  "trendAnalysis/fetch",
  async (type, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`${trendAnalysisBaseUrl}?type=${type}`);
      console.log('trend analysis data: ', response.data);
      return response.data;
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
      .addCase(fetchTrendAnalysisData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTrendAnalysisData.fulfilled, (state, action) => {
        state.loading = false;
        state.trendAnalysisData = action.payload;
        state.error = "";
      })
      .addCase(fetchTrendAnalysisData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

const analyticsReducer = analyticsSlice.reducer;
export default analyticsReducer;
