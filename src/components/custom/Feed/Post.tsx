import { Separator } from "@/components/ui/separator";
import AvatarNameSubtitle from "../Shared/AvatarNameSubtitle";
import { Check, LifeBuoy, MessageCircle, MoreHorizontal, Pencil, Send, ThumbsUp, Trash2, X } from "lucide-react";
import AppButton from "../Shared/AppButton";
import { useState, type FormEvent } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { useComments } from "@/hooks/useComments";
import { useProfile } from "@/hooks/useProfile";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useHypes } from "@/hooks/useHypes";


interface postProps {
    postId: string
    userId: string
    firstname: string
    lastname: string
    subtitle?: string
    postType: 'share' | 'ask'
    taskType: string
    postNote?: string
    customTask?: string
    imageUrl?: string
    likeCount: number
    initials: string
    avatarColor: string
}

function Post({
    postId,
    userId,
    firstname,
    lastname,
    subtitle,
    postType,
    taskType,
    postNote,
    customTask,
    imageUrl,
    initials,
    likeCount,
    avatarColor,


}: postProps) {


    const [showComments, setShowComments] = useState(false);
    const [commentText, setCommentText] = useState('');
    const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
    const [editingText, setEditingText] = useState('');
    const { comments, addComment, editComment, deleteComment } = useComments(postId);
    const profile = useProfile();
    const { hypeIds, pendingIds, hype, unhype } = useHypes()
    const isHyping = hypeIds.has(postId)
    const isPending = pendingIds.has(postId)
    const [displayedLikeCount, setDisplayedLikeCount] = useState(likeCount)


    async function handleAddComment(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const trimmed = commentText.trim();
        if (!trimmed) return;
        await addComment(trimmed);
        setCommentText('');
    }

    function handleStartEdit(commentId: string, currentText: string) {
        setEditingCommentId(commentId);
        setEditingText(currentText);
    }

    async function handleSaveEdit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const trimmed = editingText.trim();
        if (!trimmed || !editingCommentId) return;
        await editComment(editingCommentId, trimmed);
        setEditingCommentId(null);
        setEditingText('');
    }

    async function handleHypeClick() {
        if (isHyping) {
            await unhype(postId)
            setDisplayedLikeCount((count) => count - 1)
        } else {
            await hype(postId)
            setDisplayedLikeCount((count) => count + 1)
        }
    }


    return (
    <div>


            <div className='px-6 pt-1 pb-2 flex flex-col gap-4 mb-0'>
                <div className='flex flex-col w-auto'>
                <div className='flex flex-col gap-2.5'>
                <div className="flex flex-row flex-1">
                <AvatarNameSubtitle user_id={userId} firstname={firstname} lastname={lastname} subtitle={subtitle} initials={initials} avatarColor={avatarColor}></AvatarNameSubtitle>
                <AppButton className="p-0 h-auto bg-transparent hover:bg-transparent active:bg-transparent">
                <MoreHorizontal className="text-secondary size-3.5"/>
                </AppButton>
                </div>

                <div>
                {postType === 'ask' ? (
                    <span className="inline-flex w-auto items-center gap-1 rounded-full bg-neutral-200 px-2 py-0.5 text-xs font-semibold text-secondary">
                        <LifeBuoy className="size-3" />
                        Needs help: {customTask || taskType}
                    </span>
                ) : (
                    <span className="inline-flex w-auto items-center gap-1 rounded-full bg-cool-brand-200/20 px-2 py-0.5 text-xs font-semibold text-primary">
                        <Check className="size-3" />
                        {customTask || taskType}
                        </span>
                )}
                </div>
                </div>
                <p className='mt-3'>{postNote}</p>
                </div>

                {imageUrl && (
                    <img src={imageUrl} alt="" className="w-full rounded-md object-cover" />
                )}
                <div className='flex flex-row gap-4 pt-2 text-xs'>

                    <button type='button' 
                    disabled={isPending}
                    onClick={() => handleHypeClick()} 
                    className={`flex px-2 py-1 rounded-sm hover:bg-cool-brand-300/20 flex-row gap-2 items-center cursor-pointer ${isHyping ? 'font-bold' : 'font-regular'} ${isHyping ? 'text-primary' : 'text-foreground'}`}>
                    <ThumbsUp className={`size-3 ${isHyping ? 'fill-current text-primary' : ''}`} />
                    {displayedLikeCount} hypes
                    </button>
                                <button type='button' onClick={() => setShowComments((prev) => !prev)} className='flex px-2 py-1 active:text-cool-brand-700 rounded-sm hover:bg-cool-brand-200/20 flex-row gap-2 hover:text-primary items-center cursor-pointer'>
                    <MessageCircle className='size-3'/>
                    {comments.length} comments
                </button>
                
                </div>

                {showComments &&
                    <div className='flex flex-col gap-3 mt-3'>
                        {comments.map((comment) => (
                            <div key={comment.id} className='flex flex-row gap-2 items-start'>
                                <Avatar className="h-7 w-7">
                                    <AvatarFallback
                                        className="text-xs font-semibold text-primary-foreground"
                                        style={comment.authorAvatarColor ? { backgroundColor: comment.authorAvatarColor } : undefined}
                                    >
                                        {comment.authorInitials}
                                    </AvatarFallback>
                                </Avatar>
                                {editingCommentId === comment.id ? (
                                    <form onSubmit={handleSaveEdit} className='flex flex-1 flex-row gap-2 items-center'>
                                        <Input
                                            value={editingText}
                                            onChange={(event) => setEditingText(event.target.value)}
                                            autoFocus
                                            className='flex-1 rounded-full border-primary'
                                        />
                                        <AppButton type='submit' className='h-8 w-8 p-0 rounded-full flex-none'>
                                            <Send className='size-4' />
                                        </AppButton>
                                        <AppButton
                                            type='button'
                                            onClick={() => setEditingCommentId(null)}
                                            className='h-auto w-auto p-1 flex-none rounded-full bg-transparent hover:bg-neutral-200 active:bg-neutral-200 text-secondary'
                                        >
                                            <X className='size-4' />
                                        </AppButton>
                                    </form>
                                ) : (
                                    <>
                                        <div className='flex flex-1 flex-col gap-0 bg-cool-brand-400/15 rounded-md px-3 py-1.5'>
                                            <p className='font-semibold text-xs text-secondary'>{comment.authorFirstName} {comment.authorLastName.charAt(0).toUpperCase()}.</p>
                                            <p className='text-xs text-secondary'>{comment.text}</p>
                                        </div>
                                        {comment.userId === profile?.userId && (
                                            <DropdownMenu>
                                                <DropdownMenuTrigger
                                                    render={
                                                        <AppButton className="p-0 h-auto flex-none self-center bg-transparent hover:bg-transparent active:bg-transparent">
                                                            <MoreHorizontal className="text-secondary size-3.5"/>
                                                        </AppButton>
                                                    }
                                                />
                                                <DropdownMenuContent>
                                                    <DropdownMenuItem onClick={() => handleStartEdit(comment.id, comment.text)}>
                                                        <Pencil className="size-3.5" />
                                                        Edit
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem variant="destructive" onClick={() => deleteComment(comment.id)}>
                                                        <Trash2 className="size-3.5" />
                                                        Delete
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        )}
                                    </>
                                )}
                            </div>
                        ))}
                        <form onSubmit={handleAddComment} className='flex flex-row gap-2 items-center'>
                            <Avatar className="h-7 w-7">
                                <AvatarFallback
                                    className="text-xs font-semibold text-primary-foreground"
                                    style={profile?.avatarColor ? { backgroundColor: profile.avatarColor } : undefined}
                                >
                                    {profile?.initials ?? '?'}
                                </AvatarFallback>
                            </Avatar>
                            <Input
                                value={commentText}
                                onChange={(event) => setCommentText(event.target.value)}
                                placeholder='Add a comment...'
                                className='flex-1 rounded-full border-primary'
                            />
                            <AppButton type='submit' className='h-8 w-8 p-0 rounded-full flex-none'>
                                <Send className='size-4' />
                            </AppButton>
                        </form>
                    </div>
                }
</div>
                <Separator className="mt-4"></Separator>
</div>
    )    
    }
export default Post