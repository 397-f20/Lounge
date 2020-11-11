import React from 'react';
import renderer from 'react-test-renderer';

import Teams from '../../components/Teams'

const auth = {
    uid: "pabaqb6xLONDsFw7zRazRaHMAQ52",
    email: "dwivedisankalp97@gmail.com"
}
const teamId = "-asdfjnasljkdfasdf"

describe('Teams', () => {
    it('has 1 children', async () => {

        const teams = renderer.create(<Teams auth={auth} teamID={teamId} />)
        const tree = teams.toJSON();


        expect(tree.children.length).toBe(6);
        // expect(tree.children[0].children.length).toBe(5);

        // 'Join a Team' button
        expect(tree.children[0].children[0]).toBe('✨ Your Teams ');

        expect(tree.children[1].children.length).toBe(1);
        expect(tree.children[1].children[0].children[0].children[0]).toBe(' Oops, you\'re not part of any teams yet! ');
        // expect(tree.children[1].children[0].children[0].children[1]).toBe(' {"\n\n"} ');
        expect(tree.children[1].children[0].children[0].children[2]).toBe(' Join or create some teams below and send the team ID to your friends!  ');
        
        expect(tree.children[2].children[0]).toBe(' Actions ');

        expect(tree.children[3].children.length).toBe(1);
        expect(tree.children[3].children[0].children[0]).toBe(' 🤝🏿 Join a Team ');

        expect(tree.children[4].children.length).toBe(1);
        expect(tree.children[4].children[0].children[0]).toBe(' 🌱 Create Team ');

        expect(tree.children[5].children.length).toBe(1);

        expect(tree.children[5].children[0].children[0]).toBe(' ✌️ Logout');



    });
});