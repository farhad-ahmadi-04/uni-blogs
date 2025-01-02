"use client"
import { useScroll, useSpring } from "motion/react";
import * as motion from "motion/react-client"
function ScrollIndicator() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 15,
        restDelta: 0.001,
    })

    return (<motion.div
        id="scroll-indicator"
        style={{
            scaleX,
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            height: 10,
            originX: 0,
            zIndex: 99,
            backgroundColor: "var(--bg-primary)",
        }}
    />);
}

export default ScrollIndicator;