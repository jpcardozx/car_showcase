import { fetchCars } from "@/utils";
import { fuels, yearsOfProduction } from "@/constants";
import { CarCard, SearchBar, CustomFilter, Hero, ShowMore } from "@/components";
import { getSearchParam, getNumberParam } from '@/utils/index';

export default async function Home({ searchParams }: any) {

  const manufacturer = searchParams.manufacturer || "";
  const year = parseInt(searchParams.year as string ?? '2022');
  const fuel = searchParams.fuel || "";
  const limit = parseInt(searchParams.limit as string ?? '10');
  const model = searchParams.model || "";

  const allCars = await fetchCars({
    manufacturer: getSearchParam(searchParams.manufacturer),
    year: getNumberParam(searchParams.year, 2022),
    fuel: getSearchParam(searchParams.fuel),
    model: getSearchParam(searchParams.model),
    limit: getNumberParam(searchParams.limit, 10),
  });

  const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars;

  return (
    <main className="overflow-hidden">
      <Hero />

      <div className="mt-12 padding-x padding-y max-width" id="discover">
        <div className="home__text-container">
          <h1 className="text-4xl font-extrabold">Car Catalogue</h1>
          <p>Explore our cars you might like</p>
        </div>

        <div className="home__filters">
          <SearchBar />

          <div className="home__filter-container">
            <CustomFilter title="fuel" options={fuels} />
            <CustomFilter title="year" options={yearsOfProduction} />
          </div>
        </div>

        {!isDataEmpty ? (
          <section>
            <div className="home__cars-wrapper">
              {allCars?.map((car) => (
                <CarCard car={car} />
              ))}
            </div>
            <ShowMore
              pageNumber={(searchParams.limit || 10) / 10}
              isNext={(searchParams.limit || 10) > allCars.length}
            />
          </section>
        ) : (
          <div className="home__error-container">
            <h2 className="text-black text-xl font-bold">Oops, no results</h2>
            <p>{allCars?.message}</p>
          </div>
        )}
      </div>
    </main>
  );
}
