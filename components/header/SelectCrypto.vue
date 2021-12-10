<template>
  <select class="select is-centered" v-model="activeCrypto">
    <option
      v-for="crypto in cryptoList"
      :key="crypto.codCripto"
      :value="crypto.codCripto"
    >
      {{ crypto.nomeCripto }} ({{ crypto.codCripto }})
    </option>
  </select>
</template>

<script>
export default {
  name: "VmSelectCrypto",
  data() {
    return {
      cryptoList: this.$store.state.cryptos,
    };
  },
  computed: {
    activeCrypto: {
      get() {
        return this.$store.state.userInfo.selectedCrypto;
      },
      set(value) {
        this.$store.commit("setActiveCrypto", value);
      },
    },
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