import { writable } from 'svelte/store';

export default writable({
    id: -1,
    authorId: -1,
    title: '',
    type: '',
    lastEditStep: 0
});
