export default function Comments(props) {
    return (
        <>
            <div className="border-[#000] border-b pb-5 mb-5"></div>
            <div className="text-[#c6d4df]">
                <div className="uppercase text-[#fff] pb-2">User Reviews</div>
                {props.comments.map((comment) => {
                    return (
                        <div className="mb-6 bg-[#000]/[.2]">
                            <div className="py-4 px-2 flex">
                                <div className="mr-3 flex basis-[10%]">
                                    <div className="w-[45px] h-[45px] relative bg-gradient-to-r from-[#5532db] to-[#32db55]">
                                        <img className="w-full h-full p-[2px]" src={`${comment.user_avatar}`} alt='avatar'></img>
                                    </div>
                                    <div className="overflow-hidden text-ellipsis ml-2 font-bold">{comment.user}</div>
                                </div>
                                <div className="basis-[90%]">
                                    <div className="mb-3 flex">
                                        <div className="float-left mr-3">
                                            {comment.recommended ? 
                                                <img alt="recommended" className="w-[40px] h-[40px] overflow-clip" src="https://store.cloudflare.steamstatic.com/public/shared/images/userreviews/icon_thumbsUp_v6.png" width="40" height="40"/>
                                            : 
                                                <img alt="not_recommended" className="w-[40px] h-[40px] overflow-clip" src="https://store.cloudflare.steamstatic.com/public/shared/images/userreviews/icon_thumbsDown_v6.png" width="40" height="40"/>
                                            }
                                        </div>
                                        <div className="text-xl pt-1 overflow-hidden whitespace-nowrap">{comment.recommended ? 'Recommended' : 'Not Recommended'}</div>
                                    </div>
                                    <div className="text-xs inline-block opacity-[0.6] uppercase mb-2">POSTED: {comment.created_at}</div>
                                    <div className="overflow-hidden break-words">{comment.text}</div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
}