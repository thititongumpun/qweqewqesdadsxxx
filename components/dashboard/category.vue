<template>
  <NuxtLink :to="item.to">
  <v-card class="pa-5 mx-auto rounded-xl" color="#EDECF4" tile outlined elevation="2">
    <v-list-item three-line>
      <v-list-item-content>
        <v-list-item-title class="text-h6 ml-1 font-weight-bold deep-purple--text text--darken-4"> {{ item.title }} </v-list-item-title>
      </v-list-item-content>
      <v-list-item-avatar tile size="65">
        <v-img :src="`/icons/${item.icon}.png`" />
      </v-list-item-avatar>
    </v-list-item>
  </v-card>
  </NuxtLink>
</template>

<script>
export default {
  props: ['item']
};
</script>

<style></style>
