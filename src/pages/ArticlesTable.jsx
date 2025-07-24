import React, { useEffect, useState } from 'react';
import { deleteArticle, getArticlesDate } from '../Service/Posts/Posts';
import { TrashIcon } from "@heroicons/react/24/outline";
import Pagination from './../Components/Pagetions';

export default function ArticlesTable() {
  const [articles, setArticles] = useState([]);
  const [selectedPostContent, setSelectedPostContent] = useState('');
  const [selectedImg , setSelectedImg] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    const fetchData = async () => {
      const allPosts = await getArticlesDate();
      setArticles(allPosts);
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("هل تريد حذف المقالة؟");
    if (!confirmDelete) return;

    await deleteArticle(id);
    setArticles(prev => prev.filter(post => post.id !== id));
  };

  const indexOfLastPost = currentPage * itemsPerPage;
  const indexOfFirstPost = indexOfLastPost - itemsPerPage;
  const currentPosts = articles.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(articles.length / itemsPerPage);

  return (
    <div className="overflow-x-auto p-6">
      {/* Modal عرض المحتوى */}
      <dialog id="content_modal" className="modal">
        <div className="modal-box max-w-2xl">
          <div className="w-full h-auto text-center rounded-lg">
            <img src={selectedImg} className='my-4' />
            {selectedPostContent}
          </div>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn text-red-700 hover:text-white border border-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-4 py-2">
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>

      <table className="table w-full text-center rounded-2xl overflow-hidden text-white shadow-neutral-600 shadow-md">
        <thead className='goldTxt bgSecondary'>
          <tr>
            <th>Id</th>
            <th>Picture</th>
            <th>Content</th>
            <th>Likes</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentPosts.map((post, index) => (
            <tr key={post.id} className="hover:bg-[#1c202e]">
              <td className='goldTxt'>{indexOfFirstPost + index + 1}</td>
              <td>
                <div className="avatar w-12 h-12">
                  <img src={post.imageUrl} alt="post" className='w-full h-auto rounded-lg' />
                </div>
              </td>
              <td
                className="max-w-xs truncate cursor-pointer"
                onClick={() => {
                  setSelectedPostContent(post.content);
                  setSelectedImg(post.imageUrl);
                  document.getElementById("content_modal").showModal();
                }}
              >
                {post.content}
              </td>
              <td>{post.likes?.length || 0}</td>
              <td>
                <button
                  className="flex gap-2 text-red-700 hover:text-white border border-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-4 py-2"
                  onClick={() => handleDelete(post.id)}
                >
                  <TrashIcon className="w-5 h-5" />
                  delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

  
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
}
