<script lang="ts">
    import AssignmentPanel from '$lib/components/panels/AssignmentPanel.svelte';

    let { data } = $props();
    let { dispatcher_data, rescuers } = $derived(data);
</script>

<AssignmentPanel {dispatcher_data} {rescuers}></AssignmentPanel>
