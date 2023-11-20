<template>
    <div>
        <div class="account-pages pt-5">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-md-8 col-lg-6 col-xl-4">
                        <div class="card overflow-hidden">
                            <div class="bg-primary">
                                <div class="text-primary text-center p-4">
                                    <h5 class="text-white font-size-20">Free Register</h5>
                                    <p class="text-white-50">Get your free Veltrix account now.</p>
                                    <a href="index.html" class="logo logo-admin">
                                        <img src="/logo-sm.png" height="24" alt="logo">
                                    </a>
                                </div>
                            </div>
                            <div class="card-body p-4">
                                <div class="p-3">
                                    <form class=" mt-4" action="index.html">
                                        <div class="mb-3">
                                            <label class="form-label" for="useremail">Email</label>
                                            <input type="email" v-model="form.email" class="form-control" id="useremail" placeholder="Enter email">
                                        </div>
                                        <div class="mb-3">
                                            <label class="form-label" for="name">Name</label>
                                            <input type="text" v-model="form.name" class="form-control" id="name" placeholder="Enter Name">
                                        </div>
                                        <div class="mb-3">
                                            <label class="form-label" for="userpassword">Password</label>
                                            <input type="password" v-model="form.password" class="form-control" id="userpassword" placeholder="Enter password">
                                        </div>
                                        <div class="mb-3">
                                            <label class="form-label" for="confirmpassword">Password</label>
                                            <input type="password" v-model="form.password_confirmation" class="form-control" id="confirmpassword" placeholder="Confirm password">
                                        </div>
                                        <div class="mb-3 row">
                                            <div class="col-12 text-end">
                                                <button class="btn btn-primary" @click.prevent="handleSubmit" type="submit">Register</button>
                                            </div>
                                        </div>
                                        <div class="mt-2 mb-0 row">
                                            <div class="col-12 mt-4">
                                                <p class="mb-0">By registering you agree to the Veltrix <a href="#" class="text-primary">Terms of Use</a></p>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div class="mt-5 text-center">
                            <p>Already have an account ? <nuxt-link to="/login" class="fw-medium text-primary"> Login </nuxt-link> </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            form:{
                email:null,
                name:null,
                password:null,
                password_confirmation:null,
            }
        }
    },
    methods: {
        async handleSubmit(){
            await useApiFetch('/sanctum/csrf-cookie');
            await useFetch('/register',{
                method:'post',
                body:this.form,
                onResponse({ request, response, options }) {
                    if(response.ok){
                        navigateTo('/');
                    }else{
                        console.log('error');
                    }
                },
            })
        }
    },
}
</script>

<style scoped>
.logo-admin {
    position: absolute;
    left: 0;
    right: 0;
    margin: 0px auto;
    width: 74px;
    height: 74px;
    line-height: 74px;
    background: white;
    border-radius: 50%;
    border-bottom: 2px solid green;
}
</style>
