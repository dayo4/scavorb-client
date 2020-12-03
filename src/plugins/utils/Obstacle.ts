
function pageLoader () {
    const div = document.createElement('div')
    div.classList.add('Overlay')
    div.innerHTML = `
        <div class="logo-base logo-trans-2 logo-large logo-fast shadow-5">
            <span>
                <span>
                    <b>S</b>
                </span>
                <span></span>
            </span>
            <span></span>
        </div>
    `

    return div
}

function overlay (text?: string, icon?: string, font?: number, animate: boolean = true) {
    const span = document.createElement('span')
    span.classList.add('Overlay')
    span.innerHTML = `
        <span class="${icon} ${animate ? 'animate-spin' : ''} mr-2" style="font-size: ${font}px;">
        </span>
        <span style="font-size: ${font}px;">
            ${text}
        </span>
    `

    return span
}


function overlayDelay (timer: number, text?: string, font?: number) {
    const span = document.createElement('span')
    span.classList.add('Overlay')
    span.innerHTML = `
        <span class="DelayCounth mr-2" style="font-size: ${font}px;">
        </span>
        <span style="font-size: ${font}px;">
            ${text}
        </span>
    `

    let time = Math.ceil(timer / 1000)

    for (let i = time; i >= 0; i--)
    {
        setTimeout(function () {
            span.firstChild.textContent = String(i)
        }, timer - (1000 * i))
    }

    return span
}

function breakClick (e) {
    e.preventDefault()
    return
}

interface Options {
    action?: Function | void /* NOTE: Do not call the function passed as action. Otherwise the function will be executed immediately. */
    onClick?: Function  /* You can also add a click event to the Obstacl to make users perform an action. */
    timer?: number
    showCountdown?: boolean
    pageLoader?: boolean
    text?: string /* Custom text to show on the overlay if needed. Defaults to "Wait..." */
    icon?: string /* Custom icon to show on the overlay if needed. Defaults to "icon-spin6" */
    font?: number /* Custom font-size for the inner texts */
    animate?: boolean /* Whether to animate the icon. */

}

export class Obstacl {

    private stack: HTMLElement[] = []


    create (element: HTMLElement | string, opts: Options = {}) {
        const text = 'text' in opts ? opts.text : 'Wait...'
        const icon = 'icon' in opts ? opts.icon : 'icon-spin6'
        const font = 'font' in opts ? opts.font : 16
        /* Better to use an Element directly if already available. Otherwise use it's DOM selector to query it. */
        let elem = this.verifyElement(element)

        if (elem)
        {

            /* Prevent duplicate element */
            const exist = this.stack.includes(elem)

            if (!exist)
            {
                elem.classList.add('isDisabled')
                this.stack.push(elem)

                if (!opts.onClick)
                {
                    elem.addEventListener('click', breakClick, false)
                }

                if (opts.action)
                {
                    opts.action()
                }
                if (opts.onClick)
                {
                    elem.addEventListener('click', function () {
                        opts.onClick()
                        return
                    }, false)
                }
                if (opts.timer)
                {
                    if (opts.showCountdown)
                    {
                        elem.appendChild(overlayDelay(opts.timer, text, font))
                    }
                    else
                    {
                        elem.appendChild(overlay(text, icon, font, opts.animate))
                    }

                    let $this = this
                    setTimeout(function () {
                        $this.destroy(elem)
                    }, opts.timer)
                }
                else if (opts.pageLoader)
                {
                    elem.appendChild(pageLoader())
                }
                else
                {
                    elem.appendChild(overlay(text, icon, font, opts.animate))
                }

            }
            return
        }
        console.error('invalid target supplied to $Obstacl creator.')
    }

    destroy (element: HTMLElement | string) {
        /* if you have access to the button at the point of destruction, use it. Otherwise use it's 'selector' to get it from the DOM. */

        let elem = this.verifyElement(element)

        if (elem)
        {
            const overlay = elem.getElementsByClassName('Overlay')[ 0 ]
            this.stack.splice(this.stack.indexOf(elem), 1)

            elem.classList.remove('isDisabled')
            elem.removeChild(overlay)
            elem.removeEventListener('click', breakClick, false)

            return
        }
        console.error('invalid target supplied to $Obstacl destroyer.')

    }

    private verifyElement (element): HTMLElement {
        if (typeof element === 'string')
        {
            return document.querySelector(element)
        }
        else
        {
            return element
        }
    }
}
