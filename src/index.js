import ReactDOM from 'react-dom';
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";

import './index.css';
import App from './App';
import AuthStore from "./store/auth-redux";

ReactDOM.render(<BrowserRouter><Provider store={AuthStore}><App/></Provider></BrowserRouter>, document.getElementById('root'));
