<script lang="ts">
    import AssignmentPanel from '$lib/components/panels/AssignmentPanel.svelte';

    let { data } = $props();
    let { rescuers } = $derived(data);
</script>

<AssignmentPanel {rescuers}></AssignmentPanel>
