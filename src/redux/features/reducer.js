import { createReducer } from "@reduxjs/toolkit";
import { addFeature, deleteFeature } from "./action";

const features = createReducer([{
  id: 1644435992555,
  coord: {
    lon: 29.26086697595829,
    lat: 49.622402715986425
  },
  color: '#672e9b',
  eventcoord: [
    3257304.811479971,
    6381137.636861032
  ]
}], {
  [addFeature]: (state, { payload }) => [...state, payload],
  [deleteFeature]: (state, { payload }) => {
    console.log(payload.id);
    return state.filter((w) => w.id != payload.id);
  },
});

export default features;