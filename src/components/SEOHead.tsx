
import { useEffect, useState } from 'react';
import { supabase } from "@/integrations/supabase/client";

interface SEOSettings {
  site_title: string;
  site_description: string;
  site_keywords: string;
  site_author: string;
  canonical_url: string;
  og_title: string;
  og_description: string;
  og_image: string;
  og_type: string;
  og_site_name: string;
  og_locale: string;
  twitter_title: string;
  twitter_description: string;
  twitter_image: string;
  twitter_card: string;
  twitter_site: string;
  geo_region: string;
  geo_placename: string;
  geo_position: string;
  robots_index: boolean;
  robots_follow: boolean;
  robots_noarchive: boolean;
  robots_nosnippet: boolean;
  google_site_verification: string;
  bing_site_verification: string;
  yandex_verification: string;
  schema_type: string;
  schema_name: string;
  schema_description: string;
  schema_url: string;
  schema_logo: string;
  schema_address: any;
  schema_offers: any[];
  schema_services: any[];
  hreflang_tags: any[];
  custom_meta_tags: any[];
}

const SEOHead = () => {
  const [seoSettings, setSeoSettings] = useState<SEOSettings | null>(null);

  useEffect(() => {
    loadSEOSettings();
  }, []);

  const loadSEOSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('website_seo_settings')
        .select('*')
        .maybeSingle();

      if (error) {
        return;
      }

      if (data) {
        setSeoSettings({
          ...data,
          schema_address: typeof data.schema_address === 'object' && data.schema_address !== null ? data.schema_address : {},
          schema_offers: Array.isArray(data.schema_offers) ? data.schema_offers : [],
          schema_services: Array.isArray(data.schema_services) ? data.schema_services : [],
          hreflang_tags: Array.isArray(data.hreflang_tags) ? data.hreflang_tags : [],
          custom_meta_tags: Array.isArray(data.custom_meta_tags) ? data.custom_meta_tags : []
        });
      }
    } catch (error) {
      // Fail silently, use default meta tags from index.html
    }
  };

  const generateRobotsContent = () => {
    if (!seoSettings) return 'index, follow';
    
    let robots = [];
    if (seoSettings.robots_index) robots.push('index');
    else robots.push('noindex');
    
    if (seoSettings.robots_follow) robots.push('follow');
    else robots.push('nofollow');
    
    if (seoSettings.robots_noarchive) robots.push('noarchive');
    if (seoSettings.robots_nosnippet) robots.push('nosnippet');
    
    return robots.join(', ');
  };

  const generateStructuredData = () => {
    if (!seoSettings) return null;
    
    // Use a more flexible type that allows dynamic properties
    const structuredData: Record<string, any> = {
      "@context": "https://schema.org",
      "@type": seoSettings.schema_type,
      "name": seoSettings.schema_name,
      "description": seoSettings.schema_description,
      "url": seoSettings.schema_url,
      "logo": seoSettings.schema_logo,
      "address": seoSettings.schema_address,
      "offers": seoSettings.schema_offers,
      "makesOffer": seoSettings.schema_services
    };

    // Add opening hours if available
    if (seoSettings.schema_address?.openingHours) {
      structuredData.openingHours = seoSettings.schema_address.openingHours;
    }

    // Add price range if available
    if (seoSettings.schema_address?.priceRange) {
      structuredData.priceRange = seoSettings.schema_address.priceRange;
    }

    // Add telephone if available
    if (seoSettings.schema_address?.telephone) {
      structuredData.telephone = seoSettings.schema_address.telephone;
    }

    return structuredData;
  };

  useEffect(() => {
    if (!seoSettings) return;

    // Update document title
    document.title = seoSettings.site_title;

    // Update meta tags
    const updateMetaTag = (name: string, content: string) => {
      if (!content) return;
      let meta = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement('meta');
        meta.name = name;
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    const updatePropertyTag = (property: string, content: string) => {
      if (!content) return;
      let meta = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('property', property);
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    // Update basic meta tags
    updateMetaTag('description', seoSettings.site_description);
    updateMetaTag('keywords', seoSettings.site_keywords);
    updateMetaTag('author', seoSettings.site_author);
    updateMetaTag('robots', generateRobotsContent());

    // Update geo tags
    updateMetaTag('geo.region', seoSettings.geo_region);
    updateMetaTag('geo.placename', seoSettings.geo_placename);
    updateMetaTag('geo.position', seoSettings.geo_position);
    updateMetaTag('ICBM', seoSettings.geo_position.replace(';', ', '));

    // Update site verification
    if (seoSettings.google_site_verification) {
      updateMetaTag('google-site-verification', seoSettings.google_site_verification);
    }
    if (seoSettings.bing_site_verification) {
      updateMetaTag('msvalidate.01', seoSettings.bing_site_verification);
    }
    if (seoSettings.yandex_verification) {
      updateMetaTag('yandex-verification', seoSettings.yandex_verification);
    }

    // Update Open Graph tags
    updatePropertyTag('og:type', seoSettings.og_type);
    updatePropertyTag('og:url', seoSettings.canonical_url);
    updatePropertyTag('og:title', seoSettings.og_title);
    updatePropertyTag('og:description', seoSettings.og_description);
    updatePropertyTag('og:image', seoSettings.og_image);
    updatePropertyTag('og:site_name', seoSettings.og_site_name);
    updatePropertyTag('og:locale', seoSettings.og_locale);

    // Update Twitter tags
    updatePropertyTag('twitter:card', seoSettings.twitter_card);
    updatePropertyTag('twitter:url', seoSettings.canonical_url);
    updatePropertyTag('twitter:title', seoSettings.twitter_title);
    updatePropertyTag('twitter:description', seoSettings.twitter_description);
    updatePropertyTag('twitter:image', seoSettings.twitter_image);
    if (seoSettings.twitter_site) {
      updatePropertyTag('twitter:site', seoSettings.twitter_site);
    }

    // Update canonical URL
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = seoSettings.canonical_url;

    // Update hreflang tags
    // Remove existing hreflang tags
    document.querySelectorAll('link[rel="alternate"][hreflang]').forEach(link => link.remove());
    
    // Add new hreflang tags
    seoSettings.hreflang_tags?.forEach((tag: any) => {
      if (tag.hreflang && tag.href) {
        const hreflangLink = document.createElement('link');
        hreflangLink.rel = 'alternate';
        hreflangLink.hreflang = tag.hreflang;
        hreflangLink.href = tag.href;
        document.head.appendChild(hreflangLink);
      }
    });

    // Update custom meta tags
    // Remove existing custom tags (with data-custom attribute)
    document.querySelectorAll('meta[data-custom="true"]').forEach(meta => meta.remove());
    
    // Add new custom meta tags
    seoSettings.custom_meta_tags?.forEach((tag: any) => {
      if ((tag.name || tag.property) && tag.content) {
        const meta = document.createElement('meta');
        meta.setAttribute('data-custom', 'true');
        
        if (tag.name) {
          meta.name = tag.name;
        }
        if (tag.property) {
          meta.setAttribute('property', tag.property);
        }
        meta.content = tag.content;
        
        document.head.appendChild(meta);
      }
    });

    // Update structured data
    const structuredData = generateStructuredData();
    if (structuredData) {
      let script = document.querySelector('script[type="application/ld+json"]') as HTMLScriptElement;
      if (!script) {
        script = document.createElement('script');
        script.type = 'application/ld+json';
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(structuredData, null, 2);
    }
  }, [seoSettings]);

  return null; // This component doesn't render anything visible
};

export default SEOHead;
