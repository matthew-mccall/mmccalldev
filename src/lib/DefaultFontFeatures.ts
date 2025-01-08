export const defaultFontFeatures = ["ss01", "ss07", "ss08", "cv11"]
export const FontFeaturesToCSSString = (features: string[]) => "'" + features.join("','") + "'";