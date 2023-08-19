import { fail, redirect } from '@sveltejs/kit';

export const actions = {
	default: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
		const email = formData.get('email');

		const { error } = await supabase.auth.resetPasswordForEmail(email, {
			redirectTo: 'https://techbloghub.net/auth/updatePassword'
		});

		if (error) {
			if (error.message === 'Email rate limit exceeded') {
				return fail(400, { message: 'サービスが混み合っています。数分後に再度お試しください' });
			} else {
				return fail(400, { message: 'サービスで問題が発生しました。もう一度やり直して下さい。' });
			}
		}

		throw redirect(303, '/auth/emailSent');
	}
};
