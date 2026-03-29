'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { useVerseData } from './useVerseData';

declare global {
  interface Window { YT: any; onYouTubeIframeAPIReady: () => void; }
}

const START = 1829;

export default function PurusasukthamClient() {
  const { data, error } = useVerseData(['sanskrit', 'tamil', 'telugu']);
  const [showTelugu, setShowTelugu]     = useState(false);
  const [hideSanskrit, setHideSanskrit] = useState(false);
  const [hideLang2, setHideLang2]       = useState(false);
  const playerRef  = useRef<any>(null);
  const loopingRef = useRef(false);

  const initPlayer = () => {
    playerRef.current = new window.YT.Player('yt-player', {
      height: '135', width: '240',
      videoId: '0tE7v_dwZR8',
      playerVars: { start: START, end: 2240, autoplay: 0 },
      events: {
        onStateChange: (e: any) => {
          if (e.data === window.YT.PlayerState.ENDED && loopingRef.current) {
            playerRef.current.seekTo(START, true);
            playerRef.current.playVideo();
          }
        },
      },
    });
  };

  const loadPlayer = () => {
    if (window.YT?.Player) { initPlayer(); return; }
    window.onYouTubeIframeAPIReady = initPlayer;
    if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.head.appendChild(tag);
    }
  };

  // Load player once on mount via ref callback
  const playerDivRef = (el: HTMLDivElement | null) => { if (el) loadPlayer(); };

  const playOnce = () => { loopingRef.current = false; playerRef.current?.seekTo(START, true); playerRef.current?.playVideo(); };
  const playLoop = () => { loopingRef.current = true;  playerRef.current?.seekTo(START, true); playerRef.current?.playVideo(); };

  const lang2 = showTelugu ? data.telugu : data.tamil;
  const lang2Label = showTelugu ? 'Telugu' : 'Tamil';
  const len = Math.max(data.sanskrit.length, lang2.length);

  if (error) return <p>Error loading content: {error}</p>;

  return (
    <>
      <div style={{ marginBottom: 12, fontSize: '0.9em' }}>
        <Link href="/purusasuktham/sanskrit">Sanskrit</Link>
        {' · '}
        <Link href="/purusasuktham/tamil">Tamil</Link>
        {' · '}
        <Link href="/purusasuktham/telugu">Telugu</Link>
      </div>

      <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start', flexWrap: 'wrap' }}>
        <div style={{ flexShrink: 0, width: 240 }}>
          <div ref={playerDivRef}>
            <div id="yt-player" />
          </div>
          <div style={{ marginTop: 8, display: 'flex', gap: 6 }}>
            <button onClick={playOnce}>Play Once</button>
            <button onClick={playLoop}>Loop</button>
          </div>
        </div>

        <div style={{ flex: 1, minWidth: 280 }}>
          <div style={{ marginBottom: 8, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            <button onClick={() => setHideSanskrit(h => !h)}>
              {hideSanskrit ? 'Show Sanskrit' : 'Hide Sanskrit'}
            </button>
            <button onClick={() => setHideLang2(h => !h)}>
              {hideLang2 ? `Show ${lang2Label}` : `Hide ${lang2Label}`}
            </button>
            <button onClick={() => setShowTelugu(t => !t)}>
              {showTelugu ? 'Show Tamil' : 'Show Telugu'}
            </button>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ borderCollapse: 'collapse', width: '100%', fontSize: '0.95em' }}>
              <thead>
                <tr>
                  {!hideSanskrit && <th style={{ textAlign: 'left', padding: '4px 10px', borderBottom: '2px solid #888' }}>Sanskrit</th>}
                  {!hideLang2   && <th style={{ textAlign: 'left', padding: '4px 10px', borderBottom: '2px solid #888' }}>{lang2Label}</th>}
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: len }, (_, i) => (
                  <tr key={i}>
                    {!hideSanskrit && <td style={{ padding: '3px 10px', verticalAlign: 'top', whiteSpace: 'pre-wrap' }}>{data.sanskrit[i] ?? ''}</td>}
                    {!hideLang2   && <td style={{ padding: '3px 10px', verticalAlign: 'top', whiteSpace: 'pre-wrap' }}>{lang2[i] ?? ''}</td>}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
