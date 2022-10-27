<template>
  <div>
    <HeaderTab icon="mdi-bullseye-arrow" back="/activity" />
    <HeaderTitle icon="activity" title="กำหนดเป้าหมาย" />
    <v-divider class="my-5"></v-divider>
    <v-card outlined elevation="2" class="mb-10">
      <v-card-title class="white--text deep-purple darken-1 subtitle-1">
        รายละเอียดเป้าหมาย
      </v-card-title>
      <v-card-text class="mt-4">
        <form class="pa-2">
          <v-dialog ref="dialog" v-model="modal" :return-value.sync="form.date" persistent width="290px">
            <template v-slot:activator="{ on, attrs }">
              <v-text-field v-model="form.date" label="เลือกวันที่" append-icon="mdi-calendar" readonly v-bind="attrs" v-on="on" outlined></v-text-field>
            </template>
            <v-date-picker v-model="form.date" locale="th-th" scrollable color="deep-purple darken-1">
              <v-spacer></v-spacer>
              <v-btn text color="deep-purple darken-1" @click="modal = false"> ยกเลิก </v-btn>
              <v-btn text color="deep-purple darken-1" @click="$refs.dialog.save(form.date)"> ตกลง </v-btn>
            </v-date-picker>
          </v-dialog>
          <v-select 
            v-model="form.activityName" 
            :error-messages="activityNameErrors"
            :items="options" 
            label="เลือกรายการกิจกรรม"
            outlined
            @change="changeActivity"
            @input="$v.form.activityName.$touch()"
            @blur="$v.form.activityName.$touch()"
          >
          <template v-slot:item="slotProps">
            {{slotProps.item}}
          </template>
          </v-select>
          <v-text-field 
            v-model="form.qty"
            :error-messages="qtyErrors"
            type="number" 
            label="จำนวน" 
            outlined 
            :suffix="form.unit"
            @input="$v.form.qty.$touch()"
            @blur="$v.form.qty.$touch()"
          ></v-text-field>
        </form>
        <v-alert class="mb-5" dense outlined type="error" v-if="targetError">
          <span class="body-2"> มีเป้าหมายที่ท่านเลือกของวันนี้แล้ว </span>
        </v-alert>
        <v-divider></v-divider>
      </v-card-text>
      <v-card-actions class="pa-5">
        <v-btn color="deep-purple darken-1" block dark @click="save">บันทึก</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, numeric } from "vuelidate/lib/validators";
export default {
  mixins: [validationMixin],
  validations: {
    form :{
      activityName : { required },
      qty : { required, numeric }
    }
  },
  data: () => ({
    options: [],
    items: [],
    modal: false,
    form : {
      date: null,
      activityName: null,
      qty: null,
      unit: 'หน่วย'
    },
    targetError: false
  }),
  mounted() {
    this.form.date = this.$moment().format('YYYY-MM-DD')
  },
  computed: {
    activityNameErrors() {
      const errors = [];
      if (!this.$v.form.activityName.$dirty) return errors;
      !this.$v.form.activityName.required && errors.push("กรุณาเลือกรายการกิจกรรม");
      return errors;
    },
    qtyErrors() {
      const errors = [];
      if (!this.$v.form.qty.$dirty) return errors;
      !this.$v.form.qty.required && errors.push("กรุณากรอกจำนวน");
      !this.$v.form.qty.numeric  && errors.push("กรุณากรอกจำนวนเป็นตัวเลข");
      return errors;
    }
  },
  async fetch() {
    const data = await this.$store.dispatch("activity/target/criteria")
    this.items   = data;
    this.options = data.map(item => item.subject);
  },
  methods: {
    changeActivity() {
      this.targetError = false;
      this.form.unit = this.items.find(item => item.subject == this.form.activityName).unit;
    },
    async save() {
      this.$v.form.$touch();
      if (this.$v.form.$pending || this.$v.form.$error) return;
      await this.$store.dispatch("activity/target/store", this.form).then(response => {
        if (response.message == "Create Successfully") {
          this.$swal({ icon: "success", title: "บันทึกข้อมูลเป้าหมายสำเร็จ", showConfirmButton: false, timer: 1000 });
          setTimeout(() => this.$router.push("/activity"), 1500);  
        }
      }).catch(error =>  this.targetError = true);
    }
  }
}
</script>

<style>

</style>