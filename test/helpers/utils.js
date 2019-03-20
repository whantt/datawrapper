/**
 * simulates a click while pressing ctrl-key
 * @param element - DOM element on which to dispatch the event
 */
function clickEvent(element, { ctrl, alt, shift, meta }) {
    const evt = document.createEvent('MouseEvents');
    evt.initMouseEvent(
        'click', // type
        true, // canBubble
        true, // cancelable
        window, // view
        0, // detail (click count)
        0, // screenX
        0, // screenY
        80, // clientX
        20, // clientY
        ctrl, // ctrlKey
        alt, // altKey
        shift, // shiftKey
        meta, // metaKey
        0, // button
        null // relatedTarget
    );
    element.dispatchEvent(evt);
}

/**
 * simulates a KeyboardEvent
 * @param element - DOM element on which to dispatch the event
 * @param key - the key representation, e.g. "x" or "Enter"
 * @param type - the keyevent type, defaults to "keypress"
 */
function keyEvent(element, key, type) {
    const event = new window.KeyboardEvent(type || 'keypress', { bubbles: true, cancelable: true, key });
    element.dispatchEvent(event);
}

module.exports = {
    clickEvent,
    keyEvent
};
