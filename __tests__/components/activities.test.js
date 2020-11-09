import React from 'react';
import renderer from 'react-test-renderer';

import Activities from '../../components/Activities'

describe('<Lobby />', () => {
    it('has 4 children', async () => {
        const activities = renderer.create(<Activities />)
        const tree = activites.toJSON();
        console.log(tree)

      expect(tree.children.length).toBe(4);
    });
  });