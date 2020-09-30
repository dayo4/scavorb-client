// import { $Vue } from '@/plugins'
interface ConfirmInteface {
    header: string,
    message: string,
    type?: string,
    onConfirm: Function /* "onConfirm" is the function to trigger when user confirms the action. It should return a promise */
}

function createTemplate (header: string, message: string, type: string) {
    const div = document.createElement('div')
    div.classList.add('GlobalModal', 'modal', 'flex', 'a-i-center', 'j-c-center', 'slide-in')
    div.innerHTML = `
        <div class="Content m-auto xs11 sm8 md6 lg5">

            <h3
                class="Head flex a-i-center j-c-between font-7 p-5 my-0 noselect ${type === 'danger' ? 'bg-pink-5 t-red-1' : type === 'success' ? 'bg-lime-4 t-green-1' : type === 'warning' ? 'bg-yellow-4 t-orange-1' : 'bg-light-blue-5 t-light-blue'}"
            >
                <span class="Header text-up">
                    ${header}
                </span>
			    <div class="Close labeled-action">
			    	<span class="icon-off t-pink-2"></span>
			    	<span>Close</span>
			    </div>
            </h3>

            <hr />
            <div class="Body bg-white p-3 mb-0 font-5 br1 text-center">
                ${message}
            </div>
            <hr />

            <div class="Foot bg-white noselect flex a-i-center j-c-center p-4">
                <button
                    class="Close btn cyan-gradient-btn icon-cancel"
                > Cancel </button>
                <button
                    class="Confirm btn pink-gradient-btn icon-hammer"
                > Confirm </button>
            </div>

        </div>
    `

    return div
}

export class Confirm {

    constructor (params: ConfirmInteface) {
        const template: HTMLElement = createTemplate(params.header, params.message, params.type)
        document.body.appendChild(template)
        let _this = this

        function close () {
            template.removeEventListener('click', listener)
            document.body.removeChild(template)
        }

        function listener (e: any) {
            if (e.target.closest('.Close'))
                close()
            else if (e.target.closest('.Confirm'))
            {
                params.onConfirm().then(done => {
                    if (done)
                    {
                        close()
                    }
                })
            }
        }
        template.addEventListener('click', listener)

    }

}


export const $Confirm = function (params: ConfirmInteface) {
    return new Confirm(params)
}