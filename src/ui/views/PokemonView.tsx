"use client";

import { PokemonSidebar } from "@/ui/components/PokemonSidebar/PokemonSidebar";
import { PokemonDetails } from "@/ui/components/PokemonDetails/PokemonDetails";

export const PokemonView = () => {
  return (
    <div className="flex flex-col md:flex-row overflow-hidden">
      <PokemonSidebar />
      <div className="flex-1 overflow-auto">
        <PokemonDetails />
      </div>
    </div>
  );
};
