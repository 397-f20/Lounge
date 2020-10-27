import React from 'react';
import renderer from 'react-test-renderer';

import Lobby from '../../components/Lobby'

describe('<Lobby />', () => {
    it('has 1 child', () => {
      const login = renderer.create(<Lobby/>)
      const tree = login.toJSON();
      // console.log(tree)
      // console.log(tree.children[0].children)
      expect(tree.children.length).toBe(1);
    });
  });