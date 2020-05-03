<template>
    <div class="articles-by-category">
        <PageTitle icon="fa fa-folder-o" :main="category.name"
            sub="Categoria"/>
        <ul>
            <li v-for="article in articles" :key="article.id">
                <ArticleItem :article="article"/>
            </li>
        </ul>
        <div class="load-more">
            <button v-if="loadMore" class="btn btn-lg btn-outline-primary"
                @click="getArticles">
                Carregar mais artigos ...
            </button>
        </div>
    </div>
</template>

<script>
import PageTitle from '../template/PageTitle'
import ArticleItem from './ArticleItem'

export default {
    name: 'ArticlesByCategory',
    components: {PageTitle, ArticleItem},
    props: ['id'],
    data() {
        return {
            category: {},
            articles: [],
            page: 1,
            loadMore: true,
        }
    },
    methods: {
        getCategory() {
            this.$http.get(`/categories/${this.id}`)
                .then(res => {
                    this.category = res.data
                })
        },
        getArticles() {
            this.$http.get(`/categories/${this.id}/articles?page=${this.page}`)
                .then(res => {
                    this.articles = this.articles.concat(res.data)
                    this.page++
                    if(res.data.length === 0) {
                        this.loadMore = false
                    } 
                })
        }
    },
    watch: {
        // $route(to) {
        //     this.id = to.params.id
        //     this.articles = []
        //     this.page = 1
        //     this.loadMore = true

        //     this.getCategory()
        //     this.getArticles()
        // }
    },
    mounted() {
        this.getCategory()
        this.getArticles()
    }
}
</script>

<style>
    .articles-by-category ul {
        list-style-type: none;
        padding: 0px;
    }

    .articles-by-category .load-more {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 25px;

    }
</style>