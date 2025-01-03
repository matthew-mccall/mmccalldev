export const defaultFontFeatures = ["ss01", "ss03", "cv11"]
export const FontFeaturesToCSSString = (features: string[]) => "'" + features.join("','") + "'";