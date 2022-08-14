import React from "react";

import { useQuery } from "@tanstack/react-query";
import { gql } from "graphql-request";
import { client } from "./graphql/client";
import { Accordion } from "./components/Accordion";

const containerStyles = {
  display: "flex",
  justifyContent: "center",
  marginTop: "1rem",
};

interface filmProps {
  id: string,
  title: string,
}

function App() {
  const filmList = useFilms();

  
  return (
    <div className="appContainer">
      {filmList.data && (filmList.data.films.map((film:filmProps) => (
      <Accordion title={film.title} key={film.id}>
        <div style={{padding: "1rem 1.5rem"}}>
        </div>
      </Accordion>
    )))}
    </div>
  );
}

function useFilms() {
  return useQuery(
    ["getFilms"],
    async () => {
      const data = await client.request(
        gql`
          query {
            allFilms {
              films {
                id
                title
              }
            }
          }
        `
      );
      return data.allFilms;
    }
  );
}

export default App;
