<template>
    <div class="category-admin">
        <b-form>
            <input type="hidden" v-model="category.id">
            <b-row>
                <b-col xs="12">
                    <b-form-group label="Nome:" label-for="category-name">
                        <b-form-input id="category-name" type="text" v-model="category.name"
                            :readonly="mode === 'remove'" required
                            placeholder="Informe nome da categoria ..."></b-form-input>
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col xs="12">
                    <b-form-group label="Categoria Pai:" label-for="category-parentid">
                        <b-form-select id="category-parentid" v-if="mode === 'save'"
                            :options="categories" v-model="category.parentId">
                        </b-form-select>
                        <b-form-input id="category-parentid" type="text" v-model="category.path"
                            readonly v-else></b-form-input>
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
        <b-table hover striped :items="categories" :fields="fields">
            <template slot="actions" slot-scope="data">
                <b-button variant="warning" @click="loadCategory(data.item)" class="mr-2">
                    <i class="fa fa-pencil"/>
                </b-button>
                <b-button variant="danger" @click="loadCategory(data.item, 'remove')" class="mr-2">
                    <i class="fa fa-trash"/>
                </b-button>
            </template>
        </b-table>
    </div>
</template>

<script>
export default {
    name: 'CategoryAdmin',
    data() {
        return {
            mode: 'save',
            category: {},
            categories: [],
            fields: [
                {key: 'id', label: 'Codigo', sortable: true},
                {key: 'name', label: 'Nome', sortable: true},
                {key: 'path', label: 'Caminho', sortable: true},
                {key: 'actions', label: 'Acoes'},
            ]
        }
    },
    methods: {
        loadCategories() {
            this.$http.get('/categories')
                .then(res => {
                    this.categories = res.data.map(category => {
                        return {...category, value: category.id, text: category.path}
                    })
                })
        },
        reset() {
            this.mode = 'save'
            this.category = {}
            this.loadCategories()
        },
        save() {
            const method = this.category.id ? 'put' : 'post'
            const id = this.category.id ? `/${this.category.id}` : ''

            this.$http[method](`/categories${id}`, this.category)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                })

        },
        remove() {
            this.$http.delete(`/categories/${this.category.id}`)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                })
        },
        loadCategory(category, mode = 'save') {
            this.mode = mode
            this.category = { ...category }
        }
    },
    mounted() {
        this.loadCategories()
    }

}
</script>

<style>

</style>
