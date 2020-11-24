import { $Vue } from '@/plugins'

import { Users } from './modules/ManageUsers'
import { System } from './modules/System'

class Admin {
    $users = new Users()
    $system = new System()
}

export const $Admin = $Vue.observable(new Admin())
