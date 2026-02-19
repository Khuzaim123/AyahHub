export function HomeIcon({ size = 20, className = '' }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            {/* Roof */}
            <path
                d="M3 11.5L12 3L21 11.5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            {/* House body */}
            <path
                d="M5 10V19.5C5 19.78 5.22 20 5.5 20H9.5V15C9.5 14.17 10.17 13.5 11 13.5H13C13.83 13.5 14.5 14.17 14.5 15V20H18.5C18.78 20 19 19.78 19 19.5V10"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            {/* Decorative crescent on top */}
            <path
                d="M12 3L12.5 1.5"
                stroke="#d4af37"
                strokeWidth="1.2"
                strokeLinecap="round"
            />
            <circle cx="12" cy="1" r="0.5" fill="#d4af37" />
        </svg>
    );
}

export function SearchIcon({ size = 20, className = '' }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            {/* Magnifying glass circle */}
            <circle
                cx="10.5"
                cy="10.5"
                r="7"
                stroke="currentColor"
                strokeWidth="1.8"
            />
            {/* Handle */}
            <path
                d="M15.5 15.5L21 21"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
            />
            {/* Decorative star/sparkle inside lens */}
            <path
                d="M10.5 7V8.5M10.5 12.5V14M7 10.5H8.5M12.5 10.5H14"
                stroke="#d4af37"
                strokeWidth="1"
                strokeLinecap="round"
                opacity="0.7"
            />
            <circle cx="10.5" cy="10.5" r="1" fill="#d4af37" opacity="0.5" />
        </svg>
    );
}
