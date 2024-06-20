import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import apiURL from "../utils/Live-Verbatims-List-URL";

const initialState = {
  liveVerbatims: [],
  liveTrendingMapData: [],
  radioButtonData: [],
  loading: false,
  error: "",
};

// Async thunk for fetching live verbatims
export const fetchLiveVerbatims = createAsyncThunk(
  "liveVerbatims/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(apiURL);
      return response.data.Live_Verbatims_List;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : "Network error");
    }
  }
);

// Async thunk for fetching map data
export const fetchLiveTrendingMapData = createAsyncThunk(
  "mapData/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${apiURL}`);
      return response.data.graph; 
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : "Network error");
    }
  }
);

export const fetchMapData = createAsyncThunk(
  "mapData/fetchMapData",
  async (type, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/analytics/snapshot_view/${type}`);
      console.log('data: ',response.data[type])
      return response.data[type];
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : "Network error");
    }
  }
);

export const fetchAll = createAsyncThunk(
  "mapData/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/analytics/snapshot_view/all");
      return response.data.all;
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
      .addCase(fetchLiveVerbatims.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLiveVerbatims.fulfilled, (state, action) => {
        state.loading = false;
        state.liveVerbatims = action.payload;
        state.error = "";
      })
      .addCase(fetchLiveVerbatims.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchLiveTrendingMapData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLiveTrendingMapData.fulfilled, (state, action) => {
        state.loading = false;
        state.liveTrendingMapData = action.payload;
        state.error = "";
      })
      .addCase(fetchLiveTrendingMapData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchMapData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMapData.fulfilled, (state, action) => {
        state.loading = false;
        state.radioButtonData = action.payload;
        state.error = "";
      })
      .addCase(fetchMapData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchAll.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAll.fulfilled, (state, action) => {
        state.loading = false;
        state.radioButtonData = action.payload;
        state.error = "";
      })
      .addCase(fetchAll.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
      
  },
});

const analyticsReducer = analyticsSlice.reducer;
export default analyticsReducer;
