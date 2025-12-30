import { REGIONS } from "@/constants/regions";
import prisma from "@/lib/prisma"
import { Country } from "@prisma/client"
import { unstable_cache as next_cache } from "next/cache"
import { cache as react_cache } from "react";

export async function getAllCountries(): Promise<Country[]> {
    return await prisma.country.findMany({
        orderBy: {
            name: "asc"
        }
    })
}

export async function getCountriesByRegion(region: Country["region"]): Promise<Country[]> {

    if (!region) {
        throw new Error("Region is required")
    }

    // Captlize the region
    region = region.charAt(0).toUpperCase() + region.slice(1).toLowerCase()

    if (!REGIONS.some(r => r.name === region)) {
        throw new Error("Invalid region")
    }

    if (region === "All") {

        const allCountries = await next_cache(getAllCountries, ["all-countries"])()

        return allCountries

    }
    else {

        const countries = await next_cache(async (): Promise<Country[]> => {

            return await prisma.country.findMany({
                where: { region },
                orderBy: { name: "asc" }
            })

        }, [`${region}-countries`])()

        return countries
    }
}

export const getCountryById = react_cache(async (id: Country["id"]) => {
    return await prisma.country.findUnique({ where: { id } })
})