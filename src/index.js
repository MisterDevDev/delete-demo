import React from "react";
import ReactDOM from "react-dom";
import App from './App'

const { render } = ReactDOM 
const appId =  document.getElementById('app')

render(<App />, appId)