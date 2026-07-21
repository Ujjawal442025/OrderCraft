import { useEffect } from "react";

const SITE_NAME = "OrderCraft";
const SITE_URL = "https://ujjawal442025.github.io/OrderCraft";
const DEFAULT_OG_IMAGE = `${SITE_URL}/assets/ordercraft-logo.png`;

/**
 * Drop <SEO title="..." description="..." /> at the top of any page
 * component. It updates document.title + the meta/OG/canonical tags in
 * <head> every time the route changes. Google's crawler executes JS, so
 * this is picked up correctly for indexing/search snippets. For social
 * previews (WhatsApp/LinkedIn/Twitter, which usually don't run JS), make
 * sure index.html also has sensible DEFAULT tags as a fallback — see
 * index-html-seo-snippet.html.
 */
function setMetaTag(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setLinkTag(rel, href) {
  let el = document.head.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

export default function SEO({
  title,
  description,
  path = "",
  image = DEFAULT_OG_IMAGE,
}) {
  useEffect(() => {
    const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
    const url = `${SITE_URL}${path}`;

    document.title = fullTitle;

    setMetaTag("name", "description", description);
    setLinkTag("canonical", url);

    // Open Graph
    setMetaTag("property", "og:title", fullTitle);
    setMetaTag("property", "og:description", description);
    setMetaTag("property", "og:url", url);
    setMetaTag("property", "og:image", image);
    setMetaTag("property", "og:type", "website");
    setMetaTag("property", "og:site_name", SITE_NAME);

    // Twitter Card
    setMetaTag("name", "twitter:card", "summary_large_image");
    setMetaTag("name", "twitter:title", fullTitle);
    setMetaTag("name", "twitter:description", description);
    setMetaTag("name", "twitter:image", image);
  }, [title, description, path, image]);

  return null;
}
