<template>
    <!-- 烟雾消散的Loading效果 -->
    <div class="loading-container">
        <div class="loading-text">
            <span :style="{
                animationDelay: `${(3 + (index / 10))}s`
            }" v-for="item, index in textArray" :key="index">{{ item }}</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';


type TextType = string | string[]

type Props = {
    text: TextType
}

let defaultText = "Loading"

const props = withDefaults(defineProps<Props>(), {
    text: "Loading"
})

let textArray = computed(() => {
    if (Object.prototype.toString.call(props.text) === '[object String]' && typeof props.text === "string") {
        return props.text.split("")
    } else if (Object.prototype.toString.call(props.text) === '[object Array]' && typeof props.text === "object") {
        return props.text
    }
    return defaultText.split("")
})


</script>

<style scoped>
.loading-container {
    width: 100vw;
    height: 100vh;
    position: fixed;
    left: 0px;
    top: 0px;
    background-color: rgba(0, 0, 0, 0.4);
    --textColor: #f50;
}

.loading-text {
    position: absolute;
    left: 50%;
    top: 50%;
}

.loading-text span {
    font-size: 3rem;
    color: transparent;
    display: inline-block;
    text-shadow: 0 0 0 var(--textColor);
    animation: smoky 5s 3s both;
    letter-spacing: 3px;
}

span:nth-child(even) {
    animation-name: smoky-mirror;
}

@keyframes smoky {
    60% {
        text-shadow: 0 0 40px var(--textColor);
    }

    to {
        transform:
            translate3d(15rem, -8rem, 0) rotate(-40deg) skewX(70deg) scale(1.5);
        text-shadow: 0 0 20px var(--textColor);
        opacity: 0;
    }
}

@keyframes smoky-mirror {
    60% {
        text-shadow: 0 0 40px var(--textColor);
    }

    to {
        transform:
            translate3d(18rem, -8rem, 0) rotate(-40deg) skewX(-70deg) scale(2);
        text-shadow: 0 0 20px var(--textColor);
        opacity: 0;
    }
}
</style>