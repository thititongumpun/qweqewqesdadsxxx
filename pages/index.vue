<template>
  <v-container fluid class="center-screen">
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="mx-auto" elevation="0">
          <div class="d-flex justify-center">
            <v-img contain max-height="250" src="/logo.png"></v-img>
          </div>
          <v-card-title primary-title class="justify-center">
            <h3>Welcome to Healthy</h3>
          </v-card-title>
          <v-card-subtitle class="my-2">
            <h4>application</h4>
          </v-card-subtitle>
          <v-card-actions>
            <v-row>
              <v-col cols="12">
                <NuxtLink to="/register">
                  <v-btn
                    depressed
                    block
                    large
                    color="deep-purple darken-2"
                    dark
                  >
                    สมัครสมาชิก
                  </v-btn>
                </NuxtLink>
              </v-col>
              <v-col cols="12">
                <NuxtLink to="/login">
                  <v-btn depressed outlined block large> เข้าสู่ระบบ </v-btn>
                </NuxtLink>
              </v-col>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  layout: "auth",
  auth: false,
  mounted() {
    window.$OneSignal.push(() => {
      window.$OneSignal.getUserId(function (userId) {
        console.log("OneSignal User ID:", userId);
      });
    });
  },
};
</script>

<style>
.center-screen {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-height: 100vh;
}
</style>
