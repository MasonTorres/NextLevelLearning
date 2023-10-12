
import { MetadataRoute } from 'next'
import nllDataFiles from "./content/nllDataFiles.json";


let siteMapUrls: {
    url: string;
    lastModified: string;
    changeFrequency: any;
    priority: any;
  }[] = [];

nllDataFiles.forEach((file) => {
    siteMapUrls.push({
        url: `https://nextlevellearning.azurewebsites.net/${file.data.path}`,
        lastModified: (new Date().toISOString()),
        changeFrequency: 'weekly',
        priority: 1,
    });
});


export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://nextlevellearning.azurewebsites.net',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://nextlevellearning.azurewebsites.net/home',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...siteMapUrls
  ]
}