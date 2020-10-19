import React from 'react';
import renderer from 'react-test-renderer';

import LoginForm from '../../components/Login'

describe('<LoginForm />', () => {
    it('has 1 child', () => {
      const login = renderer.create(<LoginForm/>)
      const tree = login.toJSON();
      console.log(tree)
      console.log(tree.children[0].children)
      expect(tree.children.length).toBe(1);
    });
  });