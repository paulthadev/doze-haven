import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteCabin as deleteCabinApi } from "../../services/apiCabins";

export function useDeleteCabin() {
  const queryClient = useQueryClient();

  const { mutate: deleteCabin, isLoading: isDeleting } = useMutation({
    mutationFn: deleteCabinApi,

    onSuccess: () => {
      toast.success("Cabin deleted successfully");

      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (error) => toast.error(error.message),
  });

  return { isDeleting, deleteCabin };
}

// NOTE: Deleting a cabin using (useMutation)

/* 1. we need access the queryClient, to be able to match the querykey.
     2. Using "useMutation()", we destructure the isLoading state & mutate function.
      The mutuate function would be called in the button and the cabin ID is passed.
      WHile the deleteCabin function from the api is called on the mutationFn object.
  3. Then, we call the "invalidateQueries" on the "onSuccess" object.
      The "inValidateQueries" is to be able to refresh the query state
      after deletion and update the UI 
      
    In this file we are exporting a custom hook and using it at the "CabinRow.jsx" file
      */
