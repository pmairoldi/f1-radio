import type { Post } from '$lib/blog';
import { error } from '@sveltejs/kit';
import type { Component } from 'svelte';
import type { PageLoad } from './$types';

async function getPost(slug: string) {
	const post = await import(`../../../posts/${slug}.md`);

	return {
		content: post.default as Component,
		meta: post.metadata as Post
	};
}

export const load: PageLoad = async ({ params }) => {
	try {
		const post = await getPost(params.slug);

		return post;
	} catch {
		error(404, `Could not find ${params.slug}`);
	}
};
