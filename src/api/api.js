import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const baseQuery = fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL
})