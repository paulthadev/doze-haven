import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useCabins } from "./useCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";

function CabinTable() {
  /* 
  From the 'useCabins' custom hook, 
  We read/fetch the query from the APi using reactQuery
  */
  const { cabins, isLoading } = useCabins();

  // reading the data stored in the URL state
  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;

  // FETCHING the stored data in the URL and assigning it to the 'filterValue'
  const filterValue = searchParams.get("discount") || "all";

  // Filtering the cabin, declaring an initial variable
  let filteredCabins;

  /* filter each by their set name in the url state,
      then, assign them to the initiated variable */

  if (filterValue === "all") filteredCabins = cabins;

  if (filterValue === "no-discount")
    filteredCabins = cabins.filter((cabin) => cabin.discount === 0);

  if (filterValue === "with-discount")
    filteredCabins = cabins.filter((cabin) => cabin.discount > 0);

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header role="row">
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          // data={cabins}
          data={filteredCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
