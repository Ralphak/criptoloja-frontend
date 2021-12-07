<template>
  <select class="select is-centered">
    <option v-for="crypto in cryptoList" :key="crypto.id">
      {{ crypto.name }} ({{ crypto.code }})
    </option>
  </select>
</template>

<script>
export default {
  name: "VmSelectCrypto",
  data() {
    return {
      cryptoList: this.$store.getters.getCryptoList,
    };
  },
};
</script>

<style lang="scss" scoped>
.select {
  display: block;
  margin: auto 1em;
}
@media (max-width: 1023px) {
  .select {
    margin-left: auto;
    margin-right: 2em;
  }
}
</style>