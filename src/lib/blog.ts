import { dev } from '$app/environment';

export type Post = {
	title: string;
	slug: string;
	description: string;
	date: string;
	categories: string[];
	published: boolean;
};

function getSlug(path: string) {
	const filename = path.split('/').at(-1);
	if (filename == null) {
		return null;
	}

	return filename.replace('.md', '');
}

export function getPosts() {
	let posts: Post[] = [];

	const paths = import.meta.glob('../posts/*.md', { eager: true });

	for (const path in paths) {
		const file = paths[path];
		const slug = getSlug(path);

		if (file && typeof file === 'object' && 'metadata' in file && slug) {
			const metadata = file.metadata as Omit<Post, 'slug'>;
			const post = { ...metadata, slug } satisfies Post;

			if (post.published || dev) {
				posts.push(post);
			}
		}
	}

	posts = posts.sort(
		(first, second) => new Date(second.date).getTime() - new Date(first.date).getTime()
	);

	return posts;
}
