export class LoadingProcessNotification {
    status = false
    info = ''
    // fullscreen = false
    icon = "icon-info"

    hide () {
        this.status = false
        // this.reset()
    }

    reset () {
        let $this = this
        setTimeout(() => {
            $this.info = 'Initializing...'
            $this.icon = 'icon-info'
        }, 2000)
    }

    add (text?: string/* , opt: { full?: boolean } = {} */) {
        this.info = text ? text : 'Requesting...'
        this.icon = 'icon-info'
        if (this.status === false)
            this.status = true
        // if (opt.full)
        //     this.fullscreen = true
    }

    abort () {
        this.info = 'Aborting operation...'
        this.icon = 'icon-cancel'
        let $this = this
        setTimeout(function () {
            $this.hide()
        }, 1000)
        // if (this.fullscreen)
        //     this.fullscreen = false
    }

    done () {
        this.info = 'DONE!'
        this.icon = 'icon-info'
        let $this = this
        setTimeout(function () {
            $this.hide()
        }, 1000)
        // if (this.fullscreen)
        //     this.fullscreen = false
    }
}
