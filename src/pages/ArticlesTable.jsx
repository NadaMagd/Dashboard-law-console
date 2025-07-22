import React, { useEffect, useState } from 'react';
import { deleteArticle, getArticlesDate } from '../Service/Posts/Posts';

export default function ArticlesTable() {
  const [articles, setArticles] = useState([]);

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

  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>id</th>
            <th>الصورة</th>
            <th>المحتوى</th>
            <th>عدد اللايكات</th>
            <th>الإجراءات</th>
          </tr>
        </thead>
        <tbody>
          {articles.map((post, index) => (
            <tr key={post.id}>
              <td>{index + 1}</td>
              <td>
                <div className="avatar">
                  <div className="mask mask-squircle w-12 h-12">
                    <img src={post.imageUrl} alt="post" />
                  </div>
                </div>
              </td>
              <td className="max-w-xs truncate">{post.content}</td>
              <td>{post.likes?.length || 0}</td>
              <td>
                <button
                  className="btn btn-error btn-sm text-white"
                  onClick={() => handleDelete(post.id)}
                >
                  حذف
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
