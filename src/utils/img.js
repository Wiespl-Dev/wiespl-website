// Builds the URL for a file in public/images, respecting the site's base path
// (the site is served from /wiespl-website/ on GitHub Pages, and from / locally).
export const img = (file) => `${import.meta.env.BASE_URL}images/${file}`;
