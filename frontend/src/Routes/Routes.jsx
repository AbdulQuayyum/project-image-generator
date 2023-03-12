import React from 'react'
import { Routes, Route } from "react-router-dom"

import { Home, CreatePost } from '../Views/Index'

const MainRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/CreatePost" element={<CreatePost />} />
        </Routes>
    )
}

export default MainRoutes
