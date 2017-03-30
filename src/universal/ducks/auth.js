import Immutable from 'immutable';

const initalState = Immutable.fromJS({
  user: {}
});

export default function reducer (state = initalState, action) {
  switch(action.type) {
    default:
      return state;
  }
} ;
