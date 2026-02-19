import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AudioPlayer({ src, reciter }) {
    const audioRef = useRef(null);
    const progressRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [volume, setVolume] = useState(0.8);
    const [showVolume, setShowVolume] = useState(false);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const onLoadedMetadata = () => {
            setDuration(audio.duration);
            setIsLoading(false);
        };
        const onTimeUpdate = () => setCurrentTime(audio.currentTime);
        const onEnded = () => setIsPlaying(false);
        const onWaiting = () => setIsLoading(true);
        const onCanPlay = () => setIsLoading(false);

        audio.addEventListener('loadedmetadata', onLoadedMetadata);
        audio.addEventListener('timeupdate', onTimeUpdate);
        audio.addEventListener('ended', onEnded);
        audio.addEventListener('waiting', onWaiting);
        audio.addEventListener('canplay', onCanPlay);

        return () => {
            audio.removeEventListener('loadedmetadata', onLoadedMetadata);
            audio.removeEventListener('timeupdate', onTimeUpdate);
            audio.removeEventListener('ended', onEnded);
            audio.removeEventListener('waiting', onWaiting);
            audio.removeEventListener('canplay', onCanPlay);
        };
    }, []);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    }, [volume]);

    const togglePlay = useCallback(async () => {
        const audio = audioRef.current;
        if (!audio) return;

        if (isPlaying || isLoading) {
            audio.pause();
            setIsPlaying(false);
            setIsLoading(false);
        } else {
            // Only show loader if audio hasn't buffered yet
            if (audio.readyState < 3) {
                setIsLoading(true);
            }
            try {
                await audio.play();
                setIsPlaying(true);
                setIsLoading(false);
            } catch {
                setIsLoading(false);
            }
        }
    }, [isPlaying, isLoading]);

    const handleProgressClick = (e) => {
        const rect = progressRef.current.getBoundingClientRect();
        const pos = (e.clientX - rect.left) / rect.width;
        const newTime = pos * duration;
        audioRef.current.currentTime = newTime;
        setCurrentTime(newTime);
    };

    const formatTime = (seconds) => {
        if (!seconds || isNaN(seconds)) return '0:00';
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

    return (
        <div className="glass-card rounded-xl p-4 group/player hover:border-gold-400/20 transition-all duration-300">
            <audio ref={audioRef} src={src} preload="none" />

            {/* Reciter Name */}
            <p className="text-white/50 text-xs font-medium mb-3 tracking-wide">{reciter}</p>

            <div className="flex items-center gap-3">
                {/* Play/Pause Button */}
                <button
                    onClick={togglePlay}
                    className="w-9 h-9 flex-shrink-0 rounded-full flex items-center justify-center bg-gradient-to-br from-gold-400/20 to-gold-400/5 border border-gold-400/25 hover:from-gold-400/30 hover:border-gold-400/40 transition-all duration-300 group/btn"
                >
                    {isLoading ? (
                        <div className="w-4 h-4 border-2 border-gold-400/20 border-t-gold-400 rounded-full animate-spin" />
                    ) : isPlaying ? (
                        <svg className="w-4 h-4 text-gold-400" fill="currentColor" viewBox="0 0 24 24">
                            <rect x="6" y="4" width="4" height="16" rx="1" />
                            <rect x="14" y="4" width="4" height="16" rx="1" />
                        </svg>
                    ) : (
                        <svg className="w-4 h-4 text-gold-400 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5.14v14l11-7-11-7z" />
                        </svg>
                    )}
                </button>

                {/* Time + Progress */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2.5">
                        {/* Current Time */}
                        <span className="text-[11px] text-gold-400/60 font-mono w-9 text-right flex-shrink-0">
                            {formatTime(currentTime)}
                        </span>

                        {/* Progress Bar */}
                        <div
                            ref={progressRef}
                            onClick={handleProgressClick}
                            className="flex-1 h-7 flex items-center cursor-pointer group/progress"
                        >
                            <div className="w-full h-1 rounded-full bg-white/8 relative overflow-hidden group-hover/progress:h-1.5 transition-all duration-200">
                                {/* Buffered background */}
                                <div className="absolute inset-0 bg-white/5 rounded-full" />
                                {/* Progress fill */}
                                <motion.div
                                    className="absolute top-0 left-0 h-full rounded-full bg-gradient-to-r from-gold-400/70 to-gold-400"
                                    style={{ width: `${progress}%` }}
                                    transition={{ duration: 0.1 }}
                                />
                                {/* Thumb */}
                                <motion.div
                                    className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-gold-400 shadow-lg shadow-gold-400/30 opacity-0 group-hover/progress:opacity-100 transition-opacity duration-200"
                                    style={{ left: `calc(${progress}% - 5px)` }}
                                />
                            </div>
                        </div>

                        {/* Duration */}
                        <span className="text-[11px] text-white/25 font-mono w-9 flex-shrink-0">
                            {formatTime(duration)}
                        </span>
                    </div>
                </div>

                {/* Volume Control */}
                <div className="relative flex-shrink-0">
                    <button
                        onClick={() => setShowVolume(!showVolume)}
                        className="w-7 h-7 flex items-center justify-center rounded-lg text-white/30 hover:text-gold-400/70 transition-colors duration-200"
                    >
                        {volume === 0 ? (
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                            </svg>
                        ) : (
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.536 8.464a5 5 0 010 7.072M18.364 5.636a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                            </svg>
                        )}
                    </button>

                    <AnimatePresence>
                        {showVolume && (
                            <motion.div
                                initial={{ opacity: 0, y: 4, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 4, scale: 0.95 }}
                                transition={{ duration: 0.15 }}
                                className="absolute bottom-full right-0 mb-2 glass-card rounded-lg p-3 shadow-xl shadow-black/30"
                            >
                                <input
                                    type="range"
                                    min="0"
                                    max="1"
                                    step="0.05"
                                    value={volume}
                                    onChange={(e) => setVolume(parseFloat(e.target.value))}
                                    className="volume-slider w-20 h-1 appearance-none bg-white/10 rounded-full outline-none cursor-pointer"
                                    style={{
                                        background: `linear-gradient(to right, #d4af37 ${volume * 100}%, rgba(255,255,255,0.1) ${volume * 100}%)`,
                                    }}
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
