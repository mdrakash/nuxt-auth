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
    let isLoggedIn = ref(false);
    async function fetchUser() {
        const data = await $fetch('http://127.0.0.1:8000/api/user',{
            headers:{
                'Accept':'application/json',
            }
        });
        user.value = data as User;
    }
    async function logout() {
        await useApiFetch('/logout',{method:'POST'});
        user.value = null;
        navigateTo('/login');
    }
    async function login(credentials : Credential){
        try {
            const login = await $fetch('http://127.0.0.1:8000/api/login',{
                method:'post',
                body:credentials
            });
            isLoggedIn.value = true;
            // await fetchUser();
            return login;
        } catch (error) {
            throw error;
        }
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