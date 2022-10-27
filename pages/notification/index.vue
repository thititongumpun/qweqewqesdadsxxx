<template>
  <div>
    <HeaderTab icon="mdi-bell" back="/dashboard" />
    <v-divider class="my-5"></v-divider>
    <v-row>
      <v-col>
        <v-dialog
          ref="dialog"
          v-model="modal"
          :return-value.sync="date"
          persistent
          width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="date"
              label="เลือกวันที่"
              append-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
              outlined
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="date"
            locale="th-th"
            scrollable
            color="deep-purple darken-1"
          >
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
        รายการแจ้งเตือน
        <v-spacer></v-spacer>
      </v-card-title>
      <v-card-text class="pt-4">
        <v-row>
          <v-col cols="8">
            <h5 class="font-weight-bold">วันที่ {{ $date_thai(date) }}</h5>
          </v-col>
          <v-spacer></v-spacer>
        </v-row>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-text class="pt-4">
        <v-card class="mx-auto" flat v-for="item in items" :key="item.id">
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title class="py-2 text-wrap">
                {{ item.name }}
              </v-list-item-title>
              <v-list-item-subtitle
                class="py-2 text-wrap"
                v-for="item in item.completed"
                :key="item.id"
              >
                <div
                  v-if="item.color === 'Green'"
                  class="pa-2 green rounded-circle d-inline-block"
                ></div>
                <div
                  v-else
                  class="pa-2 red rounded-circle d-inline-block float-right"
                ></div>
                {{ item.detail }}
              </v-list-item-subtitle>
              <v-list-item-subtitle
                class="py-2 text-wrap"
                v-for="item in item.notCompleted"
                :key="item.id"
              >
                <div
                  v-if="item.color === 'Green'"
                  class="pa-2 green rounded-circle d-inline-block"
                ></div>
                <div
                  v-else
                  class="pa-2 red rounded-circle d-inline-block"
                ></div>
                {{ item.detail }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>
        </v-card>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  data: () => ({
    modal: false,
    date: null,
    count: 0,
    items: [],
  }),
  mounted() {
    this.date = this.$moment().format("YYYY-MM-DD");
  },
  async fetch() {
    const data = await this.$store.dispatch("notification/find", {
      date: this.$moment().format("YYYY-MM-DD"),
    });
    this.count = data.count;
    this.items = data;
  },
  methods: {
    changeDate() {
      this.items = [];
      this.modal = false;
      this.$refs.dialog.save(this.date);
      this.$store
        .dispatch("notification/find", { date: this.date })
        .then((response) => {
          this.count = response.length;
          this.items = response;
        });
    },
  },
};
</script>

<style></style>
