import { $Vue } from '@/plugins'


import { LoadingProcessNotification } from './ProcessMgr'
import { Notify } from './Notify'
import { $Confirm } from './Confirm'
import { InputModal } from './InputModal'

const $Process = $Vue.reactive(new LoadingProcessNotification())
const $Notify = $Vue.reactive(new Notify())


const $InputModal = $Vue.reactive(new InputModal())

export {
    $Process,
    $Notify,
    $Confirm,
    $InputModal
}