import { getPosts } from '$lib/blog';
import type { EntryGenerator } from './$types';

export const entries: EntryGenerator = () => {
	const posts = getPosts();

	return posts.map((post) => {
		return { slug: post.slug };
	});
};
