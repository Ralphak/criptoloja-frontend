<template>
  <div class="section">
    <div class="card is-clearfix columns">
      <figure class="card-image is-4by3 column is-one-thirds">
        <img :src="imageAddress" alt="Foto" />
      </figure>
      <div class="card-content column is-two-thirds">
        <div class="card-content__title">
          <p class="title is-4">{{ product.nomeProduto }}</p>
        </div>
        <div class="card-content__ratings">
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
        </div>
        <div class="card-content__reviews">
          <p class="is-pulled-left">{{reviewCount}}</p>
        </div>
        <div class="card-content__price is-pulled-left">
          <span class="title is-3">R$ {{ product.precoReal }}</span>
          <br />
          <span class="title is-5">{{ cryptoPrice }}</span>
        </div>
        <div class="card-content__btn is-pulled-right">
          <input
            class="input is-pulled-right"
            type="number"
            v-model="selected"
            min="1"
            max="20"
            @input="onSelectQuantity(product.idProduto)"
          />
          <br />
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
            @click="removeFromCart(product.idProduto)"
          >
            {{ removeFromCartLabel }}
          </button>
        </div>
      </div>
    </div>
    <div>
      <p class="is-size-4">Descrição</p>
      <p>{{ product.descricao }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "product_detail-id",

  validate({ params }) {
    return /^\d+$/.test(params.id);
  },

  data() {
    return {
      addToCartLabel: "Adicionar ao carrinho",
      removeFromCartLabel: "Remover do carrinho",
      product: {},
      selected: 1,
    };
  },

  mounted() {
    this.product = this.$store.getters.getProductById(this.$route.params.id);
    if (this.product.quantity) {
      this.selected = this.product.quantity;
    }
  },

  computed: {
    imageAddress() {
      return `/products/${this.product.idProduto}.jpg`;
    },
    cryptoPrice() {
      let crypto = this.$store.getters.getCrypto();
      return `${(this.product.precoReal / crypto.cotacaoReal).toFixed(8)} ${crypto.codCripto}`;
    },
    reviewCount() {
      let count = this.product.reviews;
      return count > 0 ? `${count} Avaliaç${count == 1 ? "ão" : "ões"}` : "Nenhuma avaliação";
    }
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
.card {
  background-color: palegreen;
}
@media (min-width: 769px) {
  .card {
    max-width: 816px;
    max-height: 216px;
  }
}
.card-content {
  padding: 15px 10px;

  &__text {
    margin: 15px 0;
  }
  &__reviews {
    display: inline-block;
    width: 100%;
    margin-bottom: 10px;
  }
  &__btn {
    margin-bottom: 15px;
  }
}
.input {
  width: 5em;
  margin-bottom: 10px;
}
.section {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>

