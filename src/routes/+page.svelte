<script lang="ts">
    import AssignmentPanel from '$lib/components/panels/AssignmentPanel.svelte';
    import NavBar from '$lib/components/nav/NavBar.svelte';

    let { data } = $props();
    let { rescuers } = $derived(data);
</script>

<AssignmentPanel {rescuers}></AssignmentPanel>

<div class="fixed right-4 bottom-16 z-50 w-auto lg:top-0 lg:left-0 lg:h-0">
    <NavBar />
</div>
