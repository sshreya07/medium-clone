interface post {
    post: {
        author: string
        title: string
        id: number
        date: string
        readingTime: number
    }
}
const SinglePost = ({ post }: post) => {
  return (
    <div className="flex bg-gray-50 items-start p-3 lg:p-6 space-x-7 lg:space-x-5 ">
        <div>
            <h1 className="text-4xl font-bold text-gray-200 font-sans">{post.id < 9 ? `0${post.id}` : post.id}</h1>
        </div>
        <div className="space-y-1 cursor-pointer">
            <div className="flex space-x-3">
                <img src="profile photo.jfif" className="w-5 rounded-full h-5"/>
                <h6 className="text-xs font-semibold">{ post.author }</h6>
            </div>
            <h4 className="text-md font-bold">{post.title}</h4>
            <p className="text-xs text-gray-400">{post.date} . { post.readingTime} min read</p>
        </div>
    </div>
  )
}

export default SinglePost