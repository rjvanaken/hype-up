import { Badge } from "@/components/ui/badge";
import AvatarNameSubtitle from "../Shared/AvatarNameSubtitle";
import { MessageCircle, ThumbsUp } from "lucide-react";


interface postProps {
    userId: string
    firstname: string
    lastname: string
    subtitle?: string
    taskType: string
    postNote?: string
    customTask?: string
    likeCount: number
}

function Post({
    userId,
    firstname,
    lastname,
    subtitle,
    taskType,
    postNote,
    customTask,
    likeCount
}: postProps) {

    return (
    <div>


            <div className='px-6 flex flex-col gap-2 mb-2'>
                <div className='flex flex-col w-auto gap-2'>
                <AvatarNameSubtitle user_id={userId} firstname={firstname} lastname={lastname} subtitle={subtitle}></AvatarNameSubtitle>
                <div>
                <Badge className='w-auto'>
                    <p>{customTask || taskType}</p>
                </Badge>
                </div>
                <p>{postNote}</p>
                </div>

                <image>Image placeholder</image>
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