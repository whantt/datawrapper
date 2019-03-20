/* eslint no-new: 0 */

import test from 'ava';
import BaseDropdown from './BaseDropdown.html';

test.beforeEach(t => {
    t.context = document.createElement('div');
    document.body.innerHTML = '';
    document.body.appendChild(t.context);
});

test('Render dropdown button, but no content', t => {
    new BaseDropdown({
        target: t.context
    });

    t.truthy(t.context.querySelector('.base-drop-btn'));
    t.notRegex(t.context.innerHTML, /Content/);
});

test('Render dropdown content if visible initialy', t => {
    new BaseDropdown({
        target: t.context,
        data: { visible: true }
    });

    t.regex(t.context.innerHTML, /Content/);
});

test('Reveal dropdown content on button click', t => {
    new BaseDropdown({
        target: t.context
    });

    t.notRegex(t.context.innerHTML, /Content/);
    t.context.querySelector('.base-drop-btn').click();
    t.regex(t.context.innerHTML, /Content/);
});

test('Hide dropdown content on button click', t => {
    new BaseDropdown({
        target: t.context,
        data: { visible: true }
    });

    t.regex(t.context.innerHTML, /Content/);
    t.context.querySelector('.base-drop-btn').click();
    t.notRegex(t.context.innerHTML, /Content/);
});

test('Hide dropdown content on window click', t => {
    new BaseDropdown({
        target: t.context,
        data: { visible: true }
    });

    t.regex(t.context.innerHTML, /Content/);
    document.body.click();
    t.notRegex(t.context.innerHTML, /Content/);
});

test('Dont reveal dropdown content on window click', t => {
    new BaseDropdown({
        target: t.context,
        data: { visible: false }
    });

    t.notRegex(t.context.innerHTML, /Content/);
    document.body.click();
    t.notRegex(t.context.innerHTML, /Content/);
});
