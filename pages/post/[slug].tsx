import { sanityClient, urlFor } from '../../sanity'
import Nav from '../../components/Nav'
import {post} from '../../typings'
import { GetStaticPaths, GetStaticProps } from 'next'
import PortableText from 'react-portable-text'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useState } from 'react'

interface IFormInput{ 
    _id: string;
    name: string;
    email: string;
    comment: string;
}

interface Props {
    post : post
}

const Post = ({ post }: Props) => {
    const [submitted, setSubmitted] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>();
    
    const onSubmit: SubmitHandler<IFormInput> = (data) => {
        fetch("/api/createComment", {
            method: "POST",
            body: JSON.stringify(data)
        }).then(() => {
            console.log(data);
            setSubmitted(true);
        }).catch(err => {
            console.log(err);
            setSubmitted(false);
        })
    }

  return (
    <main>
        <Nav />
        <img src={urlFor(post.mainImage).url()!} alt="" className="w-full h-80 object-cover" />
        
        <article className='max-w-3xl mx-auto p-5'>
            <h1 className='text-3xl mt-10 mb-3 font-bold'>{post.title}</h1>
            <h6 className='text-gray-600 text-sm my-2'>{post.description }..</h6>
            <section className='flex items-center space-x-4'>
                <img src={urlFor(post.author.image).url()!} alt="" className='rounded-full h-8 w-8' />
                <span className='text-gray-500 text-sm font-extralight'>Blog post by <span className='text-green-600'>{post.author.name}</span> - Published at {" "} {new Date(post._createdAt).toLocaleString() }</span>
            </section>
            <div className='mt-10 mb-3'>
                <PortableText
                    className=''
                    content={post.body}
                    dataset= {process.env.NEXT_PUBLIC_SANITY_DATASET}
                    projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
                    serializers={
                        {
                            h1: (props: any) => (
                                <h1 className='text-2xl font-bold my-5' {...props}></h1>
                            ),
                            h2: (props: any) => (
                                <h1 className='text-xl font-bold my-5' {...props}></h1>
                            ),
                            h4: (props: any) => (
                                <h1 className='text-lg font-bold my-5' {...props}></h1>
                            ),
                            li: ({children}: any) => (
                                <li className='ml-4 list-disc'>{ children}</li>
                            ),
                            link: ({href, children}: any) => (
                                <a href={href} className="text-blue-500 hover:underline">{children}</a>
                            )
                        }
                    }
                />
            </div>
        </article>
        <hr className='max-w-lg mx-auto border border-solid border-amber-400 my-5'/>
        
        {submitted ? (
            <div className='flex flex-col py-10 my-10 bg-yellow-500 text-white max-w-2xl mx-auto text-center'>
                <h3 className='text-2xl font-semibold'>Thank You for submitting your comment!</h3>
                <p>Once it is approved, it will appear below!</p>
            </div>
        ) : (
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col p-5 mb-10 max-w-2xl mx-auto'>
            <h1 className='text-sm text-amber-500'>Enjoyed this article?</h1>
            <h1 className='text-3xl font-bold'>Leave your comment below</h1>
            <hr className='py-3 mt-2' />
            
            <input { ...register("_id") } type="hidden" name="id" value={post._id} />
            
            <label className='block mb-5'>
                <span className='text-gray-600'>Name</span>
                <input {...register("name", {required: true})} type="text" placeholder='John Dekins' className='shadow border rounded py-2 px-3 form-input mt-1 block w-full ring-yellow-500 focus:ring-2 outline-none'/>
                
                {/* errors will return when field validation will fails */}
                <div>
                    {errors.name && (<span className='text-red-500'>- The Name field is reqiured.. </span>)}
                </div>
            </label>
            
            
            <label className='block mb-5'>
                <span className='text-gray-600'>Email</span>
                <input {...register("email", { required: true })} type="email" placeholder='John@gmail.com' className='shadow border rounded py-2 px-3 form-input mt-1 block w-full ring-yellow-500 focus:ring-2 outline-none' />
                
                  {/* errors will return when field validation will fails */}
                <div>
                    {errors.email && (<span className='text-red-500'>- The Email field is reqiured.. </span>)}
                </div>
            </label>
            
            <label className='block mb-5'>
                <span className='text-gray-600'>Comment</span>
                <textarea {...register("comment", {required: true})} rows={8} placeholder='Frame your thoughts and views..' className='shadow border rounded py-2 px-3 form-textarea mt-1 block w-full ring-yellow-500 focus:ring-2 outline-none'/>
            
              {/* errors will return when field validation will fails */}
            <div>
                {errors.comment && (<span className='text-red-500'>- The Comment field is reqiured.. </span>)}
            </div>
            </label>
            
            <input type="submit" className=' shadow text-white bg-yellow-500 hover:bg-yellow-400 focus:shadow-outline focus:outline-none font-bold py-2 px-4 rounded cursor-pointer ' />
        </form>
        )}
        
        {/* comments */}
        <div className='flex flex-col px-5 py-10 my-10 max-w-2xl space-y-2 mx-auto shadow shadow-yellow-500' >
            <h3 className='text-4xl font-semibold'>Comments</h3>
            <hr className='pb-2'/>
            
            {post.comments.map((comment) => (
                <div key={comment._id} className='  '>
                    <p><span className='text-yellow-500'>{comment.name}:</span> { comment.comment }</p>
                </div>
            ))}
        </div>
    </main>
  )
}

export default Post;

//this function will go ahead and tell next js how to figure out which root is to pre-render/pre-build in advance.
//it will give us an array of paths which gonna hold the slugs that we gonna need back
export const getStaticPaths: GetStaticPaths = async () => {
    const query = `*[_type == "post"]{
  _id,
  slug {
    current
  }
}`;
    
    const posts = await sanityClient.fetch(query);

    const paths = posts.map((post: post) => ({
        params: {
            slug: post.slug.current
        }
    }))

    return {
        paths,
    //fallback: basically to block the page from showing or show a 404 page when it doesn't exists
        fallback: "blocking"
    }
}

//this function uses those(above) slug values to fetch the infomation for each page
/**parameter should be : (context) by destructuring used {params} as context.params  */ 
export const getStaticProps: GetStaticProps = async ({params}) => {
    const query = `*[_type == "post" && slug.current == $slug][0]{
    _id,
    _createdAt,
    title,
    author -> {
    name,
    image
    },
    'comments': *[_type == "comment" && post._ref == ^._id && approved == true],
    body,
    slug,
    mainImage,
    description
    }`

    const post = await sanityClient.fetch(query, {
        slug: params?.slug,     //?: its' when something is optional and !: its' when you are sure that something is not undefined
    });

    if (!post) {
        return {
            notFound: true
        }
    }

    return {
        props: {
            post,
        },
        revalidate: 60 //after 60 seconds it'll update the old cached version
    }
}
