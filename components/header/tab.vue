<template>
    <v-row justify="center" align="center">
        <v-col cols="12" sm="12" md="12">
            <v-card class="mx-auto">
                <v-card-title>
                <NuxtLink :to="back">
                    <v-icon color="deep-purple darken-2" left> mdi-arrow-left-circle-outline </v-icon>
                    <span class="subtitle-1 font-weight-bold deep-purple--text text--darken-2"> ย้อนกลับ </span>
                </NuxtLink>
                <v-spacer></v-spacer>
                <span class="subtitle-1 font-weight-bold mt-1 deep-purple--text text--darken-2">
                    <v-icon color="deep-purple darken-2" large> {{ icon }} </v-icon>
                </span>
                </v-card-title>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
export default {
    props: ['icon', 'back']
}
</script>

<style>

</style>