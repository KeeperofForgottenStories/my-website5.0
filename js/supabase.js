const SUPABASE_URL = "sb_publishable_ut77tWwxny5LjRw4uVuWaw_ISl_wJIv";

const SUPABASE_ANON_KEY = "sb_secret_IZbVruPx88L0QbYTAixIIA_CSeAf4BO";

const supabaseClient =
    window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_ANON_KEY
    );
