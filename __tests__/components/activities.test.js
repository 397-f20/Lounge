import React from 'react';
import renderer from 'react-test-renderer';

import Activities from '../../components/Activities'

describe('<Lobby />', () => {
    it('has 1 child', async () => {
        const activities = renderer.create(<Activities />)
        const tree = activities.toJSON();

      expect(tree.children.length).toBe(1);
    });
  });