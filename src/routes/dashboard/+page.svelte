<script lang="ts">
    import AssignmentPanel from '$lib/components/panels/AssignmentPanel.svelte';

    let { data } = $props();
    let { dispatcher_data } = $derived(data);
</script>

<AssignmentPanel
    rescuers={[
        {
            person_id: 12,
            username: 'KevinSogo',
        },
        {
            person_id: 13,
            username: 'JeromeBeltran',
        },
    ]}
    {dispatcher_data}
></AssignmentPanel>
