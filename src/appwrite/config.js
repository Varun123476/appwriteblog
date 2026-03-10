import conf from "../conf/conf";
import { Client, Query, TablesDB ,Storage,ID} from "appwrite";

export class Service {
  client = new Client();
  tablesDB;
  storage;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.tablesDB = new TablesDB(this.client);
    this.storage = new Storage(this.client);
  }

  async createPost({slug, title, content, featuredImage, status, userId }) {
    try {
      return await this.tablesDB.createRow({
        databaseId: conf.appwriteDataBaseId,
        tableId: conf.appwriteCollectionId, // FIXED
        rowId: slug,
        data: { title, content, featuredImage, status, userId },
      });
    } catch (error) {
      console.error("Service :: createPost :: error", error);
      throw error;
    }
  }

  async updatePost(slug, data) {
    try {
      return await this.tablesDB.updateRow({
        databaseId: conf.appwriteDataBaseId,
        tableId: conf.appwriteCollectionId,
        rowId: slug,
        data,
      });
    } catch (error) {
      console.error("Service :: updatePost :: error", error);
      throw error;
    }
  }

  async getPost(slug) {
    try {
      return await this.tablesDB.getRow({
        databaseId: conf.appwriteDataBaseId,
        tableId: conf.appwriteCollectionId,
        rowId: slug,
      });
    } catch (error) {
      console.error("Service :: getPost :: error", error);
      return false;
    }
  }

  async deletePost(slug) {
    try {
      return await this.tablesDB.deleteRow({
        databaseId: conf.appwriteDataBaseId,
        tableId: conf.appwriteCollectionId,
        rowId: slug,
      });
    } catch (error) {
      console.error("Service :: deletePost :: error", error);
      return false;
    }
  }

  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.tablesDB.listRows({
        databaseId: conf.appwriteDataBaseId,
        tableId: conf.appwriteCollectionId,
        queries,
      });
    } catch (error) {
      console.error("Service :: getPosts :: error", error);
      return false;
    }
  }

  // file upload service

  async uploadFile(file) {
    try {
      return await this.storage.createFile({
        bucketId: conf.appwriteBucketId,
        fileId: ID.unique(),
        file,
      })
    } catch (error) {
       console.error("Service :: getPosts :: error", error);
      return false;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.storage.deleteFile({
        bucketId: conf.appwriteBucketId,
        fileId,
      })
      return true
    } catch (error) {
       console.error("Service :: getPosts :: error", error);
      return false;
    }
  }
  getFileView(fileId) {
    return this.storage.getFileView({
      bucketId: conf.appwriteBucketId,
      fileId
      })
  }
}

const databaseService = new Service();
export default databaseService;