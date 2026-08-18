"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Eye, Edit, Trash2, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { createClient } from "@/lib/supabase/client"

interface PostActionsProps {
  postId: string
  postSlug: string
  postTitle: string
  isPublished: boolean
}

export function PostActions({ postId, postSlug, postTitle, isPublished }: PostActionsProps) {
  const [deleting, setDeleting] = useState(false)
  const router = useRouter()

  const handleDelete = async () => {
    setDeleting(true)
    const supabase = createClient()

    const { error } = await supabase
      .from("blog_posts")
      .delete()
      .eq("id", postId)

    if (error) {
      console.error("Failed to delete post:", error)
      setDeleting(false)
      return
    }

    router.refresh()
  }

  return (
    <div className="flex items-center justify-end gap-2">
      {isPublished && (
        <Link href={`/insights/${postSlug}`} target="_blank">
          <Button variant="ghost" size="icon">
            <Eye className="h-4 w-4" />
          </Button>
        </Link>
      )}
      <Link href={`/admin/posts/${postId}/edit`}>
        <Button variant="ghost" size="icon">
          <Edit className="h-4 w-4" />
        </Button>
      </Link>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
            {deleting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Post</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete &quot;{postTitle}&quot;? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
