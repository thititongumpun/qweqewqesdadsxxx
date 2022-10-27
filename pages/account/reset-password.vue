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
            <p> พิมพ์รหัสผ่านใหม่ของคุณด้านล่าง </p> 
            <form>
              <v-text-field
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showPassword ? 'text' : 'password'"
                v-model="form.password"
                :error-messages="passwordErrors"
                label="รหัสผ่านใหม่"
                required
                @input="$v.form.password.$touch()"
                @blur="$v.form.password.$touch()"
                @keyup.enter="login"
                @click:append="showPassword = !showPassword"
                outlined
              ></v-text-field>
              <v-text-field
                v-model="form.password_confirmation"
                :append-icon="showPasswordConfirmation ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showPasswordConfirmation ? 'text' : 'password'"
                label="ยืนยันรหัสผ่าน"
                :error-messages="passwordConfirmationErrors"
                required
                @input="$v.form.password_confirmation.$touch()"
                @blur="$v.form.password_confirmation.$touch()"
                outlined
                @click:append="showPasswordConfirmation = !showPasswordConfirmation"
              ></v-text-field>
            </form>
          </v-card-text>
          <v-card-actions>
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
            </v-row>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, sameAs, minLength, maxLength } from "vuelidate/lib/validators";
export default {
  layout: "reset",
  auth: false,
  mixins: [validationMixin],
  validations: {
    form: {
      password: { required, minLength: minLength(6), maxLength: maxLength(30) },
      password_confirmation: { required, sameAsPassword: sameAs('password') },
    }
  },
  data: () => ({
    form: {
      password: "",
      password_confirmation: null,
    },
    showPassword: false,
    showPasswordConfirmation: false,
  }),
  computed: {
    passwordErrors() {
      const errors = [];
      if (!this.$v.form.password.$dirty) return errors;
      !this.$v.form.password.required && errors.push("กรุณากรอกรหัสผ่านใหม่");
      !this.$v.form.password.minLength && errors.push("กรุณากรอกรหัสผ่านระหว่าง 6 ถึง 30 ตัวอักษร");
      !this.$v.form.password.maxLength && errors.push("กรุณากรอกรหัสผ่านระหว่าง 6 ถึง 30 ตัวอักษร");
      return errors;
    },
    passwordConfirmationErrors() {
      const errors = [];
      if (!this.$v.form.password_confirmation.$dirty) return errors;
      !this.$v.form.password_confirmation.required && errors.push("กรุณากรอกรหัสผ่านยืนยัน");
      !this.$v.form.password_confirmation.sameAsPassword && errors.push("รหัสผ่านไม่ตรงกัน");
      return errors;
    }
  },
  methods: {
    async submit() {
      this.$v.form.$touch();
      if (this.$v.form.$pending || this.$v.form.$error) return;
      await this.$store.dispatch("account/resetPassword", {payload: this.form,token: this.$route.query }).then((response) => {
        if (response.message === "Password reset successful, you can now login" ||response.status === 200) {
          this.$swal({ icon: "success", title: "รีเซ็ตรหัสผ่านสำเร็จ", showConfirmButton: false, timer: 3000,});
          setTimeout(() => this.$router.push("/login"), 1500);
        }
      });
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
