<template>
  <div :class="[openModal ? 'is-active' : '', 'modal']">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">
          {{ isCheckoutSection ? checkoutTitle : modalTitle }}
        </p>
        <button
          class="delete"
          aria-label="close"
          @click="closeModal()"
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
          <div v-if="products.length > 0">
            <p><b>Forma de pagamento</b></p>
            <div class="control">
              <label
                class="radio"
                v-for="pagamento in cliente.pagamentos"
                :key="pagamento.idPagamento"
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  v-model="order.idPagamento"
                  :value="pagamento.idPagamento"
                />
                {{ nomePagamento(pagamento.idPagamento) }}
              </label>
              <p v-if="cliente.pagamentos.length == 0">
                Nenhum meio de pagamento registrado
              </p>
            </div>
            <label class="checkbox mt-1">
              <input
                type="checkbox"
                v-model="buyWithCrypto"
                @change="generateBuyLabel"
              />
              Pagar em {{ activeCrypto.nomeCripto }}
            </label>
            <p class="mt-3"><b>Endereço</b></p>
            <p>{{ getAddress }} {{ cliente.endereco.cep }}</p>
          </div>
        </div>
        <div v-if="isCheckoutSection">
          <p>Sua compra foi finalizada! 🥳</p>
        </div>
        <div
          class="notification is-danger is-light mt-4 p-2"
          :hidden="hideError"
        >
          {{ errorMessage }}
        </div>
      </section>
      <footer class="modal-card-foot">
        <button
          v-show="!isCheckoutSection"
          class="button is-info"
          @click="closeModal()"
        >
          {{ continueLabel }}
        </button>
        <button
          v-show="products.length > 0 && !isCheckoutSection"
          class="button is-success"
          @click="checkoutOrder"
        >
          {{ generateBuyLabel() }}
        </button>
        <button
          v-if="isCheckoutSection"
          class="button is-success"
          @click="closeModal()"
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
      modalTitle: "Finalizar Pedido",
      checkoutTitle: "Sucesso!",
      cartEmptyLabel: "Seu carrinho está vazio",
      continueLabel: "Continuar comprando",
      closeLabel: "Fechar",
      isCheckoutSection: false,
      buyWithCrypto: false,
      order: {},
      formasPagamento: this.$store.state.paymentMethods,
      hideError: true,
      errorMessage: "",
    };
  },

  components: { VmQuantityInput },

  computed: {
    cliente() {
      return this.$store.state.userInfo;
    },
    products() {
      return this.$store.getters.productsAdded;
    },
    openModal() {
      return this.$store.state.systemInfo.isCheckoutModalOpen;
    },
    activeCrypto() {
      return this.$store.getters.getCrypto();
    },
    isUserLoggedIn() {
      return this.$store.state.auth.loggedIn;
    },
    getAddress() {
      if (!this.cliente.endereco.cep)
        return "Você não possui um endereço cadastrado";
      return `${this.cliente.endereco.logradouro} ${this.cliente.endereco.numero} ${this.cliente.endereco.complemento}, ${this.cliente.endereco.bairro}, ${this.cliente.endereco.cidade}, ${this.cliente.endereco.estado}`;
    },
  },

  methods: {
    priceLabel(price) {
      return this.$store.getters.formatPriceTag(price);
    },
    cryptoPrice(price, label = true) {
      const value = (price / this.activeCrypto.cotacaoReal).toFixed(8);
      return label ? `${value} ${this.activeCrypto.codCripto}` : value;
    },
    generateBuyLabel() {
      if (this.cliente.pagamentos.length == 0) return "Adicionar pagamento";
      if (!this.cliente.endereco.cep) return "Adicionar endereço";

      let productsAdded = this.$store.getters.productsAdded,
        pricesArray = [],
        finalPrice = "",
        quantity = 1;

      productsAdded.forEach((product) => {
        if (product.quantity >= 1) {
          quantity = product.quantity;
        }
        pricesArray.push(product.precoReal * quantity);
      });

      finalPrice = pricesArray.reduce((a, b) => a + b, 0).toFixed(2);

      return `Comprar por ${
        this.buyWithCrypto
          ? this.cryptoPrice(finalPrice)
          : this.priceLabel(finalPrice)
      }`;
    },
    closeModal() {
      this.isCheckoutSection
        ? (window.location = "/")
        : this.$store.commit("toggleCheckoutModal", false);
    },
    removeFromCart(id) {
      this.$store.commit("removeFromCart", id);
      if (!this.products.length)
        this.$store.commit("toggleCheckoutModal", false);
    },
    checkoutOrder() {
      this.hideError = true;
      if (this.isUserLoggedIn) {
        if (this.cliente.pagamentos.length == 0) {
          this.$router.push({ name: "user-payments" });
          this.closeModal();
        } else if (!this.cliente.endereco.cep) {
          this.$router.push({ name: "user-update" });
          this.closeModal();
        } else if (!this.order.idPagamento) {
          this.showError("Escolha uma forma de pagamento!");
        } else {
          this.order = {
            idCliente: this.cliente.idCliente,
            cepEnvio: this.cliente.endereco.cep,
            enderecoEnvio: this.getAddress,
            moeda: this.buyWithCrypto ? this.activeCrypto.codCripto : "BRL",
            idPagamento: this.order.idPagamento,
            formaPagamento: this.nomePagamento(this.order.idPagamento),
            produtos: this.products.map((p) => ({
              idProduto: p.idProduto,
              precoUnitario: Number(
                this.buyWithCrypto
                  ? this.cryptoPrice(p.precoReal, false)
                  : p.precoReal
              ),
              quantidade: Number(p.quantity),
            })),
          };
          this.$store
            .dispatch("enviarPedido", this.order)
            .then(() => {
              this.isCheckoutSection = true;
            })
            .catch((err) => this.showError(err));
        }
      } else {
        this.$store.commit("toggleCheckoutModal", false);
        this.$auth.loginWith("auth0");
      }
    },
    imageAddress(id) {
      return `/products/${id}.jpg`;
    },
    nomePagamento(id) {
      return this.formasPagamento.find((fp) => fp.idPagamento == id).nome;
    },
    showError(message) {
      this.errorMessage = message;
      this.hideError = false;
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
