import React from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'

// import {Route} from 'react-router-dom/Route';
// import {Switch} from 'react-router-dom/Switch';


import { NavBar } from '../components'
import { MoviesList, MoviesInsert, MoviesUpdate } from '../pages'

import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
    return (
        <HashRouter>
            <NavBar />
            <Switch>
                <Route path="/movies/list" exact component={MoviesList} />
                <Route path="/movies/create" exact component={MoviesInsert} />
                <Route
                    path="/movies/update/:id"
                    exact
                    component={MoviesUpdate}
                />
            </Switch>
        </HashRouter>
    )
}

export default App