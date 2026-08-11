import { type Country } from "../types/country"

interface CountryInfoProps {
  country: Country
  borderCountries: Country[] | undefined
  onDataSubmit: (data: undefined) => void
}

function CountryInfo({
  country,
  borderCountries,
  onDataSubmit,
}: CountryInfoProps) {
  const sendDataToParent = (country: undefined): void => {
    onDataSubmit(country)
  }

  const extractCurrencies = (): string => {
    const currencies: string[] | undefined = country.currencies?.map(
      (currency) => currency.name,
    )

    if (currencies && currencies.length > 0) {
      return currencies.join(", ")
    }
    return "No official currency"
  }

  const extractLanguages = (): string => {
    const languages: string[] | undefined = country.languages?.map(
      (language) => language.name,
    )

    if (languages && languages.length > 0) {
      return languages.join(", ")
    }

    return "No official language"
  }

  return (
    <div className="px-16 py-10">
      <button
        type="button"
        className="flex items-center gap-2 rounded-md border border-gray-200 bg-white px-6 py-2 text-sm shadow-sm hover:bg-gray-100"
        onClick={() => sendDataToParent(undefined)}
      >
        <span aria-hidden="true">&larr;</span>
        Back
      </button>
      <div className="mt-12 flex flex-col gap-16 md:flex-row md:items-center">
        <div className="w-full md:w-2/5">
          <img
            src={country.flags.png}
            alt={`${country.name} flag`}
            className="w-full object-cover"
          />
        </div>
        <div className="w-full md:w-3/5">
          <h1 className="text-3xl font-extrabold">{country.name}</h1>
          <div className="mt-6 grid grid-cols-1 gap-x-16 gap-y-2 text-sm sm:grid-cols-2">
            <div className="space-y-2">
              <p>
                <span className="font-semibold">Native Name:</span>{" "}
                {country.nativeName}
              </p>
              <p>
                <span className="font-semibold">Population:</span>{" "}
                {country.population.toLocaleString()}
              </p>
              <p>
                <span className="font-semibold">Region:</span> {country.region}
              </p>
              <p>
                <span className="font-semibold">Sub Region:</span>{" "}
                {country.subregion}
              </p>
              <p>
                <span className="font-semibold">Capital:</span>{" "}
                {country.capital}
              </p>
            </div>
            <div className="mt-2 space-y-2 sm:mt-0">
              <p>
                <span className="font-semibold">Top Level Domain:</span>{" "}
                {country.topLevelDomain}
              </p>
              <p>
                <span className="font-semibold">Currencies:</span>{" "}
                {extractCurrencies()}
              </p>
              <p>
                <span className="font-semibold">Languages:</span>{" "}
                {extractLanguages()}
              </p>
            </div>
          </div>
          {borderCountries && borderCountries.length > 0 && (
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <span className="font-semibold">Border Countries:</span>
              {borderCountries.map((border) => (
                <span
                  key={border.alpha3Code}
                  className="rounded border border-gray-200 bg-white px-4 py-1 text-sm shadow-sm"
                >
                  {border.name}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CountryInfo
