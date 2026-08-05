import { Separator } from "@/components/ui/separator";
import AvatarNameSubtitle from "../Shared/AvatarNameSubtitle";
import { Check, LifeBuoy, MessageCircle, MoreHorizontal, Send, ThumbsUp } from "lucide-react";
import AppButton from "../Shared/AppButton";
import { useState, type FormEvent } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { useComments } from "@/hooks/useComments";
import { useProfile } from "@/hooks/useProfile";


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
    likeCount,
    initials,
    avatarColor,


}: postProps) {


    const [showComments, setShowComments] = useState(false);
    const [commentText, setCommentText] = useState('');
    const { comments, addComment } = useComments(postId);
    const profile = useProfile();

    async function handleAddComment(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const trimmed = commentText.trim();
        if (!trimmed) return;
        await addComment(trimmed);
        setCommentText('');
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

                <div className='flex flex-row gap-2 items-center '>
                    <ThumbsUp className='size-3'/>
                    {likeCount} hypes
                </div>
                                <button type='button' onClick={() => setShowComments((prev) => !prev)} className='flex hover:bg-cool-brand-600/20 flex-row gap-2 hover:text-primary items-center cursor-pointer'>
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
                                <div className='flex flex-1 flex-col gap-0 bg-neutral-100 rounded-md px-3 py-1.5'>
                                    <p className='font-semibold text-xs text-secondary'>{comment.authorFirstName} {comment.authorLastName.charAt(0).toUpperCase()}.</p>
                                    <p className='text-xs text-secondary'>{comment.text}</p>
                                </div>
                                <AppButton className="p-0 h-auto flex-none self-center bg-transparent hover:bg-transparent active:bg-transparent">
                                    <MoreHorizontal className="text-secondary size-3.5"/>
                                </AppButton>
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