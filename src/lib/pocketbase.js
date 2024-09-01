import PocketBase from 'pocketbase';
import { writable } from 'svelte/store';
 
const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://127.0.0.1:8090/';
export const pb = new PocketBase(backendUrl); 


export const currentUser = writable(pb.authStore.model);

pb.authStore.onChange((auth) => {
    // console.log('authStore changed', auth);
    currentUser.set(pb.authStore.model);
});