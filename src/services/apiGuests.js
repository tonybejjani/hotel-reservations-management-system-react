/** @format */

import supabase from './supabase';

export async function getGuests() {
  let { data, error } = await supabase.from('guests').select('*');

  if (error) {
    console.error(error);
    throw new Error('Guests could not be loaded.');
  }

  return data;
}

export async function getSearchGuests(fullName) {
  let { data, error } = await supabase
    .from('guests')
    .select('*')
    .ilike('fullName', `%${fullName}%`);

  if (error) {
    console.error(error);
    throw new Error('Guests could not be loaded.');
  }

  return data;
}
