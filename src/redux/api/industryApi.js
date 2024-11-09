import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const INDUSTRY_API = "/api/v1/industry";

export const industryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    jobOpenings: builder.query({
      query: () => ({
        url: `${INDUSTRY_API}/job-openings`,
        method: "GET",
      }),
      providesTags: [tagTypes.industry],
    }),
  }),
});

export const { useJobOpeningsQuery } = industryApi;
