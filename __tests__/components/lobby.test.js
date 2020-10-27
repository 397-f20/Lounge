import React from 'react';
import renderer from 'react-test-renderer';

import Lobby from '../../components/Lobby'

const auth = {
    uid: "83ISLPPLMKhc9JRVqcgHjgxdxIi2",
    email: "drew@parsons.net"
}
const teamId = "-asdfjnasljkdfasdf"
const teamInfo = [{
    firstName: "Drew",
    lastName: "Parsons",
    status: "online",
    voteToClose: "false"
}]

describe('<Lobby />', () => {
    it('has 1 child', () => {
      const login = renderer.create(<Lobby auth={auth} teamID={teamId} teamInfo={teamInfo} />)
      const tree = login.toJSON();
      // console.log(tree)
      // console.log(tree.children[0].children)
      expect(tree.children.length).toBe(4);
    });
  });