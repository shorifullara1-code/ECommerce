-- Run this script in the Supabase SQL Editor to create a Live Chat Agent

DO $$
DECLARE
  new_user_id uuid := uuid_generate_v4();
  agent_email text := 'agent@store.com'; -- Replace with the agent's email
  agent_password text := 'agent123';    -- Replace with the agent's password
  agent_name text := 'Live Chat Agent'; -- Replace with the agent's name
BEGIN
  -- Check if user already exists
  IF EXISTS (SELECT 1 FROM auth.users WHERE email = agent_email) THEN
    -- If user exists, update their role
    UPDATE public.profiles
    SET role = 'chat_agent'
    WHERE email = agent_email;
    RETURN;
  END IF;

  -- 1. Insert into auth.users
  INSERT INTO auth.users (
    id,
    instance_id,
    email,
    encrypted_password,
    email_confirmed_at,
    raw_user_meta_data,
    aud,
    role,
    created_at,
    updated_at
  ) VALUES (
    new_user_id,
    '00000000-0000-0000-0000-000000000000',
    agent_email,
    crypt(agent_password, gen_salt('bf')),
    now(),
    jsonb_build_object('full_name', agent_name),
    'authenticated',
    'authenticated',
    now(),
    now()
  );

  -- 2. The trigger "on_auth_user_created" will auto-create a profile.
  -- Update it to be a chat_agent.
  UPDATE public.profiles 
  SET role = 'chat_agent', full_name = agent_name
  WHERE id = new_user_id;

END $$;
