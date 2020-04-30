<template>
    <div>
        <h1 class="display-3 font-weight-light mb-4">Buy, Sell and Follow your Stocks</h1>
        <v-sheet :elevation="6" class="pa-2" color="primary">
            <v-icon class="white--text mr-3">info</v-icon>
            <span class="headline white--text font-weight-light">
                You can Save & Load
            </span>
        </v-sheet>
        <v-sheet :elevation="6" class="pa-2 mt-3 darken-1" color="success">
            <v-icon class="white--text mr-3">info</v-icon>
            <span class="headline white--text font-weight-light">
                Clique em End Day to start a new day
            </span>
        </v-sheet>
        <v-divider class="my-4" />
        <p class="display-1"><strong>Your balance</strong> {{funds | currency}} </p>
    </div>
</template>

<script>
export default {
    computed: {
        funds() {
            return this.$store.getters.funds
        }
    }

}
</script>

<style>

</style>