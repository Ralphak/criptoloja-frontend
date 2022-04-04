<template>
  <div class="section">
    <p class="title">Meus Pedidos</p>
    <p class="subtitle">Em construção</p>
    <pre v-for="pedido in pedidos" :key="pedido.numPedido" class="mb-3">{{JSON.stringify(pedido,undefined,4)}}</pre>
  </div>
</template>

<script>
export default {
  name: "user-orders",
  data() {
    return {
      pedidos: this.$store.state.userInfo.pedidos,
    };
  },
};
</script>
