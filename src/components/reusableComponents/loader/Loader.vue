<template>
    <div class="loaderWr">
        <div class="lds-dual-ring"/>
    </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';

@Component
export default class Loader extends Vue {}
</script>

<style scoped lang="scss">
    .loaderWr {
        position: absolute;
        width: 100%;
        height: 100%;
        background: white;
        z-index: 1;
    }
    .lds-dual-ring {
        position: absolute;
        top: 40%;
        left: 46%;
        display: inline-block;
        width: 128px;
        height: 128px;
    }
    .lds-dual-ring:after {
        content: " ";
        display: block;
        width: 92px;
        height: 92px;
        margin: 2px;
        border-radius: 50%;
        border: 5px solid #fff;
        border-color: aquamarine transparent aquamarine transparent;
        animation: lds-dual-ring 1.2s linear infinite;
    }
    @keyframes lds-dual-ring {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
</style>
