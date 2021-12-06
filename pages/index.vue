<template>
  <div>
    <div class="hero is-medium is-info">
      <div class="hero-body">
        <h1 class="title">Destaques da loja</h1>
        <h2 class="subtitle">Os destaques da loja aparecerão aqui</h2>
      </div>
    </div>
    <div class="search-div">
      <VmSearch></VmSearch>
    </div>
    <VmProductsList></VmProductsList>
  </div>
</template>

<script>
import VmProductsList from "@/components/products_list/ProductsListContainer";
import VmSearch from "@/components/search/Search";

export default {
  name: "index",
  components: {
    VmProductsList,
    VmSearch,
  },
};
</script>

<style lang="scss" scoped>
.search-div {
  margin: 10px 10%;
}
</style>