import React, { useEffect } from "react";

import { useQuery } from "@tanstack/react-query";
import { gql } from "graphql-request";
import { client } from "./graphql/client";

import { Accordion } from "./components/Accordion";
import { LoadingSpinner } from "./components/LoadingSpinner";
import { Button } from "./components/Button";
import { Table } from "./components/Table";

const containerStyles = {
  display: "flex",
  justifyContent: "center",
  marginTop: "1rem",
};

interface filmDetails {
  id: string,
  title: string,
  planetConnection: planetConnectionDetails,
}

interface planetConnectionDetails {
  planets: Array<planetDetails>,
}

interface planetDetails {
  id: string,
  name: string,
  diameter: number,
  rotationPeriod: number,
  orbitalPeriod : number,
  population: number,
  climates: string | string[],
  surfaceWater: number,
}

function App() {
  const filmList = useFilms();
  
  return (
    <div className="appContainer">
      {filmList.isError && (
      <div style={{padding:"1rem", backgroundColor:"white",borderRadius:"1rem"}}>
        <h4>An error has occured while fetching data.</h4>
        <br></br>
        <Button variant={"error"} onClick={() => (filmList.refetch())}>Try again</Button>
      </div>)}
      {filmList.isFetching && (
      <>
        <span style={{textAlign:"center"}}>Fetching film titles...</span>
        <LoadingSpinner></LoadingSpinner>
      </>)}
      {filmList.data && (filmList.data.films.map((film:filmDetails) => (
      <Accordion title={film.title} key={film.id}>
        <Table data={film.planetConnection.planets} separateHeaderWords={true}></Table>
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
        {
          allFilms {
            films {
              id
              title
              planetConnection {
                planets {
                  id
                  name
                  diameter
                  rotationPeriod
                  orbitalPeriod
                  population
                  climates
                  surfaceWater
                }
              }
            }
          }
        }
        `
      );
      return data.allFilms;
    },
    { enabled: true,
      refetchOnWindowFocus: false }
  );
}

export default App;
