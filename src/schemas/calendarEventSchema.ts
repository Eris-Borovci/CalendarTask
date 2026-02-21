import z from 'zod'

export const calendarEventSchema = z
  .object({
    title: z.string().trim().min(1, 'Title is required'),
    description: z.string().trim(),
    dateFrom: z.date(),
    dateTo: z.date(),
  })
  .superRefine((data, ctx) => {
    const dateFrom = new Date(data.dateFrom).getTime()
    const dateTo = new Date(data.dateTo).getTime()

    if (dateTo < dateFrom) {
      ctx.addIssue({
        code: 'custom',
        message: 'Date to must be after date from',
        path: ['dateTo'],
      })
    }
  })


export type CalendarEventSchema = z.infer<typeof calendarEventSchema>;