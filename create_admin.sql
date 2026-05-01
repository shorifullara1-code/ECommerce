-- Run this script in the Supabase SQL Editor to create your admin user

DO $$
DECLARE
  new_user_id uuid := uuid_generate_v4();
BEGIN
  -- Check if user already exists
  IF EXISTS (SELECT 1 FROM auth.users WHERE email = 'shorifulyt8@gmail.com') THEN
    -- If user exists, update their role
    UPDATE public.profiles
    SET role = 'superadmin'
    WHERE email = 'shorifulyt8@gmail.com';
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
    'shorifulyt8@gmail.com',
    crypt('1', gen_salt('bf')), -- Password is '1'
    now(),
    '{"full_name": "Shoriful Islam"}',
    'authenticated',
    'authenticated',
    now(),
    now()
  );

  -- 2. The trigger "on_auth_user_created" from your previous schema will automatically 
  -- create a profile in public.profiles. We just update it to be an admin.
  UPDATE public.profiles 
  SET role = 'superadmin', full_name = 'Shoriful Islam'
  WHERE id = new_user_id;

END $$;
