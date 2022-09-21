import { createReducer } from "@reduxjs/toolkit";
import { setZoom } from "./action";

const config = createReducer([{
  zoom: 5,
}], {
  [setZoom]: (state, { payload }) => [payload],
});

export default config;