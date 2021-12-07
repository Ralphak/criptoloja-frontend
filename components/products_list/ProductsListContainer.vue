<template>
  <div class="columns is-centered is-multiline">
    <div class="card column is-narrow" v-for="product in products" :key="product.id">
      <VmProducts :product="product"></VmProducts>
    </div>
    <div class="section" v-if="products.length === 0">
      <p>{{ noProductLabel }}</p>
    </div>
  </div>
</template>

<script>
import VmProducts from "../Products";
import { getByTitle } from "@/assets/filters";

export default {
  name: "productsList",

  components: { VmProducts },

  data() {
    return {
      id: "",
      noProductLabel: "No product found",
      productsFiltered: [],
    };
  },

  computed: {
    products() {
      if (this.$store.state.systemInfo.hasSearched) {
        return this.getProductByTitle();
      } else {
        return this.$store.state.products;
      }
    },
  },

  methods: {
    getProductByTitle() {
      let listOfProducts = this.$store.state.products,
        titleSearched = this.$store.state.systemInfo.productTitleSearched;

      return (this.productsFiltered = getByTitle(
        listOfProducts,
        titleSearched
      ));
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  margin: 10px;
  background-color: palegreen;
}
@media (min-width: 769px) {
  .card {
    max-width: 19em;
  }
}
.columns {
  margin: 0;
}
</style>
