export const Theme = {
    colors: {
        primary: '#0062FF',        // Modern Blue
        secondary: '#00D1FF',      // Cyan
        background: '#F8FAFC',     // Light Gray/White
        surface: '#FFFFFF',        // Pure White
        text: '#1E293B',           // Dark Blueish Gray
        textSecondary: '#64748B',  // Muted Slate
        accent: '#10B981',         // Success Emerald
        danger: '#EF4444',         // Emergency Red
        border: '#E2E8F0',         // Soft Border
        cardGradient: ['#0062FF', '#0047B9'],
        shadowColor: '#000000',
    },
    spacing: {
        xs: 4,
        sm: 8,
        md: 16,
        lg: 24,
        xl: 32,
        xxl: 48,
    },
    radius: {
        sm: 8,
        md: 12,
        lg: 16,
        xl: 24,
        full: 9999,
    },
    typography: {
        h1: { fontSize: 32, fontWeight: '700' as const, color: '#1E293B' },
        h2: { fontSize: 24, fontWeight: '700' as const, color: '#1E293B' },
        h3: { fontSize: 20, fontWeight: '600' as const, color: '#1E293B' },
        body: { fontSize: 16, fontWeight: '400' as const, color: '#1E293B' },
        bodySmall: { fontSize: 14, fontWeight: '400' as const, color: '#64748B' },
        label: { fontSize: 14, fontWeight: '600' as const, color: '#1E293B' },
        button: { fontSize: 16, fontWeight: '600' as const, color: '#FFFFFF' },
    }
};
