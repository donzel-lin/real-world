import dayjs from 'dayjs'
var localizedFormat = require('dayjs/plugin/localizedFormat')
dayjs.extend(localizedFormat)
export const  formateDate = (date) => {
    return dayjs(date).format('LL')
}