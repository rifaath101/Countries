import data from "../store/data.json"
import { type Country } from "../types/country"
import { useEffect, useState } from "react"

function Main() {
  const [countries, setCountries] = useState<Country[]>([])
  const [query, setQuery] = useState("")
  const [regionFilterClicked, setRegionFilterClicked] = useState(false)
  const [regionName, setRegionName] = useState("")

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

  const filterCountries = (): Country[] => {
    if (query) {
      const countriesFilteredByQuery = countries.filter((country) => {
        return country.name.toLowerCase().includes(query.toLowerCase())
      })
      return countriesFilteredByQuery
    }

    if (regionName) {
      const countriesFilteredByRegion = countries.filter((country) => {
        return country.region.toLowerCase().includes(regionName.toLowerCase())
      })
      return countriesFilteredByRegion
    }

    return countries
  }

  const filteredCountries = filterCountries()

  const getRegions = (): string[] => {
    const regions: string[] = []

    for (let i = 0; i < countries.length; i++) {
      if (!regions.includes(countries[i].region)) {
        regions.push(countries[i].region)
      }
    }
    return regions
  }

  const handleRegionClick = (
    event: React.MouseEvent<HTMLInputElement>,
  ): void => {
    setRegionName(event.currentTarget.value)
    setRegionFilterClicked(!regionFilterClicked)
  }

  const regions = getRegions()

  return (
    <main className="bg-[hsl(0,0%,99%)] px-16 py-10">
      <div className="flex justify-between">
        <div className="relative mb-10 max-w-md">
          <svg
            className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            placeholder="Search for a country..."
            className="w-full rounded-lg border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm shadow-md outline-none transition-shadow focus:shadow-lg focus:ring-2 focus:ring-blue-400"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="relative w-56">
          <button
            type="button"
            className={`flex w-full items-center justify-between border border-gray-200 bg-white px-4 py-3 shadow-md ${regionFilterClicked ? "rounded-t-lg" : "rounded-lg"}`}
            onClick={() => setRegionFilterClicked(!regionFilterClicked)}
          >
            <span>{regionName ? regionName : `Filter by Region`}</span>
            <svg
              className={`h-4 w-4 text-gray-400 transition-transform ${regionFilterClicked ? "rotate-180" : ""}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          {regionFilterClicked && (
            <ul className="absolute z-10 -mt-px w-full overflow-hidden rounded-b-lg border border-t-0 border-gray-200 bg-white shadow-md">
              {regions.map((region) => (
                <input
                  key={region}
                  type="button"
                  value={region}
                  className="block w-full cursor-pointer px-4 py-2 text-left hover:bg-gray-100"
                  onClick={handleRegionClick}
                />
              ))}
            </ul>
          )}
        </div>
      </div>

      <ul className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {(query || regionName ? filteredCountries : countries).map(
          (country, index) => {
            return (
              <li key={index}>
                <article className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md transition-shadow hover:shadow-lg">
                  <img
                    src={country.flags.png}
                    alt={`${country.name} flag`}
                    className="h-40 w-full object-cover"
                  />
                  <div className="space-y-3 p-6">
                    <h2 className="text-lg font-extrabold">{country.name}</h2>
                    <div className="flex gap-1 text-sm">
                      <h4 className="font-semibold">Population:</h4>
                      <p>{country.population}</p>
                    </div>
                    <div className="flex gap-1 text-sm">
                      <h4 className="font-semibold">Region:</h4>
                      <p>{country.region}</p>
                    </div>
                    <div className="flex gap-1 text-sm">
                      <h4 className="font-semibold">Capital:</h4>
                      <p>{country.capital}</p>
                    </div>
                  </div>
                </article>
              </li>
            )
          },
        )}
      </ul>
    </main>
  )
}

export default Main
