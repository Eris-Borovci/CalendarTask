import dayjs from 'dayjs'
import reducer, {
  nextDay,
  nextMonth,
  previousDay,
  previousMonth,
  setCalendarView,
  setSelectedDate,
  setShowingDate,
  toggleCalendarView,
} from '~/store/calendarSlice'

describe('calendarSlice', () => {
  it('returns initial state', () => {
    const state = reducer(undefined, { type: 'unknown' })

    expect(state.calendarView).toBe('day')
    expect(typeof state.selectedDate).toBe('string')
    expect(typeof state.showingDate).toBe('string')
  })

  it('updates selected date and calendar view', () => {
    const selectedDate = new Date('2025-01-10T08:00:00.000Z').toString()

    let state = reducer(undefined, setSelectedDate(selectedDate))
    state = reducer(state, setCalendarView('month'))

    expect(state.selectedDate).toBe(selectedDate)
    expect(state.calendarView).toBe('month')
  })

  it('moves between previous and next month', () => {
    const baseDate = new Date('2025-03-15T12:00:00.000Z').toString()

    let state = reducer(undefined, setShowingDate(baseDate))
    state = reducer(state, previousMonth())

    expect(state.showingDate).toBe(
      dayjs(baseDate).subtract(1, 'month').toString(),
    )

    state = reducer(state, nextMonth())
    expect(dayjs(state.showingDate).valueOf()).toBe(dayjs(baseDate).valueOf())
  })

  it('moves between previous and next day', () => {
    const baseDate = new Date('2025-06-20T12:00:00.000Z').toString()

    let state = reducer(undefined, setShowingDate(baseDate))
    state = reducer(state, previousDay())

    expect(state.showingDate).toBe(
      dayjs(baseDate).subtract(1, 'day').toString(),
    )

    state = reducer(state, nextDay())
    expect(dayjs(state.showingDate).valueOf()).toBe(dayjs(baseDate).valueOf())
  })

  it('toggles view between day and month', () => {
    let state = reducer(undefined, { type: 'unknown' })

    state = reducer(state, toggleCalendarView())
    expect(state.calendarView).toBe('month')

    state = reducer(state, toggleCalendarView())
    expect(state.calendarView).toBe('day')
  })
})
