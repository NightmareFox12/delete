import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Educación sustentable" },
    { name: "description", content: "Educación sustentable" },
  ];
}

export default function Home() {
  return <Welcome />;
}
