import { currentUser, pb } from '$lib/pocketbase.js';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
	const order = await pb.collection('orders').getOne(params.slug, {
		expand: 'education_level, client, service_type, current_task'
	});
	if (!order) throw error(404);

	return {
		order
	};
}