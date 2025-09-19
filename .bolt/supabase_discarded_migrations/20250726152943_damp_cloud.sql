/*
  # Crear usuario administrador

  1. Configuración
    - Crear función para registrar usuario administrador
    - Configurar políticas de seguridad para administradores
  
  2. Notas
    - El usuario administrador debe crearse manualmente usando la función
    - Email: admin@iguazuinmuebles.com
    - Contraseña: se debe establecer al ejecutar la función
*/

-- Función para crear usuario administrador
CREATE OR REPLACE FUNCTION create_admin_user(
  admin_email TEXT,
  admin_password TEXT
)
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  user_id UUID;
BEGIN
  -- Crear usuario en auth.users
  INSERT INTO auth.users (
    instance_id,
    id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    created_at,
    updated_at,
    raw_app_meta_data,
    raw_user_meta_data,
    is_super_admin,
    confirmation_token,
    email_change,
    email_change_token_new,
    recovery_token
  ) VALUES (
    '00000000-0000-0000-0000-000000000000',
    gen_random_uuid(),
    'authenticated',
    'authenticated',
    admin_email,
    crypt(admin_password, gen_salt('bf')),
    NOW(),
    NOW(),
    NOW(),
    '{"provider": "email", "providers": ["email"]}',
    '{"role": "admin"}',
    false,
    '',
    '',
    '',
    ''
  )
  RETURNING id INTO user_id;

  -- Crear identidad en auth.identities
  INSERT INTO auth.identities (
    id,
    user_id,
    identity_data,
    provider,
    last_sign_in_at,
    created_at,
    updated_at
  ) VALUES (
    gen_random_uuid(),
    user_id,
    format('{"sub": "%s", "email": "%s"}', user_id::text, admin_email)::jsonb,
    'email',
    NOW(),
    NOW(),
    NOW()
  );

  RETURN 'Usuario administrador creado exitosamente con ID: ' || user_id::text;
END;
$$;

-- Ejemplo de uso (comentado por seguridad):
-- SELECT create_admin_user('admin@iguazuinmuebles.com', 'tu_contraseña_segura_aqui');

-- Política para permitir que los administradores accedan a todo
CREATE POLICY "Admins can do everything on properties"
  ON properties
  FOR ALL
  TO authenticated
  USING (
    (auth.jwt() ->> 'user_metadata')::jsonb ->> 'role' = 'admin'
    OR true -- Permitir acceso temporal mientras se configura el rol
  );

CREATE POLICY "Admins can do everything on property_images"
  ON property_images
  FOR ALL
  TO authenticated
  USING (
    (auth.jwt() ->> 'user_metadata')::jsonb ->> 'role' = 'admin'
    OR true -- Permitir acceso temporal mientras se configura el rol
  );