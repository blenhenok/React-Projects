import React, { useState, useEffect } from 'react';

function RandomColor() {
    const [colortype, setColortype] = useState("hex");
    const [color, setColor] = useState("#000000");

    function colorutility(length) {
        return Math.floor(Math.random() * length);
    }

    function handleHexColor() {
        const hex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F'];
        let hexColor = "#";
        for (let i = 0; i < 6; i++) {
            hexColor += hex[colorutility(hex.length)];
        }
        setColor(hexColor);
    }

    function handleRgbColor() {
        const r = colorutility(256);
        const g = colorutility(256);
        const b = colorutility(256);
        setColor(`rgb(${r}, ${g}, ${b})`);
    }

    useEffect(() => {
        // Automatically generate color based on selected colortype
        if (colortype === "rgb") handleRgbColor();
        else handleHexColor();
    }, [colortype]);

    return (
        <div className="randomColor" style={{ backgroundColor: color }}>
            <h1>{color}</h1>
            <button onClick={() => setColortype('hex')}>Hex Color</button>
            <button onClick={() => setColortype('rgb')}>RGB Color</button>
            <button onClick={colortype === 'hex' ? handleHexColor : handleRgbColor}>
                Generate Color
            </button>

            <div>
                <h3>{colortype === "rgb" ? "RGB Color" : "HEX Color"}</h3>
            </div>
        </div>
    );
}

export default RandomColor;
