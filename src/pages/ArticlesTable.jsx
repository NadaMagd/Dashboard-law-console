import React, { useEffect, useState } from "react";
import { deleteArticle, getArticlesDate } from "../Service/Posts/Posts";
import { TrashIcon } from "@heroicons/react/24/outline";
export default function ArticlesTable() {
  const [articles, setArticles] = useState([]);
  const [selectedPostContent, setSelectedPostContent] = useState("");
  const [selectedImg, setSelectedImg] = useState("");
  const [selectedPostId, setSelectedPostId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const allPosts = await getArticlesDate();
      setArticles(allPosts);
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    // const confirmDelete = window.confirm("هل تريد حذف المقالة؟");
    // if (!confirmDelete) return;

    await deleteArticle(id);
    setArticles((prev) => prev.filter((post) => post.id !== id));
  };

  return (
    <div className="overflow-x-auto p-6">
      <dialog id="deleted_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg text-center mb-4 text-white">
            Are you sure you want to delete this article?
          </h3>

          <div className="modal-action flex justify-end gap-2">
            <form method="dialog">
              <button className="flex items-center gap-2 text-gray-700 hover:text-white border border-gray-700 hover:bg-gray-800 rounded-lg text-sm px-4 py-2">
                close
              </button>
            </form>

            <button
              onClick={async () => {
                await handleDelete(selectedPostId);
                document.getElementById("deleted_modal").close();
              }}
              className="flex items-center gap-2 text-red-700 hover:text-white border border-red-700 hover:bg-red-800 rounded-lg text-sm px-4 py-2"
            >
              deleted
            </button>
          </div>
        </div>
      </dialog>

      <dialog id="content_modal" className="modal">
        <div className="modal-box max-w-2xl">
          <div className="w-full h-auto text-center rounded-lg">
            <img src={selectedImg} className="my-4" />
            {selectedPostContent}
          </div>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 text-center  dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900">
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>

      <table className="table w-full text-center rounded-2xl overflow-hidden text-white shadow-neutral-600 shadow-md">
        {/* head */}
        <thead className="goldTxt bgSecondary">
          <tr>
            <th>Id</th>
            <th>Picture</th>
            <th>Content</th>
            <th>Likes</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {articles.map((post, index) => (
            <tr key={post.id} className="hover:bg-[#1c202e]">
              <td className="goldTxt">{index + 1}</td>
              <td>
                <div className="avatar">
                  <div className=" w-12 h-12">
                    <img
                      src={post.imageUrl}
                      alt="post"
                      className="w-full h-auto rounded-lg"
                    />
                  </div>
                </div>
              </td>
              <td
                className="max-w-xs truncate"
                onClick={() => {
                  setSelectedPostContent(post.content);
                  setSelectedImg(post.imageUrl);
                  document.getElementById("content_modal").showModal();
                }}
              >
                {post.content}
              </td>
              <td>{post.likes?.length || 0}</td>
              <td className="">
                <button
                  className="flex gap-2 text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 text-center  dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                  onClick={() => {
                    setSelectedPostId(post.id);
                    document.getElementById("deleted_modal").showModal();
                  }}
                >
                  <TrashIcon className="w-5 h-5" />
                  delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
