'use client'

import React, {HTMLProps, useEffect, useState} from "react";
import {MeshGradientRenderer} from "@johnn-e/react-mesh-gradient";

interface BlobBackgroundState {
    sampledHues: number[];
}

export default function BlobBackground({children}: {
    blobCount?: number
} & HTMLProps<HTMLDivElement>)
{
    const [state, setState] = useState<BlobBackgroundState | null>(null);

    const pickNewHues = () => {
        const baseHue = Math.floor(Math.random() * 360);
        const hueStep = 12;
        const analogousHues = Array.from({length: 5}, (_, i) => (baseHue + i * hueStep) % 360);
        setState({sampledHues: analogousHues});
    }

    useEffect(() => { pickNewHues() }, [])

    return (
        <>
            {state && <MeshGradientRenderer className={"vh-100 w-100"} colors={state.sampledHues.map(hue => `hsl(${hue}, 66%, 33%)`)} onGradientClick={pickNewHues} speed={0.005} />}
            {children}
        </>
    )
}