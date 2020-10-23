import React from 'react';
import renderer from 'react-test-renderer';
//import App from '../../App'
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

  function isLobbyClosed (lobby, callback) {
    if (lobby) {
      var arr = lobby.filter(user => user.voteToClose == "false")
      callback(arr.length == 0 && lobby.length > 1);
    }
    callback(false);
  }

const lobby = Object.values([
  {
    "firstName": "Grady",
    "lastName": "Wetherbee",
    "status": "left",
    "voteToClose": false
  },
  {
    "firstName": "Han",
    "status": "joined",
    "voteToClose": false
  },
  {
    "last_changed": 1603482428537,
    "status": "online1234",
    "voteToClose": "false"
  }
])

  const mockCallback = jest.fn(lobby => lobby);
  isLobbyClosed(lobby, mockCallback);

  // The mock function is called twice
  console.log(mockCallback.mock.calls);
  expect(mockCallback.mock.calls.length).toBe(2);

  // // The first argument of the first call to the function was 0
  expect(mockCallback.mock.calls[0][0]).toBe(false);

  // // The first argument of the second call to the function was 1
  // expect(mockCallback.mock.calls[1][0]).toBe(1);

  // // The return value of the first call to the function was 42
  // expect(mockCallback.mock.results[0].value).toBe(42);