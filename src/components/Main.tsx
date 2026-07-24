import data from "../store/data.json"
import { type Country } from "../types/country"
import { useEffect, useState } from "react"

function Main() {
  const [countries, setCountries] = useState<Country[]>([])

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

  return (
    <div>
      <ul>
        {countries.map((country, index) => {
          return <li key={index}>{country.name}</li>
        })}
      </ul>
    </div>
  )
}

export default Main
