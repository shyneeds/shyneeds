import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface userDataList {
  userInfo: [
    {
      email: string;
      name: string;
      birthday: string;
      gender: string;
      profileImage: string;
    }
  ];
  reservationList: Array<object>;
  cancelNum: number;
}

const initialState: userDataList = {
  userInfo: [
    {
      email: '',
      name: '',
      birthday: '',
      gender: '',
      profileImage: '',
    },
  ],
  reservationList: [],
  cancelNum: 0,
};

export const userDataSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    email: (state, action: PayloadAction<string>) => {
      state.userInfo[0].email = action.payload;
      // console.log('이메일:' + state.userInfo[0].email);
    },
    name: (state, action: PayloadAction<string>) => {
      state.userInfo[0].name = action.payload;
    },
    birthday: (state, action: PayloadAction<string>) => {
      state.userInfo[0].birthday = action.payload;
    },
    gender: (state, action: PayloadAction<string>) => {
      state.userInfo[0].gender = action.payload;
    },
    profileImage: (state, action: PayloadAction<string>) => {
      state.userInfo[0].profileImage = action.payload;
    },
    reservationList: (state, action: PayloadAction<Array<object>>) => {
      state.reservationList = action.payload;
    },
    cancelNum: (state, action: PayloadAction<number>) => {
      state.cancelNum = action.payload;
    },
  },
});

export const {
  email,
  name,
  birthday,
  gender,
  profileImage,
  reservationList,
  cancelNum,
} = userDataSlice.actions;
export const userDataEmail = (state: RootState) =>
  state.userData.userInfo[0].email;
export const userDataName = (state: RootState) =>
  state.userData.userInfo[0].name;
export const userDataBirthday = (state: RootState) =>
  state.userData.userInfo[0].birthday;
export const userDataGender = (state: RootState) =>
  state.userData.userInfo[0].gender;
export const userDataImage = (state: RootState) =>
  state.userData.userInfo[0].profileImage;
export const userReservationList = (state: RootState) =>
  state.userData.reservationList;
export const userCancelNum = (state: RootState) => state.userData.cancelNum;

export default userDataSlice.reducer;
