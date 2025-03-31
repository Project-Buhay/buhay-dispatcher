<script lang="ts">
    import AssignmentPanel from '$lib/components/panels/AssignmentPanel.svelte';
    import NavBar from '$lib/components/nav/NavBar.svelte';

    let { data } = $props();
    let { rescuers } = $derived(data);
</script>

<AssignmentPanel {rescuers}></AssignmentPanel>

<div class="fixed top-0 left-0 z-50">
    <NavBar />
</div>
