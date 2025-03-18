<script>
    import Assignment from './Assignment.svelte';
</script>

<Assignment
    dispatch_data={[
        {
            request_id: 'first',
            coordinate_names: ['Melchor', 'Palma', 'IMath', 'NIP'],
        },

        {
            request_id: 'second',
            coordinate_names: ['UP', 'Ateneo', 'DLSU', 'UST'],
        },
    ]}
    rescuers={[
        {
            person_id: '12',
            username: 'KevinSogo',
        },
        {
            person_id: '13',
            username: 'JeromeBeltran',
        },
    ]}
></Assignment>
