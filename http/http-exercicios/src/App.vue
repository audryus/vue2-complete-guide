<template>
	<div id="app" class="container">
		<h1>HTTP com Axios</h1>
		<b-alert show dismissible v-for="msg in mensagens"
			:key="msg.texto" :variant="msg.tipo">
				{{msg.texto}}
			</b-alert>
		<b-card>
			<b-form-group label="Nome:">
				<b-form-input type="text" 
					size="lg" 
					v-model="usuario.nome"
					placeholder="Informe o Nome"/>
			</b-form-group>
			<b-form-group label="Email:">
				<b-form-input type="text" 
					size="lg" 
					v-model="usuario.email"
					placeholder="Informe o E-mail"/>
			</b-form-group>
			<hr>
			<b-button 
				@click.prevent="salvar" 
				size="lg" variant="primary">Salvar</b-button>
			
			<b-button 
				@click.prevent="obterUsuarios" 
				size="lg" variant="success"
				class="ml-2">Obter Usuarios</b-button>
		</b-card>
		<hr>
		<b-list-group>
			<b-list-group-item v-for="(usu, id) in usuarios" :key="id">
				<strong>Nome: </strong> {{usu.nome}} <br>
				<strong>E-mail: </strong> {{usu.email}} <br>
				<strong>ID: </strong> {{id}}<br>
				<b-button variant="warning" size="lg"
					@click="carregar(id)">Carregar</b-button>

				<b-button variant="danger" size="lg" class="ml-2"
					@click="excluir(id)">Excluir</b-button>
			</b-list-group-item>

		</b-list-group>
	</div>
</template>

<script>
export default {
	data() {
		return {
			mensagens: [],
			usuarios: [],
			id: null,
			usuario: {
				nome: '',
				email: '',
			},
		}
	},
	methods: {
		limpar() {
			this.usuario.nome = ''
			this.usuario.email = ''
			this.id = null
			this.mensagens = []
		},
		salvar() {
			const method = this.id ? 'patch': 'post'
			const url = this.id ? `/${this.id}.json` : '.json'

			this.$http[method](`usuarios${url}`, this.usuario)
				.then(() => { 
					this.limpar()
					this.mensagens.push({
						texto: 'Operacao realizada com sucesso.',
						tipo: 'success',
					})
					if (method === 'patch')
						this.obterUsuarios()
				})
		},
		obterUsuarios() {
			this.$http.get('usuarios.json')
				.then(res => {
					this.usuarios = res.data
				})
		},
		carregar(id) {
			this.id = id
			this.usuario = { ...this.usuarios[id] }
		},
		excluir(id) {
			this.$http.delete(`/usuarios/${id}.json`)
				.then(() =>  { 
					this.limpar() 
					this.obterUsuarios()
				})
				.catch(() => {
					this.mensagens.push({
						texto: 'Problema para excluir !',
						tipo: 'danger'
					})
				})
		},
	}
}
</script>

<style>
#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	color: #2c3e50;
	font-size: 1.5rem;
}

#app h1 {
	text-align: center;
	margin: 50px;
}
</style>
