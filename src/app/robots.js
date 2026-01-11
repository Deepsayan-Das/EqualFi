

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: ["/","docs"],
      disallow: ["/dashboard", "/authn","/info"], // private pages
    },
    sitemap: "https://equalfi.online/sitemap.xml",
  };
}
