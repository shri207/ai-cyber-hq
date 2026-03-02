import { useEffect, useRef } from "react";

/**
 * Floating neon particles that drift upward with a subtle glow.
 * Lighter-weight than Matrix rain; used on interior pages.
 */
export default function FloatingParticles({ count = 30 }) {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        let animId;
        let particles = [];

        function resize() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        resize();
        window.addEventListener("resize", resize);

        // Initialize particles
        for (let i = 0; i < count; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                r: Math.random() * 2.5 + 0.5,
                dx: (Math.random() - 0.5) * 0.3,
                dy: -(Math.random() * 0.5 + 0.2),
                opacity: Math.random() * 0.5 + 0.1,
                hue: Math.random() > 0.7 ? 140 : 120, // green variants
            });
        }

        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach((p) => {
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = `hsla(${p.hue}, 100%, 50%, ${p.opacity})`;
                ctx.fill();

                // Glow
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r * 3, 0, Math.PI * 2);
                ctx.fillStyle = `hsla(${p.hue}, 100%, 50%, ${p.opacity * 0.15})`;
                ctx.fill();

                // Move
                p.x += p.dx;
                p.y += p.dy;

                // Wrap
                if (p.y < -10) { p.y = canvas.height + 10; p.x = Math.random() * canvas.width; }
                if (p.x < -10) p.x = canvas.width + 10;
                if (p.x > canvas.width + 10) p.x = -10;
            });
            animId = requestAnimationFrame(draw);
        }

        draw();

        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener("resize", resize);
        };
    }, [count]);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none"
            style={{ zIndex: -1, opacity: 0.5 }}
            aria-hidden="true"
        />
    );
}
