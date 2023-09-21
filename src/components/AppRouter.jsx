import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import About from '../pages/About';
import Posts from '../pages/Posts';
import Error from '../pages/Error';
import PostIdPage from '../pages/PostIdPage';
import Login from '../pages/Login';
import { publicRoutes, privateRoutes } from '../router';
import { AuthContext } from '../context';
import Loader from './UI/Loader/Loader';

const AppRouter = () => {
    const {isAuth, isLoading} = useContext(AuthContext);

    if (isLoading) {
        return <Loader />
    }

    return (
        isAuth 
            ?
            <Routes>
                {privateRoutes.map(route => 
                    <Route 
                        path={route.path} 
                        element={<route.component />}
                        exact={route.exact}
                        key={route.path}
                    />
                )}
                <Route path="/*" element={<Navigate to="/posts" replace />} />
            </Routes> 
            :
            <Routes> 
                {publicRoutes.map(route => 
                    <Route 
                        path={route.path} 
                        element={<route.component />}
                        exact={route.exact}
                        key={route.path}
                    />
                )}
                <Route path="/*" element={<Navigate to="/login" replace />} />
            </Routes>
    );
};

export default AppRouter;