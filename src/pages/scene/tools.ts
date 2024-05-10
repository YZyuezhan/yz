import {
    BufferGeometry,
    PointsMaterial,
    Float32BufferAttribute,
    AdditiveBlending,
    Points,
    Color,
    NormalBufferAttributes,
    Object3DEventMap,
    TubeGeometry, CatmullRomCurve3, Vector3, Mesh, DoubleSide,
    BackSide,
    MeshStandardMaterial,
} from "three";
import { Tween, Easing } from '@tweenjs/tween.js';

// 生成星系
export const generateGalaxy = (parameters = {
    count: 50000, // 粒子总数
    size: 0.02, // 粒子尺寸
    radius: 3, // 星系的半径
    branches: 3,// 星系分支
    spin: 1, // 螺旋参数
    randomness: 0.8,// 随机性
    randomnessPower: 5, //随机性幂参数
    insideColor: 0xff5500,
    outsideColor: 0x0035f8,
}): {
    points: Points<BufferGeometry<NormalBufferAttributes>, PointsMaterial, Object3DEventMap>;
    positions: number[];
    geometry: BufferGeometry;
} => {
    const geometry = new BufferGeometry()
    let positions = []
    const colorInside = new Color(parameters.insideColor)
    const colorOutside = new Color(parameters.outsideColor)
    let pointColors = []
    for (let i = 0; i < parameters.count; i++) {
        const i3 = i * 3
        // 粒子半径
        const radius = Math.random() * parameters.radius
        // 分支角度
        const branchAngle = (i % parameters.branches) / parameters.branches * Math.PI * 2
        // 螺旋角度
        const spinAngle = radius * parameters.spin
        const randomX = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1)
        const randomY = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1)
        const randomZ = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1)
        //顶点位置
        positions[i3] = (Math.cos(branchAngle + spinAngle) * radius + randomX) * 1000 // x
        positions[i3 + 1] = (0 + randomY) * 1000// y
        positions[i3 + 2] = (Math.sin(branchAngle + spinAngle) * radius + randomZ) * 1000 // z
        const mixedColor = colorInside.clone()
        mixedColor.lerp(colorOutside, radius / parameters.radius)
        //顶点颜色
        pointColors.push(mixedColor.r)
        pointColors.push(mixedColor.g)
        pointColors.push(mixedColor.b)
    }


    geometry.setAttribute("position", new Float32BufferAttribute(positions, 3))
    geometry.setAttribute('color', new Float32BufferAttribute(pointColors, 3));

    const material = new PointsMaterial({
        //粒子大小
        size: parameters.size,
        //开启尺寸衰减
        sizeAttenuation: true,
        //停用depthWrite
        depthWrite: false,
        //激活混合
        blending: AdditiveBlending,
        // 顶点着色
        vertexColors: true,
    })

    const points = new Points(geometry, material)
    return {
        points,
        positions,
        geometry,
    }
}


// 变换星系
export const conversionGalaxy = (galaxy: {
    points: Points<BufferGeometry<NormalBufferAttributes>, PointsMaterial, Object3DEventMap>;
    positions: number[];
    geometry: BufferGeometry;
}, form: number, to: number, duration: number, cb: () => void, type: boolean) => {
    const tween = new Tween({
        value: form
    })
    tween.to({ value: to }, duration)
        .onUpdate((val) => {
            const arr = galaxy.positions.map(item => item * val.value)
            galaxy.geometry.setAttribute("position", new Float32BufferAttribute(arr, 3))
        }).easing(type ? Easing.Quadratic.InOut : Easing.Quartic.In).start().onComplete(cb)
    return tween
}

// 创建管道
export const createTube = () => {
    let curve = new CatmullRomCurve3([
        new Vector3(0, 0, 0),
        new Vector3(0, 0, 10),
        new Vector3(0, 10, 20),
        new Vector3(0, 5, 30),
        new Vector3(10, 5, 40),
        new Vector3(10, 20, 40),
        new Vector3(-10, 20, 60),
    ])
    const g = new TubeGeometry(curve, 50, 3, 50, false)
    const m = new MeshStandardMaterial({
        color: 0x7777ff,
        metalness: 0.5,
        roughness: 0.5,
        emissive: 0x000000,
        side: BackSide
    })
    m.shadowSide = DoubleSide
    const tube = new Mesh(g, m)
    return {
        tube,
        curve
    }
}
