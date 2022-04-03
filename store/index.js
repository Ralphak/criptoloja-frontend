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
  paymentMethods: [],
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
    const [cryptos, products, paymentMethods] = await Promise.all([
      this.$axios.$get("/cotacoes"),
      this.$axios.$get("/produtos"),
      this.$axios.$get("/pagamentos")
    ]).catch(err => console.error(err));

    let user, address, payments;
    if (this.$auth.loggedIn) {
      this.$axios.onRequest(config => {
        config.headers.common["Authorization"] = `Bearer ${this.$auth.strategy.token.get()}`
      });

      user = await this.$axios.$get("/clientes?email=" + this.$auth.user.email).catch(err => console.error(err));
      if (!user) user = await this.$axios.$put("/clientes", {
        email: this.$auth.user.email,
        nome: this.$auth.user.name
      }).catch(err => console.error(err));

      address = await this.$axios.$get("/enderecos/" + user.idCliente).catch(err => console.error(err));
      payments = await this.$axios.$get("/pagamentos/cliente/" + user.idCliente).catch(err => console.error(err));
    };

    commit("initialSetup", { cryptos, products, paymentMethods, user, address, payments });
  },

  atualizarCliente({ commit }, cliente) {
    let endereco = cliente.endereco;
    endereco.idCliente = cliente.idCliente;
    return Promise.all([
      this.$axios.$put("/clientes", cliente),
      this.$axios.$put("/enderecos", endereco)
    ]).then(() => {
      commit("setCliente", cliente);
    });
  },
  atualizarPagamento({ commit, state }, pagamento) {
    pagamento.idCliente = state.userInfo.idCliente;
    return this.$axios.$put("/pagamentos/cliente", pagamento).then(() => {
      commit("incluirPagamento", pagamento);
    });
  },
}

export const getters = {
  productsAdded: state => state.products.filter(el => el.isAddedToCart),
  getProductById: state => id => state.products.find(product => product.idProduto == id),
  getCrypto: state => code => state.cryptos.find(i => (code || state.systemInfo.selectedCrypto) == i.codCripto),
  formatPriceTag: state => price => state.systemInfo.currencyLabel + ' ' + price,
  getQuantity: state => id => {
    let product = state.products.find(product => product.idProduto == id);
    if (!product.quantity) product.quantity = 1;
    return product.quantity;
  }
}

export const mutations = {
  initialSetup: (state, data) => {
    state.cryptos = data.cryptos;
    state.products = data.products;
    state.paymentMethods = data.paymentMethods;
    if (data.user) state.userInfo = data.user;
    state.userInfo.endereco = data.address || {};
    state.userInfo.pagamentos = data.payments || [];

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
  setActiveCrypto: (state, option) => state.systemInfo.selectedCrypto = option,
  setCliente: (state, cliente) => state.userInfo = cliente,
  incluirPagamento: (state, pagamento) => {
    state.userInfo.pagamentos = state.userInfo.pagamentos.filter(p => p.idPagamento != pagamento.idPagamento);
    state.userInfo.pagamentos.push(pagamento);
    console.log(state.userInfo.pagamentos);
  }
}
