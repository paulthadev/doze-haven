import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import styled from "styled-components";
import toast from "react-hot-toast";

import CreateCabinForm from "./CreateCabinForm";
import { formatCurrency } from "../../utils/helpers";
import { deleteCabin } from "../../services/apiCabins";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

function CabinRow({ cabin }) {
  const [showForm, setShowForm] = useState(false);

  const {
    id: cabinId,
    name,
    maxCapacity,
    regularPrice,
    discount,
    description,
    image,
  } = cabin;

  // NOTE: Deleting a cabin using (useMutation)

  /* 1. we need access the queryClient, to be able to match the querykey.
     2. Using "useMutation()", we destructure the isLoading state & mutate function.
      The mutuate function would be called in the button and the cabin ID is passed.
      WHile the deleteCabin function from the api is called on the mutationFn object.
  3. Then, we call the "invalidateQueries" on the "onSuccess" object.
      The "inValidateQueries" is to be able to refresh the query state
      after deletion and update the UI */

  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: deleteCabin,
    onSuccess: () => {
      toast.success("Cabin deleted successfully");

      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (error) => toast.error(error.message),
  });

  return (
    <>
      <TableRow role="row">
        <Img src={image} />
        <Cabin>{name}</Cabin>
        <div>Fits up to {maxCapacity} guests</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        <Discount>{formatCurrency(discount)}</Discount>

        <div>
          <button onClick={() => setShowForm((show) => !show)}>Edit</button>

          <button onClick={() => mutate(cabinId)} disabled={isLoading}>
            Delete
          </button>
        </div>
      </TableRow>

      {showForm && <CreateCabinForm cabinToEdit={cabin} />}
    </>
  );
}

export default CabinRow;
