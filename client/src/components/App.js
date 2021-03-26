import React from 'react';
import {Router, Route} from "react-router-dom";

import Header from "./Header";
import StreamCreate from "./streams/StreamCreate";
import StreamList from "./streams/StreamList";
import StreamEdit from "./streams/StreamEdit";
import StreamDelete from "./streams/StreamDelete";
import StreamShow from "./streams/StreamShow";
import history from "../history";

export default function App() 
{
    return (
        <div className="container">
            <Router history={history}>
                <Header />
                <div>
                    <Route path="/" exact component={StreamList} />
                    <Route path="/stream/new" exact component={StreamCreate} />
                    <Route path="/stream/edit/:id" exact component={StreamEdit} />
                    <Route path="/stream/delete/:id" exact component={StreamDelete} />
                    <Route path="/stream/show/:id" exact component={StreamShow} />
                </div>
            </ Router>
        </div>
    );
}