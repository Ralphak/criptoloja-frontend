<template>
  <div class="section">
    <p class="title">Formas de Pagamento</p>
    <p class="is-size-5">Pagamentos cadastrados:</p>
    <b v-if="pagamentos.length == 0">Nenhum</b>
    <ul>
      <li v-for="pag in pagamentos" :key="pag.idPagamento">
        <i class="fa fa-check"></i> {{ nomePagamento(pag.idPagamento) }}
      </li>
    </ul>
    <br />
    <form @submit.prevent="enviar()">
      <p class="subtitle has-text-weight-semibold">
        Atualizar Forma de Pagamento
      </p>
      <div class="select mb-5">
        <select
          v-model="novoPagamento.idPagamento"
          @change="limparDadosPagamento()"
        >
          <option selected disabled value="0">
            Escolha um meio de pagamento
          </option>
          <option
            v-for="forma in formasPagamento"
            :key="forma.idPagamento"
            :value="forma.idPagamento"
          >
            {{ forma.nome }}
          </option>
        </select>
      </div>
      <div class="columns" v-if="novoPagamento.idPagamento == 2">
        <div class="field column is-4">
          <label class="label">Número do Cartão</label>
          <input
            class="input"
            type="number"
            v-model="novoPagamento.dadosPagamento.numero"
            maxlength="16"
            required
          />
        </div>
        <div class="field column is-3">
          <label class="label">Validade</label>
          <input
            class="input"
            type="date"
            v-model="novoPagamento.dadosPagamento.validade"
            required
          />
        </div>
      </div>
      <div class="columns" v-if="novoPagamento.idPagamento == 3">
        <div class="field column">
          <label class="label">Chave da carteira</label>
          <input
            class="input"
            v-model="novoPagamento.dadosPagamento.chave"
            required
          />
        </div>
      </div>
      <button
        class="button is-success"
        type="submit"
        v-if="novoPagamento.idPagamento"
      >
        Enviar
      </button>
      <div class="notification is-danger is-light mt-4 p-2" :hidden="hideError">
        {{ errorMessage }}
      </div>
      <div
        class="notification is-success is-light mt-4 p-2"
        :hidden="hideSuccess"
      >
        Dados salvos com sucesso!
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "user-payments",
  data() {
    return {
      formasPagamento: this.$store.state.paymentMethods,
      novoPagamento: {
        dadosPagamento: {},
      },
      hideError: true,
      hideSuccess: true,
      errorMessage: "",
    };
  },
  created() {
    if (!this.$store.state.auth.loggedIn) return this.$auth.loginWith("auth0");
  },
  computed: {
    pagamentos() {
      return this.$store.state.userInfo.pagamentos;
    },
  },
  methods: {
    limparDadosPagamento() {
      this.novoPagamento.dadosPagamento = {};
    },
    enviar() {
      this.$store
        .dispatch("atualizarPagamento", this.novoPagamento)
        .then(() => {
          this.hideError = true;
          this.hideSuccess = false;
          this.novoPagamento = {
            idPagamento: 0,
            dadosPagamento: {},
          };
        })
        .catch((err) => this.showError(err));
    },
    showError(message) {
      this.errorMessage = message;
      this.hideSuccess = true;
      this.hideError = false;
    },
    nomePagamento(id) {
      return this.formasPagamento.find((fp) => fp.idPagamento == id).nome;
    }
  },
};
</script>
