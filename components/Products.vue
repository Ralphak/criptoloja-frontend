<template>
  <div>
    <div class="card-image">
      <figure class="image is-4by3">
        <img :src="imageAddress" alt="Foto" />
      </figure>
    </div>
    <div class="card-content">
      <p class="is-size-4 has-text-weight-medium">{{ product.nomeProduto }}</p>
      <div class="content is-clearfix">
        <p>{{ shortenDescription }}</p>
        <div class="is-pulled-left">
          <i
            v-if="product.ratings > 0 && product.ratings <= 0.5"
            class="fa fa-star-half"
          ></i>
          <i v-if="product.ratings > 0.5" class="fa fa-star"></i>
          <i
            v-if="product.ratings > 1 && product.ratings <= 1.5"
            class="fa fa-star-half"
          ></i>
          <i v-if="product.ratings > 1.5" class="fa fa-star"></i>
          <i
            v-if="product.ratings > 2 && product.ratings <= 2.5"
            class="fa fa-star-half"
          ></i>
          <i v-if="product.ratings > 2.5" class="fa fa-star"></i>
          <i
            v-if="product.ratings > 3 && product.ratings <= 3.5"
            class="fa fa-star-half"
          ></i>
          <i v-if="product.ratings > 3.5" class="fa fa-star"></i>
          <i
            v-if="product.ratings > 4 && product.ratings <= 4.5"
            class="fa fa-star-half"
          ></i>
          <i v-if="product.ratings > 4.5" class="fa fa-star"></i>
          <p class="is-size-7">{{ reviewCount }}</p>
        </div>
        <p class="is-pulled-right has-text-right">
          <span class="title is-4">R$ {{ product.precoReal }}</span>
          <br />
          <span class="title is-6">{{ cryptoPrice }}</span>
        </p>
      </div>
      <div class="card-footer btn-actions">
        <div class="card-footer-item field is-grouped">
          <div class="buttons">
            <button
              class="button is-primary"
              v-if="!product.isAddedToCart"
              @click="addToCart(product.idProduto)"
            >
              {{ addToCartLabel }}
            </button>
            <button
              class="button is-danger"
              v-if="product.isAddedToCart"
              @click="removeFromCart(product.idProduto, false)"
            >
              {{ removeFromCartLabel }}
            </button>
          </div>
          <input
            class="input is-small"
            type="number"
            v-model="selected"
            min="1"
            max="20"
            @input="onSelectQuantity(product.idProduto)"
          />
        </div>
      </div>
    </div>
    <nuxt-link
      class="details"
      :to="{
        name: 'product_detail-id',
        params: {
          id: product.idProduto,
        },
      }"
    >
    </nuxt-link>
  </div>
</template>

<script>
export default {
  name: "products",
  props: ["product"],

  data() {
    return {
      addToCartLabel: "Adicionar ao carrinho",
      removeFromCartLabel: "Remover do carrinho",
      selected: 1,
    };
  },

  mounted() {
    if (this.$props.product.quantity) {
      this.selected = this.$props.product.quantity;
    }
  },

  computed: {
    imageAddress() {
      return `/products/${this.$props.product.idProduto}.jpg`;
    },
    cryptoPrice() {
      let crypto = this.$store.getters.getCrypto();
      return `${(this.$props.product.precoReal / crypto.cotacaoReal).toFixed(
        8
      )} ${crypto.codCripto}`;
    },
    reviewCount() {
      let count = this.$props.product.reviews;
      return count > 0
        ? `${count} Avaliaç${count == 1 ? "ão" : "ões"}`
        : "Nenhuma avaliação";
    },
    shortenDescription() {
      let description = this.$props.product.descricao.split(" ");
      let label = "";
      for (let i = 0; i < 10; i++) {
        if (!description[i]) break;
        label += description[i] + " ";
      }
      if (description.length > 10) label += "...";
      return label;
    },
  },

  methods: {
    addToCart(id) {
      this.$store.commit("addToCart", id);
      this.$store.commit("toggleCheckoutModal", true);
    },
    removeFromCart(id) {
      this.$store.commit("removeFromCart", id);
    },
    onSelectQuantity(id) {
      let data = {
        id: id,
        quantity: this.selected,
      };
      this.$store.commit("setQuantity", data);
    },
  },
};
</script>

<style lang="scss" scoped>
.details {
  cursor: pointer;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;

  &:hover {
    border: 1px solid #51bafc;
  }
}
.button,
.input {
  z-index: 2;
}
.input {
  margin-left: auto;
  bottom: 4px;
  width: 5em;
}
.card-content {
  padding: 0;
}
.buttons {
  margin: 0;
}
.card-footer-item {
  padding: 0.5rem 0.25rem 0;
}
</style>
