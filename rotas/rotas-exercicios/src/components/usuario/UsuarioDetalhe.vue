<template>
  <div class="usuario-detalhe">
    <h3>Usuario detalhe</h3>
    <hr>
    <p><strong>Codigo:</strong> {{ id }} </p>
    <!-- <router-link tag="button" :to="`/usuario/${id}/editar`" primario>
      Editar
    </router-link> -->
    <router-link tag="button" 
      :to="{ 
        name: 'editarUsuario', 
        params: {id: id},
        query: {completo: true, lingua: 'pt'},
        hash: '#rodape',
        }" 
      
      primario>
      Editar
    </router-link>
  </div>
</template>

<script>
export default {
  props: ['id'],
  beforeRouteEnter(to, from, next) {
    // console.log(this.id); // Nao funciona
    
    console.log('dentro do componente -> usuario detalhe');
    next(vm => {
      console.log(vm.id)
    })
    
  },
  // data() {
  //   return {
  //     id: this.$route.params.id
  //   }
  // },
  // watch: {
  //   $route(to, from) {
  //     this.id = to.params.id
  //   }
  // },
}
</script>

<style>

</style>