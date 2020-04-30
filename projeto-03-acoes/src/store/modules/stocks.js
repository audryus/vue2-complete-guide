import stocksData from '@/data/stocks'

export default {
    state: {
        stocks: [],
    },
    getters: {
        stocks(state) {
            return state.stocks
        }
    },
    mutations: {
        setStocks(state, stocks) {
            state.stocks = stocks
        },
        randomizeStocks(state) {
            state.stocks.forEach(stock => {
                stock.price = Math.round(stock.price * (1 + Math.random() - 0.42))
            });
        },
    },
    actions: {
        buyStock({commit}, order) {
            commit('buyStock', order)
        },
        initStocks({commit}) {
            commit('setStocks', stocksData)
        },
        randomizeStocks({commit}) {
            commit('randomizeStocks')
        }
    },
    
}