import React from 'react';
import renderer from 'react-test-renderer';

import CreateTeam from '../../components/CreateTeam'

const auth = {
    uid: "cOfHfQFug1QvYCN2KWV5bWGttOf2",
    email: "j@z.com"
}
const teamId = "-asdfjnasljkdfasdf"
const rount = "joinTeam"

describe('<CreateTeam />', () => {
  it('has 1 children', async() => {
    const createTeam = renderer.create(<CreateTeam auth={auth} teamID={teamId} />)
    const tree = createTeam.toJSON();
    
    // JoinTeam render
    expect(tree.children.length).toBe(1);
    expect(tree.children[0].children.length).toBe(5);
    
    // 'Join a Team' button
    expect(tree.children[0].children[0].children[0]).toBe(' 🌱 Create a Team ');
    // Text input
    // expect(tree.children[0].children[1].lenght).toBe(1);
    // Back button
    expect(tree.children[0].children[3].children[0].children[0]).toBe('Create Team');
    expect(tree.children[0].children[4].children[0].children[0]).toBe('Back');
  });
});