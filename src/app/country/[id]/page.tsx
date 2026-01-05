import { getAllCountries, getCountryById } from "@/server/db";
import GobackBtn from "@/components/GobackBtn";
import Image from "next/image";
import { notFound } from "next/navigation";

interface Props {
    params: Promise<{ id: string }>
}

export const dynamicParams = false

export async function generateMetadata({ params }: Props) {
    const { id } = await params

    const country = await getCountryById(id)

    if (!country) return { title: 'Country Not Found' }

    return {
        title: `${country.name} - Country Information | World Countries Explorer`,
        description: `Explore detailed information about ${country.name}, including population, capital, languages, and more on World Countries Explorer.`,
        openGraph: {
            images: [country.flags.png]
        }
    }
}

const CountryPage = async ({ params }: Props) => {
    const { id } = await params
    const country = await getCountryById(id)

    if (!country) notFound()

    return (
        <main className="py-10">
            <div className="container">
                <GobackBtn />
            </div>
            <div className="container flex flex-col lg:flex-row gap-10 lg:gap-20 items-center mt-15">
                <Image
                    src={country.flags.svg}
                    alt={country.name}
                    width={450}
                    height={300}
                    className="rounded"
                    priority
                    fetchPriority="high"
                />
                <div className="flex-1">
                    <div className="flex flex-wrap gap-10 items-center [&_span]:text-secondary-text-color">
                        <div>
                            <h1 className="font-bold text-2xl md:text-3xl mb-4">
                                {country.name}
                            </h1>
                            <p>Native Name: <span>{country.nativeName}</span></p>
                            <p>Population: <span>{country.population.toLocaleString()}</span></p>
                            <p>Region: <span>{country.region}</span></p>
                            <p>Sub Region: <span>{country.subregion}</span></p>
                            <p>Capital: <span>{country.capital}</span></p>
                        </div>
                        <div>
                            <p>Top Level Domain: <span>{country.topLevelDomain.join(", ")}</span></p>
                            <p>Currencies <span>{country.currencies.map(currency => currency.name).join(", ")}</span></p>
                            <p>Languages: <span>{country.languages.map(language => language.name).join(", ")}</span></p>
                        </div>
                    </div>
                    <div className="mt-10">
                        <div className="flex flex-wrap gap-2 items-center">
                            Border Countries: 
                            {country.borders.length > 0 ? (
                                country.borders.map(border => (
                                    <span key={border} className="px-3 py-1 rounded bg-secondary-background text-secondary-text-color shadow-md">
                                        {border}
                                    </span>
                                ))
                            ) : (
                                <span className="text-secondary-text-color">No Border Countries</span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export async function generateStaticParams() {
    const countries = await getAllCountries()

    return countries.map((country) => ({
        id: country.id
    }))
}

export default CountryPage;