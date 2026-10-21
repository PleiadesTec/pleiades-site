import { useEffect, useState } from 'react';
import { Pause, Play } from 'lucide-react';
import Particles from './react-bits/Particles';
import { Button } from './ui/button';

const LIGHT_COLORS = ['#86C6EF', '#17374E', '#94A8B8'];
const DARK_COLORS = ['#86C6EF', '#E4F1FA', '#829CAD'];

interface Preferences {
  dark: boolean;
  mobile: boolean;
  reduce: boolean;
  finePointer: boolean;
  pixelRatio: number;
}

export default function HeroParticles() {
  const [preferences, setPreferences] = useState<Preferences | null>(null);
  const [userPaused, setUserPaused] = useState(false);

  useEffect(() => {
    const dark = window.matchMedia('(prefers-color-scheme: dark)');
    const mobile = window.matchMedia('(width < 48rem)');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    const media = [dark, mobile, reduce, finePointer];
    const update = () => {
      const pixelRatio = Math.min(window.devicePixelRatio || 1, mobile.matches ? 1 : 1.5);
      setPreferences(previous => {
        if (previous && previous.dark === dark.matches && previous.mobile === mobile.matches && previous.reduce === reduce.matches && previous.finePointer === finePointer.matches && previous.pixelRatio === pixelRatio) return previous;
        return { dark: dark.matches, mobile: mobile.matches, reduce: reduce.matches, finePointer: finePointer.matches, pixelRatio };
      });
    };
    update();
    media.forEach(query => query.addEventListener('change', update));
    window.addEventListener('resize', update);
    return () => {
      media.forEach(query => query.removeEventListener('change', update));
      window.removeEventListener('resize', update);
    };
  }, []);

  if (!preferences) return null;

  return (
    <>
      <div className="hero-particle-layer" aria-hidden="true">
        <Particles
          key={preferences.reduce ? 'reduced' : 'animated'}
          particleCount={preferences.mobile ? 96 : 240}
          pixelRatio={preferences.pixelRatio}
          particleSpread={10}
          cameraDistance={20}
          speed={0.08}
          particleBaseSize={100}
          sizeRandomness={1}
          particleHoverFactor={preferences.mobile ? 0 : 0.2}
          moveParticlesOnHover={!preferences.mobile && preferences.finePointer && !preferences.reduce}
          glow={0.2}
          twinkle={0.08}
          alphaParticles
          intro={false}
          connections={false}
          clickBurst={false}
          depthOfField={0}
          hoverEffect="parallax"
          shape="circle"
          variation={0}
          particleColors={preferences.dark ? DARK_COLORS : LIGHT_COLORS}
          lightMode={!preferences.dark}
          opacity={preferences.dark ? 0.85 : 0.65}
          paused={preferences.reduce || userPaused}
        />
      </div>
      {!preferences.reduce && (
        <Button className="hero-animation-control" variant="ghost" size="icon" aria-label={userPaused ? '播放背景动画' : '暂停背景动画'} onClick={() => setUserPaused(paused => !paused)}>
          {userPaused ? <Play className="size-5" aria-hidden="true" /> : <Pause className="size-5" aria-hidden="true" />}
        </Button>
      )}
    </>
  );
}
