import { Section } from "../components/Section";
import { Loader } from "../components/Loader";
import { GoBackBtn } from "../components/GoBackBtn";
import { CocktailInfo } from "../components/CocktailInfo";
import { useLocation, useParams } from "react-router-dom";
import { routes } from "../routes";
import { useEffect, useRef, useState } from "react";
import { getCocktailDetail } from "../api/cocktail-service";

export const CocktailDetail = () => {
  const { cocktailId } = useParams();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [cocktail, setCocktail] = useState(null);
  const fromLink = useRef(location.state?.from ?? {pathname: routes.HOME});


  useEffect(() => {
    if (!cocktailId) return;
    setIsLoading(true);

    getCocktailDetail(cocktailId)
      .then((data) => {
        setCocktail(data);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  }, [cocktailId]);


  return (
    <>
      
      {cocktail && (
        <Section>
          <GoBackBtn path={fromLink.current} />
          <CocktailInfo {...cocktail} />
        </Section>
      )}
      {isLoading && <Loader />}
    </>
  );
};
