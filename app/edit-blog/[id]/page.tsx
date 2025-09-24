"use client"
import EditBlogPage from "@/components/Edit-Blog";
import { useParams } from "next/navigation";

export default function Page() {
    const params = useParams();
    const blogId = params.id as string;
    if(!blogId){
        return null;
    }
    return (
        <EditBlogPage/>
    )
}