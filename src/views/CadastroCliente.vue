<template>
  <div class="cadastro-cliente">
    <h1>Cadastro Cliente</h1>

    <form @submit.prevent="submitForm">
      <div class="input-row">
        <div class="input-group">
          <label for="nome">Nome:</label>
          <input type="text" id="nome" v-model="cliente.name" required class="styled-input">
        </div>

        <div class="input-group">
          <label for="cpf">CPF:</label>
          <input type="text" id="cpf" v-model="cliente.document_value" required class="styled-input">
        </div>
      </div>

      <div class="input-row">
        <div class="input-group">
          <label for="dataNascimento">Data de Nascimento:</label>
          <input type="date" id="dataNascimento" v-model="cliente.birthdate" required class="styled-input">
        </div>

        <div class="input-group">
          <label for="sexo">Sexo:</label>
          <select id="sexo" v-model="cliente.gender" class="styled-select">
            <option value=1>Masculino</option>
            <option value=2>Feminino</option>
          </select>
        </div>
      </div>

      <div class="input-row">
        <div class="input-group">
          <label for="estado">Estado:</label>
          <select id="estado" v-model="cliente.state_id" @change="fetchCities" class="styled-select">
            <option v-for="state in stateList" :key="state.id" :value="state.id">{{ state.title }}</option>
          </select>
        </div>
        
        <div class="input-group">
          <label for="cidade">Cidade:</label>
          <select id="cidade" v-model="cliente.city_id" class="styled-select">
            <option v-for="city in cityList" :key="city.id" :value="city.id">{{ city.title }}</option>
          </select>
        </div>
      </div>

      <div class="input-group">
        <label for="endereco">Endereço:</label>
        <input type="text" id="endereco" v-model="cliente.address" required class="styled-input">
      </div>

      <div class="button-group">
        <button type="submit" class="styled-button">Cadastrar</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const cliente = ref({
  gender: '',
  document_value: '',
  name: '',
  birthdate: '',
  address: '',
  state_id: 1,
  city_id: ''
});

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
    const response = await axios.get(`http://127.0.0.1:8000/api/location/cities/`+ cliente.value.state_id);
    cityList.value = response.data;
    console.log(cliente.value.name);
  } catch (error) {
    console.error(error);
  }
};

const submitForm = async () => {
  try {
    const response = await axios.post('http://127.0.0.1:8000/api/clients/create', cliente.value);
    console.log(response);
  } catch (error) {
    console.error(error);
  }

  console.log(cliente.value);
};
</script>

<style scoped>
.cadastro-cliente {
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
  background-color: #f5f5f5;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
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

.input-group:last-child {
  margin-right: 0;
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
  margin-top: 15px;
  text-align: center;
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
