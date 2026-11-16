import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { LandingPage } from "../views/LandingPage";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DELUX — Transforme objetivos em progresso" },
      {
        name: "description",
        content:
          "Transforme sonhos em objetivos, planos em rotina e rotina em progresso. Por R$ 29,90, em um único pagamento, você garante acesso vitalício ao Delux.",
      },
      { property: "og:title", content: "DELUX — Transforme objetivos em progresso" },
      {
        property: "og:description",
        content:
          "Transforme sonhos em objetivos, planos em rotina e rotina em progresso. Acesso vitalício ao Delux.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const navigate = useNavigate();
  return <LandingPage onNavigateApp={() => navigate({ to: "/app" })} />;
}
