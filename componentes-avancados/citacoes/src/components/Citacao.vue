<template>
    <div class="citacao">
        <slot name="fonte"></slot>
        <slot></slot>
        <slot name="autor"></slot>
    </div>
</template>

<script>
export default {
    created() {
        // console.log('[Citacao] created');
    },
    destroyed() {
        // console.log('[Citacao] destroyed');
    },
    activated() {
        // console.log('[Citacao] activated');
    },
    deactivated() {
        // console.log('[Citacao] deactivated');
    },
}
</script>

<style scoped>
    .citacao {
        border: 1px solid #DDD;
        background-color: rgba(0, 0, 0, .1);
        padding: 25px;
        max-width: 450px;
    }
    h1 {
        color: red
    }
</style>
