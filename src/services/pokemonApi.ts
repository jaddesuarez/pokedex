import { Pokemon, PokemonListResponse } from "@/types/pokemon";

const BASE_URL = "https://pokeapi.co/api/v2";

export class PokemonApiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "PokemonApiError";
  }
}

async function handleApiResponse<T>(
  response: Response,
  errorMessage: string
): Promise<T> {
  if (!response.ok) {
    const error = new PokemonApiError(errorMessage);
    sessionStorage.setItem(
      "apiError",
      JSON.stringify({
        message: errorMessage,
        timestamp: new Date().toISOString(),
      })
    );
    window.location.href = "/error";
    throw error;
  }
  return response.json();
}

export async function getPokemonList(
  offset: number = 0
): Promise<PokemonListResponse> {
  const response = await fetch(`${BASE_URL}/pokemon?offset=${offset}&limit=20`);
  return handleApiResponse<PokemonListResponse>(
    response,
    "Failed to fetch Pokemon list"
  );
}

export async function getPokemonDetails(
  nameOrId: string | number
): Promise<Pokemon> {
  const response = await fetch(`${BASE_URL}/pokemon/${nameOrId}`);
  return handleApiResponse<Pokemon>(
    response,
    "Failed to fetch Pokemon details"
  );
}
