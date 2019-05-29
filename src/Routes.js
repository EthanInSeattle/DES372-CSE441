import React from 'react';
import { Route } from 'react-router-dom';

import HomePage from './client/HomePage';
import CreatePage from './client/CreatePage';
import ResultPageGreen from './client/ResultPageGreen';
import ResultPageRed from './client/ResultPageRed';

const Routes = () => {
    return(
        <>
        
            <Route
                exact
                path='/'
                // render={()=>{
                //     <HomePage/>
                // }}
                component={HomePage}
            />
            <Route
                exact
                path='/home'
                // render={()=>{
                //     <HomePage/>
                // }}
                component={HomePage}
            />
            <Route
                exact
                path='/questions'
                // render={()=>{
                //     <CreatePage/>
                // }}
                component={CreatePage}
            />
            <Route
                exact
                path='/result/green'
                component={ResultPageGreen}
                // render={()=>{
                //         <ResultPage
                //             bgColor="#000000"
                //         />
                //     }}
            />
            <Route
                exact
                path='/result/red'
                component={ResultPageRed}
                // render={()=>{
                //         <ResultPage
                //             bgColor="#000000"
                //         />
                //     }}
            />
        </>
    );
};

export default Routes;