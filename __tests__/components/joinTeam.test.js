import React from 'react';
import renderer from 'react-test-renderer';

import JoinTeam from '../../components/JoinTeam'

const auth = {
    uid: "cOfHfQFug1QvYCN2KWV5bWGttOf2",
    email: "j@z.com"
}
const teamId = "-asdfjnasljkdfasdf"
const rount = "joinTeam"

describe('<JoinTeam />', () => {
    it('has 1 children', () => {
      const login = renderer.create(<JoinTeam auth={auth} teamID={teamId} />)
      const tree = login.toJSON();
      // console.log(tree)
      // console.log(tree.children[0].children)
      expect(tree.children.length).toBe(1);
    });
  });