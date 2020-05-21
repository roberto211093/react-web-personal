import React from 'react';
import {DatePicker} from 'antd';
import './App.scss';
import * as moment from 'moment';
import 'moment/locale/es';
import Admin from './pages/Admin';
import SignIn from "./pages/Admin/SignIn";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import LayoutAdmin from "./Layouts/LayoutAdmin";

const onChange = (date, dateString) => {
    console.log(date, dateString);
    const x = moment(date).locale('es');
    console.log(x.format('lll'));
    console.log(x.format('LLLL'));
}

function App() {
    return (
        <div className="App">
            <LayoutAdmin />
            <h1>Web Personal - Client</h1>
            <h2>Proyecto</h2>
            <DatePicker onChange={onChange}/>
            <Admin hey="hey hey hey"/>
            <SignIn hi="hola"/>
            <Home/>
            <Contact/>
        </div>
    );
}

export default App;
