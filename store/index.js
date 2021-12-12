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
  userInfo: {},
  systemInfo: {
    isCheckoutModalOpen: false,
    hasSearched: false,
    productTitleSearched: '',
    selectedCrypto: "BTC",
    currencyLabel: "R$"
  }
})

export const actions = {
  async nuxtServerInit({ commit }) {
    const [cryptos, products] = await Promise.all([
      this.$axios.$get("/cotacoes"),
      this.$axios.$get("/produtos")
    ]).catch(err => console.error(err));

    let user;
    if (this.$auth.loggedIn) {
      user = await this.$axios.$get("/clientes?email=" + this.$auth.user.email).catch(err => console.error(err));
      if (!user) user = await this.$axios.$post("/clientes", {
        email: this.$auth.user.email,
        nome: this.$auth.user.name
      }).catch(err => console.error(err));
    };

    commit("initialSetup", { cryptos, products, user });
  }
}

export const getters = {
  productsAdded: state => state.products.filter(el => el.isAddedToCart),
  getProductById: state => id => state.products.find(product => product.idProduto == id),
  getCrypto: state => code => state.cryptos.find(i => (code || state.systemInfo.selectedCrypto) == i.codCripto),
  formatPriceTag: state => price => state.systemInfo.currencyLabel + ' ' + price,
  getQuantity: state => id =>{
    let product = state.products.find(product => product.idProduto == id);
    if(!product.quantity) product.quantity = 1;
    return product.quantity;
  }
}

export const mutations = {
  initialSetup: (state, data) => {
    state.cryptos = data.cryptos;
    state.products = data.products;
    if (data.user) state.userInfo = data.user;

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
    let product = state.products.find(product => product.idProduto == data.id);
    product.quantity = data.quantity;
  },
  setActiveCrypto: (state, option) => state.systemInfo.selectedCrypto = option
}
