<template>
  <v-container fluid class="center-screen">
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="mx-auto" elevation="0">
          <div class="d-flex justify-center">
            <v-img contain max-height="250" src="/logo.png"></v-img>
          </div>
          <v-card-title primary-title class="justify-center">
            <h3> Welcome to Healthy </h3>
          </v-card-title>
          <v-card-subtitle class="my-2">
            <h4> application </h4>
          </v-card-subtitle>
          <v-card-text class="text-center">
            <p> กรุณาใส่อีเมลของคุณด้านล่าง เราจะทำการส่งลิ้งค์เพื่อตั้งรหัสผ่านใหม่ไปยังอีเมลของคุณ </p> 
            <form>
              <v-text-field
                v-model="form.email"
                :error-messages="emailErrors"
                label="อีเมล"
                required
                @input="$v.form.email.$touch()"
                @blur="$v.form.email.$touch()"
                @keyup.enter="login"
                outlined
              ></v-text-field>
            </form>
          </v-card-text>
          <v-card-actions class="ma-2">
            <v-row>
              <v-col cols="12">
                <v-btn
                  depressed
                  block
                  large
                  color="deep-purple darken-2"
                  dark
                  @click="submit"
                >
                  ยืนยัน
                </v-btn>
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
import { required, email } from "vuelidate/lib/validators";
export default {
  layout: "reset",
  auth: false,
  mixins: [validationMixin],
  validations: {
    form: {
      email: { required, email },
    },
  },
  data: () => ({
    form: {
      email: "",
    },
  }),
  computed: {
    emailErrors() {
      const errors = [];
      if (!this.$v.form.email.$dirty) return errors;
      !this.$v.form.email.email && errors.push("กรุณากรอกอีเมล");
      !this.$v.form.email.required && errors.push("กรุณากรอกอีเมล");
      return errors;
    },
  },
  methods: {
    async submit() {
      this.$v.form.$touch();
      if (this.$v.form.$pending || this.$v.form.$error) return;
      await this.$store.dispatch("account/forgotPassword", this.form).then((response) => {
          if (response.message == "Please check your email for password reset instructions" || response.status === 200) {
            this.$swal({ icon: "success", title: "กรุณาเช็คอีเมล", showConfirmButton: false, timer: 1000 });
            setTimeout(() => this.$router.push("/login"), 1500);
          }
        })
    },
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
