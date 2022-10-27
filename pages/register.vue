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
                    v-model="form.firstName"
                    :error-messages="firstNameErrors"
                    label="ชื่อ"
                    required
                    @input="$v.form.firstName.$touch()"
                    @blur="$v.form.firstName.$touch()"
                    @keyup.enter="submit"
                    outlined
                ></v-text-field>
                 <v-text-field
                    v-model="form.lastName"
                    :error-messages="lastNameErrors"
                    label="นามสกุล"
                    required
                    @input="$v.form.lastName.$touch()"
                    @blur="$v.form.lastName.$touch()"
                    @keyup.enter="submit"
                    outlined
                ></v-text-field>
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
            <v-alert class="mt-2 mb-2" dense outlined type="error" v-if="registerError">
              <span class="body-2"> มีบัญชีอีเมลนี้อยู่ในระบบแล้ว </span>
            </v-alert>
          </v-card-text>
          <v-card-actions>
            <v-row>
              <v-col cols="12">
                <v-btn depressed block large color="deep-purple darken-2" dark @click="submit"> สมัครสมาชิก </v-btn>
              </v-col>
              <v-col cols="12">
                มีบัญชีอยู่แล้ว? <NuxtLink to="/login"> เข้าสู่ระบบ </NuxtLink>
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
import { required, email, minLength, maxLength } from "vuelidate/lib/validators";
export default {
  layout: "auth",
  auth: false,
  mixins: [validationMixin],
  validations: {
    form :{
      firstName : { required },
      lastName  : { required },
      email     : { required, email },
      password  : { required, minLength: minLength(6), maxLength: maxLength(30) }
    }
  },
  data: () => ({
    form : {
      firstName: "",
      lastName: "",
      email: "",
      password: ""
    },
    showPassword: false,
    registerError: false
  }),
  computed: {
    firstNameErrors () {
      const errors = []
      if (!this.$v.form.firstName.$dirty) return errors
      !this.$v.form.firstName.required && errors.push('กรุณากรอกชื่อ')
      return errors
    },
    lastNameErrors () {
      const errors = []
      if (!this.$v.form.lastName.$dirty) return errors
      !this.$v.form.lastName.required && errors.push('กรุณากรอกนามสกุล')
      return errors
    },
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
      !this.$v.form.password.minLength && errors.push("กรุณากรอกรหัสผ่านระหว่าง 6 ถึง 30 ตัวอักษร");
      !this.$v.form.password.maxLength && errors.push("กรุณากรอกรหัสผ่านระหว่าง 6 ถึง 30 ตัวอักษร");
      return errors;
    }
  },
  methods: {
    async submit () {
      this.$v.form.$touch()
      if (this.$v.form.$pending || this.$v.form.$error) return
      await this.$store.dispatch("account/register", this.form).then(response => {
        if (response.message == "Registration successful") {
          this.$swal({ icon: "success", title: "ลงทะเบียนสำเร็จ", showConfirmButton: false, timer: 1000 });
          setTimeout(() => this.$router.push("/login"), 1500);
        }
      }).catch(error => this.registerError = true);
    }
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
