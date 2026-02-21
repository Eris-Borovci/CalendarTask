import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { Tags } from "~/enums/tags"

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({}),
    tagTypes: [
        Tags.Events,
        Tags.Users,
    ],
    endpoints: () => ({}),
})
