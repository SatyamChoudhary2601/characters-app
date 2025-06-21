import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useGetAllCharacters } from "../hooks/useCharacter";
import { z } from "zod";
import Button from "../components/Button";
import CharacterTable from "../components/CharacterTable";
import Loader from "../components/Loader";
import { useState } from "react";
import Input from "../components/Input";
import Pagination from "../components/Pagination";

export const Route = createFileRoute("/")({
  validateSearch: z.object({
    page: z.number().catch(1),
    name: z.string().optional().catch(""),
  }),
  component: Home,
});

function Home() {
  const { page, name } = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });
  const [searchTerm, setSearchTerm] = useState(name || "");

  const { data, isFetching, refetch } = useGetAllCharacters(page, name);

  const handleSearch = () => {
    navigate({ search: { page: 1, name: searchTerm } });
  };
  if (isFetching) return <Loader />;
  const handleRowClick = (id: number) => {
    navigate({ to: `/character/${id}` });
  };
  const resetHandler = () => {
    setSearchTerm("");
    navigate({ search: { page: 1 } });
  };
  return (
    <div style={{ minWidth: "400px", overflowX: "scroll" }}>
      <div className="action-section">
        <Button onClick={() => refetch()}>Refresh</Button>
        <div className="action-search">
          <Input
            type="text"
            placeholder="Search charaters..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            reset={resetHandler}
          />
          <Button style={{ width: 100 }} onClick={handleSearch}>
            Search
          </Button>
        </div>
      </div>

      <CharacterTable
        data={data ? data?.results : []}
        onRowClick={handleRowClick}
      />

      <Pagination
        currentPage={page}
        totalPages={data?.info?.pages || 1}
        onPageChange={(p) => navigate({ search: { page: p, name } })}
      />
    </div>
  );
}
