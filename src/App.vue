<template>
  <div>
    <header class="header">
      <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

      <nav class="nav-links">
        <RouterLink to="/" class="nav-link">Home</RouterLink>
        <RouterLink to="/painel-cliente" class="nav-link">Painel Cliente</RouterLink>
        <RouterLink to="/cadastro-cliente" class="nav-link">Cadastro Cliente</RouterLink>
      </nav>
    </header>

    <RouterView />
  </div>
</template>

<style scoped>
.header {
  background-color: #007bff;
  color: white;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.logo {
  display: block;
  margin: 0;
}

.nav-links {
  display: flex;
  gap: 20px;
}

.nav-link {
  color: white;
  text-decoration: none;
  font-size: 16px;
  padding: 10px 20px;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.nav-link:hover {
  background-color: #003d80;
}

@media (max-width: 1023px) {
  .header {
    flex-direction: column;
    align-items: flex-start;
  }

  .logo {
    margin-bottom: 10px;
  }

  .nav-links {
    margin-top: 10px;
    flex-direction: column;
    align-items: flex-start;
  }

  .nav-link {
    margin-bottom: 5px;
  }
}
</style>
