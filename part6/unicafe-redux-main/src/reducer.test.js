import deepFreeze from 'deep-freeze'
import counterReducer from './reducer'

describe('unicafe reducer', () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0
  }

  test('should return a proper initial state when called with undefined state', () => {
    const state = {}
    const action = {
      type: 'DO_NOTHING'
    }

    const newState = counterReducer(undefined, action)
    expect(newState).toEqual(initialState)
  })

  test('good is incremented', () => {
    const action = {type : 'GOOD'}, state = initialState;

    deepFreeze(state);

    expect(counterReducer(state, action)).toEqual({good : 1, ok : 0, bad : 0});
  })

  test("bad is incremented", () => {
    const action = {type : "BAD"}, state = initialState;

    deepFreeze(state);

    expect(counterReducer(state, action)).toEqual({good : 0, bad : 1, ok : 0});
  });

  test("ok is incremented", () => {
    const action = {type : "OK"}, state = initialState;

    deepFreeze(state);

    expect(counterReducer(state, action)).toEqual({good : 0, bad : 0, ok : 1});
  });

  test("All the states are changed to the initial state", () => {
    const action = {type : "ZERO"}, state = {good : 1, bad : 2, ok : 3};

    deepFreeze(state);

    expect(counterReducer(state, action)).toEqual(initialState);
  });
})