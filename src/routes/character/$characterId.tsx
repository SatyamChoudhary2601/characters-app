import { createFileRoute, useRouterState } from "@tanstack/react-router";
import { fetchCharacterById } from "../../api/client";
import styles from "./index.module.css";
import Loader from "../../components/Loader";

export const Route = createFileRoute("/character/$characterId")({
  loader: async ({ params }) => {
    return fetchCharacterById(params.characterId);
  },
  component: CharacterDetailPage,
});

function CharacterDetailPage() {
  const character = Route.useLoaderData();
  const isLoading = useRouterState({
    select: (s) => s.status === "pending",
  });
  if (isLoading) return <Loader />;
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <img src={character.image} alt={character.name} loading="lazy" />
      </div>
      <div className={styles.details}>
        <h2>Character Detail: {character.name}</h2>
        <div className={styles.info}>
          <Card
            title="Status"
            value={character.status}
            bgColor="rgb(255, 0, 0, 0.2)"
          />
          <Card
            title="Species"
            value={character.species}
            bgColor="rgb(0, 255, 0, 0.2)"
          />
          <Card
            title="Origin"
            value={character.origin.name}
            bgColor="rgb(0, 0, 255, 0.2)"
          />
        </div>
      </div>
    </div>
  );
}
type CardProps = {
  title: string;
  value: string;
  bgColor: string;
};
const Card = (props: CardProps) => {
  const { title, value, bgColor } = props;
  return (
    <div className={styles.card} style={{ backgroundColor: bgColor }}>
      <p>{title}</p>
      <h3>{value}</h3>
    </div>
  );
};
