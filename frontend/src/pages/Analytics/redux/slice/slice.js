
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import apiURL from "../utils/Live-Verbatims-List-URL";

const initialState = {
  liveVerbatims: [], 
  loading: false,
  error: "",
};


export const fetchLiveVerbatims = createAsyncThunk(
  "liveVerbatims/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(apiURL);
      console.log(response.data)
      return response.data.Live_Verbatims_List; 
      
    } catch (error) {
      console.error("Error fetching live verbatims:", error);
      return rejectWithValue(error.response ? error.response.data : "Network error");
    }
  }
);

const liveVerbatimsSlice = createSlice({
  name: "liveVerbatims",
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
      });
  },
});


const liveVerbatimsReducer = liveVerbatimsSlice.reducer;
export default liveVerbatimsReducer;
