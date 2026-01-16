// Theme utility classes for consistent dark mode styling
export const themeClasses = {
  // Backgrounds
  background: {
    primary: (isDark) => isDark ? "bg-gray-900" : "bg-white",
    secondary: (isDark) => isDark ? "bg-gray-800" : "bg-gray-50",
    tertiary: (isDark) => isDark ? "bg-gray-700" : "bg-gray-100",
    card: (isDark) => isDark ? "bg-gray-800" : "bg-white",
  },

  // Text colors
  text: {
    primary: (isDark) => isDark ? "text-white" : "text-gray-900",
    secondary: (isDark) => isDark ? "text-gray-300" : "text-gray-600",
    tertiary: (isDark) => isDark ? "text-gray-400" : "text-gray-500",
    light: (isDark) => isDark ? "text-gray-200" : "text-gray-700",
  },

  // Borders and dividers
  border: {
    primary: (isDark) => isDark ? "border-gray-700" : "border-gray-200",
    secondary: (isDark) => isDark ? "border-gray-600" : "border-gray-100",
  },

  // Cards and containers
  card: (isDark) => isDark 
    ? "bg-gray-800 border border-gray-700 text-white" 
    : "bg-white border border-gray-200 text-gray-900",

  // Inputs and forms
  input: (isDark) => isDark
    ? "bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
    : "bg-white border border-gray-300 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500",

  // Buttons
  button: {
    primary: (isDark) => isDark
      ? "bg-blue-600 text-white hover:bg-blue-700"
      : "bg-blue-600 text-white hover:bg-blue-700",
    secondary: (isDark) => isDark
      ? "bg-gray-700 text-white hover:bg-gray-600 border border-gray-600"
      : "bg-gray-100 text-gray-900 hover:bg-gray-200 border border-gray-300",
  },

  // Modals and overlays
  modal: (isDark) => isDark
    ? "bg-gray-800 border border-gray-700"
    : "bg-white border border-gray-200",

  // Badge and tags
  badge: (isDark) => isDark
    ? "bg-gray-700 text-gray-200"
    : "bg-gray-100 text-gray-800",
};
