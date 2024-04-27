import { pb } from '$lib/pocketbase.js';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
    try {
        const record = await pb.collection('tasks').getOne(params.slug, {
            expand: 'user, order, order.education_level, order.client, order.service_type, order.task'
        });
        
        if (!record) {
            throw error(404, 'Task not found');
        }

        return {
            record
        };
    } catch (err) {
        console.error('Error fetching task:', err);
        throw error(500, 'Internal Server Error: ' +  err);
    }
}
