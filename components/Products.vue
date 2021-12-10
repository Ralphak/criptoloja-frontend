<template>
  <div>
    <div class="card-image">
      <figure class="image is-4by3">
        <img
          src="https://bulma.io/images/placeholders/640x480.png"
          alt="Placeholder image"
        />
      </figure>
    </div>
    <div class="card-content">
      <p class="is-size-4 has-text-weight-medium">{{ product.title }}</p>
      <div class="content is-clearfix">
        <p>{{ product.description }}</p>
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
          <span class="title is-4">R$ {{ product.price }}</span>
          <br />
          <span class="title is-6"
            >{{ cryptoPrice }}</span
          >
        </p>
      </div>
      <div class="card-footer btn-actions">
        <div class="card-footer-item field is-grouped">
          <div class="buttons">
            <button
              class="button is-primary"
              v-if="!product.isAddedToCart"
              @click="addToCart(product.id)"
            >
              {{ addToCartLabel }}
            </button>
            <button
              class="button is-danger"
              v-if="product.isAddedToCart"
              @click="removeFromCart(product.id, false)"
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
            @input="onSelectQuantity(product.id)"
          />
        </div>
      </div>
    </div>
    <nuxt-link
      class="details"
      :to="{
        name: 'product_detail-id',
        params: {
          id: product.id,
          title: product.title,
          price: product.price,
          rating: product.ratings,
          reviews: product.reviews,
          isAddedBtn: product.isAddedBtn,
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
      viewDetailsLabel: "Detalhes",
      removeFromCartLabel: "Remover do carrinho",
      selected: 1,
    };
  },

  mounted() {
    if (this.$props.product.quantity > 1) {
      this.selected = this.$props.product.quantity;
    }
  },

  computed: {
    cryptoPrice() {
      let crypto = this.$store.getters.getCrypto();
      return `${(this.$props.product.price / crypto.cotacaoReal).toFixed(8)} ${crypto.codCripto}`;
    },
    reviewCount() {
      let count = this.$props.product.reviews;
      return count > 0 ? `${count} Avaliaç${count == 1 ? "ão" : "ões"}` : "Nenhuma avaliação";
    }
  },

  methods: {
    addToCart(id) {
      let data = {
        id: id,
        status: true,
      };
      this.$store.commit("addToCart", id);
      this.$store.commit("setAddedBtn", data);
      this.$store.commit("showCheckoutModal", true);
    },
    removeFromCart(id) {
      let data = {
        id: id,
        status: false,
      };
      this.$store.commit("removeFromCart", id);
      this.$store.commit("setAddedBtn", data);
    },
    onSelectQuantity(id) {
      let data = {
        id: id,
        quantity: this.selected,
      };
      this.$store.commit("setQuantity", data);
    },
  }
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


