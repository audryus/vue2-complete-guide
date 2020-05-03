<template>
    <div class="article-admin">
        <b-form>
            <input type="hidden" v-model="article.id">
            <b-form-group label="Nome:" label-for="article-name">
                <b-form-input id="article-name" type="text" v-model="article.name"
                    :readonly="mode === 'remove'" required
                    placeholder="Informe nome do artigo ..."></b-form-input>
            </b-form-group>
            <b-form-group label="Descricao:" label-for="article-description">
                <b-form-input id="article-description" type="text" v-model="article.description"
                    :readonly="mode === 'remove'" required
                    placeholder="Informe descricao do artigo ..."></b-form-input>
            </b-form-group>
            <b-form-group label="Imagem (URL):" label-for="article-image-url">
                <b-form-input id="article-image-url" type="text" v-model="article.imageUrl"
                    :readonly="mode === 'remove'"
                    placeholder="Informe a URL da imagem ..."></b-form-input>
            </b-form-group>

            <b-form-group label="Categoria:" label-for="article-category">
                <b-form-select id="article-category"
                    :disabled="mode === 'remove'"
                    :options="categories" v-model="article.categoryId">
                </b-form-select>
            </b-form-group>
            <b-form-group label="Autor:" label-for="article-userId">
                <b-form-select id="article-userId"
                    :disabled="mode === 'remove'"
                    :options="users" v-model="article.userId">
                </b-form-select>
            </b-form-group>
            <b-form-group label="Conteudo:" label-for="article-content">
                <VueEditor v-model="article.content"
                    :disabled="mode === 'remove'"/>
            </b-form-group>

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
        <b-table hover striped :items="articles" :fields="fields">
            <template slot="actions" slot-scope="data">
                <b-button variant="warning" @click="loadArticle(data.item)" class="mr-2">
                    <i class="fa fa-pencil"/>
                </b-button>
                <b-button variant="danger" @click="loadArticle(data.item, 'remove')" class="mr-2">
                    <i class="fa fa-trash"/>
                </b-button>
            </template>
        </b-table>
        <b-pagination size="md" v-model="page"
            :total-rows="count" :per-page="limit"></b-pagination>
    </div>
</template>

<script>
import {VueEditor} from 'vue2-editor'
export default {
    name: 'ArticleAdmin',
    components: {VueEditor},
    data() {
        return {
            mode: 'save',
            article: {},
            articles: [],
            categories: [],
            users: [],
            page: 1,
            limit: 0,
            count: 0,
            fields: [
                {key: 'id', label: 'Codigo', sortable: true},
                {key: 'name', label: 'Nome', sortable: true},
                {key: 'description', label: 'Descricao', sortable: true},
                {key: 'actions', label: 'Acoes'},
            ]
        }
    },
    methods: {
        loadArticles() {
            this.$http.get(`/articles?page=${this.page}`)
                .then(res => {
                    this.articles = res.data.data
                    this.count = res.data.count
                    this.limit = res.data.limit
                })
        },
        reset() {
            this.mode = 'save'
            this.article = {}
            this.loadArticles()
        },
        save() {
            const method = this.article.id ? 'put' : 'post'
            const id = this.article.id ? `/${this.article.id}` : ''

            this.$http[method](`/articles${id}`, this.article)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                })

        },
        remove() {
            this.$http.delete(`/articles/${this.article.id}`)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                })
        },
        loadArticle(article, mode = 'save') {
            this.mode = mode
            this.$http.get(`/articles/${article.id}`)
                .then(res => {
                    this.article = res.data
                })
        }, 
        loadCategories() {
            this.$http.get('/categories')
                .then(res => {
                    this.categories = res.data.map(category => {
                        return { value: category.id, text: category.path}
                    })
                })
        },
        loadUsers() {
            this.$http.get('/users')
                .then(res => {
                    this.users = res.data.map(user => {
                        return { value: user.id, text: `${user.name} (${user.email})`}
                    })
                })
        },
    },
    watch: {
        page() {
            this.loadArticles()
        }
    },
    mounted() {
        this.loadArticles()
        this.loadCategories()
        this.loadUsers()
    }

}
</script>

<style>

</style>