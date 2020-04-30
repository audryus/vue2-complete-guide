<template>
    <v-flex class="pr-3 pb-3" xs12 md6 lg4>
        <v-card class="blue darken-3 white--text">
            <v-card-title class="headline">
                <strong>{{stock.name}} 
                    <small>(Price: {{stock.price | currency}} | Qtty.: {{stock.quantity}})</small>
                </strong>
            </v-card-title>
        </v-card>
        <v-card>
            <v-container fill-height>
                <v-text-field label="Quantity" 
                    :error="insufficientQuantity || quantity < 0 || !Number.isInteger(quantity)"
                    type="number" 
                    v-model.number="quantity"/>
                <v-btn class="blue darken-3 white--text"
                    :disabled="insufficientQuantity || quantity <= 0 || !Number.isInteger(quantity)"
                    @click="sellStock">{{insufficientQuantity ? 'Insufficient' : 'Sell'}}</v-btn>
            </v-container>
        </v-card>
    </v-flex>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    props: ['stock'],
    data() {
        return {
            quantity: 0,
        }
    },
    computed: {
        insufficientQuantity() {
            return this.quantity > this.stock.quantity
        }
    },
    methods: {
        ...mapActions({
            sellStockAction: 'sellStock'
        }),
        sellStock() {
            const order = {
                stockId: this.stock.id,
                stockPrice: this.stock.price,
                quantity: this.quantity,
            }
            this.quantity = 0
            // this.$store.dispatch('sellStock', order)
            this.sellStockAction(order)
            
        }
    },
}
</script>

<style>

</style>