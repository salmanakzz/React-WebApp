import React from "react";

function MenuIcon() {
  return (
    <svg
      style={{
        width: "1em",
        height: "1em",
        display: "inline-block",
        fill: "currentcolor",
        fontSize: "1.2rem",
      }}
      focusable="false"
      aria-hidden="true"
      viewBox="0 0 24 24"
      data-testid="MenuIcon"
    >
      <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path>
    </svg>
  );
}

export default MenuIcon;
