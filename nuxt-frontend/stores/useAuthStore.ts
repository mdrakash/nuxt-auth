import {defineStore} from 'pinia';
type User = {
    id:number;
    name:string;
    email:string;
}
type Credential = {
    email:string;
    password:string;
}
type RegistrationData = {
    email:string;
    name:string;
    password:string;
    password_confirmation:string;
}
export const useAuthStore = defineStore('auth', () => {
    const user = ref<User | null> (null);
    const isLoggedIn = computed(() => !!user.value);

    async function fetchUser() {
        const {data} = await useApiFetch('/api/user');
        user.value = data.value as User;
    }
    async function logout() {
         await useApiFetch('/logout',{method:'POST'});
         user.value = null;
         navigateTo('/login');
    }
    async function login(credentials : Credential){
        await useApiFetch('/sanctum/csrf-cookie');
        const login = await useApiFetch('/login',{
            method:'post',
            body:credentials
        });
        
        await fetchUser();

        return login;
    }
    async function register(data : RegistrationData){
        await useApiFetch('/sanctum/csrf-cookie');
        const login = await useApiFetch('/register',{
            method:'post',
            body:data
        });
        
        await fetchUser();

        return register;
    }
    return { user,login,isLoggedIn,fetchUser,logout,register }
})