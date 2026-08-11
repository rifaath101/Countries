import data from "../store/data.json"
import { type Country } from "../types/country"
import { useEffect, useState } from "react"
import CountryList from "./CountryList"
import CountryInfo from "./CountryInfo"

function Main() {
  const [countries, setCountries] = useState<Country[]>([])
  const [countrySelected, setCountrySelected] = useState<Country>()

  const handleChildData = (data: Country | undefined) => {
    setCountrySelected(data)
  }

  function getBorderCountries(): Country[] | undefined {
    if (!countrySelected?.borders) {
      return
    }

    const countryBorders = countrySelected?.borders
    const matchingBorderCountries = countries.filter((country) =>
      countryBorders.includes(country.alpha3Code),
    )

    return matchingBorderCountries
  }

  const borderCountries = getBorderCountries()

  async function getCountries(): Promise<Country[] | []> {
    try {
      const result = await new Promise<Country[]>((resolve) => {
        setTimeout(() => {
          resolve(data as Country[])
        }, 500)
      })
      return result
    } catch (error) {
      console.error(error)
      return []
    }
  }

  useEffect(() => {
    async function fetchData() {
      const countries = await getCountries()
      setCountries(countries)
    }
    fetchData()
  }, [])

  return countrySelected ? (
    <CountryInfo
      country={countrySelected}
      borderCountries={borderCountries}
      onDataSubmit={handleChildData}
    />
  ) : countries.length > 1 ? (
    <CountryList countries={countries} onDataSubmit={handleChildData} />
  ) : (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[hsl(0,0%,99%)] text-gray-900 dark:bg-gray-900 dark:text-white">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-blue-500 dark:border-gray-700 dark:border-t-blue-400" />
      <p className="animate-pulse text-sm font-semibold">
        Loading countries...
      </p>
    </div>
  )
}

export default Main
