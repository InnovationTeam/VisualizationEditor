import Vue from 'vue'

import attributes from './attributes.json'
import prebuilts from './prebuilts.json'
import element from './element.vue'

Vue.component('wx-text', element)

export default {
    attributes,
    prebuilts
}