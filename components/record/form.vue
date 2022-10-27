<template>
    <v-card outlined elevation="2" class="mb-10">
      <v-card-title class="white--text deep-purple darken-1 subtitle-1">
        รายละเอียดกิจกรรม
      </v-card-title>
      <v-card-text class="mt-4">
        <form class="pa-2">
            <v-dialog ref="dialog" v-model="modal" :return-value.sync="form.date" persistent width="290px">
                <template v-slot:activator="{ on, attrs }">
                    <v-text-field 
                        v-model="form.date" 
                        label="เลือกวันที่" 
                        append-icon="mdi-calendar" 
                        readonly 
                        v-bind="attrs" 
                        v-on="on" 
                        outlined 
                        :disabled="action == 'edit'"
                    ></v-text-field>
                </template>
                <v-date-picker v-model="form.date" locale="th-th" scrollable color="deep-purple darken-1">
                    <v-spacer></v-spacer>
                    <v-btn text color="deep-purple darken-1" @click="modal = false"> ยกเลิก </v-btn>
                    <v-btn text color="deep-purple darken-1" @click="$refs.dialog.save(form.date)"> ตกลง </v-btn>
                </v-date-picker>
            </v-dialog>
            <v-radio-group row v-model="select" @change="changeSelected">
                <v-radio color="deep-purple darken-1" label="เลือกกิจกรรม" value="select"></v-radio>
                <v-radio color="deep-purple darken-1" label="กรอกกิจกรรม" value="input" ></v-radio>
            </v-radio-group>
            <template v-if="select == 'select'">
                <v-select 
                    v-model="form.activityName" 
                    :error-messages="activityNameErrors"
                    :items="options" 
                    label="เลือกรายการกิจกรรม"
                    outlined
                    @change="changeActivity"
                    @input="$v.form.activityName.$touch()"
                    @blur="$v.form.activityName.$touch()"
                ></v-select>
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
            </template>
            <template v-if="select == 'input'">
                <v-text-field
                    v-model="form.activityName" 
                    :error-messages="activityNameErrors"
                    label="กรอกกิจกรรม"
                    outlined
                    @input="$v.form.activityName.$touch()"
                    @blur="$v.form.activityName.$touch()"
                ></v-text-field>
                <v-text-field 
                    v-model="form.qty"
                    :error-messages="qtyErrors"
                    type="number" 
                    label="จำนวน" 
                    outlined 
                    @input="$v.form.qty.$touch()"
                    @blur="$v.form.qty.$touch()"
                ></v-text-field>
                <v-text-field 
                    v-model="form.unit"
                    :error-messages="unitErrors"
                    label="หน่วย" 
                    outlined 
                    @input="$v.form.unit.$touch()"
                    @blur="$v.form.unit.$touch()"
                ></v-text-field>
            </template>
        </form>
        <v-alert class="mb-5" dense outlined type="error" v-if="recordError">
          <span class="body-2"> มีกิจกรรมที่ท่านเลือกของวันนี้แล้ว </span>
        </v-alert>
        <v-divider></v-divider>
      </v-card-text>
      <v-card-actions class="pa-5">
        <v-btn color="deep-purple darken-1" block dark @click="submit">บันทึก</v-btn>
      </v-card-actions>
    </v-card>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, numeric } from "vuelidate/lib/validators";
export default {
    props: ['action', 'item'],
    mixins: [validationMixin],
    validations: {
        form :{
            activityName : { required },
            qty : { required, numeric },
            unit : { required }
        }
    },
    data: () => ({
        select: 'select',
        options: [],
        items: [],
        modal: false,
        form : {
            date: null,
            activityName: null,
            qty: null,
            unit: 'หน่วย'
        },
        recordError: false
    }),
    mounted() {
        if (this.item) {
            this.select = this.item.isFix ? 'select' : 'input';
            this.form.activityName = this.item.activityName
            this.form.qty = this.item.qty
            this.form.unit = this.item.unit
            this.form.date = this.$moment(this.item.date).format('YYYY-MM-DD');
        } else {
            this.form.date = this.$moment().format('YYYY-MM-DD')
        }
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
        },
        unitErrors() {
            const errors = [];
            if (!this.$v.form.unit.$dirty) return errors;
            !this.$v.form.unit.required && errors.push("กรุณากรอกหน่วยกิจกรรม");
            return errors;
        }
    },
    async fetch() {
        const { data } = await this.$store.dispatch("record/target/activity")
        this.items   = data;
        this.options = data.map(item => item.subject);
    },
    methods: {
        changeSelected() {
            this.form.activityName = null
            this.form.qty = null
            this.form.unit = null
        },
        changeActivity() {
            this.form.unit = this.items.find(item => item.subject == this.form.activityName).unit;
        },
        async submit() {
            this.$v.form.$touch();
            if (this.$v.form.$pending || this.$v.form.$error) return;
            switch (this.action) {
                case 'create':
                    await this.$store.dispatch("record/save", this.form).then(response => {
                        if (response.message == "Create Successfully") {
                            this.$swal({ icon: "success", title: "บันทึกกิจกรรมสำเร็จ", showConfirmButton: false, timer: 1000 });
                            setTimeout(() => this.$router.push("/record"), 1500);
                        }
                    }).catch(() => this.recordError = true);
                break;
                case 'edit':
                    await this.$store.dispatch("record/update", { id: this.item.id, data: this.form }).then(response => {
                        if (response.message == "Update Successfully") {
                            this.$swal({ icon: "success", title: "แก้ไขกิจกรรมสำเร็จ", showConfirmButton: false, timer: 1000 });
                            setTimeout(() => this.$router.push("/record"), 1500);
                        }
                    }).catch(() => this.recordError = true);
                break;
            }
           
        }
    }
}
</script>

<style>

</style>