<template>
    <div class="footer">
        <div>Баги/предложения: телега @dir_andrew</div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Footer extends Vue {}
</script>

<style scoped lang="scss">
    .footer {
        background-color: #EEEEEE;
        height: 60px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
        position: sticky;
        bottom: 0;
    }
</style>
