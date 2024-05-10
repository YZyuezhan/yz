

export const useAnimate = (
    from: number,
    to: number,
    duration: number,
    animateFunction?: (x: number) => number
) => {
    let handleAnimateFunction = animateFunction ? animateFunction : easeInOutBack
    const start = (callback?: (value: number) => void, progress?: (value: number) => void) => {
        animate(from, to, duration, callback, progress)
    }
    const animate = (from: number, to: number, duration: number, callback?: (value: number) => void, progress?: (value: number) => void) => {
        let startTime = Date.now()
        let state = true
        const run = () => {
            if (!state) return
            let currentTime = Date.now()
            if (currentTime - startTime <= duration) {
                let time = currentTime - startTime
                let speed = handleAnimateFunction(time / duration)
                let v = from + (to - from) * speed
                callback?.(v)
            }
            if (currentTime - startTime >= duration) {
                progress?.(to)
                state = false
            }
            requestAnimationFrame(run)
        }
        run()
    }

    return {
        start
    }

}


// 缓动函数
export const easeInOutBack = (x: number): number => {
    const c1 = 1.70158;
    const c2 = c1 * 1.525;

    return x < 0.5
        ? (Math.pow(2 * x, 2) * ((c2 + 1) * 2 * x - c2)) / 2
        : (Math.pow(2 * x - 2, 2) * ((c2 + 1) * (x * 2 - 2) + c2) + 2) / 2;
}

export const easeOutElastic = (x: number): number => {
    const c4 = (2 * Math.PI) / 3;

    return x === 0
        ? 0
        : x === 1
            ? 1
            : Math.pow(2, -10 * x) * Math.sin((x * 10 - 0.75) * c4) + 1;
}

export const easeInSine = (x: number): number => {
    return 1 - Math.cos((x * Math.PI) / 2)
}
export const easeInQuad = (x: number): number => {
    return x * x;
}