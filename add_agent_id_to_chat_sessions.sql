ALTER TABLE public.chat_sessions ADD COLUMN IF NOT EXISTS agent_id TEXT;
ALTER TABLE public.chat_sessions ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'Active';
