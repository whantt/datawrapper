import { writable } from 'svelte/store';

export default writable({
    step: '',
    stepIndex: 0,
    steps: []
});
