<template>
  <v-app>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'AuthLayout',
  created() {
    this.$auth.loggedIn ? this.$router.push({ path: "/dashboard" }) : this.$router.push({ path: "/" })
  }
}
</script>
