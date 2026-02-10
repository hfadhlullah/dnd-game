// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

// Svelte 5 component module declarations
declare module '*.svelte' {
	import { SvelteComponent } from 'svelte';
	export default class extends SvelteComponent<any, any, any> {}
}

export {};

