import React from 'react';
import './FullHeightImageHeader.css'
import Button from "react-bootstrap/Button";

export default function FullHeightImageHeader(){

    return(
        <header className="img-header">
            <div className="text-block">
                <h1>Start or support something that matters</h1>
                <br />
                <p>Stop wasting valuable time with projects that just isn't you.</p>
                <Button variant="outline-light" href="#">Learn more</Button>
            </div>
        </header>
    )
}