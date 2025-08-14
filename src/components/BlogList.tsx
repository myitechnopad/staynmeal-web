import { useEffect, useState } from 'react';
import sanityClient from '../sanityClient';

type Blog = {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  author?: string;
  mainImage?: { asset: { url: string } };
  body?: any[];
};

function BlogList() {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    sanityClient
      .fetch(`*[_type == "blog"] | order(publishedAt desc) {
        _id,
        title,
        slug,
        publishedAt,
        author,
        mainImage { asset -> { url } }
      }`)
      .then((data) => setBlogs(data))
      .catch(console.error);
  }, []);

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      <h2 className="text-2xl font-semibold text-green-700 mb-4 text-center">Latest Blogs</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {blogs.map((blog) => (
          <div key={blog._id} className="border border-gray-200 rounded-md p-3 bg-white hover:shadow-md transition">
            {blog.mainImage?.asset?.url && (
              <img
                src={blog.mainImage.asset.url}
                alt={blog.title}
                className="w-full h-32 object-cover rounded mb-2"
              />
            )}
            <h3 className="text-sm font-semibold text-gray-800 mb-1 truncate">{blog.title}</h3>
            <p className="text-xs text-gray-500">
              {blog.author || 'Anonymous'} &middot; {new Date(blog.publishedAt).toLocaleDateString()}
            </p>
            <a
              href={`/blog/${blog.slug.current}`}
              className="text-xs text-green-600 hover:underline mt-2 inline-block"
            >
              Read More →
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BlogList;
