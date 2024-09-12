'use client'

import React, {HTMLProps, useEffect, useState} from "react";
import style from "./style.module.css"

interface ColorScheme {
    scheme: 'Complementary' | 'Analogous' | 'Triadic' | 'Split Complementary' | 'Tetradic' | 'Monochromatic';
    hues?: number[];
}

interface BlobBackgroundState {
    colorScheme: ColorScheme;
    sampledHues: number[];
}

export default function BlobBackground({children, className, blobCount = 5}: {
    blobCount?: number
} & HTMLProps<HTMLDivElement>)
{
    const [state, setState] = useState<BlobBackgroundState | null>(null);

    useEffect(() => {
        // pick random color scheme
        const colorSchemes: ColorScheme[] = [
            { scheme: 'Complementary' },
            { scheme: 'Analogous' },
            { scheme: 'Triadic' },
            { scheme: 'Split Complementary' },
            { scheme: 'Tetradic' },
            { scheme: 'Monochromatic' }
        ];

        const colorScheme = colorSchemes[Math.floor(Math.random() * colorSchemes.length)];

        // generate array of colors based on color scheme
        const baseHue = Math.random() * 360;

        switch (colorScheme.scheme) {
            case 'Complementary':
                colorScheme.hues = [baseHue, baseHue + 180];
                break;
            case 'Analogous':
                colorScheme.hues = [baseHue, baseHue + 30, baseHue + 60];
                break;
            case 'Triadic':
                colorScheme.hues = [baseHue, baseHue + 120, baseHue + 240];
                break;
            case 'Split Complementary':
                colorScheme.hues = [baseHue, baseHue + 150, baseHue + 210];
                break;
            case 'Tetradic':
                colorScheme.hues = [baseHue, baseHue + 90, baseHue + 180, baseHue + 270];
                break;
            case 'Monochromatic':
                colorScheme.hues = [baseHue]
                break;
        }

        // sample 10 colors from array
        const sampledHues = [];
        for (let i = 0; i < blobCount; i++) {
            sampledHues.push(colorScheme.hues[Math.floor(Math.random() * colorScheme.hues.length)]);
        }

        setState({ colorScheme, sampledHues });
    }, [])

    return (
        <>
            <div className={`position-absolute z-n1 h-100 w-100 ${className}`}>
                {state && <svg style={{
                    filter: "blur(72px)",
                }} className={`position-absolute w-100 h-100 ${style.fadeIn}`}>
                    {
                        state.sampledHues.map((hue, i) => {
                            const lightness = state.colorScheme.scheme === 'Monochromatic' ? 50 : Math.random() * 50 + 25;
                            return (<circle key={i} cx={`${Math.random() * 100}%`} cy={`${Math.random() * 100}%`}
                                            r={`${Math.random() * 100 + 72}`}
                                            fill={`hsla(${hue}, 100%, ${lightness}%, 0.75)`}/>)
                        })
                    }
                </svg>}
            </div>
            {children}
        </>
    )
}