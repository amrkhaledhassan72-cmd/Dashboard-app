import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./api";

const vehicleSlice = createApi({
    reducerPath: "vehicle",
    baseQuery: baseQuery,
    tagTypes: ['Vehicle'],
    endpoints: (builder) => ({
      getAllVehicles: builder.query({
        query: () => ({
          url: "/vehicles",
          method: "GET",
        }),
        providesTags: (result, error, arg) => {
          // Assuming the data is an array of objects with unique IDs
          const allTags = result ? 
            [...result.map((item) => ({ type: 'Vehicle', id: item.id })),{ type: "Vehicle", id: "LIST" }] 
            : [{ type: "Vehicle", id: "LIST" }]
  
            return allTags;
        },
      }),
      getVehicleById: builder.query({
        query: (vehicleData) => ({
          url: `/vehicles?id=${vehicleData.id}`,
          method: "GET",
        }),
        providesTags: (result, error, arg) => {
          // Assuming the data is an array of objects with unique IDs
          const allTags = result ? 
            [...result.map((item) => ({ type: 'Vehicle', id: item.id })),{ type: "Vehicle", id: "LIST" }] 
            : [{ type: "Vehicle", id: "LIST" }]
  
            return allTags;
        },
      }),
      addVehicle: builder.mutation({
        query: (vehicleData) => ({
          url: "/vehicles",
          method: "POST",
          body: {
            ...vehicleData,
          },
        }),
        invalidatesTags: (result, error, arg) => {
          return [{ type: "Vehicle", id: "LIST" }];
        },
      }),
      updateVehicle: builder.mutation({
        query: (vehicleData) => ({
          url: `/vehicles/${vehicleData.id}`,
          method: "PUT",
          body: {
            ...vehicleData,
          },
        }),
        invalidatesTags: (result, error, arg) => {
          return [{ type: "Vehicle", id: arg.id }];
        },
      }),
      deleteVehicle: builder.mutation({
        query: (id) => ({
          url: `/vehicles/${id}`,
          method: "DELETE",
        }),
        invalidatesTags: (result, error, arg) => {
          return [{ type: "Vehicle", id: arg }];
        },
      }),
    }),
  });
  
  export const { useGetAllVehiclesQuery, useGetVehicleByIdQuery, useAddVehicleMutation, useUpdateVehicleMutation, useDeleteVehicleMutation } = vehicleSlice;
  
  export default vehicleSlice;