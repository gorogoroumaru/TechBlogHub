import { fail, redirect } from '@sveltejs/kit';

export const actions = {
	default: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
		const email = formData.get('email');

		const { error } = await supabase.auth.resetPasswordForEmail(email, {
			redirectTo: 'https://studyfrontier.pages.dev/auth/updatePassword'
		});

		if (error) {
			return fail(400);
		}

		throw redirect(303, '/auth/emailSent');
	}
};
