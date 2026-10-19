import { getCollection, type CollectionEntry } from 'astro:content';
import { createReader, type Entry } from '@keystatic/core/reader';
import keystaticConfig from '../../keystatic.config';

export const reader = createReader(process.cwd(), keystaticConfig);

export type SiteSettings = Entry<typeof keystaticConfig.singletons.site>;
export type HomeContent = Entry<typeof keystaticConfig.singletons.home>;

export async function getPosts(): Promise<CollectionEntry<'posts'>[]> {
  const posts = await getCollection('posts');
  return posts.sort((a, b) => {
    const aDate = a.data.publishedAt?.getTime();
    const bDate = b.data.publishedAt?.getTime();
    if (aDate !== bDate) {
      if (aDate === undefined) return 1;
      if (bDate === undefined) return -1;
      return bDate - aDate;
    }
    return a.id < b.id ? -1 : a.id > b.id ? 1 : 0;
  });
}

export async function getServices(): Promise<CollectionEntry<'services'>[]> {
  const services = await getCollection('services');
  return services.sort((a, b) => a.id < b.id ? -1 : a.id > b.id ? 1 : 0);
}
