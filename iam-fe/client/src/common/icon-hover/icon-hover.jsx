import './icon-hover.css';

import React, { useState } from "react";

/**
 * IconHover Component
 * Props:
 * - src: default icon URL
 * - hoverSrc: hover icon URL
 * - alt: image alt text
 * - allowHover: boolean, allow hover effect (default: true)
 * - hoveredExternally: boolean, if provided, controls hover externally
 * - className: custom classes (optional)
 */
function IconHover({
    src,
    hoverSrc,
    onClick,
    alt = "",
    allowHover = true,
    hoveredExternally,
    className = ""
}) {
    const [isHovered, setIsHovered] = useState(false);

    const activeHover = hoveredExternally !== undefined ? hoveredExternally : isHovered;

    return (
        <img
            onClick={() => onClick && onClick()}
            src={activeHover ? hoverSrc : src}
            alt={alt}
            className={`icon ${className}`}
            style={{ cursor: allowHover ? "pointer" : "default", transition: "0.2s ease" }}
            onMouseEnter={() => allowHover && setIsHovered(true)}
            onMouseLeave={() => allowHover && setIsHovered(false)}
        />
    );
}

export default IconHover;
