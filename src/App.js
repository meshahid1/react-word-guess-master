import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import GuessWord from './views/words/GuessWord'
import Results from './views/stats/Results'
import NotFound from './views/NotFound'

import { initializeApp } from 'firebase/app'
import { getAnalytics } from "firebase/analytics"

const firebaseConfig = {
    apiKey: 'AIzaSyAJMOjZSY9brMXUuH6MUm0qjtltQzAtsWM',
    authDomain: 'word-guess-cc417.firebaseapp.com',
    projectId: 'word-guess-cc417',
    storageBucket: 'word-guess-cc417.appspot.com',
    messagingSenderId: '780454720655',
    appId: '1:780454720655:web:c9b517ac41e1df73ad6cfa',
    measurementId: 'G-7HW8QXG2G2',
}
const app = initializeApp(firebaseConfig)
getAnalytics(app)

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<GuessWord />} />
                <Route path='/stats' element={<Results />} />
                <Route path='*' element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
