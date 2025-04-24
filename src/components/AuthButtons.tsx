// components/AuthButtons.js
import Link from 'next/link';
import { useUser } from '@auth0/nextjs-auth0/client';

export default function AuthButtons() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <div>
      {user ? (
        <>
          <p>Welcome, {user.name}!</p>
          <Link href="/api/auth/logout">
            <a>Logout</a>
          </Link>
        </>
      ) : (
        <Link href="/api/auth/login">
          <a>Login</a>
        </Link>
      )}
    </div>
  );
}
