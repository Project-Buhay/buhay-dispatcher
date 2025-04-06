<script lang="ts">
    import AssignmentPanel from '$lib/components/panels/AssignmentPanel.svelte';
    import NavBar from '$lib/components/nav/NavBar.svelte';

    let { data } = $props();
    let { rescuers } = $derived(data);
</script>

<AssignmentPanel {rescuers}></AssignmentPanel>

<div class="fixed bottom-16 right-4 z-50 w-auto lg:left-0 lg:top-0 lg:h-0">
    <NavBar />
</div>
