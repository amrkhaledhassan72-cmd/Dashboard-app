import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./api";

const equipmentSlice = createApi({
    reducerPath: "equipment",
    baseQuery: baseQuery,
    tagTypes: ['Equipment'],
    endpoints: (builder) => ({
      getAllEquipments: builder.query({
        query: () => ({
          url: "/equipments",
          method: "GET",
        }),
        providesTags: (result, error, arg) => {
          // Assuming the data is an array of objects with unique IDs
          const allTags = result ? 
            [...result.map((item) => ({ type: 'Equipment', id: item.id })),{ type: "Equipment", id: "LIST" }] 
            : [{ type: "Equipment", id: "LIST" }]
  
            return allTags;
        },
      }),
      getEquipmentById: builder.query({
        query: (equipmentData) => ({
          url: `/equipments?id=${equipmentData.id}`,
          method: "GET",
        }),
        providesTags: (result, error, arg) => {
          // Assuming the data is an array of objects with unique IDs
          const allTags = result ? 
            [...result.map((item) => ({ type: 'Equipment', id: item.id })),{ type: "Equipment", id: "LIST" }] 
            : [{ type: "Equipment", id: "LIST" }]
  
            return allTags;
        },
      }),
      addEquipment: builder.mutation({
        query: (equipmentData) => ({
          url: "/equipments",
          method: "POST",
          body: {
            ...equipmentData,
          },
        }),
        invalidatesTags: (result, error, arg) => {
          return [{ type: "Equipment", id: "LIST" }];
        },
      }),
    }),
  });
  
  export const { useGetAllEquipmentsQuery, useGetEquipmentByIdQuery, useAddEquipmentMutation } = equipmentSlice;
  
  export default equipmentSlice;