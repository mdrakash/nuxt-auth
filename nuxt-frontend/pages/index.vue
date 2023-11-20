<template>
    <div>
        <p v-if="user">{{ user.name }}</p>
    </div>
</template>

<script>
export default {
    data() {
        return {
            user:null,
        }
    },
    async mounted() {
        await useApiFetch('/sanctum/csrf-cookie');
        const {data} = await useApiFetch('/api/user',{
            method:'get',
            headers:{
                'Accept':'application/json',
            },            
        })
        this.user = data.value;
    },
}
</script>