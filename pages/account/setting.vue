<template>
  <div>
    <HeaderTab icon="mdi-account-cog" back="/dashboard" />
    <v-card class="mx-auto mt-4">
      <v-row>
        <v-col cols="12" class="pt-10">
          <v-img class="mx-auto" width="80" src="/account/user.png"></v-img>
        </v-col>
      </v-row>
      <v-card-text class="text--primary">
        <v-divider class="mb-7 mt-3"></v-divider>
        <form>
          <v-text-field
            v-model="form.firstName"
            :error-messages="firstNameErrors"
            label="ชื่อ"
            required
            @input="$v.form.firstName.$touch()"
            @blur="$v.form.firstName.$touch()"
            outlined
          ></v-text-field>
          <v-text-field
            v-model="form.lastName"
            :error-messages="lastNameErrors"
            label="นามสกุล"
            required
            @input="$v.form.lastName.$touch()"
            @blur="$v.form.lastName.$touch()"
            outlined
          ></v-text-field>
          <v-text-field
            v-model="form.email"
            :error-messages="emailErrors"
            label="อีเมล"
            required
            @input="$v.form.email.$touch()"
            @blur="$v.form.email.$touch()"
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
            outlined
            @click:append="showPassword = !showPassword"
          ></v-text-field>
        </form>
        <v-alert class="mt-2 mb-2" dense outlined type="error" v-if="registerError">
          <span class="body-2"> มีบัญชีอีเมลนี้อยู่ในระบบแล้ว </span>
        </v-alert>
         <v-divider></v-divider>
      </v-card-text>
      <v-card-actions>
        <v-btn
          class="mb-2"
          depressed
          block
          large
          color="deep-purple darken-2"
          dark
          @click="submit"
        >
          <v-icon left> mdi-pencil </v-icon> แก้ไขข้อมูล
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import {
  required,
  email,
  minLength,
  maxLength,
} from "vuelidate/lib/validators";
export default {
  mixins: [validationMixin],
  validations: {
    form: {
      firstName: { required },
      lastName : { required },
      email    : { required, email },
      password : { minLength: minLength(6), maxLength: maxLength(30) },
    },
  },
  data: () => ({
    form: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    showPassword: false,
    registerError: false,
  }),
  mounted() {
    this.form = {
      firstName: this.$auth.user.firstName,
      lastName: this.$auth.user.lastName,
      email: this.$auth.user.email,
      password: this.$auth.user.password
    };
  },
  computed: {
    firstNameErrors() {
      const errors = [];
      if (!this.$v.form.firstName.$dirty) return errors;
      !this.$v.form.firstName.required && errors.push("กรุณากรอกชื่อ");
      return errors;
    },
    lastNameErrors() {
      const errors = [];
      if (!this.$v.form.lastName.$dirty) return errors;
      !this.$v.form.lastName.required && errors.push("กรุณากรอกนามสกุล");
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.form.email.$dirty) return errors;
      !this.$v.form.email.email && errors.push("กรุณากรอกอีเมล");
      !this.$v.form.email.required && errors.push("กรุณากรอกอีเมล");
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.form.password.$dirty) return errors;
      !this.$v.form.password.minLength && errors.push("กรุณากรอกรหัสผ่านระหว่าง 6 ถึง 30 ตัวอักษร");
      !this.$v.form.password.maxLength && errors.push("กรุณากรอกรหัสผ่านระหว่าง 6 ถึง 30 ตัวอักษร");
      return errors;
    },
  },
  methods: {
    async logout() {
      await this.$auth.logout();
      localStorage.removeItem('user')
      this.$router.push('/login')
    },
    async submit() {
      this.$v.form.$touch();
      if (this.$v.form.$pending || this.$v.form.$error) return;
      await this.$store.dispatch("account/update", this.form).then((response) => {
        if (response.message == "Update Successfully") {
            let timerInterval
            this.$swal({ 
              icon: "success", 
              title: "แก้ไขข้อมูลสำเร็จ", 
              html: 'ระบบจะพาท่านไปยังหน้าล๊อกอินในอีก <b></b> วินาที', 
              footer: 'กรุณาล๊อกอิน เพื่อเข้าสู่ระบบอีกครั้ง ',
              showConfirmButton: false, 
              allowOutsideClick: false,
              allowEscapeKey: false,
              allowEnterKey: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: () => {
                  this.$swal.showLoading()
                  timerInterval = setInterval(() => { 
                      this.$swal.getHtmlContainer().querySelector('b').textContent = (this.$swal.getTimerLeft() / 1000).toFixed(0)
                  }, 100)
              },
              willClose: () => {
                  clearInterval(timerInterval)
              }
            })
            setTimeout(() => this.$auth.logout(), 3500)
        }
      }).catch((error) => (this.registerError = true));
    },
  },
};
</script>

<style></style>
