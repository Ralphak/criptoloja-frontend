<template>
  <input
    class="input"
    type="number"
    v-model="selected"
    min="1"
    max="20"
    @input="onSelectQuantity()"
  />
</template>

<script>
export default {
  name: "VmQuantityInput",
  props: ["id"],

  data() {
    return {
      selected: 1,
    };
  },

  mounted() {
    this.selected = this.$store.getters.getQuantity(this.$props.id);
  },

  methods: {
    onSelectQuantity() {
      let data = {
        id: this.$props.id,
        quantity: this.selected,
      };
      this.$store.commit("setQuantity", data);
    },
  },
};
</script>

<style lang="scss" scoped>
.input {
  width: 5em;
}
</style>
