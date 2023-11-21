
import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Routes, Route } from 'react-router-dom'

import CustomErrorComponent from './components/CustomErrorComponent';
import NotFound from './components/NotFound';
// const NotFound = React.lazy(() => import("./components/NotFound"));

import Layout from './components/Layout';
import AuthLayout from './features/auth/AuthLayout'
import Pricing from './features/landing/pricing'
import Login from './features/auth/Login';
import CustomerMenu from './features/customerMenu';
const Register = React.lazy(() => import("./features/auth/Register"));
const ForgotPassword = React.lazy(() => import("./features/auth/ForgotPassword"));
const ResetPassword = React.lazy(() => import("./features/auth/ResetPassword"));

// protected routes
// import PersistLogin from './features/auth/PersistLogin';
import RequireAuth from './features/auth/RequireAuth';
import { USER_TYPES } from './constants/authConstant';

import DashLayout from './features/dashboard/DashLayout'
import Dashboard from './features/dashboard'

// import Admission from './features/admission'
import Menu from './features/menu'
import Kitchen from './features/kitchen'
import AddStore from './features/kitchen/addStore'
import OnboardingLayout from './features/kitchen/addStore/OnboardingLayout'
import Profile from './features/profile'
import Settings from './features/settings'


function ProjectRoutes() {
  return (
    <React.Suspense fallback={<>Loading...</>}>
      <ErrorBoundary FallbackComponent={CustomErrorComponent}>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* pulic routes */}
          <Route element={<AuthLayout />}>
            <Route index element={<Login />} />
            <Route path="pricing" element={<Pricing />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="reset-password" element={<ResetPassword />} />
          </Route>
          <Route path='menu/:id'>
            <Route index element={<CustomerMenu />} />
          </Route>
          {/* protected routes */}
          <Route element={<RequireAuth allowedRoles={[...Object.values(USER_TYPES)]} />}>
            <Route element={<OnboardingLayout />}>
              <Route path="onboarding">
                <Route index element={<AddStore />} />
              </Route>
            </Route>
              <Route path="dashboard" element={<DashLayout />}> {/* START DASHBOARD ROUTE */}
                <Route index element={<Dashboard />} />
                <Route path='kitchen'>
                  <Route index element={<Kitchen />} />
                </Route>
                <Route path='menu'>
                  <Route index element={<Menu/>} />
                </Route>
                <Route path='profile'>
                  <Route index element={<Profile />} />
                </Route>
                <Route path='settings'>
                  <Route index element={<Settings />} />
                </Route>
              </Route>  {/* END DASHBOARD ROUTE */}
          </Route> {/* END REQUIREAUTH ROUTE */}
          {/* end protected routes */}
        </Route>
        {/* 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ErrorBoundary>
  </React.Suspense>
  )
}

export default ProjectRoutes
