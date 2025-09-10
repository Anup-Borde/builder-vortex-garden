import { redirect } from "next/navigation";

export default function Home() {
  // Immediately redirect to signin on the server to avoid client-side stalls
  redirect("/signin");
}
