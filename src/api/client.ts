import { BASE_URL } from "../constant";

export const fetchCharacters = async (page: number, name?: string) => {
  let url = `${BASE_URL}/api/character?page=${page}`;
  if (name) {
    url += `&name=${name}`;
  }
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch characters");
    return res.json();
  } catch (error) {
    console.log(error, "error");
  }
};

export const fetchCharacterById = async (id: string) => {
  const res = await fetch(`${BASE_URL}/api/character/${id}`);
  if (!res.ok) throw new Error("Character not found");
  return res.json();
};
