import data from "../store/data.json"
import { type Country } from "../types/country"
import { useEffect, useState } from "react"
import CountryList from "./CountryList"
import CountryInfo from "./CountryInfo"

function Main() {
  const [countries, setCountries] = useState<Country[]>([])
  const [countrySelected, setCountrySelected] = useState(false)

  const handleChildData = (data: boolean) => {
    setCountrySelected(data)
  }

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
    <CountryInfo />
  ) : (
    <CountryList countries={countries} onDataSubmit={handleChildData} />
  )
}

export default Main
