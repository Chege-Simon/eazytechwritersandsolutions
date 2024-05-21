import { currentUser, pb } from '$lib/pocketbase.js';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
	const user = await pb.collection('users').getOne(params.slug, {
		expand: 'orders, tasks'
	});
	console.log(user)
	if (!user) throw error(404);

	return {
		user
	};
}