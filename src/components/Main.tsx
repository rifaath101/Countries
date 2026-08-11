import data from "../store/data.json"
import { type Country } from "../types/country"
import { useEffect, useState } from "react"
import CountryList from "./CountryList"
import CountryInfo from "./CountryInfo"

function Main() {
  const [countries, setCountries] = useState<Country[]>([])
  const [countrySelected, setCountrySelected] = useState<Country>()

  const handleChildData = (data: Country) => {
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
    <CountryInfo country={countrySelected} borderCountries={borderCountries} />
  ) : (
    <CountryList countries={countries} onDataSubmit={handleChildData} />
  )
}

export default Main
