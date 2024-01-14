import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error(`Cabins could not be loaded`);
  }

  return data;
}

export async function createCabin(newCabin) {
  // create a unique image name
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );

  // create the image path
  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // 1. create the cabin
  const { data, error } = await supabase
    .from("cabins")
    .insert([{ ...newCabin, image: imagePath }])
    .select();

  if (error) {
    console.log(error);
    throw new Error(`Cabin could not be created`);
  }

  // 2. Upload the image
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  // 3. Delete cabin if there's an error uploading image
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.log(error);
    throw new Error(
      `Cabin image could not be uploaded and the cabin was not created`
    );
  }

  return data;
}

export async function deleteCabin(id) {
  const { error, data } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.log(error);
    throw new Error(`Cabin could not be deleted`);
  }

  return data;
}
