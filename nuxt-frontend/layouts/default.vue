<template>
  <div>
    <div class="container">
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">Nuxt 3</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <NuxtLink class="nav-link" activeClass="active" to="/">Index</NuxtLink>
              </li>
              <li class="nav-item" v-if="!auth?.isLoggedIn">
                <NuxtLink class="nav-link" activeClass="active" to="/login">Login</NuxtLink>
              </li>
              <li class="nav-item">
                <NuxtLink class="nav-link" activeClass="active" to="/register">Registration</NuxtLink>
              </li>
            </ul>
            <button v-if="auth?.isLoggedIn" @click="handleLogout" 
              class="btn btn-outline-danger" type="button">
              Logout
            </button>
          </div>
        </div>
      </nav>
      <main>
        <slot/>
      </main>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        auth:null
      }
    },
    mounted() {
      const auth = useAuthStore();
      this.auth = auth;
    },
    methods: {
      async handleLogout(){
        await this.auth.logout()
      }
    },
  }
</script>