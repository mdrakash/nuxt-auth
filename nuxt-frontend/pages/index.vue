<template>
    <div>
        <p v-if="user">{{ user.name }}</p>
    </div>
</template>

<script>

export default {
    setup() {
        definePageMeta({
            middleware: ['auth'],
        });
        useHead({
            title:'home',
        });
    },
    data() {
        return {
            user:null,
        }
    },
    mounted() {
        const auth = useAuthStore();
        this.user = auth.user;
    },
}
</script>