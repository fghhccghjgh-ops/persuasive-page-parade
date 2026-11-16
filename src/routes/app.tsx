import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { DeluxAppPage } from "../views/DeluxAppPage";

export const Route = createFileRoute("/app")({
  head: () => ({
    meta: [
      { title: "Aplicativo DELUX — Seus objetivos em missões" },
      {
        name: "description",
        content:
          "Crie objetivos, receba missões semanais e adapte sua rotina quando perder um dia ou tiver menos tempo.",
      },
      { property: "og:title", content: "Aplicativo DELUX — Seus objetivos em missões" },
      {
        property: "og:description",
        content: "Objetivos divididos em etapas, missões e rotina que se adapta ao seu tempo.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AppRoute,
});

function AppRoute() {
  const navigate = useNavigate();
  return <DeluxAppPage onNavigateHome={() => navigate({ to: "/" })} />;
}
