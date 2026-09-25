// Runs in <head> before paint so the page never flashes the wrong theme.
// Follows the OS until the visitor picks a theme with the toggle.
export const themeScript = `(function(){try{var t=localStorage.getItem("theme");var d=t?t==="dark":matchMedia("(prefers-color-scheme: dark)").matches;document.documentElement.classList.toggle("dark",d)}catch(e){}})()`;
