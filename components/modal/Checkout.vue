<template>
  <div :class="[openModal ? 'is-active' : '', 'modal']">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">{{ isCheckoutSection ? checkoutTitle : modalTitle }}</p>
        <button
          class="delete"
          aria-label="close"
          @click="closeModal(false)"
        ></button>
      </header>
      <section class="modal-card-body">
        <div v-if="!isCheckoutSection">
          <div
            class="box columns is-vcentered is-gapless"
            v-for="product in products"
            :key="product.idProduto"
          >
            <div class="column is-2">
              <figure class="card-image is-4by3 column is-one-thirds">
                <img :src="imageAddress(product.idProduto)" alt="Foto" />
              </figure>
            </div>
            <div class="column">
              <p>{{ product.nomeProduto }}</p>
              <p>
                {{ priceLabel(product.precoReal) }} ou
                {{ cryptoPrice(product.precoReal) }}
              </p>
            </div>
            <div class="column is-3 has-text-right-desktop is-vcentered">
              <span>Qtd: {{ product.quantity }}</span>
              <button
                class="button is-danger is-inverted"
                @click="removeFromCart(product.idProduto)"
              >
                <i class="fa fa-trash"></i>
              </button>
            </div>
          </div>
          <div v-if="products.length === 0">
            <p>{{ cartEmptyLabel }}</p>
          </div>
        </div>
        <div v-if="isCheckoutSection">
          <p>Em construção</p>
        </div>
      </section>
      <footer class="modal-card-foot">
        <button
          v-show="!isCheckoutSection"
          class="button is-info"
          @click="closeModal(false)"
        >
          {{ continueLabel }}
        </button>
        <button
          v-show="products.length > 0 && !isCheckoutSection"
          class="button is-success"
          @click="onNextBtn"
        >
          {{ buyLabel }}
        </button>
        <button
          v-if="isCheckoutSection"
          class="button is-success"
          @click="closeModal(true)"
        >
          {{ closeLabel }}
        </button>
      </footer>
    </div>
  </div>
</template>

<script>
import VmQuantityInput from "../products/QuantityInput";
export default {
  name: "checkout",

  data() {
    return {
      modalTitle: "Meu Carrinho de Compras",
      checkoutTitle: "Finalizar Pedido",
      cartEmptyLabel: "Seu carrinho está vazio",
      continueLabel: "Continuar comprando",
      closeLabel: "Fechar",
      isCheckoutSection: false,
    };
  },

  components: { VmQuantityInput },

  computed: {
    products() {
      return this.$store.getters.productsAdded;
    },
    openModal() {
      return this.$store.state.systemInfo.isCheckoutModalOpen;
    },
    buyLabel() {
      let productsAdded = this.$store.getters.productsAdded,
        pricesArray = [],
        finalPrice = "",
        quantity = 1;

      productsAdded.forEach((product) => {
        if (product.quantity >= 1) {
          quantity = product.quantity;
        }
        pricesArray.push(product.precoReal * quantity); // get the price of every product added and multiply quantity
      });

      finalPrice = pricesArray.reduce((a, b) => a + b, 0).toFixed(2); // sum the prices

      return `Comprar por ${this.priceLabel(finalPrice)}`;
    },
    isUserLoggedIn() {
      return this.$store.state.auth.loggedIn;
    },
  },

  methods: {
    priceLabel(price) {
      return this.$store.getters.formatPriceTag(price);
    },
    cryptoPrice(price) {
      let crypto = this.$store.getters.getCrypto();
      return `${(price / crypto.cotacaoReal).toFixed(8)} ${crypto.codCripto}`;
    },
    closeModal(reloadPage) {
      this.$store.commit("toggleCheckoutModal", false);

      if (reloadPage) {
        window.location.reload();
      }
    },
    removeFromCart(id) {
      this.$store.commit("removeFromCart", id);
      if (!this.products.length)
        this.$store.commit("toggleCheckoutModal", false);
    },
    onNextBtn() {
      if (this.isUserLoggedIn) {
        this.isCheckoutSection = true;
      } else {
        this.$store.commit("toggleCheckoutModal", false);
        this.$auth.loginWith("auth0");
      }
    },
    onPrevBtn() {
      this.isCheckoutSection = false;
    },
    imageAddress(id) {
      return `/products/${id}.jpg`;
    },
  },
};
</script>

<style lang="scss" scoped>
.input {
  margin-top: 5px;
}
.img {
  height: 48px;
}
</style>
