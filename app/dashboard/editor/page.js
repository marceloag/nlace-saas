'use client';
import { useState, useRef } from 'react';
import DatePicker from '@/components/DatePicker';
import HourPicker from '@/components/HourPicker';
import { usePapaParse } from 'react-papaparse';
import {
  Facebook,
  XTwitter,
  Instagram,
  LinkedIn,
  MetricoolIcon
} from '@/components/icons/Icons';

function Editor({ searchParams }) {
  // TODO: Download CSV with metricool format
  const { jsonToCSV } = usePapaParse();
  const posts = JSON.parse(searchParams.posts);
  const [postsEditable, setPostsEditable] = useState(posts);
  const downloadCSV = useRef(null);

  const generateCSV = () => {
    const MetricoolFormat = [];
    postsEditable.map((post) => {
      const newPost = {
        Text: post.texto,
        Date: post.fecha_publicacion,
        Time: post.hora_publicacion,
        Draft: 'TRUE',
        Facebook: post.facebook ? 'TRUE' : 'FALSE',
        Twitter: post.twitter ? 'TRUE' : 'FALSE',
        LinkedIn: post.linkedin ? 'TRUE' : 'FALSE',
        GBP: '',
        Instagram: post.instagram ? 'TRUE' : 'FALSE',
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

  const handleIconClick = (index, platform) => {
    const newPosts = [...postsEditable];
    newPosts[index][platform] = !newPosts[index][platform];
    setPostsEditable(newPosts);
  };

  return (
    <div className="bg-transparent m-0 p-0 after:via-gray-50 after:via-40% w-full xl:w-8/12 after:absolute after:w-full after:z-50 after:pb-10 after:bg-gradient-to-b after:flex  after:from-gray-50 after:to-transparent ">
      <h1 className="text-3xl font-thin">📝 Editar Posts</h1>
      {postsEditable.map((post, index) => (
        <div
          key={index}
          className="mb-4 transition-all duration-300 ease-in-out"
        >
          <div className="flex flex-col justify-center items-start px-8 opacity-50 group hover:opacity-100 focus-within:opacity-100 transition-opacity duration-300">
            <textarea
              className="w-full h-auto min-h-20 resize-none p-4  shadow-md focus:outline-none transition-all duration-300 ease-in-out border-solid border-[1px] border-gray-400 mt-4 outline-none focus:border-violet-950/70 focus:border-solid focus:border-[1px] rounded-lg text-gray-600 [field-sizing:content]"
              defaultValue={post.texto}
              onChange={(e) => {
                const newPosts = [...postsEditable];
                newPosts[index].texto = e.target.value;
                setPostsEditable(newPosts);
              }}
            />
            <div className="flex flex-row items-center justify-between w-full group-hover/main:opacity-100">
              <div className="flex flex-row items-center gap-4">
                <Facebook
                  onClick={() => handleIconClick(index, 'facebook')}
                  currentStatus={post['facebook'] || false}
                />
                <Instagram
                  onClick={() => handleIconClick(index, 'instagram')}
                  currentStatus={post['instagram'] || false}
                />
                <XTwitter
                  onClick={() => handleIconClick(index, 'twitter')}
                  currentStatus={post['twitter'] || false}
                />
                <LinkedIn
                  onClick={() => handleIconClick(index, 'linkedin')}
                  currentStatus={post['linkedin'] || false}
                />
              </div>
              <div className="py-2 flex flex-row items-center gap-4">
                <DatePicker fecha_publicacion={post.fecha_publicacion} />
                <HourPicker hora_publicacion={post.hora_publicacion} />
              </div>
            </div>
          </div>
        </div>
      ))}
      <button
        onClick={generateCSV}
        className="block mx-auto bg-black text-white px-4 py-2 rounded-lg mt-4 flex flex-row gap-2 items-center justify-centero"
      >
        <MetricoolIcon></MetricoolIcon> Generar CSV
      </button>
      <a ref={downloadCSV} className=" hidden"></a>
    </div>
  );
}

export default Editor;
