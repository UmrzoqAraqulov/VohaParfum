"use client";

import { KORZINA, TOKEN } from "@/const/const";
import { createSlice } from "@reduxjs/toolkit";
import { getCookie } from "cookies-next";

let korzina =
  typeof window !== "undefined" ? window.localStorage.getItem(KORZINA) : false;
korzina = JSON.parse(korzina);
const initialState = {
  isAuth: getCookie(TOKEN) ? true : false,
  user: null,
  korzinaLength: korzina || 0,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state) => {
      state.isAuth = !state.isAuth;
    },
    setUser: (state, { payload }) => {
      state.user = payload;
    },
    setLengthKorzina: (state, { payload }) => {
      state.korzinaLength = payload ? state.korzinaLength + 1 : 0;
    },
  },
  extraReducers: {},
});

export const { name, reducer, actions } = authSlice;

export const { setAuth, setUser, setLengthKorzina } = actions;

export default reducer;
