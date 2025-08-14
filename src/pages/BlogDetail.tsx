// pages/BlogDetail.tsx
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { PortableText } from '@portabletext/react';
import { Link } from 'react-router-dom';

type Blog = {
  title: string;
  publishedAt: string;
  mainImage?: { asset: { url: string } };
  body: any;
  author?: string;
  slug: { current: string }; // ✅ Add this line
};

const projectId = '9fc3blbd';
const dataset = 'production';

function BlogDetail() {
  const { slug } = useParams();
  const [post, setPost] = useState<Blog | null>(null);

  useEffect(() => {
    const query = encodeURIComponent(`*[_type == "blog" && slug.current == "${slug}"][0]{
      title, publishedAt, mainImage{asset->{url}}, author, body
    }`);
    fetch(`https://${projectId}.apicdn.sanity.io/v2023-01-01/data/query/${dataset}?query=${query}`)
      .then((res) => res.json())
      .then((data) => setPost(data.result));
  }, [slug]);

  if (!post) return <div className="text-center py-20">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
      <p className="text-sm text-gray-500 mb-4">{new Date(post.publishedAt).toDateString()}</p>
      {post.mainImage && (
        <img
          src={post.mainImage.asset.url}
          alt={post.title}
          className="rounded-lg mb-6 w-full object-cover"
        />
      )}
      <PortableText value={post.body} />
      {post.author && (
        <p className="text-right mt-10 text-gray-600">Written by: {post.author}</p>
      )}     
    </div>

  );
}

export default BlogDetail;
