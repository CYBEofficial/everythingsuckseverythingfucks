'use client';

import { useState, useEffect } from 'react';

interface GifStyle {
  type: string;
  width: number;
  height: number;
  top: number;
  left: number;
  zIndex: number;
  rotate: number;
  scale: number;
  opacity: number;
  animationDelay: number;
  animationDuration: number;
}

export default function Home() {
  const [showPopup, setShowPopup] = useState(false);
  const [currentGif, setCurrentGif] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const [visitorNumber, setVisitorNumber] = useState(123456);
  const [gifStyles, setGifStyles] = useState<GifStyle[]>([]);
  const [chaosCounter, setChaosCounter] = useState(0);
  const [autoplayEnabled, setAutoplayEnabled] = useState(false);
  const [showEnterOverlay, setShowEnterOverlay] = useState(true);

  // Array of terrible local GIFs from your assets folder
  const gifs = [
    `./assets/creeping-video-game.gif`,
    `./assets/bioware-mass-effect.gif`,
    `./assets/да-конечно.gif`,
    `./assets/6P4G4_O1GI095KVU3C9.gif`,
    `./assets/vsgif_com__.2872463.gif`,
    `./assets/pigeon-ai-pigeon-brainrot.gif`,
    `./assets/dusku.gif`,
    `./assets/tenor.gif`,
    `./assets/yaya-alien.gif`,
    `./assets/xd-horses.gif`,
    `./assets/bCAlveo.gif`,
    `./assets/weird-trippy.gif`,
    `./assets/fish-wtf.gif`,
    `./assets/sticker_2.gif`,
    `./assets/image0 (1).gif`,
    `./assets/vsgif_com__.2877797.gif`,
    `./assets/fish.gif`,
    `./assets/TVo9.gif`,
    `./assets/4f8W.gif`,
    `./assets/6kVieam.gif`,
    `./assets/Gw0uu9eWsAA3jbX.gif`,
    `./assets/boa-tarde.gif`,
    `./assets/bp7.gif`,
    `./assets/brainrot-nerve-burst.gif`,
    `./assets/ekoi-ekoi-dancekid.gif`,
    `./assets/fetrt.gif`,
    `./assets/formg.gif`,
    `./assets/george-carlin-content-aware-scaling.gif`,
    `./assets/gif.gif`,
    `./assets/giphy.gif`,
    `./assets/glitch-crazy.gif`,
    `./assets/heavy-rain-game-glitch.gif`,
    `./assets/horse.gif`,
    `./assets/locked-in-alien-alien.gif`,
    `./assets/pigeon-lebron.gif`,
    `./assets/pigeon-tired.gif`,
    `./assets/puffer-fish.gif`,
    `./assets/rat-dance.gif`,
    `./assets/rock-wwe.gif`,
    `./assets/shiteyanyo-speen.gif`,
    `./assets/spongebob-spongebob-meme.gif`,
    `./assets/thumbs-up.gif`,
    `./assets/tumblr_p3kgnuboc41wvuif9o1_500.gif`,
    `./assets/vacuate.gif`,
    `./assets/vsgif_com_d-sanic-running-slowly_.3493758.gif`,
    `./assets/vsgif_com_sanic-slaps-a-person_.3494570.gif`,
    `./assets/xd-meme.gif`,
  ];

  const streamingLinks = [
    { name: '🎵 DEEZER SUCKS', url: 'https://soundcloud.com/billain/esef', color: '#ff6600' },
    { name: '🔥 SPOTIFY SUCKS', url: 'https://soundcloud.com/billain/esef', color: '#ff0066' },
    { name: '💿 YOUTUBE SUCKS', url: 'https://soundcloud.com/billain/esef', color: '#6600ff' },
    { name: '🎧 APPLE MUSIC SUCKS', url: 'https://soundcloud.com/billain/esef', color: '#00ff66' },
    { name: '🌟 EXCLUSIVE TRACKS SUCK', url: 'https://soundcloud.com/billain/esef', color: '#ffff00' },
    { name: '🚀 SPACE MUSIC SUCKS', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', color: '#00ffff' },
  ];

  // Handle client-side hydration
  useEffect(() => {
    setIsClient(true);
    setVisitorNumber(Math.floor(Math.random() * 999999));
    // Trigger initial chaos for full GIF display
    setChaosCounter(1);
  }, []);

  // Timer-based chaos trigger - runs every 3 seconds
  useEffect(() => {
    if (!isClient) return;
    
    const chaosInterval = setInterval(() => {
      // Randomly change the current GIF and trigger chaos
      const randomGifIndex = Math.floor(Math.random() * gifs.length);
      setCurrentGif(randomGifIndex);
      setChaosCounter(prev => prev + 1);
      console.log('🎨 Auto-chaos triggered! GIF repositioning...');
    }, 3000); // Every 3 seconds

    return () => clearInterval(chaosInterval);
  }, [isClient, gifs.length]);

  // Function to handle entering the site with autoplay - SIMPLIFIED APPROACH
  const handleEnterSite = () => {
    setAutoplayEnabled(true);
    setShowEnterOverlay(false);
    
    console.log('🔥 USER CLICKED ENTER - AUTOPLAY ENABLED! 🔥');
    console.log('📱 Device check:', {
      userAgent: navigator.userAgent,
      isMobile: /iPhone|iPad|iPod|Android/i.test(navigator.userAgent),
      platform: navigator.platform,
      touchSupport: 'ontouchstart' in window
    });
    
    // SINGLE autoplay attempt during the user gesture - no multiple calls
    const audioElements = document.querySelectorAll('audio');
    const iframes = document.querySelectorAll('iframe');
    
    console.log(`🎵 Found ${audioElements.length} audio elements, ${iframes.length} iframes`);
    
    // Try HTML5 audio immediately
    audioElements.forEach((audio, index) => {
      audio.volume = 0.9;
      audio.currentTime = 0;
      audio.play()
        .then(() => console.log(`✅ Audio ${index} started successfully`))
        .catch(e => console.log(`❌ Audio ${index} failed:`, e.message));
    });
    
    // Single SoundCloud iframe reload with autoplay
    iframes.forEach((iframe, index) => {
      if (iframe.src.includes('soundcloud')) {
        console.log(`🎵 Processing SoundCloud iframe ${index} - ONE TIME ONLY`);
        
        // Force complete iframe reload with autoplay - ONCE
        const originalSrc = iframe.src;
        iframe.src = '';
        
        setTimeout(() => {
          const newSrc = originalSrc.replace('auto_play=false', 'auto_play=true');
          iframe.src = newSrc;
          console.log('🎵 SoundCloud iframe reloaded with autoplay - DONE');
          
          // Send a few play commands but don't reload again
          setTimeout(() => {
            iframe.contentWindow?.postMessage({cmd: 'play'}, 'https://w.soundcloud.com');
            console.log('🎵 Widget play command sent');
          }, 1000);
          
          setTimeout(() => {
            iframe.contentWindow?.postMessage({cmd: 'play'}, 'https://w.soundcloud.com');
            console.log('🎵 Widget play command sent (retry)');
          }, 2000);
          
        }, 200);
      }
    });
  };

  // Generate GIF styles when chaos counter changes  
  useEffect(() => {
    if (!isClient) return;
    
    // Seeded random function for consistent hydration
    const seededRandom = (seed: number) => {
      const x = Math.sin(seed) * 10000;
      return x - Math.floor(x);
    };

    // Generate consistent random values for GIFs, but change them when chaosCounter changes
    const getRandomValue = (index: number, min: number, max: number) => {
      return seededRandom(index + 1 + chaosCounter * 1000) * (max - min) + min;
    };
    
    // Pre-generate all GIF styles to avoid hydration mismatches
    const allStyles = [];
    
    // Desktop GIFs (35) - increased from 25 for more initial chaos
    for (let i = 0; i < 35; i++) {
      allStyles.push({
        type: 'desktop',
        width: Math.floor(getRandomValue(i * 4, 30, 150)),
        height: Math.floor(getRandomValue(i * 4 + 1, 30, 150)),
        top: Math.floor(getRandomValue(i * 4 + 2, 0, 100)),
        left: Math.floor(getRandomValue(i * 4 + 3, 0, 100)),
        zIndex: Math.floor(getRandomValue(i * 4 + 4, 1, 5)),
        rotate: Math.floor(getRandomValue(i * 4 + 5, 0, 360)),
        scale: Number(getRandomValue(i * 4 + 6, 0.4, 1.4).toFixed(3)),
        opacity: Number(getRandomValue(i * 4 + 7, 0.4, 0.8).toFixed(3)), // Higher initial opacity
        animationDelay: Number(getRandomValue(i * 4 + 8, 0, 3).toFixed(3)),
        animationDuration: Number(getRandomValue(i * 4 + 9, 1, 3).toFixed(3)),
      });
    }
    
    // Mobile GIFs (12) - increased from 8
    for (let i = 0; i < 12; i++) {
      allStyles.push({
        type: 'mobile',
        width: Math.floor(getRandomValue(i * 8 + 100, 20, 80)),
        height: Math.floor(getRandomValue(i * 8 + 101, 20, 80)),
        top: Math.floor(getRandomValue(i * 8 + 102, 0, 100)),
        left: Math.floor(getRandomValue(i * 8 + 103, 0, 100)),
        zIndex: Math.floor(getRandomValue(i * 8 + 104, 1, 2)),
        rotate: Math.floor(getRandomValue(i * 8 + 105, 0, 360)),
        scale: Number(getRandomValue(i * 8 + 106, 0.3, 0.8).toFixed(3)),
        opacity: Number(getRandomValue(i * 8 + 107, 0.3, 0.6).toFixed(3)), // Higher initial opacity
        animationDelay: Number(getRandomValue(i * 8 + 108, 0, 4).toFixed(3)),
        animationDuration: Number(getRandomValue(i * 8 + 109, 1.5, 3.5).toFixed(3)),
      });
    }
    
    // Small GIFs (25) - increased from 20
    for (let i = 0; i < 25; i++) {
      allStyles.push({
        type: 'small',
        width: Math.floor(getRandomValue(i * 10 + 200, 15, 85)),
        height: Math.floor(getRandomValue(i * 10 + 201, 15, 85)),
        top: Math.floor(getRandomValue(i * 10 + 202, 0, 100)),
        left: Math.floor(getRandomValue(i * 10 + 203, 0, 100)),
        zIndex: Math.floor(getRandomValue(i * 10 + 204, 1, 4)),
        rotate: Math.floor(getRandomValue(i * 10 + 205, 0, 360)),
        scale: Number(getRandomValue(i * 10 + 206, 0.3, 1.1).toFixed(3)),
        opacity: Number(getRandomValue(i * 10 + 207, 0.3, 0.7).toFixed(3)), // Higher initial opacity
        animationDelay: Number(getRandomValue(i * 10 + 208, 0, 4).toFixed(3)),
        animationDuration: Number(getRandomValue(i * 10 + 209, 0.8, 2.8).toFixed(3)),
      });
    }
    
    // Spinning GIFs (20) - increased from 15
    for (let i = 0; i < 20; i++) {
      allStyles.push({
        type: 'spin',
        width: Math.floor(getRandomValue(i * 12 + 300, 20, 100)),
        height: Math.floor(getRandomValue(i * 12 + 301, 20, 100)),
        top: Math.floor(getRandomValue(i * 12 + 302, 0, 100)),
        left: Math.floor(getRandomValue(i * 12 + 303, 0, 100)),
        zIndex: Math.floor(getRandomValue(i * 12 + 304, 1, 3)),
        rotate: Math.floor(getRandomValue(i * 12 + 305, 0, 360)),
        scale: Number(getRandomValue(i * 12 + 306, 0.4, 1.2).toFixed(3)),
        opacity: Number(getRandomValue(i * 12 + 307, 0.3, 0.8).toFixed(3)), // Higher initial opacity
        animationDelay: Number(getRandomValue(i * 12 + 308, 0, 2).toFixed(3)),
        animationDuration: Number(getRandomValue(i * 12 + 309, 1, 3).toFixed(3)),
      });
    }
    
    setGifStyles(allStyles);
  }, [chaosCounter, isClient]);

  // Function to trigger chaotic GIF repositioning
  const triggerChaos = (gifIndex: number) => {
    setCurrentGif(gifIndex % gifs.length);
    setChaosCounter(prev => prev + 1);
  };

  return (
    <>
    {/* COMPLETELY ISOLATED FAB BUTTON - TRULY FIXED TO VIEWPORT */}
      <a
        href="https://soundcloud.com/billain/esef"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          position: 'fixed',
          bottom: '30px',
          right: '20px',
          display: 'block',
          width: '150px',
          height: '60px',
          borderRadius: '50px',
          background: 'linear-gradient(45deg, #ff6500, #dc2626)',
          border: '3px solid #ffffff',
          boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
          textDecoration: 'none',
          color: 'white',
          fontFamily: 'Arial, sans-serif',
          fontSize: '8px',
          fontWeight: 'bold',
          textAlign: 'center',
          paddingTop: '8px',
          boxSizing: 'border-box',
          zIndex: 2147483647, // Maximum possible z-index value
        }}
      >
        <div style={{ fontSize: '20px', lineHeight: '1' }}>☁️</div>
        <div style={{ fontSize: '16px', lineHeight: '1' }}>SOUNDCLOUD</div>
      </a>

    <div className="min-h-screen" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* FULLSCREEN ENTER OVERLAY - MANDATORY USER INTERACTION */}
      {showEnterOverlay && (
        <div 
          className="fixed inset-0 bg-black flex items-center justify-center"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: '#000000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 999999
          }}
        >
          <div className="text-center">
            {/* Classic 90s Web 1.0 enter button */}
            <button
              onClick={handleEnterSite}
              className="font-bold text-4xl transition-all"
              style={{
                fontFamily: 'Arial, sans-serif',
                minWidth: '200px',
                maxWidth: '200px',
                minHeight: '120px',
                padding: '20px 30px',
                backgroundColor: '#C0C0C0',
                color: '#000000',
                border: '4px outset #C0C0C0',
                borderTop: '4px solid #FFFFFF',
                borderLeft: '4px solid #FFFFFF', 
                borderRight: '4px solid #808080',
                borderBottom: '4px solid #808080',
                boxShadow: 'inset 2px 2px 4px rgba(255,255,255,0.8), inset -2px -2px 4px rgba(0,0,0,0.3)',
                cursor: 'pointer',
                textShadow: '1px 1px 0px rgba(255,255,255,0.8)',
                letterSpacing: '1px'
              }}
              onMouseDown={(e) => {
                // 90s button press effect
                e.currentTarget.style.border = '4px inset #C0C0C0';
                e.currentTarget.style.borderTop = '4px solid #808080';
                e.currentTarget.style.borderLeft = '4px solid #808080';
                e.currentTarget.style.borderRight = '4px solid #FFFFFF';
                e.currentTarget.style.borderBottom = '4px solid #FFFFFF';
                e.currentTarget.style.boxShadow = 'inset -2px -2px 4px rgba(255,255,255,0.8), inset 2px 2px 4px rgba(0,0,0,0.3)';
              }}
              onMouseUp={(e) => {
                // Return to normal state
                e.currentTarget.style.border = '4px outset #C0C0C0';
                e.currentTarget.style.borderTop = '4px solid #FFFFFF';
                e.currentTarget.style.borderLeft = '4px solid #FFFFFF';
                e.currentTarget.style.borderRight = '4px solid #808080';
                e.currentTarget.style.borderBottom = '4px solid #808080';
                e.currentTarget.style.boxShadow = 'inset 2px 2px 4px rgba(255,255,255,0.8), inset -2px -2px 4px rgba(0,0,0,0.3)';
              }}
              onMouseLeave={(e) => {
                // Ensure normal state when mouse leaves
                e.currentTarget.style.border = '4px outset #C0C0C0';
                e.currentTarget.style.borderTop = '4px solid #FFFFFF';
                e.currentTarget.style.borderLeft = '4px solid #FFFFFF';
                e.currentTarget.style.borderRight = '4px solid #808080';
                e.currentTarget.style.borderBottom = '4px solid #808080';
                e.currentTarget.style.boxShadow = 'inset 2px 2px 4px rgba(255,255,255,0.8), inset -2px -2px 4px rgba(0,0,0,0.3)';
              }}
            >
              ⚠️ <strong>CLICK HERE</strong> FOR EVERYTHING SUCKS EVERYTHING FUCKS ⚠️
            </button>
          </div>
        </div>
      )}

      <div style={{ zIndex: 100001, position: 'relative' }}>
        {/* Terrible background gradient */}
        <div 
          className="fixed inset-0 bg-gradient-to-br from-lime-200 via-pink-200 to-yellow-200"
          style={{
            opacity: .3,
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ff00ff' fill-opacity='0.3'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        />

        {/* Main container - FIRST IN DOM ORDER - MOBILE OPTIMIZED */}
        <div className="relative z-50 flex flex-col items-center justify-start p-2 sm:p-4 min-h-screen">
          <div className="w-full max-w-4xl border-4 sm:border-8 border-black shadow-2xl p-3 sm:p-6 rounded-none my-4"
              style={{
                backgroundImage: 'linear-gradient(45deg, rgba(255,255,255,0.6) 50%, rgba(240,240,240,0.6) 50%)',
                backgroundSize: '20px 20px'
              }}>
          
            {/* Marquee header */}
            <div className="w-full mb-6">
              <div className="bg-red-600 text-yellow-300 font-bold text-xl p-2 border-4 border-blue-500 overflow-hidden whitespace-nowrap">
                <div className="animate-marquee inline-block">
                  🔥🔥🔥 WELCOME TO THE WORST FUCKING MUSIC SITE ON THE INTERNET!!! 🔥🔥🔥 CLICK BELOW TO SUCK AND FUCK!!! 🎵🎵🎵
                </div>
              </div>
            </div>

            {/* Terrible title - MOBILE RESPONSIVE */}
            <div className="text-center mb-4 sm:mb-6">
              <h1 className="text-2xl sm:text-5xl font-bold text-red-600 animate-pulse mb-2 sm:mb-4" 
                  style={{
                    textShadow: '2px 2px 0px #0000ff, 4px 4px 0px #ff00ff, 6px 6px 0px #00ff00',
                    fontFamily: 'Impact, Arial Black, sans-serif'
                  }}>
                🎵 EVERYTHING SUCKS EVERYTHING FUCKS 🎵
              </h1>
              <div className="bg-gradient-to-r from-purple-400 to-pink-400 text-white p-2 sm:p-4 border-4 sm:border-8 border-yellow-400 rotate-1 sm:rotate-2">
                <h2 className="text-sm sm:text-xl font-bold animate-bounce">
                  BILLAIN THE BOSNIAN BADDY
                </h2>
              </div>
              <div className="bg-gradient-to-r from-purple-400 to-pink-400 text-white p-2 sm:p-4 border-4 sm:border-8 border-yellow-400 rotate-1 sm:rotate-2">
                <h2 className="text-sm sm:text-xl font-bold animate-bounce">
                  ★ ☆ ★ THE ULTIMATE EXPERIENCE OF EVERYTHING SUCKS AND FUCKS ★ ☆ ★
                </h2>
              </div>
            </div>

            {/* Embedded SoundCloud player - MOBILE-RESPONSIVE IFRAME */}
            <div className="mb-4 sm:mb-6 p-1 sm:p-2 bg-red-600 border-2 sm:border-4 border-yellow-300 relative" style={{ zIndex: 100000 }}>
            {isClient && (
              <iframe 
                width="100%" 
                height={typeof window !== 'undefined' && /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) ? "166" : "300"}
                scrolling="no" 
                frameBorder="no" 
                allow="autoplay; fullscreen; clipboard-write; encrypted-media; picture-in-picture"
                title="SoundCloud Player - ESEF by Billain" 
                src={`https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/2138170161%3Fsecret_token%3Ds-MHqVhA2z3Wz&color=%23ff5500&auto_play=${autoplayEnabled ? 'true' : 'false'}&hide_related=true&show_comments=true&show_user=true&show_reposts=false&show_teaser=false&visual=${typeof window !== 'undefined' && /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) ? 'false' : 'true'}`}
                style={{
                  minWidth: '100%',
                  width: '100%',
                  maxWidth: '100%',
                  height: typeof window !== 'undefined' && /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) ? '166px' : '300px',
                  border: 'none',
                  position: 'relative',
                  zIndex: 100001
                }}
              />
            )}
            {!isClient && (
              <div 
                style={{
                  width: '100%',
                  height: '300px',
                  backgroundColor: '#ff5500',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '18px',
                  fontWeight: 'bold'
                }}
              >
                Loading SoundCloud Player...
              </div>
            )}
            
            {/* Backup HTML5 audio with simplified mobile handling */}
            <audio 
              autoPlay={autoplayEnabled}
              loop 
              preload="auto"
              style={{ display: 'none' }}
              controls={false}
              ref={(audio) => {
                if (audio && autoplayEnabled) {
                  console.log('🎵 Setting up HTML5 audio...');
                  
                  // Simple audio setup
                  const playAudio = () => {
                    audio.volume = 0.9;
                    audio.currentTime = 0;
                    
                    // Mobile-specific: force reload
                    if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
                      console.log('📱 Mobile detected - reloading audio');
                      audio.load();
                    }
                    
                    audio.play()
                      .then(() => console.log('✅ HTML5 audio playing successfully'))
                      .catch(e => console.log('❌ HTML5 audio failed:', e.message));
                  };
                  
                  // Try to play immediately and once more
                  playAudio();
                  setTimeout(playAudio, 500);
                }
              }}
            >
              <source src="https://cf-media.sndcdn.com/KDdMJvN2YvRN.128.mp3?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiKjovL2NmLW1lZGlhLnNuZGNkbi5jb20vS0RkTUp2TjJZdlJOLjEyOC5tcDMqIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzM2NjQwMDAwfX19XX0_&Signature=VUzRYM6Y~Fj7D-QxP7r-xKdJePiTJoiKv7V7WKC0T0Z2YyXxn2fWKGjqVZ3QrjJw-VlS9YpKgQhWJvlZgT9~0ZOZ7RVhJ2S1QyqKsWl1GNmM6A__" type="audio/mpeg" />
              <track kind="captions" />
            </audio>
            
            <div style={{
              fontSize: '10px', 
              color: '#cccccc',
              lineBreak: 'anywhere',
              wordBreak: 'normal',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis', 
              fontFamily: 'Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif',
              fontWeight: 100
            }}>
              <a href="https://soundcloud.com/billain" title="Billain" target="_blank" rel="noopener noreferrer" style={{color: '#cccccc', textDecoration: 'none'}}>Billain</a> · <a href="https://soundcloud.com/billain/esef/s-MHqVhA2z3Wz" title="ESEF" target="_blank" rel="noopener noreferrer" style={{color: '#cccccc', textDecoration: 'none'}}>ESEF</a>
            </div>
            </div>

            {/* Main streaming links container - MOBILE OPTIMIZED */}
            <div className="border-4 sm:border-8 border-red-500 p-3 sm:p-6 rounded-none shadow-lg w-full mb-4 sm:mb-6" 
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.75)',
                  backgroundImage: 'linear-gradient(45deg, rgba(255,255,0,0.6) 25%, transparent 25%), linear-gradient(-45deg, rgba(255,255,0,0.6) 25%, transparent 25%), linear-gradient(45deg, transparent 75%, rgba(255,255,0,0.6) 75%), linear-gradient(-45deg, transparent 75%, rgba(255,255,0,0.6) 75%)',
                  backgroundSize: '15px 15px',
                  backgroundPosition: '0 0, 0 8px, 8px -8px, -8px 0px'
                }}>
              
              <div className="bg-blue-600 text-white p-3 sm:p-4 mb-3 sm:mb-4 border-2 sm:border-4 border-yellow-400 text-center">
                <h3 className="text-lg sm:text-2xl font-bold animate-pulse">
                  🎧 CHOOSE YOUR MUSIC! 🎧
                </h3>
                <p className="text-yellow-300 font-bold mt-1 sm:mt-2 text-sm sm:text-base">Click any link below for tunes that SUCK!</p>
              </div>

              <div className="space-y-2 sm:space-y-3">
                {streamingLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-4 sm:p-4 border-2 sm:border-4 border-black text-center font-bold text-base sm:text-lg hover:animate-bounce transition-all min-h-[50px] flex items-center justify-center"
                    style={{
                      backgroundColor: link.color,
                      color: index % 2 === 0 ? '#000000' : '#ffffff',
                      textShadow: index % 2 === 0 ? '1px 1px 0px #ffffff' : '1px 1px 0px #000000',
                      transform: `rotate(${(index % 2 === 0 ? -1 : 1) * 1}deg)`
                    }}
                    onMouseEnter={() => triggerChaos(index)}
                  >
                    {link.name}
                  </a>
                ))}
              </div>

              {/* Under construction using your GIFs */}
              <div className="mt-6 p-4 bg-yellow-300 border-4 border-red-600 text-center">
                <img 
                  src={gifs[(currentGif + 5) % gifs.length]}
                  alt="gif"
                  className="inline-block w-12 h-12 mr-2"
                />
                <span className="font-bold text-red-600 text-xl">GET FUCKED!</span>
                <img 
                  src={gifs[(currentGif + 10) % gifs.length]}
                  alt="gif"
                  className="inline-block w-12 h-12 ml-2"
                />
              </div>
            </div>

            {/* Bottom elements in overlay - MOBILE OPTIMIZED */}
            <div className="flex flex-col items-center space-y-3 sm:space-y-4">
              {/* Visitor counter */}
              <div className="bg-black text-lime-400 p-3 sm:p-4 border-2 border-lime-400 font-mono">
                <div className="text-center">
                  <span className="text-xs sm:text-sm">You are visitor #</span>
                  <span className="text-lg sm:text-xl font-bold animate-pulse">{visitorNumber}</span>
                </div>
              </div>

              {/* Popup trigger button - LARGER FOR MOBILE */}
              <button
                onClick={() => setShowPopup(true)}
                className="bg-red-600 text-yellow-300 p-4 sm:p-3 border-4 border-yellow-300 font-bold animate-pulse text-base sm:text-lg min-h-[60px] px-6"
              >
                🚨 CLICK FOR FREE STUFF! 🚨
              </button>
              
              {/* Footer info in overlay */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-yellow-300 p-2 sm:p-3 border-2 sm:border-4 border-red-500 w-full text-center overflow-hidden whitespace-nowrap">
                <div className="animate-marquee inline-block font-bold text-xs sm:text-sm">
                  💎 Best viewed in Netscape Navigator 💎 Last updated: 09/11/2001 💎
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
      
      {/* Annoying floating elements - positioned differently to avoid conflicts */}
      <div className="fixed bottom-4 left-4 bg-lime-400 border-4 border-purple-600 p-2 animate-spin z-30">
        <span className="font-bold text-purple-800">NEW!</span>
      </div>

      {/* Annoying popup - true modal overlay with solid background */}
      {showPopup && (
        <div 
          className="fixed inset-0 flex items-center justify-center"
          style={{ 
            position: 'fixed', 
            top: 0, 
            left: 0, 
            right: 0, 
            bottom: 0,
            zIndex: 100010,
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
            backdropFilter: 'blur(2px)'
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowPopup(false);
            }
          }}
        >
          {/* Completely solid black background overlay */}
          <div 
            className="absolute inset-0"
            style={{
              backgroundColor: '#000000',
              opacity: 1
            }}
          />
          
          {/* Modal content - completely opaque popup container */}
          <div 
            className="w-full max-w-md mx-4 shadow-2xl relative border-8 border-black"
            style={{ 
              zIndex: 100010, 
              position: 'relative',
              maxWidth: '450px',
              minHeight: '320px',
              backgroundColor: '#ffff00', // Bright yellow background
              transform: 'translate(0, 0)', // Ensure proper centering
              animation: 'bounce 1s infinite'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Outer border for that chunky 90s look */}
            <div className="bg-red-600 border-4 border-black p-1 m-2">
              <div className="bg-yellow-300 border-2 border-red-500 p-6">
                
                {/* Virus warning header */}
                <div className="bg-red-600 text-white p-3 mb-4 font-bold text-center text-lg border-2 border-black animate-pulse">
                  ⚠️ VIRUS DETECTED! CLICK HERE! ⚠️
                </div>
                
                {/* Warning content */}
                <div className="text-center mb-4">
                  <p className="text-black font-bold text-lg mb-2 animate-pulse">Your computer has 99 viruses!</p>
                  <p className="text-red-600 font-bold text-sm mb-2">Click OK to download our FREE antivirus software!</p>
                  <p className="text-black text-xs animate-pulse bg-yellow-500 p-2 border border-red-500 font-bold">
                    🚨 WARNING: Do not close this window! 🚨
                  </p>
                </div>
                
                {/* Action buttons */}
                <div className="flex gap-2 justify-center">
                  <button 
                    onClick={() => {
                      window.open('https://soundcloud.com/billain/esef', '_blank');
                      setShowPopup(false);
                    }}
                    className="bg-green-400 border-2 border-black px-4 py-2 font-bold hover:bg-green-300 text-black shadow-lg animate-pulse"
                  >
                    OK - DOWNLOAD NOW!
                  </button>
                  <button 
                    onClick={() => {
                      window.open('https://soundcloud.com/billain/esef', '_blank');
                      setShowPopup(false);
                    }}
                    className="bg-red-400 border-2 border-black px-4 py-2 font-bold hover:bg-red-300 text-white shadow-lg"
                  >
                    X CLOSE
                  </button>
                </div>
                
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ALL CHAOS GIFS RENDERED AT THE END - BACKGROUND LAYER - MOBILE OPTIMIZED */}
      
      {/* Only render GIFs on client side to avoid hydration issues */}
      {isClient && (
        <>
          {/* Scattered GIFs everywhere - INCREASED FOR MORE INITIAL CHAOS */}
          {gifStyles.slice(0, 35).map((style, i) => (
            <img
              key={`desktop-${i}`}
              src={gifs[i % gifs.length]}
              alt="terrible gif"
              className="animate-pulse pointer-events-none hidden sm:block"
              style={{
                width: `${style.width}px`,
                height: `${style.height}px`,
                top: `${style.top}%`,
                left: `${style.left}%`,
                zIndex: style.zIndex + 5, // Reduced boost to keep below FAB
                transform: `rotate(${style.rotate}deg) scale(${style.scale})`,
                opacity: Math.min(0.9, style.opacity + 0.2), // Boosted but not too much
                animationDelay: `${style.animationDelay}s`,
                animationDuration: `${style.animationDuration}s`,
                position: 'fixed'
              }}
            />
          ))}
          
          {/* Mobile-only GIFs - INCREASED */}
          {gifStyles.slice(35, 47).map((style, i) => (
            <img
              key={`mobile-${i}`}
              src={gifs[i % gifs.length]}
              alt="terrible gif"
              className="animate-pulse pointer-events-none block sm:hidden"
              style={{
                width: `${style.width}px`,
                height: `${style.height}px`,
                top: `${style.top}%`,
                left: `${style.left}%`,
                zIndex: style.zIndex + 8, // Reduced boost for mobile
                transform: `rotate(${style.rotate}deg) scale(${style.scale})`,
                opacity: Math.min(0.9, style.opacity + 0.3), // Boosted for mobile visibility
                animationDelay: `${style.animationDelay}s`,
                animationDuration: `${style.animationDuration}s`,
                position: 'fixed'
              }}
            />
          ))}
          
          {/* Additional layer of smaller chaotic GIFs - INCREASED */}
          {gifStyles.slice(47, 72).map((style, i) => (
            <img
              key={`small-${i}`}
              src={gifs[(i + 20) % gifs.length]}
              alt="small terrible gif"
              className="animate-bounce pointer-events-none hidden md:block"
              style={{
                width: `${style.width}px`,
                height: `${style.height}px`,
                top: `${style.top}%`,
                left: `${style.left}%`,
                zIndex: style.zIndex + 4, // Reduced boost
                transform: `rotate(${style.rotate}deg) scale(${style.scale})`,
                opacity: Math.min(0.85, style.opacity + 0.2), // Boosted opacity
                animationDelay: `${style.animationDelay}s`,
                animationDuration: `${style.animationDuration}s`,
                position: 'fixed'
              }}
            />
          ))}
          
          {/* Third layer - spinning chaos GIFs - INCREASED */}
          {gifStyles.slice(72, 92).map((style, i) => (
            <img
              key={`spin-${i}`}
              src={gifs[(i + 35) % gifs.length]}
              alt="spinning terrible gif"
              className="animate-spin pointer-events-none hidden lg:block"
              style={{
                width: `${style.width}px`,
                height: `${style.height}px`,
                top: `${style.top}%`,
                left: `${style.left}%`,
                zIndex: style.zIndex + 6, // Reduced boost for spinning chaos
                transform: `rotate(${style.rotate}deg) scale(${style.scale})`,
                opacity: Math.min(0.9, style.opacity + 0.2), // Boosted spinning visibility
                animationDelay: `${style.animationDelay}s`,
                animationDuration: `${style.animationDuration}s`,
                position: 'fixed'
              }}
            />
          ))}
          
          {/* Special hover-reactive GIFs that change based on currentGif state */}
          {Array.from({length: 3}).map((_, i) => (
            <img
              key={`hover-${i}`}
              src={gifs[(currentGif + i) % gifs.length]}
              alt="hover reactive gif"
              className="animate-bounce pointer-events-none hidden sm:block"
              style={{
                width: `${80 + i * 20}px`,
                height: `${80 + i * 20}px`,
                top: `${10 + i * 25}%`,
                right: `${5 + i * 15}%`,
                zIndex: 15 + i, // Fixed lower z-index for hover GIFs
                transform: `rotate(${currentGif * 10 + i * 45}deg) scale(${1 + currentGif * 0.1})`,
                opacity: Math.min(0.9, 0.8 + currentGif * 0.02), // More visible but capped
                transition: 'all 0.3s ease-in-out',
                animationDelay: `${i * 0.1}s`,
                animationDuration: `${0.5 + currentGif * 0.1}s`,
                position: 'fixed'
              }}
            />
          ))}
          
          {/* Additional corner GIFs that react to hover */}
          {Array.from({length: 2}).map((_, i) => (
            <img
              key={`corner-${i}`}
              src={gifs[(currentGif * 2 + i + 10) % gifs.length]}
              alt="corner reactive gif"
              className="animate-pulse pointer-events-none hidden lg:block"
              style={{
                width: `${60 + currentGif * 2}px`,
                height: `${60 + currentGif * 2}px`,
                bottom: `${10 + i * 20}%`,
                left: `${5 + i * 10}%`,
                zIndex: 10 + i, // Fixed lower z-index for corner GIFs
                transform: `rotate(${-currentGif * 15 + i * 90}deg) scale(${0.8 + currentGif * 0.05})`,
                opacity: Math.min(0.85, 0.6 + currentGif * 0.03), // More visible but capped
                transition: 'all 0.4s ease-out',
                animationDelay: `${i * 0.2}s`,
                animationDuration: `${1 + currentGif * 0.05}s`,
                position: 'fixed'
              }}
            />
          ))}
        </>
      )}
    </div>
    </>
  );
}
