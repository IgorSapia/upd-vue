<template>
  <div class="select-with-filter">
    <input v-model="searchText" @input="filterCities" placeholder="Digite para filtrar">
    <select v-model="selectedCity">
      <option v-for="estado in estados" :key="estado.id" :value="estado.id">{{ estado.title }}</option>
    </select>
  </div>
</template>

<script>
export default {
  props: {
    estados: Array // Lista completa de cidades
  },
  data() {
    return {
      searchText: '',
      selectedCity: null
    };
  },
  mounted() {
    console.log(this.estados); // Exibirá a lista de cidades no console
  }
};
</script>

<style scoped>
.select-with-filter {
  display: inline-block;
}
</style>
