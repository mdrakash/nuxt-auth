<template>
    <div>
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-md-8 col-lg-6 col-xl-4 py-3">
                    <div class="card overflow-hidden">
                        <div class="bg-primary">
                            <div class="text-primary text-center p-4">
                                <h5 class="text-white font-size-20">Welcome Back !</h5>
                                <p class="text-white-50">Sign in to continue to Veltrix.</p>
                                <a href="index.html" class="logo logo-admin">
                                    <img src="/logo-sm.png" height="24" alt="logo">
                                </a>
                            </div>
                        </div>
                        <div class="card-body">
                            <div class="p-3">
                                <form class="mt-4 needs-validation" novalidate>
                                    <div class="mb-3">
                                        <label class="form-label" for="email">Email</label>
                                        <input type="email" v-model="form.email" class="form-control" 
                                            :class="{'is-invalid':errors?.email}" id="email" placeholder="Enter email">
                                        <div v-if="errors?.email" class="invalid-feedback">
                                            {{errors.email[0]}}
                                        </div>
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label" for="userpassword">Password</label>
                                        <input type="password" v-model="form.password" class="form-control" 
                                            :class="{'is-invalid':errors?.password}" id="userpassword" placeholder="Enter password">
                                        <div v-if="errors?.password" class="invalid-feedback">
                                           {{errors.password[0]}}
                                        </div>
                                    </div>
                                    <div class="mb-3 row">
                                        <div class="col-sm-6">
                                            <div class="form-check">
                                                <input type="checkbox" class="form-check-input" id="customControlInline">
                                                <label class="form-check-label" for="customControlInline">Remember me</label>
                                            </div>
                                        </div>
                                        <div class="col-sm-6 text-end">
                                            <button class="btn btn-primary" @click.prevent="handleSubmit" type="submit">Log In</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div class="mt-5 text-center">
                        <p>Don't have an account ? 
                            <nuxt-link to="/register" class="fw-medium text-primary"> Signup now </nuxt-link> 
                        </p>
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
                email:'vrice@example.org',
                password:'password',
            },
            errors:null,
        }
    },
    methods: {
        async handleSubmit(){
            const auth = useAuthStore();
            try {
                await auth.login(this.form);
                if (auth.isLoggedIn) {
                    navigateTo('/');
                    
                }
            } catch (error) {
                this.errors = error.data.errors;
            }
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
