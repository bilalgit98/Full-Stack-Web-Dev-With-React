"use client";
import axios from "axios";
import CreatePost from "./components/AddPost";
import { useQuery } from "@tanstack/react-query";
const allPosts = async () => {
  const response = await axios.get("/api/posts/getPost");
  return response.data;
};

export default function Home() {
  const { data, error, isLoading } = useQuery({
    queryFn: allPosts,
    queryKey: ["posts"],
  });
  if (error) return error;
  if (isLoading) return "Loading...";
  console.log(data);

  return (
    <main>
      <h1> Hello there 👋</h1>
      <CreatePost />
    </main>
  );
}
