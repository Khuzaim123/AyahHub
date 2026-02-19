export default function Logo({ size = 40, className = '' }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 120 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            {/* Golden Rays */}
            <g opacity="0.9">
                <rect x="58" y="12" width="3.5" height="28" rx="1.75" fill="#d4af37" transform="rotate(0, 60, 40)" />
                <rect x="58" y="12" width="3.5" height="28" rx="1.75" fill="#d4af37" transform="rotate(-20, 60, 40)" />
                <rect x="58" y="12" width="3.5" height="28" rx="1.75" fill="#d4af37" transform="rotate(-40, 60, 40)" />
                <rect x="58" y="12" width="3.5" height="28" rx="1.75" fill="#d4af37" transform="rotate(20, 60, 40)" />
                <rect x="58" y="12" width="3.5" height="28" rx="1.75" fill="#d4af37" transform="rotate(40, 60, 40)" />
            </g>

            {/* Left Page */}
            <path
                d="M18 42 L18 92 Q18 96 22 96 L56 96 L56 38 Q56 36 54 36 L22 36 Q18 36 18 42Z"
                fill="#0f4d3a"
                stroke="#1a6b50"
                strokeWidth="1"
            />

            {/* Right Page */}
            <path
                d="M64 38 L64 96 L98 96 Q102 96 102 92 L102 42 Q102 36 98 36 L66 36 Q64 36 64 38Z"
                fill="#0f4d3a"
                stroke="#1a6b50"
                strokeWidth="1"
            />

            {/* Book Spine / Center */}
            <path
                d="M56 38 Q60 42 64 38 L64 96 Q60 100 56 96Z"
                fill="#0a3d2e"
                stroke="#1a6b50"
                strokeWidth="0.5"
            />

            {/* Page edges - left */}
            <path
                d="M20 93 L56 93 L56 96 Q56 97 55 97 L21 97 Q20 97 20 96Z"
                fill="#e8e0d0"
                opacity="0.6"
            />

            {/* Page edges - right */}
            <path
                d="M64 93 L100 93 L100 96 Q100 97 99 97 L65 97 Q64 97 64 96Z"
                fill="#e8e0d0"
                opacity="0.6"
            />

            {/* Islamic Geometric Pattern on Left Page */}
            <g transform="translate(26, 50)" stroke="#d4af37" strokeWidth="1.5" fill="none">
                {/* Outer square rotated 45deg (diamond) */}
                <rect x="2" y="2" width="22" height="22" rx="1" />
                {/* Inner rotated square */}
                <rect x="5.5" y="5.5" width="15" height="15" rx="1" transform="rotate(45, 13, 13)" />
                {/* Center octagon / star shape */}
                <circle cx="13" cy="13" r="4" />
                {/* Corner connectors */}
                <line x1="2" y1="13" x2="5" y2="13" />
                <line x1="21" y1="13" x2="24" y2="13" />
                <line x1="13" y1="2" x2="13" y2="5" />
                <line x1="13" y1="21" x2="13" y2="24" />
            </g>

            {/* Crescent Moon on Right Page */}
            <g transform="translate(73, 52)">
                <path
                    d="M12 0 A10 10 0 1 0 12 20 A7 7 0 1 1 12 0Z"
                    fill="#d4af37"
                />
            </g>

            {/* Gold Base Line */}
            <rect x="22" y="100" width="76" height="3" rx="1.5" fill="#d4af37" opacity="0.8" />

            {/* Subtle inner glow on pages */}
            <path
                d="M22 40 L52 40 L52 90 L22 90Z"
                fill="url(#leftPageGlow)"
                opacity="0.08"
            />
            <path
                d="M68 40 L98 40 L98 90 L68 90Z"
                fill="url(#rightPageGlow)"
                opacity="0.08"
            />

            <defs>
                <linearGradient id="leftPageGlow" x1="22" y1="40" x2="52" y2="90">
                    <stop offset="0%" stopColor="#d4af37" />
                    <stop offset="100%" stopColor="transparent" />
                </linearGradient>
                <linearGradient id="rightPageGlow" x1="98" y1="40" x2="68" y2="90">
                    <stop offset="0%" stopColor="#d4af37" />
                    <stop offset="100%" stopColor="transparent" />
                </linearGradient>
            </defs>
        </svg>
    );
}
