/**
 * AUDIOPHILE DESIGN SYSTEM
 * 
 * This design system provides a comprehensive set of tokens, components, and guidelines
 * for building consistent and beautiful user interfaces across the Audiophile e-commerce platform.
 */

// ============================================================================
// COLOR PALETTE
// ============================================================================

export const colors = {
  // Primary Brand Color
  primary: {
    DEFAULT: '#D87D4A', // hsl(22 65% 57%)
    light: '#FBAF85',   // Hover state
    dark: '#C5683C',    // Active state
    foreground: '#FFFFFF'
  },

  // Neutral Colors
  neutral: {
    dark: '#191919',    // hsl(0 0% 10%) - Dark backgrounds
    light: '#F1F1F1',   // hsl(0 0% 95%) - Light backgrounds
    white: '#FFFFFF',   // hsl(0 0% 100%)
    black: '#000000',   // hsl(0 0% 0%)
    gray: {
      50: '#FAFAFA',
      100: '#F7F7F7',
      150: '#F1F1F1',
      200: '#EBEBEB',
      300: '#D4D4D4',
      400: '#B8B8B8',
      500: '#A0A0A0',
      600: '#7A7A7A',
      700: '#5A5A5A',
      800: '#3A3A3A',
      900: '#2A2A2A',
    }
  },

  // Semantic Colors
  semantic: {
    success: '#22C55E',   // Success states
    warning: '#F59E0B',   // Warning states
    error: '#EF4444',     // Error states
    info: '#3B82F6',      // Info states
  },

  // Background & Surface
  background: {
    primary: '#FAFAFA',   // Main background
    secondary: '#F1F1F1', // Secondary surface
    tertiary: '#FFFFFF',  // Tertiary surface
    dark: '#0F172A',      // Dark mode background
  },

  // Border & Input
  border: '#E4E4E7',
  input: '#E4E4E7',
  ring: '#D87D4A',
};

// ============================================================================
// TYPOGRAPHY
// ============================================================================

export const typography = {
  // Font Family
  fontFamily: {
    primary: '"Manrope", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    mono: 'Menlo, Monaco, Courier New, monospace',
  },

  // Heading Styles
  headings: {
    h1: {
      fontSize: '56px',
      fontWeight: 700,
      lineHeight: '58px',
      letterSpacing: '1.3px',
      textTransform: 'uppercase',
    },
    h2: {
      fontSize: '40px',
      fontWeight: 700,
      lineHeight: '44px',
      letterSpacing: '1px',
      textTransform: 'uppercase',
    },
    h3: {
      fontSize: '32px',
      fontWeight: 700,
      lineHeight: '36px',
      letterSpacing: '1.15px',
      textTransform: 'uppercase',
    },
    h4: {
      fontSize: '28px',
      fontWeight: 700,
      lineHeight: '38px',
      letterSpacing: '2px',
      textTransform: 'uppercase',
    },
    h5: {
      fontSize: '24px',
      fontWeight: 700,
      lineHeight: '33px',
      letterSpacing: '1.7px',
      textTransform: 'uppercase',
    },
    h6: {
      fontSize: '18px',
      fontWeight: 700,
      lineHeight: '24px',
      letterSpacing: '1.3px',
      textTransform: 'uppercase',
    },
  },

  // Body Text Styles
  body: {
    largeRegular: {
      fontSize: '18px',
      fontWeight: 500,
      lineHeight: '25px',
      letterSpacing: '0px',
    },
    largeBold: {
      fontSize: '18px',
      fontWeight: 700,
      lineHeight: '25px',
      letterSpacing: '0px',
    },
    regularRegular: {
      fontSize: '15px',
      fontWeight: 500,
      lineHeight: '25px',
      letterSpacing: '0px',
    },
    regularBold: {
      fontSize: '15px',
      fontWeight: 700,
      lineHeight: '25px',
      letterSpacing: '0px',
    },
    smallRegular: {
      fontSize: '13px',
      fontWeight: 500,
      lineHeight: '17px',
      letterSpacing: '0px',
    },
    smallBold: {
      fontSize: '13px',
      fontWeight: 700,
      lineHeight: '17px',
      letterSpacing: '0px',
    },
  },

  // Label Styles
  labels: {
    default: {
      fontSize: '12px',
      fontWeight: 700,
      lineHeight: '16px',
      letterSpacing: '1px',
      textTransform: 'uppercase',
    },
    secondary: {
      fontSize: '12px',
      fontWeight: 500,
      lineHeight: '16px',
      letterSpacing: '0px',
    },
  },
};

// ============================================================================
// SPACING SCALE
// ============================================================================

export const spacing = {
  // Core spacing scale
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  '2xl': '48px',
  '3xl': '64px',
  '4xl': '80px',
  '5xl': '96px',
  '6xl': '128px',

  // Semantic spacing
  section: '80px',      // Space between major sections
  component: '24px',    // Space between components
  element: '16px',      // Space between elements
  tight: '8px',         // Tight spacing
  relaxed: '32px',      // Relaxed spacing
};

// ============================================================================
// BORDER RADIUS
// ============================================================================

export const borderRadius = {
  none: '0',
  xs: '2px',
  sm: '4px',
  md: '8px',
  lg: '12px',
  xl: '16px',
  full: '9999px',
};

// ============================================================================
// SHADOWS
// ============================================================================

export const shadows = {
  none: 'none',
  xs: '0px 4px 8px -1px rgba(0, 0, 0, 0.05)',
  sm: '0px 4px 8px -1px rgba(0, 0, 0, 0.10), 0px 1px 2px -2px rgba(0, 0, 0, 0.10)',
  md: '0px 4px 8px -1px rgba(0, 0, 0, 0.10), 0px 2px 4px -2px rgba(0, 0, 0, 0.10)',
  lg: '0px 4px 8px -1px rgba(0, 0, 0, 0.10), 0px 4px 6px -2px rgba(0, 0, 0, 0.10)',
  xl: '0px 4px 8px -1px rgba(0, 0, 0, 0.10), 0px 8px 10px -2px rgba(0, 0, 0, 0.10)',
  '2xl': '0px 4px 8px -1px rgba(0, 0, 0, 0.25)',
};

// ============================================================================
// TRANSITIONS & ANIMATIONS
// ============================================================================

export const transitions = {
  base: '0.3s ease-in-out',
  fast: '0.15s ease-out',
  slow: '0.5s ease-out',
};

export const animations = {
  fadeIn: 'fade-in 0.5s ease-out',
  slideUp: 'slide-up 0.5s ease-out',
  accordionDown: 'accordion-down 0.2s ease-out',
  accordionUp: 'accordion-up 0.2s ease-out',
};

// ============================================================================
// Z-INDEX SCALE
// ============================================================================

export const zIndex = {
  auto: 'auto',
  base: 0,
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modal: 1040,
  popover: 1050,
  tooltip: 1060,
};

// ============================================================================
// COMPONENT SIZES
// ============================================================================

export const componentSizes = {
  button: {
    sm: {
      height: '32px',
      padding: '0 12px',
      fontSize: '12px',
    },
    md: {
      height: '36px',
      padding: '0 16px',
      fontSize: '13px',
    },
    lg: {
      height: '48px',
      padding: '0 32px',
      fontSize: '15px',
    },
  },

  input: {
    sm: {
      height: '32px',
      padding: '8px 12px',
      fontSize: '12px',
    },
    md: {
      height: '40px',
      padding: '10px 14px',
      fontSize: '13px',
    },
    lg: {
      height: '48px',
      padding: '12px 16px',
      fontSize: '15px',
    },
  },

  card: {
    sm: {
      padding: '16px',
      borderRadius: '8px',
    },
    md: {
      padding: '24px',
      borderRadius: '12px',
    },
    lg: {
      padding: '32px',
      borderRadius: '16px',
    },
  },
};

// ============================================================================
// BREAKPOINTS
// ============================================================================

export const breakpoints = {
  mobile: '320px',      // 320px - small phones
  tablet: '640px',      // 640px - tablets
  desktop: '1024px',    // 1024px - desktop
  wide: '1280px',       // 1280px - wide desktop
  ultraWide: '1536px',  // 1536px - ultra-wide screens
};

// ============================================================================
// RESPONSIVE PATTERNS
// ============================================================================

export const responsive = {
  container: {
    // Mobile: full width with padding
    mobile: {
      display: 'block',
      paddingLeft: '24px',
      paddingRight: '24px',
    },
    // Tablet: centered with padding
    tablet: {
      maxWidth: '640px',
      marginLeft: 'auto',
      marginRight: 'auto',
      paddingLeft: '40px',
      paddingRight: '40px',
    },
    // Desktop: full-width container
    desktop: {
      maxWidth: '1440px',
      marginLeft: 'auto',
      marginRight: 'auto',
      paddingLeft: '165px',
      paddingRight: '165px',
    },
  },

  grid: {
    mobile: 'grid-cols-1',
    tablet: 'grid-cols-2 md:grid-cols-3',
    desktop: 'grid-cols-4',
  },
};

// ============================================================================
// FOCUS STATES & ACCESSIBILITY
// ============================================================================

export const accessibility = {
  focus: {
    outline: '2px solid transparent',
    outlineOffset: '2px',
    boxShadow: '0 0 0 2px #FFFFFF, 0 0 0 4px #D87D4A',
  },

  // Motion preferences
  prefersReducedMotion: {
    transition: 'none',
    animation: 'none',
  },
};

// ============================================================================
// USAGE EXAMPLES
// ============================================================================

/**
 * DESIGN SYSTEM USAGE GUIDE
 * 
 * 1. COLOR USAGE:
 *    - Use colors.primary for CTAs and interactive elements
 *    - Use colors.neutral for backgrounds and text
 *    - Use colors.semantic for status indicators
 * 
 * 2. TYPOGRAPHY:
 *    - Always use semantic heading levels (h1-h6) from typography.headings
 *    - Use typography.body for body text content
 *    - Use typography.labels for form labels and tags
 * 
 * 3. SPACING:
 *    - Use the spacing scale for consistent margins and padding
 *    - section: 80px between major content sections
 *    - component: 24px between distinct components
 *    - element: 16px between UI elements
 * 
 * 4. RESPONSIVE DESIGN:
 *    - Mobile-first approach
 *    - Use responsive.container for layout containers
 *    - Use responsive.grid for grid layouts
 * 
 * 5. COMPONENTS:
 *    - All UI components should reference componentSizes
 *    - Follow zIndex scale for layering
 *    - Apply accessibility.focus to interactive elements
 * 
 * EXAMPLE: Creating a Button Component
 * 
 * ```
 * const Button = ({ size = 'md', variant = 'primary', ...props }) => (
 *   <button
 *     style={{
 *       ...componentSizes.button[size],
 *       backgroundColor: variant === 'primary' ? colors.primary.DEFAULT : colors.neutral.light,
 *       color: variant === 'primary' ? colors.primary.foreground : colors.neutral.dark,
 *       fontFamily: typography.fontFamily.primary,
 *       borderRadius: borderRadius.lg,
 *       transition: transitions.base,
 *       ...accessibility.focus,
 *     }}
 *     {...props}
 *   />
 * )
 * ```
 */
