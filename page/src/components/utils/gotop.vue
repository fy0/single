<template>
<div class="gotop" @click="gotop" v-show="showGoTop">
    <template>↑</template>
    <!-- <i class="fa fa-arrow-up" aria-hidden="true"></i> -->
</div>
</template>

<style>
.gotop {
    z-index: 9999;
    position: fixed;
    right: 3%;
    bottom: 5%;
    height: 40px;
    width: 40px;
    color: #056ef0;
    text-align: center;
    border: 1px solid;
    font-size: 30px;
    line-height: 35px;
    cursor: pointer;
}

.tipbox > .item {
}
</style>

<script>
export default {
    data () {
        return {
            showGoTop: false
        }
    },
    mounted: async function () {
        setInterval(() => {
            let el = document.documentElement
            this.showGoTop = el.scrollTop > 0
        }, 100)
    },
    methods: {
        gotop: function () {
            let el = document.documentElement
            let top = el.scrollTop
            let timer = setInterval(() => {
                top -= Math.abs(top * 0.1)
                if (top <= 1) {
                    top = 0
                    clearInterval(timer)
                }
                el.scrollTop = top
            }, 20)
        }
    }
}
</script>

<style>
</style>
