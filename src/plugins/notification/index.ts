import { $Vue } from '@/plugins'


import { LoadingProcessNotification } from './ProcessMgr'
import { Notify } from './Notify'
import { $Confirm } from './Confirm'
import { InputModal } from './InputModal'

const $Process = $Vue.observable(new LoadingProcessNotification())
const $Notify = $Vue.observable(new Notify())


const $InputModal = $Vue.observable(new InputModal())

export {
    $Process,
    $Notify,
    $Confirm,
    $InputModal
}