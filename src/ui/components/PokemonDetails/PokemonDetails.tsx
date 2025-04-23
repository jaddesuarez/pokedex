import { Pokemon } from "@/types/pokemon";
import { useAppSelector, useAppDispatch } from "@/context/hooks";
import { ThumbsUp, Loader2, Scale, Ruler } from "lucide-react";
import { useEffect, useState } from "react";
import { getPokemonDetails } from "@/services/pokemonApi";
import Image from "next/image";
import { incrementClick } from "@/context/pokemonSlice";
import { getTypeStyle } from "@/utils/pokemon.utils";
import { cn } from "@/lib/utils";

export const PokemonDetails = () => {
  const { clickCounts, pokemonId } = useAppSelector((state) => state.pokemon);
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();

  const fetchPokemonDetails = async () => {
    if (!pokemonId) return;

    try {
      setIsLoading(true);
      const pokemonData = await getPokemonDetails(pokemonId);
      setPokemon(pokemonData);
    } catch (error) {
      console.error("Error fetching Pokemon details:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemonDetails();
  }, [pokemonId]);

  const handleUpvote = () => {
    if (pokemonId) {
      dispatch(incrementClick(pokemonId));
    }
  };

  if (!pokemonId) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-200">
        <p className="text-gray-500 text-xl">
          Select a Pokémon to view details
        </p>
      </div>
    );
  }

  if (isLoading || !pokemon) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-200">
        <Loader2 className="w-8 h-8 animate-spin text-gray-500" />
      </div>
    );
  }

  const voteCount = clickCounts[pokemonId] || 0;
  const types = pokemon.types.map((type) => type.type.name);

  return (
    <div
      className={cn(
        "relative p-4 md:p-8 bg-gray-200 h-full flex items-center justify-center",
        getTypeStyle(types[0])
      )}
    >
      <Image
        src="/svg/pokeball.svg"
        alt="Pokeball background"
        className="hidden lg:block absolute right-20 top-10 opacity-30"
        width={800}
        height={800}
      />
      <div className="max-w-md w-full bg-white rounded-3xl shadow-lg overflow-hidden p-4 md:p-6 relative z-10">
        <div className="flex flex-col items-center">
          {/* Pokemon Image and Number */}
          <div
            className={cn(
              "relative w-full h-48 flex items-center justify-center rounded-2xl mb-4",
              getTypeStyle(types[0])
            )}
          >
            <Image
              src={
                pokemon.sprites.other["official-artwork"].front_default ||
                pokemon.sprites.front_default
              }
              alt={pokemon.name}
              width={200}
              height={200}
              className="object-contain cursor-pointer"
              onClick={handleUpvote}
            />
            <span className="absolute top-4 right-4 font-semibold">
              #{String(pokemon.id).padStart(3, "0")}
            </span>
          </div>

          {/* Pokemon Name and Types */}
          <h2 className="text-2xl font-bold text-gray-900 capitalize mb-2">
            {pokemon.name}
          </h2>
          <div className="flex gap-2 mb-6">
            {types.map((type) => {
              let typeStyle = getTypeStyle(type);
              return (
                <span
                  key={type}
                  className={cn(
                    "px-3 py-1 rounded-full text-sm font-medium capitalize",
                    typeStyle
                  )}
                >
                  {type}
                </span>
              );
            })}
          </div>

          {/* About Section */}
          <div className="w-full mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">About</h3>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-2 text-gray-600 mb-1">
                  <Scale className="w-4 h-4" />
                  <span>{pokemon.weight / 10} kg</span>
                </div>
                <span className="text-xs text-gray-500">Weight</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-2 text-gray-600 mb-1">
                  <Ruler className="w-4 h-4" />
                  <span>{pokemon.height / 10} m</span>
                </div>
                <span className="text-xs text-gray-500">Height</span>
              </div>
              <div
                className="flex flex-col items-center cursor-pointer transition-all hover:scale-105 active:scale-95"
                onClick={handleUpvote}
              >
                <div className="flex items-center gap-2 text-gray-600 mb-1">
                  <ThumbsUp
                    className={`w-4 h-4 ${
                      voteCount > 0 ? "text-blue-500 fill-blue-500" : ""
                    }`}
                  />
                  <span>{voteCount}</span>
                </div>
                <span className="text-xs text-gray-500">Votes</span>
              </div>
            </div>
          </div>

          {/* Base Stats */}
          <div className="w-full">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Base Stats
            </h3>
            <div className="space-y-3">
              {pokemon.stats.map((stat) => (
                <div key={stat.stat.name} className="flex items-center gap-4">
                  <span className="w-12 text-sm font-medium text-gray-500 uppercase">
                    {stat.stat.name.slice(0, 4)}
                  </span>
                  <span className="w-8 text-sm font-medium text-gray-900">
                    {String(stat.base_stat).padStart(3, "0")}
                  </span>
                  <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500 rounded-full"
                      style={{ width: `${(stat.base_stat / 255) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
