<template>
  <div>
    <HeaderTab icon="mdi-notebook-plus-outline" back="/dashboard" />
    <HeaderTitle icon="record" title="บันทึกกิจกรรม" />
    <v-divider class="my-5"></v-divider>
    <v-btn tile outlined rounded-sm block large color="deep-purple darken-2" dark depressed class="mb-5 font-weight-bold" :to="{ name: 'record-target-date' }">
      <v-icon left> mdi-bullseye-arrow </v-icon> กำหนดเป้าหมาย
    </v-btn>
    <v-btn tile outlined rounded-sm block large color="deep-purple darken-2" dark depressed class="mb-5 font-weight-bold" :to="{ name: 'record-target-history' }">
      <v-icon left> mdi-clipboard-text-clock-outline </v-icon> ดูประวัติเป้าหมาย
    </v-btn>
    <v-divider class="my-5"></v-divider>
    <v-row>
      <v-col>
        <v-dialog ref="dialog" v-model="modal" :return-value.sync="date" persistent width="290px">
          <template v-slot:activator="{ on, attrs }">
            <v-text-field v-model="date" label="เลือกวันที่" append-icon="mdi-calendar" readonly v-bind="attrs" v-on="on" outlined></v-text-field>
          </template>
          <v-date-picker v-model="date" locale="th-th" scrollable color="deep-purple darken-1">
            <v-spacer></v-spacer>
            <v-btn text color="deep-purple darken-1" @click="modal = false">
              ยกเลิก
            </v-btn>
            <v-btn text color="deep-purple darken-1" @click="changeDate">
              ตกลง
            </v-btn>
          </v-date-picker>
        </v-dialog>
      </v-col>
    </v-row>
    <v-card outlined class="mb-10">
      <v-card-title class="white--text deep-purple darken-1">
        รายการกิจกรรมที่บันทึก
        <v-spacer></v-spacer>
        <v-btn color="white" class="text--primary" fab small :to="{ name: 'record-create' }">
          <v-icon> mdi-plus </v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text class="pt-4">
        <v-row>
          <v-col cols="8">
            <h5 class="font-weight-bold">วันที่ {{ $date_thai(date) }}</h5>
          </v-col>
          <v-spacer></v-spacer>
          <v-col cols="4" class="text-right pa-2">
            <v-chip small> จำนวน {{ count }} รายการ </v-chip>
          </v-col>
        </v-row>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-text class="pt-4">
        <template v-if="items.length">
          <v-card class="mx-auto" flat v-for="item in items" :key="item.id">
            <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-title class="py-2"> {{ item.activityName }} </v-list-item-title>
                <v-list-item-subtitle class="py-2">
                  {{ item.qty }} {{ item.unit }}
                </v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-row justify="center" align="center">
                  <v-col cols="6">
                    <v-btn icon :to="{ name: 'record-edit-id', params: {id : item.id}}">
                      <v-icon color="warning lighten-1">mdi-pencil</v-icon>
                    </v-btn>
                  </v-col>
                  <v-col cols="6">
                    <v-btn icon @click="remove(item.id)">
                      <v-icon color="error lighten-1">mdi-delete</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-list-item-action>
            </v-list-item>
            <v-divider></v-divider>
          </v-card>
        </template>
        <template v-else>
          <v-card-text class="text-center">
            <div class="subtitle-1"> ไม่มีข้อมูลกิจกรรม </div>
          </v-card-text>
        </template>
      </v-card-text>
    </v-card>
    <br>
  </div>
</template>

<script>
export default {
  data: () => ({
    modal: false,
    date: null,
    count: 0,
    items: []
  }),
  created() {
    this.date = this.$moment().format("YYYY-MM-DD");
  },
  async fetch() {
    const data = await this.$store.dispatch("record/find", { date : this.date });
    this.count = data.length;
    this.items = data;
  },
  methods: {
    changeDate() {
      this.items = [];
      this.modal = false;
      this.$refs.dialog.save(this.date);
      this.$fetch();
    },
    remove(id) {
      this.$swal.fire({
        title: "Are you sure?",
        text: "คุณต้องการที่จะลบข้อมูลนี้ใช่หรือไม่",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#5E35B1",
        cancelButtonColor: "#f46a6a",
        confirmButtonText: "Delete",
      }).then((confirm) => {
          if (confirm.value) {
            this.$store.dispatch("record/delete", id).then((response) => {
              if (response) {
                this.$swal.fire("ลบรายการสำเร็จ!", "ลบรายการกิจกรรมเรียบร้อยแล้ว", "success");
                this.$fetch();
              }
            });
          }
        });
    },
  }
};
</script>

<style></style>
