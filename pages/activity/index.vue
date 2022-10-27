<template>
  <div>
    <HeaderTab icon="mdi-clock-time-eight" back="/dashboard" />
    <HeaderTitle icon="activity" title="กิจกรรม" />
    <v-divider class="my-5"></v-divider>
    <v-btn tile outlined rounded-sm block large color="deep-purple darken-2" dark depressed class="mb-5 font-weight-bold" :to="{ name: 'activity-target-date' }">
      <v-icon left> mdi-bullseye-arrow </v-icon> กำหนดเป้าหมาย
    </v-btn>
    <v-btn tile outlined rounded-sm block large color="deep-purple darken-2" dark depressed class="mb-5 font-weight-bold" :to="{ name: 'activity-target-history' }">
      <v-icon left> mdi-clipboard-text-clock-outline </v-icon> ดูประวัติเป้าหมาย
    </v-btn>
    <v-divider class="my-5"></v-divider>
    <v-card outlined class="mb-10">
      <v-card-title class="white--text deep-purple darken-1">
        รายการกิจกรรม
      </v-card-title>
      <v-card-text class="pt-2">
        <v-card class="my-3" color="#EDECF4" tile cols="12" v-for="item in items" :key="item.id" outlined :to="`/activity/category/${item.categoryOrderId}`">
          <v-card-title primary-title class="justify-center body-2 pa-7 font-weight-bold">
            {{ item.categoryName }}
          </v-card-title>
        </v-card>
      </v-card-text>
    </v-card>
    <br>
  </div>
</template>

<script>
export default {
  data: () => ({
    items: []
  }),
  async fetch() {
    const data = await this.$store.dispatch("activity/category");
    this.items = data;
  }
}
</script>

<style>

</style>