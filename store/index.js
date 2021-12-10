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
    },
    {
      id: 2,
      title: 'Product 2',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      price: 35,
      ratings: 5,
      reviews: 10,
      isAddedToCart: false,
      isAddedBtn: false,
      quantity: 1
    },
    {
      id: 3,
      title: 'Product 3',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      price: 110,
      ratings: 2.5,
      reviews: 3,
      isAddedToCart: false,
      isAddedBtn: false,
      quantity: 1
    },
    {
      id: 4,
      title: 'Product 4',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      price: 50,
      ratings: 1,
      reviews: 0,
      isAddedToCart: false,
      isAddedBtn: false,
      quantity: 1
    },
    {
      id: 5,
      title: 'Product 5',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      price: 35,
      ratings: 4.2,
      reviews: 2,
      isAddedToCart: false,
      isAddedBtn: false,
      quantity: 1
    },
    {
      id: 6,
      title: 'Product 6',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      price: 110,
      ratings: 5,
      reviews: 1,
      isAddedToCart: false,
      isAddedBtn: false,
      quantity: 1
    },
    {
      id: 7,
      title: 'Product 7',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      price: 50,
      ratings: 5,
      reviews: 7,
      isAddedToCart: false,
      isAddedBtn: false,
      quantity: 1
    },
    {
      id: 8,
      title: 'Product 8',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      price: 35,
      ratings: 3.7,
      reviews: 0,
      isAddedToCart: false,
      isAddedBtn: false,
      quantity: 1
    },
    {
      id: 9,
      title: 'Product 9',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      price: 110,
      ratings: 4,
      reviews: 2,
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
    const [cryptos] = await Promise.all([
      this.$axios.$get("/cotacoes")
    ]).catch(err => console.error(err));
    commit("initialSetup", { cryptos });
  }
}

export const getters = {
  productsAdded: state => state.products.filter(el => el.isAddedToCart),
  getProductById: state => id => state.products.find(product => product.id == id),
  getCrypto: state => code => state.cryptos.find(i => (code || state.userInfo.selectedCrypto) == i.codCripto)
}

export const mutations = {
  initialSetup: (state, data) => {
    state.cryptos = data.cryptos;
  },
  addToCart: (state, id) => {
    state.products.forEach(el => {
      if (id === el.id) {
        el.isAddedToCart = true;
      }
    });
  },
  setAddedBtn: (state, data) => {
    state.products.forEach(el => {
      if (data.id === el.id) {
        el.isAddedBtn = data.status;
      }
    });
  },
  removeFromCart: (state, id) => {
    state.products.forEach(el => {
      if (id === el.id) {
        el.isAddedToCart = false;
      }
    });
  },
  setHasUserSearched: (state, hasSearched) => {
    state.systemInfo.hasSearched = hasSearched;
  },
  setProductTitleSearched: (state, titleSearched) => {
    state.systemInfo.productTitleSearched = titleSearched;
  },
  showCheckoutModal: (state, show) => {
    state.systemInfo.openCheckoutModal = show;
  },
  setQuantity: (state, data) => {
    state.products.forEach(el => {
      if (data.id === el.id) {
        el.quantity = data.quantity;
      }
    });
  },
  setActiveCrypto: (state, option) => state.userInfo.selectedCrypto = option
}
