/**
 * simulates a click while pressing ctrl-key
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

module.exports = {
    clickEvent
};
