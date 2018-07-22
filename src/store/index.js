import {
  createStore,
  applyMiddleware,
  compose,
} from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import {
  logger,
  saga,
} from '../middlewares';
import rootReducer from '../reducers';

const sagaMiddleware = createSagaMiddleware();

const middleware = [sagaMiddleware, thunk];
if (process.env.NODE_ENV === 'development') {
  middleware.push(logger);
}


const configureStore = (preloadedState = {}) => {
  const store = process.env.NODE_ENV === 'development' && global.__REDUX_DEVTOOLS_EXTENSION__
    ? createStore(
      rootReducer,
      preloadedState,
      compose(
        applyMiddleware(...middleware),
        global.__REDUX_DEVTOOLS_EXTENSION__(),
      ),
    )
    : createStore(
      rootReducer,
      preloadedState,
      applyMiddleware(...middleware),
    );

  sagaMiddleware.run(saga);

  return store;
};

export default configureStore();
