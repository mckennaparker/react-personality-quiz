import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
    return (
        <header>
            <h1 id="title">Which Disney Sidekick Are You?</h1>
            <h4 id="subtitle">(based on completely random things)</h4>
            <Link to="/">Home</Link>
            <Link to="/quiz">Quiz</Link>
        </header>
    )
}