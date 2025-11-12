// 'use client';
// import { useEffect, useRef, useState } from 'react';

// declare global {
//   interface Window {
//     googleTranslateElementInit: () => void;
//     google: any;
//   }
// }

// const SCRIPT_ATTRIBUTE = 'data-google-translate';

// export default function TranslateButton() {
//   const [isReady, setIsReady] = useState(false);
//   const comboCheckTimer = useRef<number>();

//   useEffect(() => {
//     let isMounted = true;

//     const markReadyWhenComboExists = () => {
//       if (!isMounted) return;

//       const combo = document.querySelector<HTMLSelectElement>('.goog-te-combo');
//       if (combo) {
//         setIsReady(true);
//       } else {
//         comboCheckTimer.current = window.setTimeout(
//           markReadyWhenComboExists,
//           200
//         );
//       }
//     };

//     const initTranslate = () => {
//       if (!window.google?.translate?.TranslateElement) return;

//       new window.google.translate.TranslateElement(
//         {
//           pageLanguage: 'en',
//           includedLanguages: 'hi',
//           autoDisplay: false,
//         },
//         'google_translate_element'
//       );

//       markReadyWhenComboExists();
//     };

//     window.googleTranslateElementInit = initTranslate;

//     const existingScript = document.querySelector<HTMLScriptElement>(
//       `script[${SCRIPT_ATTRIBUTE}="true"]`
//     );

//     if (existingScript) {
//       if (window.google?.translate?.TranslateElement) {
//         initTranslate();
//       }
//     } else {
//       const script = document.createElement('script');
//       script.src =
//         '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
//       script.async = true;
//       script.setAttribute(SCRIPT_ATTRIBUTE, 'true');
//       document.body.appendChild(script);
//     }

//     return () => {
//       isMounted = false;
//       if (comboCheckTimer.current) {
//         clearTimeout(comboCheckTimer.current);
//       }
//     };
//   }, []);

//   const handleTranslate = () => {
//     if (!isReady) {
//       alert('Google Translate is still loading. Please try again in a moment.');
//       return;
//     }

//     const languageSelector =
//       document.querySelector<HTMLSelectElement>('.goog-te-combo');

//     if (!languageSelector) {
//       alert('Translate menu is not ready yet. Please try again.');
//       return;
//     }

//     languageSelector.value = 'hi';
//     languageSelector.dispatchEvent(new Event('change'));
//   };

//   return (
//     <>
//       <button
//         onClick={handleTranslate}
//         disabled={!isReady}
//         style={{
//           background: '#0070f3',
//           color: 'white',
//           border: 'none',
//           borderRadius: 4,
//           padding: '8px 14px',
//           cursor: 'pointer',
//           opacity: isReady ? 1 : 0.6,
//         }}
//       >
//         {isReady ? 'Translate to Hindi' : 'Loading translator...'}
//       </button>

//       {/* Hidden Google Translate div */}
//       <div id="google_translate_element" style={{ display: 'none' }}></div>
//     </>
//   );
// }
