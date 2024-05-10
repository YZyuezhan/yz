<template>
  <div class="container" id="home-container">

    <svg width="50%" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1700 300" class="welcome" id="welcome">
      <defs>
        <linearGradient id="greenGradient">
          <stop offset="0" stop-color="#b2ed9d" />
          <stop offset="100%" stop-color="#569b3d" />
        </linearGradient>
        <filter id="filter">
          <feGaussianBlur id="turbulence" in="SourceGraphic" stdDeviation="0" />
        </filter>
      </defs>
      <g>
        <path filter="url(#filter)" fill="transparent" stroke="url(#greenGradient)" stroke-width="18" id="path"
          d="M10,103c.27,101.62,22.4,177.49,50,181,35.69,4.53,71.98-177.12,95-173,21.66,3.88.61,164.6,28,171,31.63,7.39,101.71-197.19,126-190,16.71,4.95-16.18,101.84,19,124,37.59,23.68,144.81-43.1,139-94-1.48-12.98-10.49-26.5-23-31-33.65-12.1-96.47,39.7-105,101-3.02,21.68-1.86,63.29,23,78,32.4,19.17,91.44-13.52,125-52,68.77-78.86,53.79-208.44,67-208,2.64.09,4.44,5.33,5,7,21.41,64.27,3,151,3,151-14.79,69.16-29.07,104.46-16,113,3.18,2.08,8.46,2.89,20-2,48.02-20.35,47.53-72.91,95-124,27.31-29.4,72.69-60.68,97-48,20.75,10.82,19.62,49.45,22,49,2.22-.42,5.75-34.34-13-48-18.08-13.17-46.16.29-56,5-54.34,26.03-96.34,103.56-73,137,23.95,34.31,112.81,18.03,156-16,23.06-18.17,39-42,39-42,14.65-21.91,12.32-29.09,24-45,4.13-5.62,30.23-41.18,69-41,33.65.16,64.47,27.14,74,60,10.96,37.8-10.59,68.67-13,72-22.23,30.73-69.07,50.03-105,30-26.4-14.71-37.97-45.65-37-71,1.4-36.79,28.56-59.78,43-72,62.22-52.66,168.25-59.42,192-22,4.61,7.27,1.8,34.94-4,90-6.29,59.63-7.28,68.94-3,71,20.19,9.71,108.94-165.94,141-154,26.18,9.75-4.14,137.68,15,143,21.72,6.04,82.34-152.77,104-146,13.89,4.34.14,73.1,36,137,4.83,8.61,11.06,18.01,22,22,14.17,5.17,29.02-.95,75-30,39.57-25,59.35-37.49,73-51,22.64-22.4,51.43-50.89,43-74-6.31-17.29-31.01-24.85-48-25-43.28-.37-69.38,47.07-74,56-3.74,7.23-23.92,46.24-6,89,2.49,5.94,21.03,48.29,63,56,31.36,5.76,56.45-11.38,72-22,34.89-23.83,49.47-57.49,55-73" />
      </g>
    </svg>

    <img data-tag="hover" class="logo-svg" src="../../assets/logo/HTML.svg" alt="HTML">
    <img data-tag="hover" class="logo-svg" src="../../assets/logo/CSS.svg" alt="CSS">
    <img data-tag="hover" class="logo-svg" src="../../assets/logo/JavaScript.svg" alt="JavaScript">

    <button data-tag="hover" id="changeButton" class="btn" @click="comeOn">
      来点不一样的
    </button>

    <Background />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useAnimate, easeOutElastic, easeInSine, easeInQuad } from "../../hooks/useAnimate"
import Background from "../../components/background/index.vue"
let namespace = 'http://www.w3.org/2000/svg'

const emits = defineEmits(["animateComplied", "animateChange"])

const initLogoAnimate = () => {
  const logo = document.querySelectorAll(".logo-svg")
  let index = 0
  for (const element of logo) {
    const item = element as HTMLImageElement
    let single = 100 / logo.length
    let offset = 100 / (logo.length * 2)
    item.style.left = single * index + offset + "%"
    item.style.bottom = "-20%"
    item.style.transform = "translate(-50%, -50%)"
    setTimeout(() => {
      const animate = useAnimate(0, 40, 1200, easeOutElastic)
      animate.start((value) => {
        item.style.bottom = value + "%"
      })
    }, 300 * index);
    index++
  }
}
const initBackGround = () => {
  let container = document.getElementById("home-container") as HTMLDivElement
  const animate = useAnimate(0, 1, 1500, easeInQuad)
  animate.start((value) => {
    container.style.opacity = value.toString()
  }, () => {
  })
}
const initPathAnimate = () => {
  let dom = document.querySelector("#turbulence") as SVGFEGaussianBlurElement
  dom.stdDeviationX.baseVal = 0
  dom.stdDeviationY.baseVal = 0

  let path = document.getElementsByTagNameNS(namespace, 'path')[0] as SVGPathElement
  let len = path.getTotalLength()

  path.style.strokeDasharray = len.toString()
  path.style.strokeDashoffset = len.toString()

  const animate = useAnimate(len, 0, 3500, easeInSine)
  animate.start((value) => {
    path.style.strokeDashoffset = value.toString()
  }, (value) => {
    path.style.strokeDashoffset = value.toString()
    initButtonAnimate()
  })
}
const initButtonAnimate = () => {
  let button = document.getElementById("changeButton") as HTMLButtonElement
  const animate = useAnimate(0, 1, 1000, easeOutElastic)
  animate.start((value) => {
    button.style.opacity = value.toString()
  }, (value) => {
    button.style.opacity = value.toString()
  })
}

const conversionLogoAnimate = () => {
  const logo = document.querySelectorAll(".logo-svg")
  let index = 0
  let single = 100 / logo.length
  let offset = 100 / (logo.length * 2)
  for (const element of logo) {
    const item = element as HTMLImageElement

    item.style.transform = "translate(0%, 50%)"

    let left = Number(item.style.left.split("%").join(""))
    const animate = useAnimate(left, -10, 1500)
    animate.start((value) => {
      item.style.left = value + "%"
    })

    let bottom = Number(item.style.bottom.split("%").join(""))
    let b = single * index + offset
    console.log(bottom, b);

    const animateB = useAnimate(bottom, b, 1200, easeOutElastic)
    animateB.start((value) => {
      item.style.bottom = 100 - value + "%"
    })
    index++
  }
}
const conversionPathAnimate = () => {
  let dom = document.querySelector("#turbulence") as SVGFEGaussianBlurElement
  let container = document.getElementById("home-container") as HTMLDivElement
  const animate = useAnimate(1, 0, 1500, easeInQuad)
  let flag = false
  animate.start((value) => {

    if (!flag && value >= 0.3) {
      emits("animateChange")
      flag = true
    }

    dom.stdDeviationX.baseVal = 40 - value * 40
    dom.stdDeviationY.baseVal = 40 - value * 40
    container.style.opacity = value.toString()
  }, () => {
    emits("animateComplied")
  })
}



const comeOn = () => {

  conversionLogoAnimate()
  conversionPathAnimate()
}

onMounted(() => {
  initBackGround()
  initLogoAnimate()
  initPathAnimate()
})


</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: fixed;
  z-index: -9;
  background-color: #797572;
  background-image:
    linear-gradient(-173deg, rgba(255, 255, 255, 0.20) 0%, #000000 100%),
    linear-gradient(72deg, rgba(255, 255, 255, 0.25) 25%, rgba(0, 0, 0, 0.25) 100%),
    radial-gradient(47% 102%, rgba(255, 255, 255, 0.50) 0%, rgba(21, 24, 32, 0.60) 120%);
  background-blend-mode: multiply;

}

.welcome {
  position: absolute;
  left: 50%;
  top: 30%;
  transform: translate(-50%, -50%);
}



.btn {
  font-size: 1.2rem;
  padding: 1rem 1.5rem;
  border: none;
  outline: none;
  border-radius: 0.4rem;
  cursor: pointer;
  text-transform: uppercase;
  background-color: rgb(14, 14, 26);
  color: rgb(234, 234, 234);
  font-weight: 700;
  transition: 0.6s;
  /* box-shadow: 0px 0px 60px #1f4c65; */
  -webkit-box-reflect: below 10px linear-gradient(to bottom, rgba(0, 0, 0, 0.0), rgba(0, 0, 0, 0.4));
  position: absolute;
  left: 50%;
  bottom: 20%;
  opacity: 0;
  transform: translateX(-50%);
}

.btn:active {
  scale: 0.92;
}

.btn:hover {
  background: rgb(2, 29, 78);
  background: linear-gradient(270deg, rgba(2, 29, 78, 0.681) 0%, rgba(31, 215, 232, 0.873) 60%);
  color: rgb(4, 4, 38);
}


.logo-svg {
  width: 3rem;
  cursor: pointer;
  position: absolute;
  bottom: 40%;
  left: 50%;

}
</style>