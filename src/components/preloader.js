import React, { useEffect } from "react";
import "../components/preloader.css";
import { preLoaderAnim } from '../Animation';

const Preloader = () => {
    useEffect(() => {
        preLoaderAnim();
    }, []);

    return (
        <div className="preloader">
            <div className="texts-container">
                <span>Eat,</span>
                <span>Heaalthy,</span>
                <span>Healthy</span>
            </div>
        </div>
    );
};

export default Preloader;
