import React from 'react'

const currentYear = new Date().getFullYear()

function Footer() {
    return (
        <footer className="bottom-0 w-full font-bold text-center text-gray-700 transition-all duration-1000 py-11 dark:text-gray-400">
            {currentYear} &#169; Abdul-Quayyum Alao, All rights reserved
        </footer>
    )
}

export default Footer