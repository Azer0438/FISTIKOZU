import { hasText, safeLink, validHours } from "./content.js";

export function createStructuredData(data, menuPage = false) {
  const base = new URL(data.canonicalBase).origin;
  const organizationId = `${base}/#organization`;
  const graph = [
    {
      "@type": "Organization", "@id": organizationId,
      name: data.brand, url: `${base}/`, logo: new URL(data.logoPath, base).href
    },
    {
      "@type": "WebSite", "@id": `${base}/#website`,
      name: data.brand, url: `${base}/`, inLanguage: "tr-TR",
      publisher: { "@id": organizationId }
    }
  ];
  const socials = (data.socialLinks || []).map((link) => safeLink(link.url)).filter(Boolean);
  if (socials.length) graph[0].sameAs = socials;

  // LocalBusiness requires a real postal address; missing details are never inferred.
  for (const branch of data.branches || []) {
    const address = branch.address;
    if (!address || !hasText(address.streetAddress) || !hasText(address.addressLocality)
      || !hasText(address.addressCountry)) continue;
    const business = {
      "@type": branch.type === "cafe" ? "CafeOrCoffeeShop" : "Bakery",
      "@id": `${base}/#${branch.id}`, name: branch.name,
      url: `${base}/#sube-${branch.id}`,
      parentOrganization: { "@id": organizationId },
      address: { "@type": "PostalAddress", ...Object.fromEntries(Object.entries(address).filter(([, value]) => hasText(value))) }
    };
    if (hasText(branch.phone)) business.telephone = branch.phone;
    if (safeLink(branch.image)) business.image = new URL(branch.image, base).href;
    if (safeLink(branch.mapsUrl)) business.hasMap = branch.mapsUrl;
    if (branch.qrMenu) business.hasMenu = new URL(data.qrMenuPath, base).href;
    const { latitude, longitude } = branch.coordinates || {};
    if (Number.isFinite(latitude) && Math.abs(latitude) <= 90
      && Number.isFinite(longitude) && Math.abs(longitude) <= 180) {
      business.geo = { "@type": "GeoCoordinates", latitude, longitude };
    }
    const hours = validHours(branch.workingHours);
    if (hours.length) business.openingHoursSpecification = hours.map(({ days, opens, closes }) => ({
      "@type": "OpeningHoursSpecification", dayOfWeek: days, opens, closes
    }));
    if (!menuPage || branch.qrMenu) graph.push(business);
  }
  return { "@context": "https://schema.org", "@graph": graph };
}
