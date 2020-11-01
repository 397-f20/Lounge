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
    const joinTeam = renderer.create(<JoinTeam auth={auth} teamID={teamId} />)
    const tree = joinTeam.toJSON();
    
    // JoinTeam render
    expect(tree.children.length).toBe(1);
    expect(tree.children[0].children.length).toBe(3);
    
    // 'Team ID' filed
    expect(tree.children[0].children[0].children[0]).toBe(' Team ID ');
    // Text input
    // expect(tree.children[0].children[1].lenght).toBe(1);
    // Join buttom
    expect(tree.children[0].children[2].children[0].children[0]).toBe('Join Team');
  });
});