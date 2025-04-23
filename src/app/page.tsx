import { PokemonView } from "@/ui/views/PokemonView";
import { Footer } from "@/ui/components/Footer/Footer";

export default async function Home() {
  return (
    <main className="min-h-screen m-0 p-0">
      <PokemonView />
      <Footer />
    </main>
  );
}
