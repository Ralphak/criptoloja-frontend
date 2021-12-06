<template>
  <div class="navbar-item shopping-cart" @click="showCheckoutModal">
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
    showCheckoutModal() {
      this.$store.commit("showCheckoutModal", true);
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
