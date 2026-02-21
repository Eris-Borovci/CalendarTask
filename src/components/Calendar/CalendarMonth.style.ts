import { StyleSheet } from 'react-native'
import { ThemeColors } from '~/styles/theme'

const WEEKDAY_WIDTH = `${100 / 7}%`

export default (colors: ThemeColors) => StyleSheet.create({
  container: {
    gap: 24,
  },
  content: {
    gap: 12,
  },
  weekdayRow: {
    flexDirection: 'row',
  },
  weekdayLabel: {
    width: WEEKDAY_WIDTH,
    textAlign: 'center',
    color: colors.gray[100],
    fontSize: 12,
    fontWeight: '500',
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  calendarCell: {
    width: WEEKDAY_WIDTH,
    aspectRatio: 1,
  },
})
