<template>
  <v-container fluid class="center-screen">
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="mx-auto" elevation="0">
          <div class="d-flex justify-center">
            <v-img contain max-height="250" src="/logo.png"></v-img>
          </div>
          <v-card-title primary-title class="justify-center">
            <h3> Welcome to Healthy</h3>
          </v-card-title>
          <v-card-subtitle class="my-2">
            <h4> application </h4>
          </v-card-subtitle>
          <v-card-text class="text-center">
            <form>
                <v-text-field
                    v-model="form.email"
                    :error-messages="emailErrors"
                    label="อีเมล"
                    required
                    @input="$v.form.email.$touch()"
                    @blur="$v.form.email.$touch()"
                    @keyup.enter="submit"
                    outlined
                ></v-text-field>
                <v-text-field
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="showPassword ? 'text' : 'password'"
                    v-model="form.password"
                    :error-messages="passwordErrors"
                    label="รหัสผ่าน"
                    required
                    @input="$v.form.password.$touch()"
                    @blur="$v.form.password.$touch()"
                    @keyup.enter="submit"
                    outlined
                    @click:append="showPassword = !showPassword"
                ></v-text-field>
            </form>
            <v-alert class="mt-2 mb-5" dense outlined type="error" v-if="loginError">
              <span class="body-2"> อีเมล หรือ รหัสผ่านไม่ถูกต้อง </span>
            </v-alert>
            <v-flex>
              <v-btn depressed block large color="deep-purple darken-2" dark @click="submit"> เข้าสู่ระบบ </v-btn>
              <v-row class="my-3">
                <v-col cols="12">
                  <NuxtLink to="/forgot-password"> ลืมรหัสผ่าน </NuxtLink>
                </v-col>
              </v-row>
              <v-row wrap no-gutters class="mt-2">
                  <v-col cols="5" class="text-center mt-3">
                      <v-divider />
                  </v-col>
                  <v-col cols="2" class="text-center"> หรือ </v-col>
                  <v-col cols="5" class="text-center mt-3">
                      <v-divider />
                  </v-col>
              </v-row>
            </v-flex>
          </v-card-text>
          <v-card-actions>
            <v-row>
              <v-col cols="12">
                ไม่มีบัญชี? <NuxtLink to="/register"> สมัครสมาชิก </NuxtLink>   
              </v-col>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, email } from "vuelidate/lib/validators";
export default {
  layout: "auth",
  auth: false,
  mixins: [validationMixin],
  validations: {
    form :{
      email   : { required, email },
      password: { required }
    }
  },
  data: () => ({
    form : {
      email: "",
      password: ""
    },
    showPassword: false,
    loginError: false
  }),
  computed: {
    emailErrors () {
      const errors = []
      if (!this.$v.form.email.$dirty) return errors
      !this.$v.form.email.email && errors.push('กรุณากรอกอีเมล')
      !this.$v.form.email.required && errors.push('กรุณากรอกอีเมล')
      return errors
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.form.password.$dirty) return errors;
      !this.$v.form.password.required && errors.push("กรุณากรอกรหัสผ่าน");
      return errors;
    }
  },
  methods: {
    async submit() {
      this.$v.form.$touch()
      if (this.$v.form.$pending || this.$v.form.$error) return
      await this.$auth.loginWith('local', { data: this.form }).then(() => this.$router.push('/dashboard')).catch(error => this.loginError = true)
    },
  }
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
