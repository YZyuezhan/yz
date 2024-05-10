import { AmbientLight, AxesHelper, Color, PCFSoftShadowMap, PerspectiveCamera, Scene, Vector3, WebGLRenderer } from "three"
import { TrackballControls } from "three/examples/jsm/Addons.js"
import { onMounted, onUnmounted } from "vue"

export interface UseThree {
    scene: Scene
    camera: PerspectiveCamera
    render: WebGLRenderer | null
    controls: TrackballControls | null
    ambient: AmbientLight,
    run: (cb?: () => void) => void
}

export const useThree = (container: string): UseThree => {
    let callback: Function | null = null


    let THREE: UseThree = {
        scene: initScene(),
        camera: initCamera(),
        render: null,
        controls: null,
        ambient: initAmbientLight(0x000000),
        run: (cb?: () => void) => {
            cb && (callback = cb)
        }
    }
    onMounted(() => {

        const element = document.getElementById(container)

        if (!element) {
            throw new Error("id为" + container + "的元素为空");
        }

        THREE.render = initRender(document.getElementById(container)!)
        THREE.render.shadowMap.enabled = true;
        THREE.render.shadowMap.type = PCFSoftShadowMap;
        THREE.controls = initTrackballControls(THREE.camera, THREE.render.domElement)
        init()
        animate()
        window.addEventListener("resize", resize)
    })
    onUnmounted(() => {
        window.removeEventListener("resize", resize)
    })

    const init = () => {
        const { scene, camera, render, ambient } = THREE
        scene.background = new Color(0x000000)
        scene.add(camera)
        scene.add(ambient)
        render?.render(scene, camera)
    }

    const resize = () => {
        THREE.camera.aspect = window.innerWidth / window.innerHeight;
        THREE.camera.updateProjectionMatrix();
        THREE.render?.setSize(window.innerWidth, window.innerHeight);
    }

    const animate = () => {
        requestAnimationFrame(animate)
        THREE.controls?.update()
        THREE.render?.render(THREE.scene, THREE.camera)
        callback?.()
    }

    return THREE
}




/**
 * 初始化场景
 * @returns 场景实例
 */
export const initScene = () => new Scene()

/**
 * 初始化透视投影摄像机
 * @param {Vector3(30, 40, 30)} initialPosition 默认相机的位置
 * @param {Vector3(0, 0, 0)} target 默认指向
 * @returns 相机的实例
 */

export const initCamera = (initialPosition?: Vector3, target?: Vector3) => {
    let position = (initialPosition !== undefined) ? initialPosition : new Vector3(30, 40, 30);
    let camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000)
    camera.position.copy(position);
    camera.lookAt(target ? target : new Vector3(0, 0, 0));
    return camera
}

/**
 * 初始化渲染器
 * @param target 容器
 * @returns 渲染器
 */
export const initRender = (target: HTMLElement) => {
    let renderer = new WebGLRenderer({
        antialias: true,
    })
    // 开启阴影
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = PCFSoftShadowMap;
    // 场景颜色
    renderer.setClearColor(new Color(0x000000));
    renderer.setSize(window.innerWidth, window.innerHeight);
    target.appendChild(renderer.domElement);
    return renderer
}

/**
 * 初始化控制器
 * @param {*} camera 相机
 * @param {*} domElement element
 * @returns 控制器实例
 */
export const initTrackballControls = (camera: PerspectiveCamera, domElement: HTMLCanvasElement) => {
    let controls = new TrackballControls(camera, domElement)
    return controls
}

/**
 * 初始化环境光
 * @param {0xffffff} color 环境光颜色
 * @param {3} intensity 光照强度
 * @returns 环境光实例
 */
export const initAmbientLight = (color = 0xffffff, intensity = 3) => new AmbientLight(color, intensity)

/**
 * 初始化场景辅助线
 * @returns 场景辅助线
 */
export const initAxesHelper = () => new AxesHelper(100)

