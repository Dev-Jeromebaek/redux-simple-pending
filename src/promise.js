import { Map, fromJS, merge } from 'immutable';

const promisePending = obj =>
  Object.values(obj).some(value => value === true);

const promiseTypes = {
  PENDING: 'PENDING',
  FAILURE: 'FAILURE',
  ENDING: 'ENDING',
};

const promiseCreators = {
  pending: payload => {
    return { type: promiseTypes.PENDING, payload };
  },
  failure: payload => {
    return { type: promiseTypes.FAILURE, payload };
  },
  ending: payload => {
    return { type: promiseTypes.ENDING, payload };
  },
};

const promiseState = {
  pending: {},
  error: null,
};

const promiseReducer = {
  pending: (state, action) => {
    return {
      ...state,
      pending: {
        ...state.pending,
        [action.payload.type]: true,
      },
    };
  },
  failure: (state, action) => {
    return {
      ...state,
      error: action.payload.error,
      pending: {
        ...state.pending,
        [action.payload.type]: false,
      },
    };
  },
  ending: (state, action) => {
    return {
      ...state,
      pending: {
        ...state.pending,
        [action.payload.type]: false,
      },
    };
  },
};

/**
 * ! USE IMMUTABLE
 * @export { immutablePromiseState, immutablePromiseReducer }
 */
const immutablePromiseState = Map({
  pending: Map({}),
  error: null,
});

const immutablePromiseReducer = {
  pending: (state, action) => {
    return state.set(
      'pending',
      merge(state.get('pending'), fromJS({ [action.payload.type]: true })),
    );
  },
  failure: (state, action) => {
    return state
      .set('error', action.payload.error)
      .setIn(['pending', action.payload.type], false);
  },
  ending: (state, action) => {
    return state.setIn(['pending', action.payload.type], false);
  },
};

export default {
  promisePending,
  promiseTypes,
  promiseState,
  promiseReducer,
  immutablePromiseState,
  immutablePromiseReducer,
};
