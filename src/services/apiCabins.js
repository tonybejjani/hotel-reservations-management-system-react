/** @format */

import supabase, { supabaseUrl } from './supabase';

export async function getCabins() {
  let { data, error } = await supabase.from('cabins').select('*');

  if (error) {
    console.error(error);
    throw new Error('Cabins could not be loaded.');
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from('cabins').delete().eq('id', id);

  if (error) {
    console.error(error);
    throw new Error('Cabins could not be deleted.');
  }

  return data;
}

export async function createEditCabin(newCabin, id) {
  console.log(newCabin);
  console.log(newCabin.id);
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
  console.log(hasImagePath);

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    '/',
    ''
  );

  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  let query = supabase.from('cabins');

  //1. Create Cabin
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  if (id) query = query.update({ ...newCabin, image: imagePath }).eq('id', id);

  const { data, error } = await query.select();

  if (error) {
    console.error(error);
    throw new Error('Cabin could not be added.');
  }

  if (hasImagePath) return data;
  //2. Upload Image
  const { error: storageError } = await supabase.storage
    .from('cabin-images')
    .upload(imageName, newCabin.image);

  //3. Delete  Cabin if error uploading image
  if (storageError) {
    await supabase.from('cabins').delete().eq('id', data.id);

    console.log(storageError);
    throw new Error(
      'Cabin image could not be uploaded and the cabin was not created.'
    );
  }

  return data;
}
