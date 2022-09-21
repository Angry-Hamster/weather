import { configureStore } from "@reduxjs/toolkit";

import features from "./features/reducer";
import config from "./config/reducer";

const store = configureStore({
  reducer: {
    features, //? id, {lon, lat}, color, feature
    config, //? Zoom
  },
});

export default store;