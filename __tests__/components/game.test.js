import React from 'react';
import TestRenderer from 'react-test-renderer';
const { act } = TestRenderer;

import Game from '../../components/Game'

const jitsiLink = "asdlkfnaspldkm"
const gameName = "Guess Heights"

describe('<Game />', () => {
    it('has 2 children', () => {
        let game = TestRenderer.create(<Game jitsiLink={jitsiLink} gameName={gameName} />)
        const tree = game.toJSON();
        // console.log(tree)
        // console.log(tree.children[1])
        // console.log(tree.children[1].children[0])
        expect(tree.children.length).toBe(2);
        expect(tree.children[0].children.length).toBe(2);
        expect(tree.children[1].children.length).toBe(2);
        expect(tree.children[1].children[0]).toBe('Join: https://meet.jit.si/');
        expect(tree.children[1].children[1]).toBe(jitsiLink);
    });
});