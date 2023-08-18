<template>
  <div class="data-table">
    <table>
      <thead>
        <tr>
          <th v-for="column in columns" :key="column.field">{{ column.label }}</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in paginatedData" :key="item.id">
          <td>{{ item.name }}</td>
          <td>{{ item.document_value }}</td>
          <td>{{ item.birthdate}}</td>
          <td>{{ item.gender}}</td>
          <td>{{ item.state }}</td>
          <td>{{ item.city_name }}</td>
          <td class="action-buttons">
            <div class="button-group">
              <button @click="atualizarCliente(item)" class="styled-button edit-button">Editar</button>
              <button @click="excluirCliente(item)" class="styled-button delete-button">Excluir</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="pagination">
      <button @click="previousPage" :disabled="currentPage === 1" class="styled-button">Anterior</button>
      <span>{{ currentPage }} de {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages" class="styled-button">Próximo</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed} from 'vue';

const props = defineProps({
  clientes: Array,
  columns: Array,
  itemsPerPage: { type: Number, default: 2 }
});

const currentPage = ref(1);

const filteredData = computed(() => {
  return props.clientes.filter(item => {
    return Object.values(item).some(value =>
      value.toString().toLowerCase()
    );
  });
});

const paginatedData = computed(() => {
  const startIndex = (currentPage.value - 1) * props.itemsPerPage;
  const endIndex = startIndex + props.itemsPerPage;
  return filteredData.value.slice(startIndex, endIndex);
});

const totalPages = computed(() => {
  return Math.ceil(filteredData.value.length / props.itemsPerPage);
});

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const atualizarCliente = cliente => {
  // Lógica para atualizar o cliente
  console.log('Atualizar cliente:', cliente);
};

const excluirCliente = cliente => {
  // Lógica para excluir o cliente
  console.log('Excluir cliente:', cliente);
};

</script>

<style scoped>
.data-table {
  max-width: 100%;
  overflow: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  border: 1px solid #ccc;
}

thead {
  background-color: #f5f5f5;
}

th,
td {
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #ccc;
}

tr:nth-child(even) {
  background-color: #f5f5f5;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
}

.pagination button {
  padding: 5px 10px;
  font-size: 14px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin: 0 5px;
}

.pagination button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.styled-button {
  padding: 5px 10px;
  font-size: 14px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 5px;
}

.edit-button {
  background-color: #28a745;
  color: #fff;
}

.delete-button {
  background-color: #dc3545;
  color: #fff;
}

.styled-button:hover {
  background-color: #0056b3;
}

.button-group {
  display: flex;
  align-items: center;
}

.button-group .styled-button {
  margin-right: 5px;
}
</style>
  