import React from 'react';
import renderer from 'react-test-renderer';

import LoginForm from '../../components/Login'

describe('<LoginForm />', () => {
    it('has 1 child', () => {
      const login = renderer.create(<LoginForm/>)
      const tree = login.toJSON();
      // console.log(tree)
      // console.log(tree.children[0].children)
      expect(tree.children.length).toBe(1);
    });
  });

  function forEach(items, callback) {
    for (let index = 0; index < items.length; index++) {
      callback(items[index]);
    }
  }

  const voteToClose = () => {
    var voteRef = firebase.database().ref('/lobby/users/' + user.uid);
    voteRef.update({ voteToClose: "true" });
    setMyVote(true);
}



  const mockCallback = jest.fn(x => 42 + x);
  forEach([0, 1], mockCallback);

  // The mock function is called twice
  expect(mockCallback.mock.calls.length).toBe(2);

  // The first argument of the first call to the function was 0
  expect(mockCallback.mock.calls[0][0]).toBe(0);

  // The first argument of the second call to the function was 1
  expect(mockCallback.mock.calls[1][0]).toBe(1);

  // The return value of the first call to the function was 42
  expect(mockCallback.mock.results[0].value).toBe(42);