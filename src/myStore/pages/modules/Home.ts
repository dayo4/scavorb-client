export class Home {
    flips = {
        nextFlip: false,
        page: 1,
        dir: 1
    }
    flipInterval: number = null

    startFlipper () {
        // this.flips.nextFlip = true
        this.flipInterval = setInterval(() => {
            this.flips.dir = Math.floor(Math.random() * 2 + 1)
            this.flips.page++
            this.flips.nextFlip = true
            let reset = setTimeout(() => {
                this.flips.nextFlip = false
                if (this.flips.page === 2)
                    this.flips.page = 0

                clearTimeout(reset)
            }, 1300)
        }, 1800)
    }

    endFlipper () {
        clearInterval(this.flipInterval)
    }
}
