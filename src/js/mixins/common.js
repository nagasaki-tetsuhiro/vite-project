import { DateTime } from 'luxon'

export default {
    methods: {
        formatSendAt (sendAt) {
            if (sendAt === '' || sendAt === null) {
                return ' '
            }
            const sendAtString = sendAt.replace(/T|Z/g, ' ')
            const dt = DateTime.fromSQL(sendAtString)
            const now = DateTime.now()
            let afterString = ''
            let afterHours = 0
            let afterMinute = 0
            const diffDay = dt.diff(now, 'days')
            const diffMinute = dt.diff(now, 'minutes')
            if (diffDay.days < 0) {
                return dt.toLocaleString(DateTime.DATETIME_SHORT)
            }

            afterHours =  diffMinute.minutes / 60
            afterMinute = diffMinute.minutes % 60

            if (afterHours > 0 ) {
                afterString = afterString + afterHours + '時間 '
            }
            afterString = afterString + afterMinute + '分前'

            return afterString
        }
    }
}
