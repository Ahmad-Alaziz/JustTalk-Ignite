import { Platform } from "react-native"

// Import custom Geist fonts

// Add other font styles as needed

export const customFontsToLoad = {
  GeistBlack: require("../../assets/fonts/Geist/Geist-Black.otf"),
  GeistBold: require("../../assets/fonts/Geist/Geist-Bold.otf"),
  GeistLight: require("../../assets/fonts/Geist/Geist-Light.otf"),
  GeistMedium: require("../../assets/fonts/Geist/Geist-Medium.otf"),
  GeistRegular: require("../../assets/fonts/Geist/Geist-Regular.otf"),
  GeistSemiBold: require("../../assets/fonts/Geist/Geist-SemiBold.otf"),
  GeistThin: require("../../assets/fonts/Geist/Geist-Thin.otf"),
  GeistUltraBlack: require("../../assets/fonts/Geist/Geist-UltraBlack.otf"),
  GeistUltraLight: require("../../assets/fonts/Geist/Geist-UltraLight.otf"),
  GeistMono: require("../../assets/fonts/Geist/GeistMono-Regular.otf"),
}

const fonts = {
  geist: {
    black: "GeistBlack",
    bold: "GeistBold",
    light: "GeistLight",
    medium: "GeistMedium",
    regular: "GeistRegular",
    semiBold: "GeistSemiBold",
    thin: "GeistThin",
    ultraBlack: "GeistUltraBlack",
    ultraLight: "GeistUltraLight",
  },
  monospace: {
    normal: "GeistMono",
  },
  helveticaNeue: {
    // iOS only font.
    thin: "HelveticaNeue-Thin",
    light: "HelveticaNeue-Light",
    normal: "Helvetica Neue",
    medium: "HelveticaNeue-Medium",
  },
  sansSerif: {
    // Android only font.
    thin: "sans-serif-thin",
    light: "sans-serif-light",
    normal: "sans-serif",
    medium: "sans-serif-medium",
  },
}

export const typography = {
  /**
   * The fonts are available to use, but prefer using the semantic name.
   */
  fonts,
  /**
   * The primary font. Used in most places.
   */
  primary: fonts.geist,
  /**
   * An alternate secondary font.
   */
  secondary: Platform.select({
    ios: fonts.helveticaNeue,
    android: fonts.sansSerif,
  }),
  /**
   * Lets get fancy with a monospace font!
   */
  code: fonts.monospace,
}
