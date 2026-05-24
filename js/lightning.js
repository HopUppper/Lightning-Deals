/* ==========================================================================
   LIGHTNING DEALS - REALISTIC BACKGROUND LIGHTNING ENGINE
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // Create and inject background canvas
    let canvas = document.getElementById('lightning-canvas');
    if (!canvas) {
        canvas = document.createElement('canvas');
        canvas.id = 'lightning-canvas';
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.pointerEvents = 'none';
        canvas.style.zIndex = '2'; // Behind active text/cards, but in front of mesh/orbs
        canvas.style.opacity = '0';
        document.body.appendChild(canvas);
    }

    const ctx = canvas.getContext('2d');

    // Resize handler
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Curated storm colors (harmonious with dark purple/cyan theme)
    const stormPalettes = [
        { stroke: '#00F2FE', glow: 'rgba(0, 242, 254, 0.85)' },  // Neon Electric Cyan
        { stroke: '#ffffff', glow: 'rgba(0, 242, 254, 0.95)' },  // White Hot Core
        { stroke: '#a855f7', glow: 'rgba(168, 85, 247, 0.85)' }  // Arc Purple
    ];

    function randomRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    class Segment {
        constructor(start, end) {
            this.start = start;
            this.end = end;
        }
    }

    // Generate main lightning bolt points
    function createBolt(startX, startY, endX, endY, displacement) {
        const segments = [];
        const points = [{ x: startX, y: startY }];
        
        let currentY = startY;
        let currentX = startX;
        
        const steps = Math.floor(randomRange(18, 30));
        const stepY = (endY - startY) / steps;

        for (let i = 1; i < steps; i++) {
            currentY += stepY;
            // Jagged deflection factor
            const deflection = randomRange(-displacement, displacement);
            currentX += deflection;
            points.push({ x: currentX, y: currentY });
            
            // Generate a smaller branch off the main line
            if (Math.random() < 0.12 && i < steps - 4) {
                // Branch spreads out wider horizontally
                const branchEndX = currentX + randomRange(-140, 140);
                const branchEndY = currentY + randomRange(60, 180);
                createBranch(currentX, currentY, branchEndX, branchEndY, displacement * 0.7, segments);
            }
        }
        
        points.push({ x: endX, y: endY });

        for (let i = 0; i < points.length - 1; i++) {
            segments.push(new Segment(points[i], points[i + 1]));
        }
        
        return segments;
    }

    // Generate secondary branching lines
    function createBranch(startX, startY, endX, endY, displacement, segmentsList) {
        const points = [{ x: startX, y: startY }];
        let currentY = startY;
        let currentX = startX;
        
        const steps = Math.floor(randomRange(6, 12));
        const stepY = (endY - startY) / steps;

        for (let i = 1; i < steps; i++) {
            currentY += stepY;
            currentX += randomRange(-displacement, displacement);
            points.push({ x: currentX, y: currentY });
        }
        points.push({ x: endX, y: endY });

        for (let i = 0; i < points.length - 1; i++) {
            segmentsList.push(new Segment(points[i], points[i + 1]));
        }
    }

    // Draw the segments list
    function drawBolt(segments, color) {
        ctx.strokeStyle = color.stroke;
        ctx.shadowColor = color.glow;
        ctx.shadowBlur = randomRange(12, 28);
        ctx.lineWidth = randomRange(1.8, 3.2);
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        
        ctx.beginPath();
        segments.forEach(seg => {
            ctx.moveTo(seg.start.x, seg.start.y);
            ctx.lineTo(seg.end.x, seg.end.y);
        });
        ctx.stroke();
    }

    // Complete double-flash strike trigger
    function triggerStrike() {
        // Random horizontal start, ending further down
        const startX = randomRange(window.innerWidth * 0.15, window.innerWidth * 0.85);
        const startY = 0;
        const endX = startX + randomRange(-180, 180);
        // Lightning doesn't have to reach the bottom, making it more realistic
        const endY = randomRange(window.innerHeight * 0.35, window.innerHeight * 0.85);
        
        const color = stormPalettes[Math.floor(Math.random() * stormPalettes.length)];
        const bolt1 = createBolt(startX, startY, endX, endY, 18);
        
        // Slight offset for double strike path
        const bolt2 = createBolt(startX + randomRange(-20, 20), startY, endX + randomRange(-40, 40), endY + randomRange(-20, 20), 14);

        // --- Sequence Frame 1: First strike ---
        canvas.style.opacity = '1';
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBolt(bolt1, color);
        
        // --- Sequence Frame 2: Dark phase (rapid disconnect) ---
        setTimeout(() => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            canvas.style.opacity = '0';
        }, 50);

        // --- Sequence Frame 3: Second strike ---
        setTimeout(() => {
            canvas.style.opacity = '0.95';
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawBolt(bolt2, color);
            
            // Brief ambient lightning sky reflection (soft background glow)
            const bodyBg = document.body.style.backgroundColor;
            const stormGlowColor = color.stroke === '#a855f7' ? 'rgba(168, 85, 247, 0.03)' : 'rgba(0, 242, 254, 0.02)';
            document.body.style.backgroundColor = stormGlowColor;
            
            setTimeout(() => {
                document.body.style.backgroundColor = bodyBg;
            }, 60);

            // --- Sequence Frame 4: Smooth neon fade-out ---
            let opacity = 0.95;
            const fadeInterval = setInterval(() => {
                opacity -= 0.08;
                if (opacity <= 0) {
                    clearInterval(fadeInterval);
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    canvas.style.opacity = '0';
                } else {
                    canvas.style.opacity = opacity.toString();
                }
            }, 25);
        }, 110);
    }

    // Schedule strikes every 5 seconds (randomized interval between 4s and 7s)
    function scheduleStrikes() {
        const nextTime = randomRange(4000, 7000);
        setTimeout(() => {
            triggerStrike();
            scheduleStrikes();
        }, nextTime);
    }

    // Start lightning strikes
    scheduleStrikes();
});
