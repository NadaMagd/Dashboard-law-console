import React, { useEffect, useState } from "react";
import { deleteArticle, getArticlesDate } from "../Service/Posts/Posts";
import {
  TrashIcon,
  EyeIcon,
  DocumentTextIcon,
  PhotoIcon,
  HeartIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import Pagination from "../components/Pagetions";
import CustomModal from "../components/Model";

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
    <div className="space-y-6">
      {/* Header Section */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
          Articles Management
        </h1>
        <p className="text-slate-400 text-lg">
          Manage and monitor all published articles
        </p>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="card text-center">
          <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl mb-4 mx-auto">
            <DocumentTextIcon className="w-6 h-6 text-blue-400" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">
            {articles.length}
          </h3>
          <p className="text-slate-400">Total Articles</p>
        </div>

        <div className="card text-center">
          <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-xl mb-4 mx-auto">
            <PhotoIcon className="w-6 h-6 text-green-400" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">
            {articles.filter((a) => a.imageUrl).length}
          </h3>
          <p className="text-slate-400">With Images</p>
        </div>

        <div className="card text-center">
          <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-pink-500/20 to-rose-500/20 rounded-xl mb-4 mx-auto">
            <HeartIcon className="w-6 h-6 text-pink-400" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">
            {articles.reduce((total, a) => total + (a.likes?.length || 0), 0)}
          </h3>
          <p className="text-slate-400">Total Likes</p>
        </div>

        <div className="card text-center">
          <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-500/20 to-indigo-500/20 rounded-xl mb-4 mx-auto">
            <UserGroupIcon className="w-6 h-6 text-purple-400" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">
            {articles.filter((a) => a.likes && a.likes.length > 0).length}
          </h3>
          <p className="text-slate-400">Engaged Articles</p>
        </div>
      </div>

      {/* Modal حذف */}
      <CustomModal
        isOpen={!!selectedPostId}
        onClose={() => setSelectedPostId(null)}
        title="Delete Article"
      >
        <div className="space-y-4">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-red-500/20 to-pink-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrashIcon className="w-8 h-8 text-red-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">
              Delete Article
            </h3>
            <p className="text-slate-300 text-sm">
              Are you sure you want to delete this article? This action cannot
              be undone.
            </p>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={() => setSelectedPostId(null)}
              className="btn btn-outline"
            >
              Cancel
            </button>
            <button onClick={handleDelete} className="btn btn-danger">
              <TrashIcon className="w-4 h-4" />
              Delete Article
            </button>
          </div>
        </div>
      </CustomModal>

      {/* Modal عرض الصورة والمحتوى */}
      <CustomModal
        isOpen={!!selectedImg}
        onClose={() => setSelectedImg("")}
        title="Article Preview"
      >
        <div className="space-y-4">
          <div className="relative">
            <img
              src={selectedImg}
              alt="Article"
              className="w-full max-w-lg h-auto rounded-xl shadow-2xl border border-slate-600 m-auto"
            />
          </div>

          <div className="bg-slate-800/50 rounded-lg p-4">
            <h4 className="text-white font-semibold mb-2">Content:</h4>
            <p className="text-slate-300 text-sm leading-relaxed text-center">
              {selectedPostContent}
            </p>
          </div>

          <div className="flex justify-center">
            <button
              onClick={() => setSelectedImg("")}
              className="btn btn-outline"
            >
              Close
            </button>
          </div>
        </div>
      </CustomModal>

      {/* جدول المقالات */}
      <div className="card">
        <div className="card-header">
          <div>
            <h3 className="card-title">Published Articles</h3>
            <p className="card-subtitle">
              Manage content and monitor engagement
            </p>
          </div>
          <div className="flex items-center gap-2 text-slate-400">
            <DocumentTextIcon className="w-5 h-5" />
            <span className="text-sm font-medium">
              {articles.length} articles
            </span>
          </div>
        </div>

        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th className="text-center">
                  <div className="flex items-center gap-2 justify-center">
                    <span className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center text-xs text-blue-400">
                      #
                    </span>
                    ID
                  </div>
                </th>
                <th className="text-center">
                  <div className="flex items-center gap-2 justify-center">
                    <PhotoIcon className="w-4 h-4" />
                    Image
                  </div>
                </th>
                <th className="text-center">
                  <div className="flex items-center gap-2 justify-center">
                    <DocumentTextIcon className="w-4 h-4" />
                    Content
                  </div>
                </th>
                <th className="text-center">
                  <div className="flex items-center gap-2 justify-center">
                    <HeartIcon className="w-4 h-4" />
                    Likes
                  </div>
                </th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentPosts.map((post, index) => (
                <tr
                  key={post.id}
                  className="hover:bg-slate-800/50 transition-colors duration-200"
                >
                  <td className="text-center">
                    <div className="flex items-center justify-center">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 text-white text-sm font-bold border border-blue-500/30">
                        {indexOfFirstPost + index + 1}
                      </span>
                    </div>
                  </td>
                  <td className="text-center">
                    <div className="flex justify-center">
                      <div className="relative group cursor-pointer">
                        <img
                          src={post.imageUrl}
                          alt="post"
                          className="w-12 h-12 rounded-lg object-cover border border-slate-600 hover:border-blue-400 hover:scale-105 transition-all duration-200"
                          onClick={() => {
                            setSelectedPostContent(post.content);
                            setSelectedImg(post.imageUrl);
                          }}
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg flex items-center justify-center">
                          <EyeIcon className="w-5 h-5 text-white" />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="text-center">
                    <div
                      className="flex items-center justify-center gap-2 cursor-pointer hover:text-blue-400 transition-colors duration-200"
                      onClick={() => {
                        setSelectedPostContent(post.content);
                        setSelectedImg(post.imageUrl);
                      }}
                    >
                      <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                      <span className="max-w-xs truncate" title={post.content}>
                        {post.content}
                      </span>
                    </div>
                  </td>
                  <td className="text-center">
                    <div className="flex items-center justify-center gap-2">
                      <HeartIcon className="w-4 h-4 text-pink-400" />
                      <span className="text-white font-medium">
                        {post.likes?.length || 0}
                      </span>
                    </div>
                  </td>
                  <td className="text-center">
                    <button
                      onClick={() => setSelectedPostId(post.id)}
                      className="btn btn-danger btn-sm"
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

      <div className="flex justify-center">
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
    </div>
  );
}
