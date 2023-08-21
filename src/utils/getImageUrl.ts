import type { SupabaseClient } from '@supabase/supabase-js';

export function getImageUrl(supabase: SupabaseClient, id: string) {
	const res = supabase.storage.from('ogps').getPublicUrl(id);
	const image_url = res.data.publicUrl;
	return image_url;
}
