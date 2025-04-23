export const getTypeStyle = (type: string) => {
  const lowerType = type.toLowerCase();

  switch (lowerType) {
    case "normal":
      return "bg-gray-200 text-gray-800";
    case "fire":
      return "bg-red-200 text-red-800";
    case "water":
      return "bg-blue-200 text-blue-800";
    case "electric":
      return "bg-yellow-200 text-yellow-800";
    case "grass":
      return "bg-green-200 text-green-800";
    case "ice":
      return "bg-cyan-200 text-cyan-800";
    case "fighting":
      return "bg-orange-200 text-orange-800";
    case "poison":
      return "bg-purple-200 text-purple-800";
    case "ground":
      return "bg-amber-200 text-amber-800";
    case "flying":
      return "bg-indigo-200 text-indigo-800";
    case "psychic":
      return "bg-pink-200 text-pink-800";
    case "bug":
      return "bg-lime-200 text-lime-800";
    case "rock":
      return "bg-stone-200 text-stone-800";
    case "ghost":
      return "bg-violet-200 text-violet-800";
    case "dragon":
      return "bg-blue-300 text-blue-900";
    case "dark":
      return "bg-neutral-300 text-neutral-900";
    case "steel":
      return "bg-slate-200 text-slate-800";
    case "fairy":
      return "bg-rose-200 text-rose-800";
    default:
      return "bg-gray-200 text-gray-800";
  }
};
