import { writable } from 'svelte/store';

export default writable({
    id: -1,
    email: 'guest@datawrapper.de',
    name: 'Guest',
    isAdmin: false
});
