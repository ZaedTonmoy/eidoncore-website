/* ============================================
   EIDONCORE — Shared Components JS
   Dynamic Nav, Footer, Newsletter, Scroll
   ============================================ */

(function () {
    'use strict';

    // --- Shared SVG Icon Registry ---
    const ICONS = {
        target: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>',
        puzzle: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19.439 7.85c-.049.322.059.648.289.878l1.568 1.568c.47.47.706 1.087.706 1.704s-.235 1.233-.706 1.704l-1.611 1.611a.98.98 0 01-.837.276c-.47-.07-.802-.48-.968-.925a2.501 2.501 0 10-3.214 3.214c.446.166.855.497.925.968a.979.979 0 01-.276.837l-1.61 1.61a2.404 2.404 0 01-1.705.707 2.402 2.402 0 01-1.704-.706l-1.568-1.568a1.026 1.026 0 00-.877-.29c-.493.074-.84.504-1.02.968a2.5 2.5 0 11-3.237-3.237c.464-.18.894-.527.967-1.02a1.026 1.026 0 00-.289-.877l-1.568-1.568A2.402 2.402 0 011.998 12c0-.617.236-1.234.706-1.704L4.23 8.77c.24-.24.581-.353.917-.303.515.077.877.528 1.073 1.01a2.5 2.5 0 103.259-3.259c-.482-.196-.933-.558-1.01-1.073-.05-.336.062-.676.303-.917l1.525-1.525A2.402 2.402 0 0112 2c.617 0 1.234.236 1.704.706l1.568 1.568c.23.23.556.338.877.29.493-.074.84-.504 1.02-.969a2.5 2.5 0 113.237 3.237c-.464.18-.894.527-.968 1.02z"/></svg>',
        tag: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.586 2.586A2 2 0 0011.172 2H4a2 2 0 00-2 2v7.172a2 2 0 00.586 1.414l8.704 8.704a2.426 2.426 0 003.42 0l6.58-6.58a2.426 2.426 0 000-3.42z"/><circle cx="7.5" cy="7.5" r=".5" fill="currentColor"/></svg>',
        building: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="16" height="20" x="4" y="2" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/></svg>',
        'dollar-sign': '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" x2="12" y1="2" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>',
        link: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>',
        clock: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
        'bar-chart': '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" x2="18" y1="20" y2="10"/><line x1="12" x2="12" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="14"/></svg>',
        folder: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 20a2 2 0 002-2V8a2 2 0 00-2-2h-7.9a2 2 0 01-1.69-.9L9.6 3.9A2 2 0 007.93 3H4a2 2 0 00-2 2v13a2 2 0 002 2z"/></svg>',
        'check-circle': '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
        wallet: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12V7H5a2 2 0 010-4h14v4"/><path d="M3 5v14a2 2 0 002 2h16v-5"/><path d="M18 12a2 2 0 000 4h4v-4z"/></svg>',
        globe: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 000 20 14.5 14.5 0 000-20"/><path d="M2 12h20"/></svg>',
        handshake: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18.5 12.5l-4-4L8 15l-3-3-2 2 5 5 2-2"/><path d="M20 4l-7 7"/><path d="M4 20l3-3"/><path d="M14.5 5.5L18 2l4 4-3.5 3.5"/><path d="M2 18l4-4"/></svg>',
        lock: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>',
        shield: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 01-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 01.5-.87l7-4a1 1 0 011 0l7 4A1 1 0 0120 6z"/><path d="M9 12l2 2 4-4"/></svg>',
        earth: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 000 20 14.5 14.5 0 000-20"/><path d="M2 12h20"/></svg>',
        zap: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
        gift: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13"/><path d="M19 12v7a2 2 0 01-2 2H7a2 2 0 01-2-2v-7"/><path d="M7.5 8a2.5 2.5 0 010-5A4.8 4.8 0 0112 8a4.8 4.8 0 014.5-5 2.5 2.5 0 010 5"/></svg>',
        users: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4-4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>',
        refresh: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 019-9 9.75 9.75 0 016.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 01-9 9 9.75 9.75 0 01-6.74-2.74L3 16"/><path d="M3 21v-5h5"/></svg>',
        clipboard: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2"/></svg>',
        'trending-up': '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>',
        palette: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 011.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>',
        rocket: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z"/><path d="M12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 3 0 3 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-3 0-3"/></svg>',
        'file-text': '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V7z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>',
        laptop: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 16V7a2 2 0 00-2-2H6a2 2 0 00-2 2v9m16 0H4m16 0l1.28 2.55a1 1 0 01-.9 1.45H3.62a1 1 0 01-.9-1.45L4 16"/></svg>',
        'x-circle': '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M15 9l-6 6"/><path d="M9 9l6 6"/></svg>',
        'lock-keyhole': '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="16" r="1"/><rect x="3" y="10" width="18" height="12" rx="2"/><path d="M7 10V7a5 5 0 0110 0v3"/></svg>',
        key: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="7.5" cy="15.5" r="5.5"/><path d="M11.5 11.5L22 2"/><path d="M16 7l3-3"/><path d="M18 4l4 4"/></svg>',
        construction: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="6" width="20" height="8" rx="1"/><path d="M17 14v7"/><path d="M7 14v7"/><path d="M17 3v3"/><path d="M7 3v3"/><path d="M10 14L2.3 6.3"/><path d="M14 6l7.7 7.7"/></svg>',
        user: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 00-4-4H9a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
        package: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16.5 9.4l-9-5.19"/><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>',
        database: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14a9 3 0 0018 0V5"/><path d="M3 12a9 3 0 0018 0"/></svg>',
        smartphone: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/></svg>',
        mail: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="M22 7l-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7"/></svg>',
        'message-circle': '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7.9 20A9 9 0 104 16.1L2 22z"/></svg>',
        'map-pin': '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0116 0z"/><circle cx="12" cy="10" r="3"/></svg>',
        'book-open': '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/></svg>',
        wrench: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/></svg>',
        bell: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 0112 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 003.4 0"/></svg>',
        gem: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3h12l4 6-10 13L2 9z"/><path d="M11 3l1 10"/><path d="M2 9h20"/><path d="M7 3l-1.5 6"/><path d="M17 3l1.5 6"/></svg>',
        'credit-card': '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>',
        'shopping-cart': '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 002 1.58h9.78a2 2 0 001.95-1.57l1.65-7.43H5.12"/></svg>',
        cloud: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.5 19H9a7 7 0 110-14 4.5 4.5 0 018 2h1.5a4.5 4.5 0 010 9z"/></svg>',
        bot: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>',
        megaphone: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11l18-5v12L3 13v-2z"/><path d="M11.6 16.8a3 3 0 11-5.8-1.6"/></svg>',
        ban: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M4.93 4.93l14.14 14.14"/></svg>',
        'paint-bucket': '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 11h-6l-2-2H5a2 2 0 00-2 2v7a2 2 0 002 2h14a2 2 0 002-2v-2"/><path d="M17 7l2-3 2 3"/><path d="M19 7v4"/></svg>',
        satellite: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 7L9 3L5 7l4 4"/><path d="M17 11l4 4-4 4-4-4"/><path d="M8 12l4 4"/><path d="M12 8l4 4"/><path d="M2 22l6-6"/><circle cx="5" cy="19" r="1"/></svg>',
        image: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="M21 15l-3.086-3.086a2 2 0 00-2.828 0L6 21"/></svg>',
        search: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.3-4.3"/></svg>',
        briefcase: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/></svg>',
        star: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
        code: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
    };

    function injectIcons() {
        document.querySelectorAll('[data-icon]').forEach(el => {
            const name = el.getAttribute('data-icon');
            if (ICONS[name]) {
                el.innerHTML = ICONS[name];
            }
        });
    }

    // --- Google Analytics (gtag.js) ---
    const gtagScript = document.createElement('script');
    gtagScript.async = true;
    gtagScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-708D36YCMR';
    document.head.appendChild(gtagScript);
    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    gtag('js', new Date());
    gtag('config', 'G-708D36YCMR');

    // --- Microsoft Clarity ---
    (function (c, l, a, r, i, t, y) {
        c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments) };
        t = l.createElement(r); t.async = 1; t.src = "https://www.clarity.ms/tag/" + i;
        y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
    })(window, document, "clarity", "script", "vq6ikthh3w");

    // --- Determine depth for relative paths ---
    const depth = document.documentElement.dataset.depth || '0';
    const prefix = depth === '2' ? '../../' : depth === '1' ? '../' : '';

    // --- Inject Navbar ---
    function createNav() {
        // Skip-to-content link
        const skip = document.createElement('a');
        skip.href = '#main-content';
        skip.className = 'skip-link';
        skip.textContent = 'Skip to main content';
        document.body.prepend(skip);

        // Add id to main
        const main = document.querySelector('main');
        if (main) main.id = 'main-content';

        const nav = document.createElement('nav');
        nav.className = 'navbar';
        nav.id = 'navbar';
        nav.setAttribute('role', 'navigation');
        nav.setAttribute('aria-label', 'Main navigation');
        nav.innerHTML = `
      <div class="nav-container">
        <a href="${prefix}./" class="nav-logo" aria-label="Eidoncore home">
          <img src="${prefix}images/logo.png" alt="Eidoncore" class="logo-icon" style="height:24px;width:24px;"> Eidoncore
        </a>
        <ul class="nav-links" id="navLinks" role="menubar">
          <li class="nav-dropdown" role="none">
            <a href="${prefix}features/" class="dropdown-trigger" role="menuitem" aria-haspopup="true" aria-expanded="false">Features <span class="dropdown-arrow">▾</span></a>
            <div class="dropdown-menu" role="menu">
              <a href="${prefix}projects/" role="menuitem">Projects</a>
              <a href="${prefix}tasks/" role="menuitem">Tasks</a>
              <a href="${prefix}crm/" role="menuitem">CRM &amp; Clients</a>
              <a href="${prefix}invoicing/" role="menuitem">Invoicing</a>
              <a href="${prefix}services/" role="menuitem">Services</a>
              <a href="${prefix}messaging/" role="menuitem">Messaging</a>
              <a href="${prefix}automations/" role="menuitem">Automations</a>
              <a href="${prefix}portal/" role="menuitem">Client Portal</a>
              <a href="${prefix}notifications/" role="menuitem">Notifications</a>
              <a href="${prefix}reports/" role="menuitem">Reports</a>
            </div>
          </li>
          <li role="none"><a href="${prefix}pricing/" role="menuitem">Pricing</a></li>
          <li class="nav-dropdown" role="none">
            <a href="${prefix}use-cases/" class="dropdown-trigger" role="menuitem" aria-haspopup="true" aria-expanded="false">Use Cases <span class="dropdown-arrow">▾</span></a>
            <div class="dropdown-menu" role="menu">
              <a href="${prefix}use-cases/marketing-agencies/" role="menuitem">Marketing Agencies</a>
              <a href="${prefix}use-cases/design-studios/" role="menuitem">Design Studios</a>
              <a href="${prefix}use-cases/development-agencies/" role="menuitem">Development Agencies</a>
              <a href="${prefix}use-cases/consulting-firms/" role="menuitem">Consulting Firms</a>
              <a href="${prefix}use-cases/freelancers/" role="menuitem">Freelancers</a>
            </div>
          </li>
          <li role="none"><a href="${prefix}about/" role="menuitem">About</a></li>
          <li role="none"><a href="${prefix}contact/" role="menuitem">Contact</a></li>
          <li class="mobile-cta-item" role="none"><a href="https://register.eidoncore.com/login" class="btn btn-ghost btn-block" role="menuitem">Log In</a></li>
          <li class="mobile-cta-item" role="none"><a href="https://register.eidoncore.com/" class="btn btn-primary btn-block" role="menuitem">Start Free Trial</a></li>
        </ul>
        <div class="nav-actions" id="navActions">
          <a href="https://register.eidoncore.com/login" class="btn btn-ghost">Log In</a>
          <a href="https://register.eidoncore.com/" class="btn btn-primary">Start Free Trial</a>
        </div>
        <button class="nav-toggle" id="navToggle" aria-label="Toggle menu" aria-expanded="false">
          <span></span><span></span><span></span>
        </button>
      </div>
    `;
        return nav;
    }

    // --- Inject Footer ---
    function createFooter() {
        const footer = document.createElement('footer');
        footer.className = 'site-footer';
        footer.id = 'footer';
        footer.innerHTML = `
      <div class="container">
        <div class="footer-grid">
          <div class="footer-brand">
            <a href="${prefix}./" class="nav-logo"><img src="${prefix}images/logo.png" alt="Eidoncore" class="logo-icon" style="height:24px;width:24px;"> Eidoncore</a>
            <p>The all-in-one agency management platform.</p>
            <div class="footer-newsletter">
              <p>Subscribe to our newsletter</p>
              <form class="footer-newsletter-form" id="footerNewsletter">
                <input type="email" placeholder="you@agency.com" required>
                <button type="submit">Subscribe</button>
              </form>
            </div>
          </div>
          <div class="footer-link-columns">
          <div class="footer-col">
            <h4>Product</h4>
            <a href="${prefix}features/">Features</a>
            <a href="${prefix}pricing/">Pricing</a>
            <a href="${prefix}integrations/">Integrations</a>
            <a href="${prefix}changelog/">Changelog</a>
            <a href="${prefix}about/">About</a>
            <a href="${prefix}contact/">Contact</a>
          </div>
          <div class="footer-col">
            <h4>Features</h4>
            <a href="${prefix}projects/">Projects</a>
            <a href="${prefix}tasks/">Tasks</a>
            <a href="${prefix}invoicing/">Invoicing</a>
            <a href="${prefix}crm/">CRM</a>
            <a href="${prefix}messaging/">Messaging</a>
            <a href="${prefix}automations/">Automations</a>
            <a href="${prefix}services/">Services</a>
            <a href="${prefix}portal/">Client Portal</a>
            <a href="${prefix}notifications/">Notifications</a>
            <a href="${prefix}reports/">Reports</a>
            <a href="${prefix}digital-products/">Digital Products</a>
          </div>
          <div class="footer-col">
            <h4>Use Cases</h4>
            <a href="${prefix}use-cases/marketing-agencies/">Marketing Agencies</a>
            <a href="${prefix}use-cases/design-studios/">Design Studios</a>
            <a href="${prefix}use-cases/development-agencies/">Dev Agencies</a>
            <a href="${prefix}use-cases/consulting-firms/">Consulting Firms</a>
            <a href="${prefix}use-cases/freelancers/">Freelancers</a>
            <a href="${prefix}customers/">Customer Stories</a>
          </div>
          <div class="footer-col">
            <h4>Resources</h4>
            <a href="${prefix}docs/">Documentation</a>
            <a href="${prefix}blog/">Blog</a>
            <a href="${prefix}faq/">FAQ</a>
            <a href="${prefix}compare/">Compare</a>
            <a href="${prefix}demo/">Product Tour</a>
            <a href="${prefix}developers/">Developers</a>
            <a href="${prefix}partners/">Partners</a>
            <a href="${prefix}security/">Security</a>
            <a href="${prefix}privacy/">Privacy Policy</a>
            <a href="${prefix}terms/">Terms of Service</a>
          </div>
          </div>
        </div>
        <div class="footer-bottom">
          <div class="footer-social">
            <a href="https://github.com/ZaedTonmoy" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg></a>
            <a href="https://twitter.com/eidoncore" target="_blank" rel="noopener noreferrer" aria-label="Twitter / X"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a>
            <a href="https://linkedin.com/company/eidoncore" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg></a>
          </div>
          <p>&copy; 2026 Eidoncore. All rights reserved.</p>
        </div>
      </div>
    `;
        footer.setAttribute('role', 'contentinfo');
        return footer;
    }

    // --- Init shared behaviors ---
    function initShared() {
        // Navbar scroll
        const navbar = document.getElementById('navbar');
        if (navbar) {
            window.addEventListener('scroll', () => {
                navbar.classList.toggle('scrolled', window.scrollY > 50);
            }, { passive: true });
            if (window.scrollY > 50) navbar.classList.add('scrolled');
        }

        // Mobile toggle
        const navToggle = document.getElementById('navToggle');
        const navLinks = document.getElementById('navLinks');
        if (navToggle && navLinks) {
            navToggle.addEventListener('click', () => {
                const open = navLinks.classList.toggle('open');
                navToggle.classList.toggle('active', open);
                navToggle.setAttribute('aria-expanded', String(open));
            });

            // Close mobile on link click (but not dropdown triggers)
            navLinks.querySelectorAll('a').forEach(link => {
                if (link.classList.contains('dropdown-trigger')) return;
                link.addEventListener('click', () => {
                    navLinks.classList.remove('open');
                    navToggle.classList.remove('active');
                    navToggle.setAttribute('aria-expanded', 'false');
                });
            });
        }

        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(a => {
            a.addEventListener('click', e => {
                const href = a.getAttribute('href');
                if (href === '#') return;
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    const offset = 80;
                    const top = target.getBoundingClientRect().top + window.scrollY - offset;
                    window.scrollTo({ top, behavior: 'smooth' });
                }
            });
        });

        // --- Scroll animations (observe ALL animated elements) ---
        const animSelector = '.animate-on-scroll, .anim-blur, .anim-scale, .anim-slide-left, .anim-slide-right, .anim-cinematic, .text-reveal';
        const obs = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Stagger siblings
                    const parent = entry.target.parentElement;
                    const siblings = parent ? Array.from(parent.querySelectorAll(animSelector)) : [];
                    const idx = siblings.indexOf(entry.target);
                    const delay = idx > 0 ? idx * 80 : 0;
                    setTimeout(() => entry.target.classList.add('visible'), delay);
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.08, rootMargin: '0px 0px -20px 0px' });
        document.querySelectorAll(animSelector).forEach(el => obs.observe(el));

        // --- Newsletter forms ---
        document.querySelectorAll('.newsletter-form, .footer-newsletter-form').forEach(form => {
            form.addEventListener('submit', e => {
                e.preventDefault();
                const input = form.querySelector('input');
                const box = form.closest('.newsletter-box') || form.closest('.footer-newsletter');
                if (input && input.value) {
                    input.value = '';
                    if (box) {
                        const msg = box.querySelector('.newsletter-success');
                        if (msg) { msg.style.display = 'block'; setTimeout(() => msg.style.display = 'none', 4000); }
                    }
                    const btn = form.querySelector('button');
                    if (btn) {
                        const orig = btn.textContent;
                        btn.textContent = '✓ Subscribed!';
                        btn.style.background = 'var(--accent-green)';
                        setTimeout(() => { btn.textContent = orig; btn.style.background = ''; }, 3000);
                    }
                }
            });
        });

        // --- Dropdown menus ---
        const isMobile = () => window.innerWidth <= 768;
        document.querySelectorAll('.nav-dropdown').forEach(dd => {
            const trigger = dd.querySelector('.dropdown-trigger');
            // Desktop: hover
            dd.addEventListener('mouseenter', () => { if (!isMobile()) { dd.classList.add('active'); if (trigger) trigger.setAttribute('aria-expanded', 'true'); } });
            dd.addEventListener('mouseleave', () => { if (!isMobile()) { dd.classList.remove('active'); if (trigger) trigger.setAttribute('aria-expanded', 'false'); } });
            // Mobile: tap the trigger to toggle
            if (trigger) {
                trigger.addEventListener('click', (e) => {
                    if (isMobile()) {
                        e.preventDefault();
                        const isOpen = dd.classList.toggle('active');
                        trigger.setAttribute('aria-expanded', String(isOpen));
                    }
                });
            }
        });

        // --- FAQ Accordion (if on page) ---
        document.querySelectorAll('.faq-question').forEach(btn => {
            btn.addEventListener('click', () => {
                const item = btn.parentElement;
                const isOpen = item.classList.contains('active');
                document.querySelectorAll('.faq-item.active').forEach(openItem => {
                    if (openItem !== item) openItem.classList.remove('active');
                });
                item.classList.toggle('active', !isOpen);
                btn.setAttribute('aria-expanded', String(!isOpen));
            });
        });

        // --- Pricing toggle (if on page) ---
        const pricingToggle = document.getElementById('pricingToggle');
        const toggleMonthly = document.getElementById('toggleMonthly');
        const toggleAnnual = document.getElementById('toggleAnnual');
        if (pricingToggle && toggleMonthly && toggleAnnual) {
            let isAnnual = false;
            pricingToggle.addEventListener('click', () => {
                isAnnual = !isAnnual;
                pricingToggle.classList.toggle('active', isAnnual);
                toggleMonthly.classList.toggle('active', !isAnnual);
                toggleAnnual.classList.toggle('active', isAnnual);
                document.querySelectorAll('.plan-price .amount').forEach(el => {
                    const target = isAnnual ? parseInt(el.dataset.annual) : parseInt(el.dataset.monthly);
                    animateValue(el, parseInt(el.textContent), target, 400);
                });
            });
        }

        // --- Stat counter animation ---
        const statObs = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const target = parseInt(el.dataset.target);
                    if (!isNaN(target)) animateValue(el, 0, target, 1800);
                    statObs.unobserve(el);
                }
            });
        }, { threshold: 0.5 });
        document.querySelectorAll('.stat-number[data-target]').forEach(el => statObs.observe(el));

        // --- Parallax on hero orbs ---
        const orbs = document.querySelectorAll('.orb');
        if (orbs.length) {
            window.addEventListener('mousemove', (e) => {
                const x = (e.clientX / window.innerWidth - 0.5) * 2;
                const y = (e.clientY / window.innerHeight - 0.5) * 2;
                orbs.forEach((orb, i) => {
                    const factor = (i + 1) * 12;
                    orb.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
                });
            }, { passive: true });
        }

        // --- Back to Top button ---
        const btt = document.createElement('button');
        btt.className = 'back-to-top';
        btt.id = 'backToTop';
        btt.setAttribute('aria-label', 'Back to top');
        btt.innerHTML = '↑';
        document.body.appendChild(btt);
        window.addEventListener('scroll', () => {
            btt.classList.toggle('visible', window.scrollY > 500);
        }, { passive: true });
        btt.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        // --- Cookie Consent ---
        if (!localStorage.getItem('eidon_cookie_consent')) {
            const banner = document.createElement('div');
            banner.className = 'cookie-banner';
            banner.id = 'cookieBanner';
            banner.setAttribute('role', 'alert');
            banner.innerHTML = `
                <p>We use cookies to improve your experience. By using this site, you agree to our <a href="${prefix}privacy/">Privacy Policy</a>.</p>
                <button class="btn btn-primary btn-sm" id="cookieAccept">Accept</button>
            `;
            document.body.appendChild(banner);
            setTimeout(() => banner.classList.add('visible'), 1000);
            document.getElementById('cookieAccept').addEventListener('click', () => {
                localStorage.setItem('eidon_cookie_consent', '1');
                banner.classList.remove('visible');
                setTimeout(() => banner.remove(), 400);
            });
        }

        // --- Breadcrumb JSON-LD ---
        const bc = document.querySelector('.breadcrumb');
        if (bc) {
            const links = bc.querySelectorAll('a');
            const current = bc.querySelector('.current');
            if (links.length && current) {
                const items = [];
                links.forEach((a, i) => {
                    items.push({ '@type': 'ListItem', 'position': i + 1, 'name': a.textContent.trim(), 'item': a.href });
                });
                items.push({ '@type': 'ListItem', 'position': items.length + 1, 'name': current.textContent.trim() });
                const schema = document.createElement('script');
                schema.type = 'application/ld+json';
                schema.textContent = JSON.stringify({ '@context': 'https://schema.org', '@type': 'BreadcrumbList', 'itemListElement': items });
                document.head.appendChild(schema);
            }
        }

        // --- Mobile comparison table scroll ---
        document.querySelectorAll('.comparison-table').forEach(table => {
            if (!table.parentElement.classList.contains('table-scroll')) {
                const wrapper = document.createElement('div');
                wrapper.className = 'table-scroll';
                table.parentNode.insertBefore(wrapper, table);
                wrapper.appendChild(table);
            }
        });

        // --- Main landmark role ---
        const mainEl = document.querySelector('main');
        if (mainEl) mainEl.setAttribute('role', 'main');
    }

    // --- Animate counter value ---
    function animateValue(el, start, end, duration) {
        const range = end - start;
        if (range === 0) { el.textContent = end; return; }
        const startTime = performance.now();
        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.round(start + range * ease);
            if (progress < 1) requestAnimationFrame(update);
        }
        requestAnimationFrame(update);
    }

    // --- Insert nav+footer when DOM is ready ---
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            document.body.prepend(createNav());
            document.body.appendChild(createFooter());
            injectIcons();
            initShared();
            injectZipchat();
        });
    } else {
        // DOM already loaded
        document.body.prepend(createNav());
        document.body.appendChild(createFooter());
        injectIcons();
        initShared();
        injectZipchat();
    }

    // --- Zipchat AI Widget ---
    function injectZipchat() {
        if (document.querySelector('script[src*="zipchat.ai"]')) return; // prevent duplicates
        var s = document.createElement('script');
        s.src = 'https://app.zipchat.ai/widget/zipchat.js?id=E82fNxKy6w2EGkD6tg3C';
        s.setAttribute('data-no-optimize', '1');
        s.defer = true;
        document.body.appendChild(s);
    }
})();
