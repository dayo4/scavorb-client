// import { $Vue, $Notify, $LSAgent } from '@/myStore'

const baseElement = document.createElement('div')
baseElement.classList.add("t-white", "bg-trans-3", "text-center", "p-4", "m-auto")

function retry () {
    const element = baseElement

    element.innerHTML = `
    	<p class="font-5 bold-3 my-3 letter-space-1">An error occured!</p>
		<div class="flex j-c-center">
			<button class="btn cyan-gradient-btn shadow-3 font-5">RETRY</button>
		</div>
    `

    return element
}

function loading () {
    const element = baseElement
    element.classList.add('m-auto')

    element.innerHTML = `
    	<span class="icon-spin6 animate-spin font-16"></span>
		<p class="font-2 bold-3 my-2 letter-space-1">Fetching...</p>
    `

    return element
}


class ScrollLoader {
    private retry = retry()
    private loading = loading()
    private element: Element | string
    private deactivated = false /* not yet implemented */
    constructor (element: HTMLElement | string/* , opts?: Options */) {
        this.element = element
    }


    init (action: Function /* Should return a promise */) {
        // action()
        const scroller: Element = this.verifyElement()

        if (!scroller || !scroller.tagName)
        {
            throw new Error('Invalid DOM Element/Selector supplied to $ScrollLoader.')
        }
        else
        {

            let initialScrollHeight = scroller.scrollHeight
            let requestSent = false /* ensures that only 1 request is sent at a time */


            let _this = this
            function load () {
                if (!_this.deactivated)
                {
                    let clientHeight = scroller.clientHeight + 300
                    let scrollTop = scroller.scrollTop
                    const newScrollHeight = scroller.scrollHeight

                    // console.log(newScrollHeight)
                    if ((newScrollHeight) != initialScrollHeight)
                    {
                        initialScrollHeight = newScrollHeight
                        requestSent = false

                        // console.log('scroll height changed!')
                    }
                    if (initialScrollHeight - scrollTop <= clientHeight)
                    {
                        if (!requestSent)
                        {
                            requestSent = true
                            makeRequest()
                        }
                    }
                }
            }
            scroller.addEventListener('scroll', load, false)


            function makeRequest () {
                scroller.appendChild(_this.loading)
                // console.log('loading more')
                /* action() calls the function to be executed in order to load more data */
                action().then(response => {
                    scroller.removeChild(_this.loading)
                    if (!response)
                        scroller.appendChild(_this.retry)
                }).catch(() => {
                    scroller.removeChild(_this.loading)
                    scroller.appendChild(_this.retry)
                    // console.log('error')
                })

            }

            let retryBtn = this.retry.querySelector('button')
            if (retryBtn)
                retryBtn.addEventListener('click', function () {
                    scroller.removeChild(_this.retry)
                    makeRequest()
                }, false)
        }

    }

    deInit () {

    }

    private verifyElement () {
        if (typeof this.element === 'string')
        {
            return document.querySelector(this.element)
        }
        else
        {
            return this.element
        }
    }

}


export const $ScrollLoader = function (element: HTMLElement | string) {
    return new ScrollLoader(element)
}

// $ScrollLoader('elem').init( function () {
//     return true
// })