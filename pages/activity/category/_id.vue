<template>
  <h1> Category activity {{ $route.params.id }}</h1>
</template>

<script>
export default {
    async fetch() {
        console.log(this.$route.params.id);
    }
}
</script>

<style>

</style>