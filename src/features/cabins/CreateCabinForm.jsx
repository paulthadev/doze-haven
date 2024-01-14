import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { createCabin } from "../../services/apiCabins";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import FormRow from "../../ui/FormRow";

function CreateCabinForm() {
  // NOTE:setting up react-hook-form
  const { register, handleSubmit, reset, getValues, formState } = useForm();
  const { errors } = formState;

  // NOTE: Adding a cabin using (useMutation)

  /* 1. we need access the queryClient, to be able to match the querykey.
       2. Using "useMutation()", we destructure the isLoading state & mutate function.
      The mutuate function would be called in the onSUbmit() and the new object from the form is passed.
      While the createCabin function from the api is called on the mutationFn object.
    3. Then, we call the "invalidateQueries" on the "onSuccess" object.
      The "inValidateQueries" is to be able to refresh the query state
      after deletion and update the UI 
      Then we call the reset() from react-hook-form to rest the form data if the action is successful*/

  const queryClient = useQueryClient();

  const { isLoading: isCreating, mutate } = useMutation({
    mutationFn: createCabin,

    onSuccess: () => {
      toast.success("cabin added successfully!");

      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      reset();
    },
    onError: (error) => toast.error(error.message),
  });

  function onSubmit(data) {
    mutate({ ...data, image: data.image[0] });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isCreating}
          {...register("name", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isCreating}
          {...register("maxCapacity", {
            required: "This field is required",

            min: {
              value: 1,
              message: `Capacity should be at least 1`,
            },
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isCreating}
          {...register("regularPrice", {
            required: "This field is required",

            min: {
              value: 1,
              message: `Regular price should be at least 1`,
            },
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          disabled={isCreating}
          {...register("discount", {
            required: "This field is required",
            validate: (value) =>
              Number(value) <= Number(getValues()?.regularPrice) ||
              "Discount should be less than regular price",
          })}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors?.description?.message}
      >
        <Textarea
          id="description"
          disabled={isCreating}
          defaultValue=""
          {...register("description", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label={"Cabin photo"}>
        <FileInput
          id="image"
          accept="image/*"
          disabled={isCreating}
          {...register("image")}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isCreating}>Add cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
