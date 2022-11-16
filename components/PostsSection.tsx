import SinglePost from "./SinglePost"

const PostsSection = () => {

    const posts = [
        {
            id: 1,
            author:"Nova Jordon",
            title: "Image Generation Announcement",
            date: "Oct 3",
            readingTime:5
        },
        {
            id: 2,
            author:"Brad Jekins",
            title: "SQLite: QEMU all over again?",
            date: "Oct 8",
            readingTime:7
        },
        {
            id: 3,
            author:"Tom Cooper",
            title: "That Time We Burned Down Players' Houses in Ultima Online",
            date: "Oct 3",
            readingTime:12
        },
        {
            id: 4,
            author:"Alfred I.",
            title: "I Spent 2000 Hours Learning How To Learn: Part 4",
            date: "Oct 3",
            readingTime:3
        }
    ]

    return (
    <div className = "border-b border-gray-200" >
        <div className="conatiner max-w-7xl mx-auto h-max p-4 lg:p-10 space-y-3 ">
            <div className="flex space-x-3 items-center">
                <img src='trendy.png' className="w-5 h-5"/> <h5 className="font-bold text-xs">TRENDING ON MEDIUM</h5>
            </div>
            <div className="grid grid-flow-row grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-3">
                {posts.map(post => (
                    <SinglePost post={post} key={post.id} />
                ))}
            </div>
        </div>
    </div>
)
}

export default PostsSection