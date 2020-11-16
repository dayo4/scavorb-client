import { $Vue } from '@/plugins'
import { Home } from './modules/Home'
import { Mailer } from './modules/Mailer'

export class Pages {
    $home = new Home()
    $mailer = new Mailer()
}

export const $Pages = $Vue.reactive(new Pages())