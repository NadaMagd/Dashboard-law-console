import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

export async function getArticlesDate() {
  try {
    const articleSnapshot = await getDocs(collection(db, "articles"));

    const articles = articleSnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        content: data.content,
        createdAt: data.createdAt,
        imageUrl: data.imageUrl,
        likesCount: Array.isArray(data.likes) ? data.likes.length : 0,
      };
    });
    console.log(articles);

    return articles;
  } catch (error) {
    console.error("Error fetching articles:", error);
    return [];
  }
}
//=========================deleteArticle===============================================
export async function deleteArticle(id) {
  try {
    await deleteDoc(doc(db, "articles", id));
    console.log("Article deleted successfully");
  } catch (error) {
    console.error("Error deleting article:", error);
  }
}
