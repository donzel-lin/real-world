import dayjs from 'dayjs'
import Vue from 'vue'
var localizedFormat = require('dayjs/plugin/localizedFormat')
dayjs.extend(localizedFormat)

Vue.filter('formateDate', (date) => {
    return dayjs(date).format('LL')
})