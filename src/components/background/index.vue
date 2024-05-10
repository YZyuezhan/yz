<template>
    <div class="background" :style="{
        backgroundPosition: backgroundPosition,
        left: position.x + 'px',
        top: position.y + 'px',
        width: size + 'px',
        height: size + 'px'
    }">
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';

let position = ref({
    x: -150,
    y: -150
})

let size = ref(150)

const move = (e: MouseEvent) => {


    let target = e.target as HTMLElement

    if (target && target.dataset.tag && target.dataset.tag == "hover") {
        const rect = target.getBoundingClientRect()
        const w = rect.width > rect.height ? rect.width : rect.height

        size.value = w + 15

    } else {
        size.value = 150
    }

    const { x, y } = e
    position.value = {
        x, y
    }
}

let backgroundPosition = computed(() => {

    const width = window.innerWidth
    const height = window.innerHeight

    return `${position.value.x / width * 100}% ${position.value.y / height * 100}% `

})


onMounted(() => {
    window.addEventListener("mousemove", move)
})
onUnmounted(() => {
    window.removeEventListener("mousemove", move)
})

</script>

<style scoped>
.background {
    /* background-image: url("../../assets/background.png"); */
    background-image: url("https://img1.baidu.com/it/u=1055051213,2316556634&fm=253&fmt=auto&app=138&f=JPEG?w=1025&h=577");
    background-size: 100vw 100vh;
    background-repeat: no-repeat;
    background-position: 20% 50%;
    position: absolute;
    left: 0%;
    top: 0%;
    transform: translate(-50%, -50%);
    border-radius: 100%;
    z-index: -1;
    transition: width, height .5s cubic-bezier(0.075, 0.82, 0.165, 1);

}

/* 屏幕大于 1024px 或小于 1440px 时应用该样式 */
@media screen and (max-width: 600px) {
    .background {
        display: none;
    }
}
</style>