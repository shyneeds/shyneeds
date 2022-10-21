import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../app/store';
import { API_URL } from '../../constants/API_URL';

export const getReviewList = createAsyncThunk(
  'GET_REVIEW_LIST',
  async (page: number) => {
    return await axios({
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      url: API_URL.GET.REVIEW_LIST + '?search=test&page=' + (page - 1),
      method: 'get',
    })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log({ error });
      });
  }
);

export interface pageState {
  ReviewData: [];
  totalPages: number;
  page: number;
  blockNum: number;
  totalElements: number;
}

const initialState: pageState = {
  ReviewData: [],
  totalPages: 0, // 추후 api 받아와서 Update 하면됨
  page: 1,
  blockNum: 0,
  totalElements: 0,
};

export const page = createSlice({
  name: 'page',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    getTotal: (state, action: PayloadAction<any>) => {
      state.totalPages = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
      console.log('page : ' + state.page);
    },
    nextPage: (state, action: PayloadAction<any>) => {
      if (state.page >= state.totalPages) return;
      if (10 * (state.blockNum + 1) < state.page + 1) {
        state.blockNum += 1;
      }
      state.page += 1;
    },
    prevPage: (state, action: PayloadAction<any>) => {
      if (state.page <= 1) return;
      if (state.page - 1 <= 10 * state.blockNum) {
        state.blockNum -= 1;
      }
      state.page -= 1;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getReviewList.fulfilled, (state, action) => {
      const data = action.payload;
      state.totalPages = data.pagination.totalPages;
      state.ReviewData = data.data;
      state.totalElements = data.pagination.totalElements;
    });
  },
});

export const { getTotal, setPage, nextPage, prevPage } = page.actions;
export const totalPageData = (state: RootState) => state.page.totalPages;
export const pageNum = (state: RootState) => state.page.page;
export const blockNum = (state: RootState) => state.page.blockNum;
export const ReviewData = (state: RootState) => state.page.ReviewData;
export const totalElementsNum = (state: RootState) => state.page.totalElements;

export default page.reducer;
