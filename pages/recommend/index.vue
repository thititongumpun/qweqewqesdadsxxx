<template>
  <div>
    <HeaderTab icon="mdi-seal" back="/dashboard" />
    <HeaderTitle icon="recommend" title="แนะนำ" />
    <v-divider class="my-5"></v-divider>
    <!-- Search -->
    <v-card outlined class="my-5">
      <v-form>
        <v-row class="justify-space-between py-4 px-3">
          <v-col cols="12">
            <v-text-field
              v-model="search"
              class="my-0"
              label="ค้นหา"
              single-line
              outlined
              clearable
              hide-details
              prepend-inner-icon="mdi-magnify"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-form>
    </v-card>
    <!-- List -->
    <div v-if="$fetchState.pending">
      <v-row justify="center" align="center" class="my-5">
        <v-col cols="12" md="12">
          <v-skeleton-loader class="mx-auto" type="actions"></v-skeleton-loader>
        </v-col>
      </v-row>
    </div>
    <div v-else>
      <v-data-iterator :items="items" :search="search" hide-default-footer>
        <template v-slot:no-results>
          <v-alert border="right" colored-border color="deep-purple darken-2" elevation="1">
            ไม่มีข้อมูลแนะนำ
          </v-alert>
        </template>
        <template v-slot:no-data>
          <v-alert border="right" colored-border color="deep-purple darken-2" elevation="0">
            ไม่มีข้อมูลแนะนำ
          </v-alert>
        </template>
        <template v-slot:default="props">
          <v-row class="text-xs-center mb-10">
            <v-col cols="12" v-for="(item, index) in props.items" :key="index">
              <NuxtLink :to="`/recommend/${item.id}`">
              <v-hover>
                <v-card hover class="mx-auto">
                  <v-card-title class="white--text deep-purple darken-1 subtitle-1">
                    {{ item.name }}
                  </v-card-title>
                  <v-card-subtitle class="body-2 mt-4">
                    {{ item.detail ? item.detail : '-' }}
                  </v-card-subtitle>
                </v-card>
              </v-hover>
              </NuxtLink>
            </v-col>
          </v-row>
        </template>
      </v-data-iterator>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    items: [],
    search: "",
  }),
  async fetch() {
    const { data } = await this.$store.dispatch("recommend/find");
    this.items = data;
  }
};
</script>

<style></style>
