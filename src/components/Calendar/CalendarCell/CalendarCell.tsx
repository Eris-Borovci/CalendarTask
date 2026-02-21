import { useTheme } from '@react-navigation/native'
import { Dayjs } from 'dayjs'
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated'
import { useAppSelector } from '~/store/hooks'
import makeStyles from './CalendarCell.style'

type CalendarCellProps = {
  date: Dayjs;
  isAnotherMonth?: boolean;
};

const CalendarCell = ({ date, isAnotherMonth }: CalendarCellProps) => {
  const { colors } = useTheme()
  const styles = makeStyles(colors)

  const selectedDate = useAppSelector(state => state.calendar.selectedDate)
  const isActive = date.isSame(selectedDate, 'day')
  const isActiveProgress = useDerivedValue(
    () => withTiming(isActive ? 1 : 0, { duration: 150 }),
    [isActive],
  )

  const animatedBackgroundColor = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        isActiveProgress.value,
        [0, 1],
        ['transparent', colors.primary],
      ),
    }
  }, [colors.primary])

  const animatedTextColor = useAnimatedStyle(() => {
    return {
      color: interpolateColor(
        isActiveProgress.value,
        [0, 1],
        [colors.secondary, colors.white],
      ),
    }
  }, [colors.primary, colors.secondary, colors.white])

  return (
    <Animated.View
      style={[
        styles.container,
        animatedBackgroundColor,
        isAnotherMonth && styles.anotherMonth,
      ]}
    >
      <Animated.Text style={[styles.text, animatedTextColor]}>
        {date.date()}
      </Animated.Text>
    </Animated.View>
  )
}

export default CalendarCell
