import React from 'react'

import { Header, Footer } from "../Components/Index"

export default function Layout(props) {
    const { children } = props
    return (
        <>
            <Header />
            <main className="sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]">
                {children}
            </main>
            <Footer />
        </>
    )
}
