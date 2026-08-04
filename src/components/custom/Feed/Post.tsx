import { Separator } from "@/components/ui/separator";
import AvatarNameSubtitle from "../Shared/AvatarNameSubtitle";
import { Check, LifeBuoy, MessageCircle, MoreHorizontal, ThumbsUp } from "lucide-react";
import AppButton from "../Shared/AppButton";
import { useState } from "react";


interface postProps {
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
                                <button type='button' onClick={() => setShowComments((prev) => !prev)} className='flex flex-row gap-2 items-center cursor-pointer'>
                    <MessageCircle className='size-3'/>
                    comments
                </button>
                
                </div>

                {showComments && 
                    <div>
                        <p>add map here to show comments</p>
                    </div>
                }
</div>
                <Separator className="mt-4"></Separator>
</div>
    )    
    }
export default Post