<template>
  <div>
    <div v-if="!isUserLoggedIn" class="navbar-item">
      <p class="control">
        <a class="button" @click="login">
          <span class="icon">
            <i class="fa fa-user"></i>
          </span>
          <span>{{ loginLabel }}</span>
        </a>
      </p>
    </div>
    <div v-if="isUserLoggedIn" class="navbar-item is-hoverable is-size-5 has-text-right">
      <a class="navbar-link is-arrowless is-flex is-justify-content-end is-align-items-center">
        {{ getUserName }}
        <figure class="image is-48x48">
          <img class="is-rounded" :src="getUserPicture" />
        </figure>
      </a>
      <div class="navbar-dropdown is-right">
        <nuxt-link
          class="navbar-item is-size-6 has-text-right"
          :to="{ name: 'user-wishlist' }"
        >
          {{ ordersLabel }}
        </nuxt-link>
        <nuxt-link
          class="navbar-item is-size-6 has-text-right"
          :to="{ name: 'user-wishlist' }"
        >
          {{ wishlistLabel }}
        </nuxt-link>
        <nuxt-link
          class="navbar-item is-size-6 has-text-right"
          :to="{ name: 'user-wishlist' }"
        >
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
      ordersLabel: "Meus Pedidos",
      paymentsLabel: "Formas de pagamento",
    };
  },

  computed: {
    isUserLoggedIn() {
      return this.$store.state.auth.loggedIn;
    },
    getUserName() {
      return this.$store.state.auth.user.given_name;
    },
    getUserPicture() {
      return this.$store.state.auth.user.picture;
    },
  },

  methods: {
    login() {
      this.$auth.loginWith("auth0");
    },
    logout() {
      this.$store.commit("isUserLoggedIn", false);
      this.$store.commit("isUserSignedUp", false);
      this.$store.commit("removeProductsFromFavourite");

      // redirect to homepage
      this.$router.push({ name: "index" });
    },
  },
};
</script>

<style lang="scss" scoped>
.navbar-item {
  margin-right: 0.3em;
}
.navbar-item,
.navbar-link {
  color: white;
}
.navbar-link:hover,
.navbar-dropdown {
  background-color: green;
}
.navbar-item img {
  max-height: 100%;
  margin-left: 0.3em;
}
.is-flex {
  padding: 0;
  padding-right: 0.3em;
}
</style>