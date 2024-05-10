<template>
    <Suspense>
        <template #default>
            <div id="webgl-container"></div>
        </template>
        <template #fallback>
            <div>正在加载</div>
        </template>
    </Suspense>
</template>

<script setup lang="ts">
import { UseThree, useThree } from "../../hooks/useThree";
import { generateGalaxy, conversionGalaxy } from "./tools"
import { Tween } from "@tweenjs/tween.js";
let THREE: UseThree = useThree("webgl-container")
const { scene } = THREE

const emits = defineEmits(["loaded", "disposed"])

let galaxy: any = null


// 加载星系
const loadGalaxy = () => {
    let tween: Tween<{ value: number }> | null = null;
    galaxy = generateGalaxy()
    // 星系
    scene.add(galaxy.points)
    tween = conversionGalaxy(galaxy, 1, 0.01, 3000, () => {
        emits("loaded")
    }, true)

    THREE.run(() => {
        tween && tween.update()
        galaxy && (galaxy.points.rotation.y += 0.003)
    })
}
const disposeGalaxy = () => {
    let tween: Tween<{ value: number }> | null = null;

    if (!galaxy) {
        galaxy = generateGalaxy()
    }
    tween = conversionGalaxy(galaxy, 0.01, 1, 3000, () => {
        emits("disposed")
        scene.remove(galaxy.points)
    }, false)

    THREE.run(() => {
        tween && tween.update()
        galaxy && (galaxy.points.rotation.y -= 0.003)
    })
}

// 创建后处理对象EffectComposer，WebGL渲染器作为参数

defineExpose({
    loadGalaxy,
    disposeGalaxy
})





</script>

<style scoped>
#webgl-container {
    position: fixed;
    left: 0px;
    top: 0px;
    z-index: -20
}
</style>