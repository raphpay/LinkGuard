import Screen from "../../business-logic/enums/Screen";
import Header from "../components/Header";
import PricinSection from "../components/PricingSection";

export default function Pricing() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-white px-4 py-20 pt-32 flex flex-col items-center justify-center">
        <section className="py-16 px-4 max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-10">Nos Offres</h2>
          <PricinSection screen={Screen.pricing} />
        </section>
      </main>
    </>
  );
}
