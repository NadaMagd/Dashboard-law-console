import React, { useEffect, useState } from "react";
import { deleteArticle, getArticlesDate } from "../Service/Posts/Posts";
import { TrashIcon } from "@heroicons/react/24/outline";
import Pagination from "./../Components/Pagetions";
import CustomModal from "./../Components/Model";

export default function ArticlesTable() {
  const [articles, setArticles] = useState([]);
  const [selectedPostContent, setSelectedPostContent] = useState("");
  const [selectedImg, setSelectedImg] = useState("");
  const [selectedPostId, setSelectedPostId] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);

  useEffect(() => {
    const fetchData = async () => {
      const allPosts = await getArticlesDate();
      setArticles(allPosts);
    };
    fetchData();
  }, []);

  const handleDelete = async () => {
    await deleteArticle(selectedPostId);
    setArticles((prev) => prev.filter((post) => post.id !== selectedPostId));
    setSelectedPostId(null);
  };

  const indexOfLastPost = currentPage * itemsPerPage;
  const indexOfFirstPost = indexOfLastPost - itemsPerPage;
  const currentPosts = articles.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(articles.length / itemsPerPage);

  return (
    <div className="overflow-x-auto p-6">
      <h2 className="text-2xl goldTxt font-bold mb-4">Articles</h2>

      {/* Modal حذف */}
      <CustomModal
        isOpen={!!selectedPostId}
        onClose={() => setSelectedPostId(null)}
        title="Delete Article"
      >
        <h3 className="text-center text-white mb-4">
          Are you sure you want to delete this article?
        </h3>
        <div className="flex justify-end gap-4 mt-4">
          <button
            onClick={handleDelete}
            className="flex items-center gap-2 text-red-700 hover:text-white border border-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5"
          >
            Delete
          </button>
          <button
            onClick={() => setSelectedPostId(null)}
            className="border border-gray-500 text-gray-300 hover:text-white hover:bg-gray-500 font-medium rounded-lg text-sm px-4 py-2"
          >
            Cancel
          </button>
        </div>
      </CustomModal>

      {/* Modal عرض الصورة والمحتوى */}
      <CustomModal
        isOpen={!!selectedImg}
        onClose={() => setSelectedImg("")}
        title="Article Content"
      >
        <div className="relative text-white">
          <img
            src={selectedImg}
            alt="Article"
            className="w-full max-w-lg h-auto rounded-lg shadow-lg mb-4"
          />
          <p className="text-gray-300">{selectedPostContent}</p>
        </div>
        <div className="flex justify-center mt-4">
          <button
            onClick={() => setSelectedImg("")}
            className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg"
          >
            Close
          </button>
        </div>
      </CustomModal>

      {/* جدول المقالات */}
      <div className="bg-gray-900/95 rounded-xl overflow-hidden shadow-xl border border-gray-700/30">
        <div className="overflow-x-auto">
          <table className="w-full text-white text-center">
            <thead>
              <tr className="bg-gray-800/50 border-b border-gray-700">
                <th className="px-4 py-3 text-center text-xs font-medium text-[#c9b38c] uppercase">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#c9b38c]/20 flex items-center justify-center text-xs">#</span>
                    ID
                  </div>
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium text-[#c9b38c] uppercase">
                  Picture
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium text-[#c9b38c] uppercase">
                  Content
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium text-[#c9b38c] uppercase">
                  Likes
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium text-[#c9b38c] uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700/30">
              {currentPosts.map((post, index) => (
                <tr key={post.id} className="hover:bg-gray-800/30 transition-colors">
                  <td className="px-4 py-3 ">
                     <div className="flex items-center gap-2">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full  text-white text-xs font-bold">
                    {indexOfFirstPost + index + 1}
                    </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 flex justify-center items-center">
                    <img
                      src={post.imageUrl}
                      alt="post"
                      className="w-10 h-10 rounded-lg object-cover "
                    />
                  </td>
                  <td
                    className="px-4 py-3 text-center cursor-pointer"
                    onClick={() => {
                      setSelectedPostContent(post.content);
                      setSelectedImg(post.imageUrl);
                    }}
                  >
                    <div className="flex items-center justify-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                    {post.content}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center">
                    {post.likes?.length }
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => setSelectedPostId(post.id)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-red-400 bg-red-500/10 border border-red-500/30 rounded-md hover:text-white hover:bg-red-500 hover:border-red-400 transition-colors"
                    >
                      <TrashIcon className="w-3 h-3" />
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
        rowsPerPage={itemsPerPage}
        onRowsPerPageChange={(newItemsPerPage) => {
          setItemsPerPage(newItemsPerPage);
          setCurrentPage(1);
        }}
      />
    </div>
  );
}
