<template>
  <nav>
    <strong>Alurapic</strong>
    <ul>
      <li v-for="rota in rotas" :key="rota.path">
        <router-link class="link" :to="rota.path ? rota.path : '/'">{{
          rota.titulo
        }}</router-link>
      </li>
    </ul>
  </nav>
</template>

<script>

export default {
  props: {
      rotas: {
          type: Array,
          required: true
      }
  }
};
</script>

<style lang="scss" scoped>

nav {
  display: flex;
  align-items: center;
  border: 1px solid #D96704;
  background: #D96704;

  margin-bottom: 1rem;

  strong {
    color: #F29F05;
    font-size: 20px;
    margin-left: 1rem;
  }
}

ul {
  display: flex;
  align-items: center;
  
  list-style-type: none;
  
  
  li {
    margin-right: 2rem;
  }

  .link {
    text-decoration: none;
    color: #fff;
  }
  
}
</style>
