import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Layout from '../components/Layout'
import Nav from '../components/Nav'
import { sanityClient, urlFor } from '../sanity'
import { post } from '../typings'

interface Props {
  posts: post[]
}

const Home = ({ posts }: Props) => {
  return (
    <div>
      <Head>
        <title>Medium Blog</title>
        <link rel='icon'  href='/favicon.ico'/>
      </Head>

      
      <Nav/>
      <Layout />

      
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-7xl mx-auto p-2 md:p-6'>
        {posts.map(post => (
          <Link key={post._id} href={`/post/${post.slug.current}`} >
            <div className='group cursor-pointer border rounded-lg overflow-hidden'>
              <img src={urlFor(post.mainImage).url()!} alt='' className=' w-full h-60 object-cover group-hover:scale-105 duration-200 ease-in-out transition-transform ' />
              <div className="flex items-center justify-between px-5 py-3 ">
                <div>
                  <h3 className='text-lg font-bold'>{post.title}</h3>
                  <div><h3 className='text-sm'>{post.description} by <span className='font-medium'>{post.author.name }</span></h3></div>
                </div>
                <img src={urlFor(post.author.image).url()!} className=' rounded-full h-10 w-10 ' />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Home;

export const getServerSideProps = async () => {
  const query = `*[_type == "post"]{
  _id,
  title,
  slug,
  author -> {
  name,
  image 
 },
mainImage,
description
}`;
  
  const posts = await sanityClient.fetch(query);

  return {
    props: {
      posts
    }
  }
}
