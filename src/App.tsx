import React from "react";

import { useQuery } from "@tanstack/react-query";
import { gql } from "graphql-request";
import { client } from "./graphql/client";

const containerStyles = {
  display: "flex",
  justifyContent: "center",
  marginTop: "1rem",
};

function App() {
  const { isError, data, error, refetch, isFetching } = useFilms();

  
  return (
    <div className="appContainer">
      
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
