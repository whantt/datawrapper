/* eslint no-new: 0 */

import test from 'ava';
import BaseNumber from './BaseNumber.html';
// import { keyEvent } from '../../test/helpers/utils';

test.beforeEach(t => {
    t.context = document.createElement('div');
    document.body.innerHTML = '';
    document.body.appendChild(t.context);
});

test('Render number input with slider by default', t => {
    new BaseNumber({
        target: t.context
    });

    t.truthy(t.context.querySelector('input[type=range]'));
    t.truthy(t.context.querySelector('input[type=number]'));
});

test('Render number input without slider', t => {
    new BaseNumber({
        target: t.context,
        data: { slider: false }
    });

    t.falsy(t.context.querySelector('input[type=range]'));
    t.truthy(t.context.querySelector('input[type=number]'));
});

test('Render number input with unit', t => {
    new BaseNumber({
        target: t.context,
        data: { unit: 'px' }
    });

    t.truthy(t.context.querySelector('span.unit'));
    t.is(t.context.querySelector('span.unit').innerHTML, 'px');
});

test('Render number input button with initial value', t => {
    new BaseNumber({
        target: t.context,
        data: { value: 42 }
    });

    t.is(t.context.querySelector('input[type=range]').value, '42');
    t.is(t.context.querySelector('input[type=number]').value, '42');
});

test('Updating the value programatically', t => {
    const app = new BaseNumber({
        target: t.context,
        data: { value: 0 }
    });

    app.set({ value: 42 });
    t.is(t.context.querySelector('input[type=range]').value, '42');
    t.is(t.context.querySelector('input[type=number]').value, '42');
});

// test('Updating the value in the number input', t => {
//     new BaseNumber({
//         target: t.context,
//     });

//     const numberInput = t.context.querySelector('input[type=number]');
//     numberInput.focus();
//     console.log(window.KeyboardEvent);
//     keyEvent(numberInput, '4');
//     keyEvent(numberInput, '2');
//     t.is(t.context.querySelector('input[type=number]').value, '42');
//     t.is(t.context.querySelector('input[type=range]').value, '42');
// });
