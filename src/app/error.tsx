"use client"

import Link from "next/link"

export default function Error({
    reset
}: {
    reset: () => void
}) {
    return (
        <div className="py-10 container text-center">
            <h1 className="font-bold text-4xl">500</h1>
            <h2 className="font-bold text-3xl my-5">Something Went Wrong</h2>
            <div className="flex gap-5 justify-center font-semibold">
                <button
                    onClick={reset}
                    className="px-6 py-3 bg-secondary-background rounded shadow-md cursor-pointer"
                >
                    Try again
                </button>
                <Link
                    href={"/"}
                    className="px-6 py-3 bg-secondary-background rounded shadow-md cursor-pointer"
                >
                    Go to Home
                </Link>
            </div>
        </div>
    )
}