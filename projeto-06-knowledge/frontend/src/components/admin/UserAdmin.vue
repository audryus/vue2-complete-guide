<template>
    <div class="admin-user">
        <b-form>
            <input type="hidden" v-model="user.id">
            <b-row>
                <b-col md="6" sm="12">
                    <b-form-group label="Nome:" label-for="user-name">
                        <b-form-input id="user-name" type="text" v-model="user.name"
                            :readonly="mode === 'remove'" required
                            placeholder="Informe nome do usuario ..."></b-form-input>
                    </b-form-group>
                </b-col>
                <b-col md="6" sm="12">
                    <b-form-group label="E-mail:" label-for="user-email">
                        <b-form-input id="user-email" type="text" v-model="user.email"
                            :readonly="mode === 'remove'" required
                            placeholder="user@mail.u"></b-form-input>
                    </b-form-group>
                </b-col>
            </b-row>
            <b-form-checkbox v-show="mode === 'save'" v-model="user.admin" class="mt-3 mb-3">
                Administrador ?
            </b-form-checkbox>
            <b-row v-show="mode === 'save'">
                <b-col md="6" sm="12">
                    <b-form-group label="Senha :" label-for="user-password">
                        <b-form-input id="user-password" type="password" v-model="user.password"
                            required placeholder="Inorme a senha do usuario"></b-form-input>
                    </b-form-group>
                </b-col>
                <b-col md="6" sm="12">
                    <b-form-group label="Confirmacao de senha:" label-for="user-confirm-password">
                        <b-form-input id="user-confirm-password" type="password" 
                            v-model="user.confirmPassword"
                            required placeholder="Confirme a senha do usuario"></b-form-input>
                    </b-form-group>
                </b-col>
            </b-row>

            <b-row>
                <b-col xs="12">
                    <b-button variant="primary" v-if="mode === 'save'"
                        @click="save">Salvar</b-button>
                    <b-button variant="danger" v-if="mode === 'remove'"
                        @click="remove">Excluir</b-button>

                    <b-button class="ml-2" @click="reset">Cancelar</b-button>
                </b-col>
            </b-row>
        </b-form>
        <hr>
        <b-table hover striped :items="users" :fields="fields">
            <template slot="actions" slot-scope="data">
                <b-button variant="warning" @click="loadUser(data.item)" class="mr-2">
                    <i class="fa fa-pencil"/>
                </b-button>
                <b-button variant="danger" @click="loadUser(data.item, 'remove')" class="mr-2">
                    <i class="fa fa-trash"/>
                </b-button>
            </template>
        </b-table>
    </div>
</template>

<script>
export default {
    name: 'UserAdmin',
    data() {
        return {
            mode: 'save',
            user: {},
            users: [],
            fields: [
                {key: 'id', label: 'Codigo', sortable: true},
                {key: 'name', label: 'Nome', sortable: true},
                {key: 'email', label: 'E-Mail', sortable: true},
                {key: 'admin', label: 'Administrador', sortable: true,
                    formatter: value => value ? "Sim" : "Nao"},
                {key: 'actions', label: 'Acoes'},

            ]
        }
    },
    methods: {
        loadUsers() {
            this.$http.get('/users')
                .then(res => {
                    this.users = res.data
                })
        },
        reset() {
            this.mode = 'save'
            this.user = {}
            this.loadUsers()
        },
        save() {
            const method = this.user.id ? 'put' : 'post'
            const id = this.user.id ? `/${this.user.id}` : ''

            this.$http[method](`/users${id}`, this.user)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                })

        },
        remove() {
            this.$http.delete(`/users/${this.user.id}`)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                })
        },
        loadUser(user, mode = 'save') {
            this.mode = mode
            this.user = { ...user }
        }
    },
    mounted() {
        this.loadUsers()
    }

}
</script>

<style>

</style>