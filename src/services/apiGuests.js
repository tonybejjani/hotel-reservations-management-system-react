/** @format */

import { PAGE_SIZE } from '../utils/constants';
import supabase from './supabase';

export async function getGuests({ page }) {
  let query = supabase.from('guests').select('*', { count: 'exact' });

  console.log(page);
  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;

    query = query.range(from, to);
  }

  let { data, error, count } = await query;

  if (error) {
    console.error(error);
    throw new Error('Guests could not be loaded.');
  }

  return { data, count };
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

export async function createEditGuest(newGuest, id) {
  console.log(newGuest);
  console.log(id);

  let query = supabase.from('guests');

  //1. Create Cabin
  if (!id) query = query.insert([{ ...newGuest }]);

  if (id) query = query.update({ ...newGuest }).eq('id', id);

  const { data, error } = await query.select();

  if (error) {
    console.error(error);
    throw new Error('Guest could not be added.');
  }

  return data;
}

export async function deleteGuest(id) {
  const { data, error } = await supabase.from('guests').delete().eq('id', id);

  if (error) {
    console.error(error);
    throw new Error('Guests could not be deleted.');
  }

  return data;
}
