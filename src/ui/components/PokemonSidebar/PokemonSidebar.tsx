import { useEffect, useRef, useState } from "react";
import { getPokemonList, getPokemonDetails } from "@/services/pokemonApi";
import { Pokemon } from "@/types/pokemon";
import { getOffestFromUrl } from "@/utils/service.utils";
import { Loader2, ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/context/hooks";
import { setPokemonId } from "@/context/pokemonSlice";
import { cn } from "@/lib/utils";

export const PokemonSidebar = () => {
  const [displayedPokemon, setDisplayedPokemon] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [nextUrl, setNextUrl] = useState<string | null>(null);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const selectedPokemonId = useAppSelector((state) => state.pokemon.pokemonId);

  const fetchPokemon = async (offset: number = 0) => {
    try {
      const pokemonList = await getPokemonList(offset);
      const pokemonDetails = await Promise.all(
        pokemonList.results.map((pokemon) => getPokemonDetails(pokemon.name))
      );

      setDisplayedPokemon((prev) =>
        offset === 0 ? pokemonDetails : [...prev, ...pokemonDetails]
      );
      setNextUrl(pokemonList.next);
    } catch (error) {
      console.error("Error fetching Pokemon:", error);
    } finally {
      setIsLoading(false);
      setIsLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchPokemon();
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      if (isLoadingMore || !nextUrl) return;

      const { scrollTop, scrollHeight, clientHeight } = container;
      if (scrollHeight - scrollTop <= clientHeight * 1.5) {
        setIsLoadingMore(true);
        const nextOffset = getOffestFromUrl(nextUrl);
        if (nextOffset !== null) {
          fetchPokemon(nextOffset);
        }
      }
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [isLoadingMore, nextUrl]);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-white" />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "w-full md:w-72",
        !isCollapsed ? "h-16 md:h-screen" : "h-[50vh] md:h-screen",
        "bg-red-600 text-white p-6 overflow-hidden flex flex-col rounded-b-lg md:rounded-r-lg md:rounded-bl-none transition-all duration-300"
      )}
    >
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <Image src="/svg/pokeball.svg" alt="Pokedex" width={30} height={30} />
          <h2 className="text-2xl font-bold ml-2">Pokedex</h2>
        </div>
        <div className="cursor-pointer md:hidden" onClick={toggleCollapse}>
          {!isCollapsed ? (
            <ChevronDown className="w-6 h-6" />
          ) : (
            <ChevronUp className="w-6 h-6" />
          )}
        </div>
      </div>

      <div
        ref={containerRef}
        className={cn(
          "flex-1 overflow-y-auto",
          !isCollapsed && "hidden md:block"
        )}
      >
        <ul className="space-y-2">
          {displayedPokemon.map((poke) => (
            <li
              key={poke.id}
              className={`p-3 rounded-lg cursor-pointer transition-all duration-200 flex items-center space-x-3 ${
                selectedPokemonId === poke.id
                  ? "bg-red-700 shadow-lg"
                  : "hover:bg-red-700"
              }`}
              onClick={() => {
                dispatch(setPokemonId(poke.id));
                setIsCollapsed(false);
              }}
            >
              <Image
                src={poke.sprites.front_default}
                alt={poke.name}
                width={50}
                height={50}
                className="object-contain"
              />
              <span className="capitalize font-medium">{poke.name}</span>
            </li>
          ))}
        </ul>
        {isLoadingMore && (
          <div className="flex justify-center py-4">
            <Loader2 className="w-6 h-6 animate-spin text-white" />
          </div>
        )}
      </div>
    </div>
  );
};
