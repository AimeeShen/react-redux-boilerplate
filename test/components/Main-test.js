import DomMock from '../helpers/dom-mock';
import jsdom from 'mocha-jsdom';
import assert from 'assert';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import Main from '../../src/components/Main';

DomMock('<html><body></body></html>');

describe('Testing Main Component', () => {
    jsdom({ skipWindowCheck: true });

    it('should contain text: Hello World', () => {
        const content = TestUtils.renderIntoDocument(
            <Main />
        );
        const title = TestUtils.findRenderedDOMComponentWithTag(content, 'h1');

        assert.equal(title.textContent, 'Hello World');
    });
});
