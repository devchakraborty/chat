import { createStore, applyMiddleware, combineReducers } from 'redux';
// import * as storage from 'redux-storage';
// import createEngine from 'redux-storage-engine-reactnativeasyncstorage';
// import merger from 'redux-storage-merger-immutablejs';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import * as reducers from './reducers';

// const engine = createEngine('Chat:state');
// const storageMiddleware = storage.createMiddleware(engine);
const createStoreWithMiddleware = applyMiddleware(thunk, createLogger()/*, storageMiddleware*/)(createStore);
// const reducer = storage.reducer(combineReducers(reducers), merger);
const reducer = combineReducers(reducers);
const store = createStoreWithMiddleware(reducer);

// const load = storage.createLoader(engine);
// load(store);

export default store;
