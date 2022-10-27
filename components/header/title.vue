<template>
   <v-card class="pa-2 mx-auto rounded mt-5" tile outlined elevation="2">
    <v-list-item three-line>
      <v-list-item-content>
        <v-list-item-title class="text-h6 ml-1 font-weight-bold deep-purple--text text--darken-4"> {{ title }} </v-list-item-title>
      </v-list-item-content>
      <v-list-item-avatar tile size="65">
        <v-img :src="`/icons/${icon}.png`" />
      </v-list-item-avatar>
    </v-list-item>
  </v-card>
</template>

<script>
export default {
    props: ['icon', 'title']
};
</script>

<style></style>
