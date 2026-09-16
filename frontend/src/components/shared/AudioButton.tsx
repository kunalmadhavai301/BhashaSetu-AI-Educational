import React, { useState } from 'react';
import { Volume2, VolumeX, Play, Pause, RotateCcw } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface AudioButtonProps {
  text: string;
  langCode?: string;
  size?: 'sm' | 'md' | 'lg';
  showSpeedControls?: boolean;
}

export const AudioButton: React.FC<AudioButtonProps> = ({
  text,
  langCode = 'hi-IN',
  size = 'md',
  showSpeedControls = true,
}) => {
  const { speakText, accessibility } = useApp();
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentSpeed, setCurrentSpeed] = useState<number>(1.0);

  const handlePlay = (speed: number) => {
    setIsPlaying(true);
    speakText(text, speed, langCode);
    setTimeout(() => {
      setIsPlaying(false);
    }, 2000);
  };

  const sizeClasses = {
    sm: 'px-2 py-1 text-xs gap-1',
    md: 'px-3 py-2 text-sm gap-2',
    lg: 'px-5 py-3 text-base gap-3 font-semibold',
  };

  if (accessibility.silentClassroom) {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full bg-amber-100 text-amber-800 border border-amber-300">
        <VolumeX className="w-3.5 h-3.5" /> Silent Mode Captions
      </span>
    );
  }

  return (
    <div className="inline-flex items-center gap-1.5 flex-wrap">
      <button
        type="button"
        onClick={() => handlePlay(currentSpeed)}
        className={`inline-flex items-center justify-center rounded-xl bg-sal-700 hover:bg-sal-800 active:scale-95 text-white shadow-sm transition-all ${sizeClasses[size]}`}
        title={`Listen in ${langCode} (${currentSpeed}x speed)`}
      >
        {isPlaying ? (
          <>
            <Pause className="w-4 h-4 animate-pulse" /> Playing...
          </>
        ) : (
          <>
            <Volume2 className="w-4 h-4" /> Listen
          </>
        )}
      </button>

      {showSpeedControls && (
        <div className="inline-flex items-center rounded-xl bg-slate-100 p-0.5 border border-slate-200">
          {[0.5, 0.75, 1.0].map((spd) => (
            <button
              key={spd}
              type="button"
              onClick={() => {
                setCurrentSpeed(spd);
                handlePlay(spd);
              }}
              className={`px-2 py-1 text-xs rounded-lg font-medium transition-all ${
                currentSpeed === spd
                  ? 'bg-sal-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-sal-800'
              }`}
            >
              {spd}x
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
