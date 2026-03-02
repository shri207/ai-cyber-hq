import { useEffect, useRef } from "react";

/**
 * Full-screen canvas that renders a "Matrix rain" effect.
 * Characters scroll downward in columns, fading into the dark background.
 */
export default function MatrixRain() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");

        let w, h, columns, drops;
        const chars = "01アイウエオカキクケコサシスセソタチツテト♦♠♣♥⚡☠️▲▼◆◇";
        const fontSize = 14;

        function resize() {
            w = canvas.width = window.innerWidth;
            h = canvas.height = window.innerHeight;
            columns = Math.floor(w / fontSize);
            drops = Array(columns).fill(1);
        }

        resize();
        window.addEventListener("resize", resize);

        function draw() {
            // Slightly opaque black to create trail effect
            ctx.fillStyle = "rgba(10, 10, 10, 0.06)";
            ctx.fillRect(0, 0, w, h);

            ctx.fillStyle = "#39FF14";
            ctx.font = `${fontSize}px monospace`;

            for (let i = 0; i < drops.length; i++) {
                const char = chars[Math.floor(Math.random() * chars.length)];
                const x = i * fontSize;
                const y = drops[i] * fontSize;

                // Vary brightness for depth
                const brightness = Math.random();
                if (brightness > 0.7) {
                    ctx.fillStyle = "#39FF14";
                    ctx.globalAlpha = 0.9;
                } else if (brightness > 0.4) {
                    ctx.fillStyle = "#00e676";
                    ctx.globalAlpha = 0.5;
                } else {
                    ctx.fillStyle = "#39FF14";
                    ctx.globalAlpha = 0.2;
                }

                ctx.fillText(char, x, y);

                if (y > h && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }

            ctx.globalAlpha = 1;
        }

        const interval = setInterval(draw, 50);

        return () => {
            clearInterval(interval);
            window.removeEventListener("resize", resize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="matrix-overlay"
            aria-hidden="true"
        />
    );
}
