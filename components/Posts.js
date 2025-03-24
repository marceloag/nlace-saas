'use client';
import { useState, useRef } from 'react';
import Post from '@/components/Post';
import { usePapaParse } from 'react-papaparse';
import { MetricoolIcon } from '@/components/icons/Icons';
import { Button } from '@/components/ui/button';

function Posts({ posts }) {
  const { jsonToCSV } = usePapaParse();
  const [postsEditable, setPostsEditable] = useState(posts);
  const downloadCSV = useRef(null);

  const generateCSV = () => {
    const MetricoolFormat = [];
    postsEditable.map((post) => {
      const newPost = {
        Text: post.text,
        Date: post.fecha_publicacion,
        Time: post.hora_publicacion,
        Draft: 'TRUE',
        Facebook: post.platforms.includes('facebook') ? 'TRUE' : 'FALSE',
        Twitter: post.platforms.includes('twitter') ? 'TRUE' : 'FALSE',
        LinkedIn: post.platforms.includes('linkedin') ? 'TRUE' : 'FALSE',
        GBP: '',
        Instagram: post.platforms.includes('instagram') ? 'TRUE' : 'FALSE',
        Pinterest: '',
        TikTok: '',
        Youtube: '',
        Threads: '',
        'Picture Url 1': '',
        'Picture Url 2': '',
        'Picture Url 3': '',
        'Picture Url 4': '',
        'Picture Url 5': '',
        'Picture Url 6': '',
        'Picture Url 7': '',
        'Picture Url 8': '',
        'Picture Url 9': '',
        'Picture Url 10': '',
        'Document title': '',
        Shortener: '',
        'Video Thumbnail Url': '',
        'Video Cover Frame': '',
        'Pinterest Board': '',
        'Pinterest Pin Title': '',
        'Pinterest Pin Link': '',
        'Pinterest Pin New Format': '',
        'Instagram Post Type': '',
        'Instagram Show Reel On Feed': '',
        'Youtube Video Title': '',
        'Youtube Video Type': '',
        'Youtube Video Privacy': '',
        'Youtube video for kids': '',
        'Youtube Video Category': '',
        'Youtube Video Tags': '',
        'GBP Post Type': '',
        'Facebook Post Type': '',
        'Facebook Title': '',
        'First Comment Text': '',
        'TikTok Title': '',
        'TikTok disable comments': '',
        'TikTok disable duet': '',
        'TikTok disable stitch': '',
        'TikTok Post Privacy': '',
        'TikTok Branded Content': '',
        'TikTok Your Brand': '',
        'TikTok Auto Add Music': '',
        'TikTok Photo Cover Index': '',
        'LinkedIn Show link preview': '',
        'LinkedIn Images as Carousel': '',
        'Brand name': ''
      };

      MetricoolFormat.push(newPost);
    });

    const csv = jsonToCSV(MetricoolFormat);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    downloadCSV.current.href = url;
    downloadCSV.current.download = 'posts.csv';
    downloadCSV.current.click();
  };

  return (
    <>
      {posts.map((post, index) => (
        <Post key={index} {...post} />
      ))}
      <button
        onClick={generateCSV}
        className="mx-auto bg-black text-white px-4 py-2 rounded-lg mt-4 flex flex-row gap-2 items-center justify-centero"
      >
        <MetricoolIcon></MetricoolIcon> Generar CSV
      </button>
      <a ref={downloadCSV} className=" hidden"></a>
    </>
  );
}

export default Posts;
