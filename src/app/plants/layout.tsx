import Navigation from "@/components/Navigation/Navigation";

export default function PlantsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navigation />
      {children}
    </>
  );
}
