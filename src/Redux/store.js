import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk'
import { CamReducer } from './reducers/CamReducer';
import { AlertReducer } from './reducers/AlertReducer';
import { BookingsReducer } from './reducers/BookingsReducer';

const composeEnhancers = composeWithDevTools({});

const rootReducer = combineReducers({
    CamReducer,
    AlertReducer,
    BookingsReducer,
})
const store = createStore(
    rootReducer,
    composeEnhancers(
        applyMiddleware(thunk)

    )
);

export default store