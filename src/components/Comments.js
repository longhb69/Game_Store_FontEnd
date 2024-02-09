export default function Comments(props) {
    return (
        <div>
            <div>
                {props.comments.map((comment) => {
                    return (
                        <div>
                            {comment.text}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}