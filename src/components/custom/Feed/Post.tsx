import { Badge } from "@/components/ui/badge";
import AvatarNameSubtitle from "../Shared/AvatarNameSubtitle";
import { MessageCircle, ThumbsUp } from "lucide-react";


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
    likeCount
}: postProps) {

    return (
    <div>


            <div className='px-6 flex flex-col gap-2 mb-2'>
                <div className='flex flex-col w-auto gap-2'>
                <AvatarNameSubtitle user_id={userId} firstname={firstname} lastname={lastname} subtitle={subtitle}></AvatarNameSubtitle>
                <div>
                {postType === 'ask' ? (
                    <span className="inline-flex w-auto items-center gap-1.5 rounded-full bg-neutral-100 px-3 py-1 text-sm font-semibold text-secondary">
                        <span role="img" aria-label="needs help">🙋</span>
                        Needs help: {customTask || taskType}
                    </span>
                ) : (
                    <Badge className='w-auto'>
                        <p>{customTask || taskType}</p>
                    </Badge>
                )}
                </div>
                <p>{postNote}</p>
                </div>

                {imageUrl && (
                    <img src={imageUrl} alt="" className="w-full rounded-md object-cover" />
                )}
                <div className='flex flex-row gap-4 pt-2 text-xs'>

                <div className='flex flex-row gap-2 items-center '>
                    <ThumbsUp className='size-3'/>
                    {likeCount} hypes
                </div>
                                <div className='flex flex-row gap-2 items-center '>
                    <MessageCircle className='size-3'/>
                    comments
                </div>
                
                </div>
</div>
</div>
    )    
    }
export default Post