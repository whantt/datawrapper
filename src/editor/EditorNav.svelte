<:Window on:popstate='popstate(event)'/>

<div class="create-nav">
    {#each $nav.steps as step,i}
    <EditorNavStep on:select="select(step, i)" index="{i+1}" {step} />
    {/each}
</div>

{#if $user.id != $chart.authorId && $user.isAdmin}
<div class="alert alert-warning" style="text-align:center;margin-top:10px;">
    This chart belongs to
    <a target="_blank" href="/admin/chart/by/{$chart.authorId}">User {$chart.authorId}</a>. Great power comes with great responsibility, so be careful with what
    you're doing!
</div>
{/if}

<style type="text/css">
    .create-nav {
        display: flex;
        justify-content: space-between;
    }
</style>
<script>
    import EditorNavStep from './EditorNavStep.html';
    import {nav, user, chart } from './store';

    import _findWhere from 'underscore-es/findWhere';
    import { trackPageView } from '../shared/analytics';
    import { onMount } from 'svelte`';

    export let active = 0;
    export let steps = [];

    const select = (step, index) => {
        this.set({ active: step.id });
        const { lastEditStep } = this.store.get();
        //this.store.set({ lastEditStep: Math.max(lastEditStep, index + 1) });
        // trackPageView();
    };

    const popstate = (event) => {
        if (event.state && event.state.id && event.state.step) {
            const { id, step } = event.state;
            if (id === this.store.get().id) {
                // same chart id
                active = step.id;
                trackPageView();
            } else {
                // need to reload
                window.location.href = `/edit/${id}/${step.id}`;
            }
        }
    };

    onMount(() => {
        const { lastEditStep, id } = this.store.get();
        const step = _findWhere(steps, { id: active });
        this.store.set({ lastEditStep: Math.max(lastEditStep, steps.indexOf(step) + 1) });
        // make sure the initial state is stored
        window.history.replaceState({ step, id }, step.title);
    })

</script>
