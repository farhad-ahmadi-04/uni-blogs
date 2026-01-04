import { postInterface } from '@/types/postT';
import BlogCard from './blogCard';
import { TypographyH1, TypographyH3 } from './ui/typography';
export default async function RecentPosts({limit}: {limit: number}) {
  let posts = null;
  try {
    const result = await fetch(`https://${process.env.NEXT_VERCEL_URL}/api/post/get`, {
      method: 'POST',
      body: JSON.stringify({ limit: limit, order: 'desc' }),
      cache: 'no-store',
    });
    const data = await result.json();
    posts = data.posts;
  } catch (error) {
    console.log('Error getting post:', error);
  }
  return (
    <div className='flex flex-col justify-center items-center mb-5'>
      <TypographyH3 className='mt-5'>Recent articles</TypographyH3>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full'>
        {posts && posts.map((post: postInterface) => <BlogCard key={post._id} post={post} />)}
      </div>
    </div>
  );
}