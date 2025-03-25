<script lang="ts">
    import Assignment from './Assignment.svelte';

    let { data } = $props();
    let { dispatcher_data } = $derived(data);
</script>

<Assignment
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
></Assignment>
