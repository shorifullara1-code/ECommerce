-- ==============================================================================
-- FIX FOR INFINITE RECURSION ERROR ON PROFILES AND CHAT TABLES
-- ==============================================================================
-- Run this in your Supabase SQL Editor.
-- It replaces the policies that cause infinite recursion with safe functions.

-- 1. Create a function to get the current user's role safely (bypasses RLS loop)
CREATE OR REPLACE FUNCTION public.get_my_role()
RETURNS text AS $$
DECLARE
  user_role text;
BEGIN
  -- We fetch the role from the profiles table. By marking this SECURITY DEFINER,
  -- it runs with the privileges of the creator (postgres) and prevents RLS loops.
  SELECT role INTO user_role FROM public.profiles WHERE id = auth.uid();
  RETURN user_role;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- 2. Drop the old conflicting profile policy
DROP POLICY IF EXISTS "Staff can view all profiles" ON profiles;

-- 3. Create the new safe policy for Staff
CREATE POLICY "Staff can view all profiles" ON profiles 
FOR SELECT USING (
  public.get_my_role() != 'customer'
);

-- 4. Update the is_admin function to use the same safe logic
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
DECLARE
  user_role text;
BEGIN
  SELECT role INTO user_role FROM profiles WHERE id = auth.uid();
  RETURN user_role IN ('superadmin', 'manager');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- 5. Fix the chat_sessions policies
DROP POLICY IF EXISTS "Chat agents and admins can read and manage sessions" ON chat_sessions;

CREATE POLICY "Chat agents and admins can read and manage sessions" ON chat_sessions 
FOR ALL USING (
  public.get_my_role() IN ('superadmin', 'manager', 'chat_agent')
);

-- 6. Fix the chat_messages policies
DROP POLICY IF EXISTS "Chat agents and admins can manage messages" ON chat_messages;

CREATE POLICY "Chat agents and admins can manage messages" ON chat_messages 
FOR ALL USING (
  public.get_my_role() IN ('superadmin', 'manager', 'chat_agent')
);
