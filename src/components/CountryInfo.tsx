import { type Country } from "../types/country"
import { useState } from "react"

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

  const [countrySelected, setCountrySelected] = useState(country)

  const handleChangeCountry = (country: Country): void => {
    setCountrySelected(country)
  }

  const extractCurrencies = (): string => {
    const currencies: string[] | undefined = countrySelected.currencies?.map(
      (currency) => currency.name,
    )

    if (currencies && currencies.length > 0) {
      return currencies.join(", ")
    }
    return "No official currency"
  }

  const extractLanguages = (): string => {
    const languages: string[] | undefined = countrySelected.languages?.map(
      (language) => language.name,
    )

    if (languages && languages.length > 0) {
      return languages.join(", ")
    }

    return "No official language"
  }

  return (
    <div className="bg-[hsl(0,0%,99%)] dark:bg-gray-900 min-h-screen px-4 py-6 sm:px-8 sm:py-8 lg:px-16 lg:py-10 text-gray-900 dark:text-white">
      <button
        type="button"
        className="flex cursor-pointer items-center gap-2 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-6 py-2 text-sm shadow-sm hover:bg-gray-100 dark:hover:bg-gray-700"
        onClick={() => sendDataToParent(undefined)}
      >
        <span aria-hidden="true">&larr;</span>
        Back
      </button>
      <div className="mt-8 flex flex-col gap-8 md:mt-12 md:flex-row md:items-center md:gap-16">
        <div className="w-full md:w-2/5">
          <img
            src={countrySelected.flags.png}
            alt={`${countrySelected.name} flag`}
            className="w-full object-cover"
          />
        </div>
        <div className="w-full md:w-3/5">
          <h1 className="text-2xl font-extrabold sm:text-3xl">
            {countrySelected.name}
          </h1>
          <div className="mt-6 grid grid-cols-1 gap-x-16 gap-y-2 text-sm sm:grid-cols-2">
            <div className="space-y-2">
              <p>
                <span className="font-semibold">Native Name:</span>{" "}
                {countrySelected.nativeName}
              </p>
              <p>
                <span className="font-semibold">Population:</span>{" "}
                {countrySelected.population.toLocaleString()}
              </p>
              <p>
                <span className="font-semibold">Region:</span>{" "}
                {countrySelected.region}
              </p>
              <p>
                <span className="font-semibold">Sub Region:</span>{" "}
                {countrySelected.subregion}
              </p>
              <p>
                <span className="font-semibold">Capital:</span>{" "}
                {countrySelected.capital}
              </p>
            </div>
            <div className="mt-2 space-y-2 sm:mt-0">
              <p>
                <span className="font-semibold">Top Level Domain:</span>{" "}
                {countrySelected.topLevelDomain}
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
                <button
                  onClick={() => handleChangeCountry(border)}
                  key={border.alpha3Code}
                  className="cursor-pointer rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-1 text-sm shadow-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  {border.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CountryInfo
