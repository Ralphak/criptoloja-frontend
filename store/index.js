export const state = () => ({
  products: [
    {
      id: 1,
      title: 'Product 1',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      price: 5000000.01,
      ratings: 3,
      reviews: 5,
      isAddedToCart: false,
      isAddedBtn: false,
      quantity: 1
    }
  ],
  cryptos: [],
  userInfo: {
    selectedCrypto: "BTC"
  },
  systemInfo: {
    isCheckoutModalOpen: false,
    hasSearched: false,
    productTitleSearched: ''
  }
})

export const actions = {
  async nuxtServerInit({ commit }) {
    const [cryptos, products] = await Promise.all([
      this.$axios.$get("/cotacoes"),
      this.$axios.$get("/produtos")
    ]).catch(err => console.error(err));
    commit("initialSetup", { cryptos, products });
  }
}

export const getters = {
  productsAdded: state => state.products.filter(el => el.isAddedToCart),
  getProductById: state => id => state.products.find(product => product.idProduto == id),
  getCrypto: state => code => state.cryptos.find(i => (code || state.userInfo.selectedCrypto) == i.codCripto)
}

export const mutations = {
  initialSetup: (state, data) => {
    state.cryptos = data.cryptos;
    state.products = data.products;

    state.products.map(product => {
      product.isAddedToCart = false;
      product.precoReal = product.precoReal.toFixed(2);
    });
  },
  addToCart: (state, id) => {
    state.products.forEach(el => {
      if (id === el.idProduto) {
        el.isAddedToCart = true;
        return;
      }
    });
  },
  removeFromCart: (state, id) => {
    state.products.forEach(el => {
      if (id === el.idProduto) {
        el.isAddedToCart = false;
        return;
      }
    });
  },
  setHasUserSearched: (state, hasSearched) => {
    state.systemInfo.hasSearched = hasSearched;
  },
  setProductTitleSearched: (state, titleSearched) => {
    state.systemInfo.productTitleSearched = titleSearched;
  },
  toggleCheckoutModal: (state, show) => {
    state.systemInfo.isCheckoutModalOpen = show;
  },
  setQuantity: (state, data) => {
    state.products.forEach(el => {
      if (data.id === el.idProduto) {
        el.quantity = data.quantity;
        return;
      }
    });
  },
  setActiveCrypto: (state, option) => state.userInfo.selectedCrypto = option
}
