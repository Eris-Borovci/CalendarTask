import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import dayjs from 'dayjs'

export const MONTHS_TO_ADD = 10

type CalendarView = 'month' | 'day'

type CalendarState = {
  selectedDate: string
  showingDate: string
  calendarView: CalendarView,
};

const todayDate = dayjs()
const defaultSelectedDate = todayDate.toString()

const initialState: CalendarState = {
  selectedDate: defaultSelectedDate,
  showingDate: defaultSelectedDate,
  calendarView: 'day',
}

const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    setSelectedDate: (state, action: PayloadAction<string>) => {
      state.selectedDate = action.payload
    },
    setShowingDate: (state, action: PayloadAction<string>) => {
      state.showingDate = action.payload
    },
    setCalendarView: (state, action: PayloadAction<CalendarView>) => {
      state.calendarView = action.payload
    },
    previousMonth: (state) => {
      const showingDate = dayjs(state.showingDate)

      state.showingDate = showingDate.subtract(1, 'month').toString()
    },
    nextMonth: (state) => {
      const showingDate = dayjs(state.showingDate)

      state.showingDate = showingDate.add(1, 'month').toString()
    },
    goToToday: (state) => {
      state.showingDate = todayDate.toString()
    },
    previousDay: (state) => {
      const showingDate = dayjs(state.showingDate)

      state.showingDate = showingDate.subtract(1, 'day').toString()
    },
    nextDay: (state) => {
      const showingDate = dayjs(state.showingDate)

      state.showingDate = showingDate.add(1, 'day').toString()
    },
    toggleCalendarView: (state) => {
      state.calendarView = state.calendarView === 'month' ? 'day' : 'month'
    }
  },
})

export const { setSelectedDate, setShowingDate, setCalendarView, previousMonth, nextMonth, goToToday, previousDay, nextDay, toggleCalendarView } = calendarSlice.actions
export default calendarSlice.reducer
