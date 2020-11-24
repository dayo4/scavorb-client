import Vue from 'vue'
import _axios from "./Axios"
import router from '@/router'
import { io } from './WebSocket'

export const $Vue = Vue
export const $Axios = _axios
export const $Router = router

export const WS = io