import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faBars, faUndo, faEyeSlash, faEye, faFilter, faEdit, faTimes, faWindowClose } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faEye)
library.add(faEyeSlash)
library.add(faWindowClose)
library.add(faUndo)
library.add(faBars)
library.add(faFilter)
library.add(faEdit)
library.add(faTimes)
Vue.component('font-awesome-icon', FontAwesomeIcon)
