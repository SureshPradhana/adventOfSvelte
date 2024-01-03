
import { writable } from 'svelte/store';

// Create a writable store to hold the gifts
export const gifts = writable([]);

// Fetch the gifts from the URL
fetch('https://advent.sveltesociety.dev/data/2023/day-sixteen.json')
    .then(response => response.json())
    .then(data => {
        // Update the gifts store with the fetched data
        gifts.set(data);
    }).catch(error => console.error('Error:', error));


    // console.log(gifts.getContext(key));
