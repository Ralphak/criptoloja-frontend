<template>
  <div class="navbar-item shopping-cart" @click="toggleCheckoutModal">
    <span class="icon">
      <i class="fa fa-shopping-cart"></i>
    </span>
    <span :class="[numProductsAdded > 0 ? 'tag is-info' : '']">{{
      numProductsAdded
    }}</span>
  </div>
</template>

<script>
export default {
  name: "VmCartButton",
  computed: {
    numProductsAdded() {
      return this.$store.getters.productsAdded.length;
    },
  },
  methods: {
    toggleCheckoutModal() {
      this.$store.commit("toggleCheckoutModal", true);
    },
  },
};
</script>

<style lang="scss" scoped>
.shopping-cart {
  cursor: pointer;
  color:white;
}
</style>
