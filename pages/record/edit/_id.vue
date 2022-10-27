<template>
  <div>
    <HeaderTab icon="mdi-notebook-plus-outline" back="/record" />
    <HeaderTitle icon="record" title="แก้ไขกิจกรรม" />
    <v-divider class="my-5"></v-divider>
    <RecordForm action="edit" :item="item" v-if="item" />
    <br>
  </div>
</template>


<script>
export default {
  data: () => ({
    item: null
  }),
  async asyncData({ params }) {
    const id = params.id;
    return { id };
  },
  async fetch() {
    const data  = await this.$store.dispatch("record/findOne", this.id);
    this.item = data;
  }
}
</script>

<style>

</style>