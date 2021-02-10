import React from "react"
import ReactDOM from "react-dom"
import App from "./pages"
import { Provider } from 'react-redux'
import store from "./store"
import { BrowserRouter as Router } from 'react-router-dom'
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
import 'antd/dist/antd.css'
import './utils/firebase'


const RootApp : React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>)
}



ReactDOM.render(<RootApp />, document.querySelector("#root"))
