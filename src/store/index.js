import { createStore, combineReducers } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { composeWithDevTools } from '@redux-devtools/extension'
import { usersReducer } from './usersReducer.js'

const persistConfig = {
  key: 'root',
  storage,
}

const rootReducer = combineReducers({
  user: usersReducer,
})
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(persistedReducer, composeWithDevTools())
export const persistor = persistStore(store)
