import {StrictMode} from "react";
import { createRoot } from "react-dom/client";
import Home from './pages/Home';
import { BrowserRouter as Router } from 'react-router-dom';
const root = createRoot(document.getElementById("app"))
root.render(<StrictMode><Router><Home/></Router></StrictMode>)