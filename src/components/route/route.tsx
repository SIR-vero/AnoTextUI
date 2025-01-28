import React from 'react'
import {
    createBrowserRouter,
    RouterProvider,
    Route,
    Link,
    createRoutesFromElements,
} from "react-router-dom";
import { RecordMessage } from '../record-message/record-message';
import LoginPage from '../login/login';
import { Dashboard } from '../dashboard/dashboard';

interface RouterProps { }

export const RouterComponent: React.FC<RouterProps> = () => {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <>
                <Route path='/' element={<div>Root</div>} />
                <Route path='/record-message/:userUMID' element={<RecordMessage/>} />
                <Route path='/login' element={<LoginPage/>} />
                <Route path='/dashboard' element={<Dashboard/>} />
            </>

        )
    )

    return <RouterProvider router={router} />
}