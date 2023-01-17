import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REGISTER,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
} from "redux-persist";

import rootReducer from "./index";

const store = configureStore({
  reducer: rootReducer,
});

export { store };
