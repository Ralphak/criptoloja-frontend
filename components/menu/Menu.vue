<template>
  <div>
    <div v-if="!isUserLoggedIn" class="navbar-item">
      <div class="field is-grouped">
        <p class="control">
          <a class="button" @click="showSignupModal">
            <span class="icon">
              <i class="fa fa-user-plus"></i>
            </span>
            <span>{{ signupLabel }}</span>
          </a>
        </p>
        <p class="control">
          <a class="button" @click="showLoginModal">
            <span class="icon">
              <i class="fa fa-user"></i>
            </span>
            <span>{{ loginLabel }}</span>
          </a>
        </p>
      </div>
    </div>
    <div v-if="isUserLoggedIn" class="navbar-item is-hoverable is-size-5 has-text-right">
      <a class="navbar-link">
        {{ getUserName }}
      </a>
      <div class="navbar-dropdown is-right">
        <nuxt-link class="navbar-item is-size-6 has-text-right" :to="{ name: 'user-wishlist' }">
          {{ ordersLabel }}
        </nuxt-link>
        <nuxt-link class="navbar-item is-size-6 has-text-right" :to="{ name: 'user-wishlist' }">
          {{ wishlistLabel }}
        </nuxt-link>
        <nuxt-link class="navbar-item is-size-6 has-text-right" :to="{ name: 'user-wishlist' }">
          {{ paymentsLabel }}
        </nuxt-link>
        <a class="navbar-item is-size-6 has-text-right" @click="logout">
          {{ logoutLabel }}
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "VmMenu",
  data() {
    return {
      wishlistLabel: "Lista de Desejos",
      logoutLabel: "Sair",
      loginLabel: "Entrar",
      signupLabel: "Cadastre-se",
      ordersLabel: "Meus Pedidos",
      paymentsLabel: "Formas de pagamento"
    };
  },

  computed: {
    isUserLoggedIn() {
      return this.$store.getters.isUserLoggedIn;
    },
    getUserName() {
      let name = this.$store.getters.getUserName;

      if (name === "") {
        return "user";
      } else {
        return name;
      }
    },
  },

  methods: {
    logout() {
      this.$store.commit("isUserLoggedIn", false);
      this.$store.commit("isUserSignedUp", false);
      this.$store.commit("removeProductsFromFavourite");

      // redirect to homepage
      this.$router.push({ name: "index" });
    },
    showLoginModal() {
      this.$store.commit("showLoginModal", true);
    },
    showSignupModal() {
      this.$store.commit("showSignupModal", true);
    },
  },
};
</script>

<style lang="scss" scoped>
  .navbar-item, .navbar-link{
    color: white;
  }
  .navbar-link:hover, .navbar-dropdown{
    background-color: green;
  }
</style>