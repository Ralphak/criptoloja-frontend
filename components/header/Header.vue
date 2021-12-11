<template>
  <div>
    <nav class="navbar is-fixed-top" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <nuxt-link :to="{ name: 'index' }" class="navbar-item">
          <h1 class="title is-3 is-flex-mobile"></h1>
        </nuxt-link>

        <div class="cart-button-mobile is-hidden-desktop">
          <VmCartButton></VmCartButton>
        </div>

        <a
          role="button"
          class="navbar-burger burger"
          @click="isMenuOpen = !isMenuOpen"
          aria-label="menu"
          aria-expanded="false"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <!-- For mobile and tablet -->
      <div v-show="isMenuOpen" class="navbar-end">
        <VmSelectCrypto></VmSelectCrypto>
        <VmMenu></VmMenu>
      </div>

      <!-- For desktop -->
      <div class="navbar-end is-hidden-touch">
        <VmCartButton></VmCartButton>
        <VmSelectCrypto></VmSelectCrypto>
        <VmMenu></VmMenu>
      </div>
    </nav>
  </div>
</template>

<script>
import VmMenu from "../menu/Menu";
import VmCartButton from "./CartButton";
import VmSelectCrypto from "./SelectCrypto";

export default {
  name: "VmHeader",

  data() {
    return {
      isCheckoutActive: false,
      isMenuOpen: false,
    };
  },

  components: {
    VmMenu,
    VmCartButton,
    VmSelectCrypto
  },
};
</script>

<style lang="scss" scoped>
.title {
  background: url("~/static/logo-criptoloja.png") no-repeat;
  background-position: 50% 50%;
  background-size: 165px;
  width: 175px;
  height: 35px;
}
a {
  color: white;
}
.navbar-burger {
  margin-left: 0;
}
.cart-button-mobile {
  margin-left: auto;
  padding-top: 5px;
}
.navbar{
  background-color: green;
}
</style>
