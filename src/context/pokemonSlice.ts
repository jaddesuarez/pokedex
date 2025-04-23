import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Pokemon } from "@/types/pokemon";

const loadClickCountsFromStorage = (): Record<number, number> => {
  if (typeof window !== "undefined") {
    const storedClickCounts = localStorage.getItem("pokemonClickCounts");
    return storedClickCounts ? JSON.parse(storedClickCounts) : {};
  }
  return {};
};

interface PokemonState {
  pokemonId: number | null;
  pokemons: Pokemon[];
  clickCounts: Record<number, number>;
}

const initialState: PokemonState = {
  pokemonId: null,
  pokemons: [],
  clickCounts: loadClickCountsFromStorage(),
};

const saveClickCountsToStorage = (clickCounts: Record<number, number>) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("pokemonClickCounts", JSON.stringify(clickCounts));
  }
};

const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {
    setPokemonId: (state, action: PayloadAction<number>) => {
      state.pokemonId = action.payload;
    },
    setPokemons: {
      reducer: (state, action: PayloadAction<Pokemon[]>) => {
        state.pokemons = action.payload;
        action.payload.forEach((poke) => {
          if (!(poke.id in state.clickCounts)) {
            state.clickCounts[poke.id] = 0;
          }
        });
        saveClickCountsToStorage(state.clickCounts);
      },
      prepare: (payload: Pokemon[]) => {
        return { payload };
      },
    },
    incrementClick: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      state.clickCounts[id] = (state.clickCounts[id] || 0) + 1;
      saveClickCountsToStorage(state.clickCounts);
    },
  },
});

export const { setPokemons, setPokemonId, incrementClick } =
  pokemonSlice.actions;
export default pokemonSlice.reducer;
