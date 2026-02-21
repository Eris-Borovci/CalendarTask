import { calendarEventSchema } from '~/schemas/calendarEventSchema'
import { signInSchema } from '~/schemas/signInSchema'
import { signUpSchema } from '~/schemas/signUpSchema'

describe('auth schemas', () => {
  it('accepts valid sign-in payload', () => {
    const result = signInSchema.safeParse({
      email: 'john.doe@test.com',
      password: 'password123',
    })

    expect(result.success).toBe(true)
  })

  it('rejects invalid sign-in payload', () => {
    const result = signInSchema.safeParse({
      email: 'invalid-email',
      password: '123',
    })

    expect(result.success).toBe(false)

    if (!result.success) {
      expect(result.error.issues.some(issue => issue.path[0] === 'email')).toBe(
        true,
      )
      expect(
        result.error.issues.some(issue => issue.path[0] === 'password'),
      ).toBe(true)
    }
  })

  it('rejects sign-up when passwords do not match', () => {
    const result = signUpSchema.safeParse({
      email: 'john.doe@test.com',
      password: 'password123',
      confirmPassword: 'password321',
    })

    expect(result.success).toBe(false)

    if (!result.success) {
      expect(
        result.error.issues.some(
          issue =>
            issue.path[0] === 'confirmPassword' &&
            issue.message === 'Passwords do not match',
        ),
      ).toBe(true)
    }
  })
})

describe('calendar event schema', () => {
  it('accepts valid event payload', () => {
    const result = calendarEventSchema.safeParse({
      title: 'Daily standup',
      description: 'sync',
      dateFrom: new Date('2025-01-10T08:00:00.000Z'),
      dateTo: new Date('2025-01-10T08:30:00.000Z'),
    })

    expect(result.success).toBe(true)
  })

  it('rejects event when title is empty', () => {
    const result = calendarEventSchema.safeParse({
      title: '   ',
      description: 'sync',
      dateFrom: new Date('2025-01-10T08:00:00.000Z'),
      dateTo: new Date('2025-01-10T08:30:00.000Z'),
    })

    expect(result.success).toBe(false)
  })

  it('rejects event when end date is before start date', () => {
    const result = calendarEventSchema.safeParse({
      title: 'Daily standup',
      description: 'sync',
      dateFrom: new Date('2025-01-10T09:00:00.000Z'),
      dateTo: new Date('2025-01-10T08:30:00.000Z'),
    })

    expect(result.success).toBe(false)

    if (!result.success) {
      expect(
        result.error.issues.some(
          issue =>
            issue.path[0] === 'dateTo' &&
            issue.message === 'Date to must be after date from',
        ),
      ).toBe(true)
    }
  })
})
