import Header from "@/components/Header";
import HueXApp from "@/components/HueXApp";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow p-4 md:p-8">
        <div className="absolute top-0 left-0 w-full h-full bg-grid-white/[0.02] -z-10"></div>
        <HueXApp />
      </main>
    </div>
  );
}
