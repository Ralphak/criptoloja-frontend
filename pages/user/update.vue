<template>
  <form class="section" @submit.prevent="salvarDados()">
    <p class="title">Atualizar Dados</p>
    <div class="columns">
      <div class="field column">
        <label class="label">Nome</label>
        <input class="input" type="text" v-model="cliente.nome" required />
      </div>
      <div class="field column">
        <label class="label">Email</label>
        <div class="control has-icons-left has-icons-right">
          <input class="input" type="email" v-model="cliente.email" required />
          <span class="icon is-small is-left">
            <i class="fas fa-envelope"></i>
          </span>
        </div>
      </div>
    </div>
    <p class="subtitle has-text-weight-semibold">Endereço</p>
    <div class="columns">
      <div class="field column is-2">
        <label class="label">CEP</label>
        <input
          class="input"
          type="text"
          v-model="cliente.endereco.cep"
          placeholder="00000-000"
          maxlength="9"
          required
        />
      </div>
      <div class="field column">
        <label class="label">Logradouro (Rua, Avenida,...)</label>
        <input
          class="input"
          type="text"
          v-model="cliente.endereco.logradouro"
          required
        />
      </div>
      <div class="field column is-2">
        <label class="label">Número</label>
        <input
          class="input"
          type="number"
          v-model="cliente.endereco.numero"
          maxlength="5"
          required
        />
      </div>
    </div>
    <div class="columns">
      <div class="field column is-3">
        <label class="label">Complemento (opcional)</label>
        <input
          class="input"
          type="text"
          v-model="cliente.endereco.complemento"
        />
      </div>
      <div class="field column">
        <label class="label">Bairro</label>
        <input
          class="input"
          type="text"
          v-model="cliente.endereco.bairro"
          required
        />
      </div>
      <div class="field column">
        <label class="label">Cidade</label>
        <input
          class="input"
          type="text"
          v-model="cliente.endereco.cidade"
          required
        />
      </div>
      <div class="field column is-1">
        <label class="label">Estado</label>
        <input
          class="input"
          type="text"
          v-model="cliente.endereco.estado"
          maxlength="2"
          required
        />
      </div>
    </div>
    <button class="button is-success" type="submit">Salvar Mudanças</button>
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
</template>

<script>
import { isValidEmail, isValidCEP } from "@/assets/validators";
export default {
  name: "user-update",
  data() {
    return {
      cliente: JSON.parse(JSON.stringify(this.$store.state.userInfo)),
      hideError: true,
      hideSuccess: true,
      errorMessage: "",
    };
  },
  created() {
    if (!this.$store.state.auth.loggedIn) return this.$auth.loginWith("auth0");
  },
  methods: {
    async salvarDados() {
      if (!isValidEmail(this.cliente.email))
        return this.showError("Email inválido");
      if (!isValidCEP(this.cliente.endereco.cep))
        return this.showError("CEP deve estar no formato 00000-000");
      this.$store
        .dispatch("atualizarCliente", this.cliente)
        .then(() => {
          this.hideError = true;
          this.hideSuccess = false;
          this.cliente = JSON.parse(JSON.stringify(this.$store.state.userInfo));
        })
        .catch((err) => this.showError(err));
    },
    showError(message) {
      this.errorMessage = message;
      this.hideSuccess = true;
      this.hideError = false;
    },
  },
};
</script>
