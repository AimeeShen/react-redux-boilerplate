import React from 'react';
import { shallow } from 'enzyme';
import Main from '../index';

describe('Main Component', () => {
    it('Main component renders hello world', () => {
        const main = shallow(<Main />);
        expect(main.find('h1').text()).toEqual('Hello World');
    });
});
