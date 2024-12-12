import Image from "next/image";

export default function Home() {
  return (
    <div>
      <a href='/login'>Login</a>
      <a href='/dashboard'>Dashboard</a>
      <a href='/error'>Error</a>
      <a href='/logout'> Logout</a>
    </div>
  );
}
