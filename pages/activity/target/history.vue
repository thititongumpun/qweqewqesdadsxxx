<template>
    <div>
        <HeaderTab icon="mdi-bullseye-arrow" back="/activity" />
        <HeaderTitle icon="activity" title="ประวัติเป้าหมาย" />
        <v-divider class="my-5"></v-divider>
        <v-card outlined elevation="2" class="mb-12">
            <v-card-title class="white--text deep-purple darken-1 subtitle-1">
                รายละเอียดเป้าหมาย
            </v-card-title>
            <v-card-text class="mt-4">
                <template v-if="$fetchState.pending">
                    <LoadingCard />
                </template>
                <template v-else>
                    <form class="pa-2">
                        <v-dialog ref="dialog" v-model="modal" :return-value.sync="date" persistent width="290px">
                            <template v-slot:activator="{ on, attrs }">
                            <v-text-field v-model="date" label="เลือกวันที่" append-icon="mdi-calendar" readonly v-bind="attrs" v-on="on" outlined></v-text-field>
                            </template>
                            <v-date-picker v-model="date" locale="th-th" scrollable color="deep-purple darken-1">
                            <v-spacer></v-spacer>
                            <v-btn text color="deep-purple darken-1" @click="modal = false"> ยกเลิก </v-btn>
                            <v-btn text color="deep-purple darken-1" @click="changeDate"> ตกลง </v-btn>
                            </v-date-picker>
                        </v-dialog>
                    </form>
                    <template v-if="items.length">
                        <template v-for="(item, index) in items" >
                            <v-list-item two-line :key="item.id">
                                <v-list-item-content>
                                    <v-list-item-title class="py-2 text-wrap"> {{ item.activityName }} </v-list-item-title>
                                    <v-list-item-subtitle class="py-2"> {{ item.targetQty }} {{ item.unit }} </v-list-item-subtitle>
                                </v-list-item-content>
                                <v-list-item-action>
                                    <v-list-item-action-text> วันที่สร้าง {{ $moment(item.date).format('DD/MM/YYYY') }} </v-list-item-action-text>
                                    <v-btn icon color="warning lighten-1" @click="showEdit(item.id)"> <v-icon> mdi-pencil </v-icon> </v-btn>
                                </v-list-item-action>
                            </v-list-item>
                            <v-divider v-if="index < items.length - 1" :key="index"></v-divider>
                        </template>
                    </template>
                    <template v-else>
                        <v-card-text class="text-center">
                            <div class="subtitle-1"> ไม่มีข้อมูลเป้าหมาย </div>
                        </v-card-text>
                    </template>
                </template>
            </v-card-text>
        </v-card>
        <v-row justify="center">
            <v-dialog v-model="dialog" width="600" persistent scrollable hide-overlay>
                <v-form ref="form" v-model="valid" lazy-validation>
                <v-card>
                    <v-toolbar dark color="deep-purple darken-1">
                        <v-toolbar-title class="subtitle-1"> <v-icon left> mdi-bullseye-arrow </v-icon> แก้ไขเป้าหมาย </v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-toolbar-items class="py-3">
                            <v-btn icon dark @click="dialog = false">
                                <v-icon> mdi-close </v-icon>
                            </v-btn>
                        </v-toolbar-items>
                    </v-toolbar>
                    <v-card-text class="mt-5">
                        <v-text-field 
                            v-model="form.activityName"
                            :error-messages="activityNameErrors"
                            type="text" 
                            label="รายการกิจกรรม" 
                            outlined 
                            readonly
                            @input="$v.form.activityName.$touch()"
                            @blur="$v.form.activityName.$touch()"
                        ></v-text-field>
                        <v-text-field 
                            v-model="form.targetQty"
                            :error-messages="targetQtyErrors"
                            type="number" 
                            label="จำนวน" 
                            outlined 
                            :suffix="form.unit"
                            @input="$v.form.targetQty.$touch()"
                            @blur="$v.form.targetQty.$touch()"
                        ></v-text-field>
                    </v-card-text>
                    <v-card-actions class="pb-4">
                    <v-spacer></v-spacer>
                        <v-btn color="warning darken-1" @click="submit"> แก้ไขเป้าหมาย </v-btn>
                        <v-btn color="error   darken-1" @click="dialog = false"> ปิดหน้าต่าง </v-btn>
                    </v-card-actions>
                </v-card>
                </v-form>
            </v-dialog>
        </v-row>
        <br>
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
            targetQty : { required, numeric },
            unit : { required }
        }
    },
    computed: {
        activityNameErrors() {
            const errors = [];
            if (!this.$v.form.activityName.$dirty) return errors;
            !this.$v.form.activityName.required && errors.push("กรุณาเลือกรายการกิจกรรม");
            return errors;
        },
        targetQtyErrors() {
            const errors = [];
            if (!this.$v.form.targetQty.$dirty) return errors;
            !this.$v.form.targetQty.required && errors.push("กรุณากรอกจำนวน");
            !this.$v.form.targetQty.numeric  && errors.push("กรุณากรอกจำนวนเป็นตัวเลข");
            return errors;
        },
        unitErrors() {
            const errors = [];
            if (!this.$v.form.unit.$dirty) return errors;
            !this.$v.form.unit.required && errors.push("กรุณากรอกหน่วยกิจกรรม");
            return errors;
        }
    },
    data: () => ({
        modal: false,
        valid: true,
        date: new Date().toISOString().substr(0, 10),
        items: [],
        dialog: false,
        id: null,
        form: {
            activityName: null,
            targetQty: null,
            unit: null
        }
    }),
    async fetch() {
        const data = await this.$store.dispatch("activity/target/history", { date : this.date });
        this.items = data
    },
    methods: {
        changeDate() {
            this.items = [];
            this.modal = false;
            this.$refs.dialog.save(this.date)
            this.$fetch();
        },
        async showEdit(id) {
            this.id = id;
            const data = await this.$store.dispatch("activity/target/findOne", id);
            this.form.activityName = data.activityName;
            this.form.targetQty    = data.targetQty;
            this.form.unit         = data.unit;
            this.dialog = true;
        },
        async submit() {
            this.$v.form.$touch();
            if (this.$v.form.$pending || this.$v.form.$error) return;
            this.form.date = this.date;
            await this.$store.dispatch("activity/target/update", { id: this.id, data: this.form }).then(response => {
                if (response.message == "Update Successfully") {
                    this.$swal({ icon: "success", title: "แก้ไขเป้าหมายสำเร็จ", showConfirmButton: false, timer: 1000 });
                    setTimeout(() => {
                        this.dialog = false;
                        this.$fetch();
                    }, 1500);
                }
            });
        }
    }
}
</script>

<style>

</style>