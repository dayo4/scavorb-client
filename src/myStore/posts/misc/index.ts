import { ReadQueue } from './ReadQueue'
import { $Vue } from '@/plugins'

export const $ReadQueue = $Vue.reactive(new ReadQueue())
