import React, { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'

const Home = lazy(() => import('routes/home'))
const NotFound = lazy(() => import('routes/notFound'))
const Checkout = lazy(() => import('routes/checkout'))
const Receipt = lazy(() => import('routes/receipt'))
const Cart = lazy(() => import('routes/cart'))

function RoutesView() {

  return (
    <Suspense>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/receipt' element={<Receipt />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Suspense>
  )
}

export default RoutesView
