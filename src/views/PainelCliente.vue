<template>
    <div class="painel-cliente">
      <h1>Painel de Clientes</h1>
  
      <!-- Filtros de busca -->
      <div class="filters">
        <div class="input-row">
          <div class="input-group">
            <label for="searchNome">Nome:</label>
            <input type="text" v-model="name" id="name" class="styled-input">
          </div>
          <div class="input-group">
            <label for="searchCPF">CPF:</label>
            <input type="text" v-model="documentValue" id="documentValue" class="styled-input">
          </div>
        </div>
        <div class="input-row">
          <div class="input-group">
            <label for="searchDataNascimento">Data de Nascimento:</label>
            <input type="date" v-model="birthdate" id="birthdate" class="styled-input">
          </div>
          <div class="input-group">
            <label for="searchSexo">Sexo:</label>
            <select v-model="gender" id="gender" class="styled-select">
              <option value="1">Masculino</option>
              <option value="2">Feminino</option>
            </select>
          </div>
        </div>
        <div class="input-row">
          <div class="input-group">
          <label for="estado">Estado:</label>
          <select id="estado" v-model="selectedState" @change="fetchCities" class="styled-select">
            <option v-for="state in stateList" :key="state.id" :value="state.id">{{ state.title }}</option>
          </select>
        </div>
        
        <div class="input-group">
          <label for="cidade">Cidade:</label>
          <select id="cidade" v-model="city" class="styled-select">
            <option v-for="city in cityList" :key="city.id" :value="city.id">{{ city.title }}</option>
          </select>
        </div>
        </div>
        <div class="button-group">
          <button @click="buscarClientes" class="styled-button">Buscar</button>
        </div>
      </div>
  
      <!-- DataTable para exibir os clientes -->
      <DataTable :clientes="clientes" :columns="colunas" />
    </div>
  </template>
  
  <script setup>
  import DataTable from '@/components/DataTable.vue';
  import { ref, onMounted } from 'vue';
  import axios from 'axios';

  
  const stateList = ref([]);
  const cityList = ref([]);

onMounted(async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/location/state');
    stateList.value = response.data;
  } catch (error) {
    console.error(error);
  }
});

const fetchCities = async () => {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/api/location/cities/`+ selectedState.value);
    cityList.value = response.data;
  } catch (error) {
    console.error(error);
  }
};
  const colunas = [
    { label: 'Nome', field: 'nome' },
    { label: 'CPF', field: 'cpf' },
    { label: 'Data de Nascimento', field: 'dataNascimento' },
    { label: 'Sexo', field: 'sexo' },
    { label: 'Estado', field: 'estado' },
    { label: 'Cidade', field: 'cidade' },
  ];
  
  const clientes = ref([
    {}
  ]);
  
  const documentValue = ref('');
  const name = ref('');
  const birthdate = ref('');
  const gender = ref('1');
  const selectedState = ref('');
  const city = ref('');
  
  const buscarClientes = () => {
  try {
    axios.get('http://127.0.0.1:8000/api/clients/', {
      params: {
        document_value: documentValue.value,
        name: name.value,
        birthdate: birthdate.value,
        gender: gender.value,
        state: selectedState.value,
        city: city.value
      }
    }).then(response => {
      clientes.value = response.data.data; // Acessa o array de dados dentro do objeto de resposta
      console.log(response.data.data); // Mostra os dados no console
      console.log(clientes.value); // Mostra os dados no console
    }).catch(error => {
      console.error(error);
    });
  } catch (error) {
    console.error(error);
  }
};
  
  </script>
  
<style scoped>
.painel-cliente {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  background-color: #f5f5f5;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

.filters {
  margin-bottom: 20px;
}

.input-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
}

.input-group {
  flex: 1;
  margin-right: 10px;
}

.input-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.styled-input {
  width: 100%;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.styled-select {
  width: 100%;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  background-color: white;
}

.button-group {
  text-align: center;
  margin-top: 15px;
}

.styled-button {
  padding: 10px 20px;
  font-size: 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.styled-button:hover {
  background-color: #0056b3;
}
</style>
  