<template>
    <div class="content">
        <router-view :key="$route.path"/>
    </div>
</template>

<script>
export default {
    name: 'Content',
}
</script>

<style>
    .content {
        grid-area: content;
        background-color: #efefef;
        padding: 20px;
    }
</style>