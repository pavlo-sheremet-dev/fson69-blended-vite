import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";

import { SearchForm } from "../components/SearchForm";
import { Section } from "../components/Section";
import { CocktailsList } from "../components/CocktailsList";
import { Loader } from "../components/Loader";
import { searchByName } from "../api/cocktail-service";

export const Cocktails = () => {
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [cocktails, setCocktails] = useState([]);
  const query = searchParams.get("query");

  useEffect(() => {
    if (!query) return;
    setIsLoading(true);

    searchByName(query)
      .then((data) => {
        setCocktails(data);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  }, [query]);

  return (
    <>
      <Section>
        <h1 className="uppercase text-4xl text-gray-600 text-center">
          Search Cocktails
        </h1>

        <SearchForm />
        {!!cocktails.length && <CocktailsList cocktails={cocktails} />}
      </Section>
      {isLoading && <Loader />}
    </>
  );
};
