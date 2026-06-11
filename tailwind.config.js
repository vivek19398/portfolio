/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        void: '#050507',
        charcoal: '#0c0c12',
        panel: '#12121c',
        crimson: { DEFAULT: '#e3344e', dim: '#8f1d30' },
        ember: { DEFAULT: '#f59e0b', dim: '#92590a' },
        voltage: { DEFAULT: '#38bdf8', dim: '#0c4a6e' },
        royal: { DEFAULT: '#a855f7', dim: '#581c87' },
        navy: '#0f172a',
        mist: '#e7e9f2',
        ash: '#9aa0b5',
      },
      fontFamily: {
        display: ['"Cinzel"', 'serif'],
        body: ['"Outfit"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      animation: {
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'float-slow': 'floatSlow 8s ease-in-out infinite',
        shimmer: 'shimmer 2.5s linear infinite',
        'vortex-spin': 'vortexSpin 28s linear infinite',
        'vortex-spin-reverse': 'vortexSpinReverse 20s linear infinite',
        'vortex-spin-fast': 'vortexSpin 12s linear infinite',
        'nebula-drift': 'nebulaDrift 26s ease-in-out infinite',
        'nebula-drift-slow': 'nebulaDrift 38s ease-in-out infinite reverse',
        'scan-y': 'scanY 2.6s ease-in-out infinite',
        'text-sheen': 'textSheen 4.5s ease-in-out infinite',
        'badge-shine': 'badgeShine 3.2s ease-in-out infinite',
        'beam-flow': 'beamFlow 3s linear infinite',
      },
      keyframes: {
        glowPulse: {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        vortexSpin: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        vortexSpinReverse: {
          from: { transform: 'rotate(360deg)' },
          to: { transform: 'rotate(0deg)' },
        },
        nebulaDrift: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0) scale(1)' },
          '50%': { transform: 'translate3d(4vw, -3vh, 0) scale(1.12)' },
        },
        scanY: {
          '0%': { top: '2%', opacity: '0' },
          '12%': { opacity: '1' },
          '88%': { opacity: '1' },
          '100%': { top: '98%', opacity: '0' },
        },
        textSheen: {
          '0%, 100%': { backgroundPosition: '-150% 50%' },
          '60%, 90%': { backgroundPosition: '250% 50%' },
        },
        badgeShine: {
          '0%, 100%': { transform: 'translateX(-130%) skewX(-20deg)' },
          '55%, 95%': { transform: 'translateX(230%) skewX(-20deg)' },
        },
        beamFlow: {
          from: { backgroundPosition: '0 0' },
          to: { backgroundPosition: '0 200%' },
        },
        dataStream: {
          from: { backgroundPosition: '0 0' },
          to: { backgroundPosition: '0 140px' },
        },
      },
      backgroundImage: {
        'hero-radial':
          'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(56,189,248,0.12), transparent), radial-gradient(ellipse 60% 50% at 80% 110%, rgba(227,52,78,0.10), transparent), radial-gradient(ellipse 50% 40% at 10% 90%, rgba(168,85,247,0.10), transparent)',
      },
    },
  },
  plugins: [],
}
