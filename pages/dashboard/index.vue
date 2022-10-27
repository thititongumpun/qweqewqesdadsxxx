<template>
  <div class="my-4 mx-2">
    <v-row v-for="item in items" :key="item.name">
      <v-col cols="12">
        <DashboardCategory :item="item" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      items: [
        { icon: 'record',    to: '/record',    title: 'บันทึกกิจกรรม' },
        { icon: 'activity',  to: '/activity',  title: 'กิจกรรม' },
        { icon: 'report',    to: '/report' ,   title: 'สรุปผล' },
        { icon: 'recommend', to: '/recommend', title: 'แนะนำ' }
      ]
    }
  },
};
</script>

<style></style>
