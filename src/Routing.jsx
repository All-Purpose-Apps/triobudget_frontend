
import { Routes, Route } from 'react-router-dom';
import EntryPoint from './pages/EntryPoint';

export default function Routing() {

    return (
        <div>
            <Routes>
                <Route path="/" element={<EntryPoint />} />
            </Routes></div>
    )
}
