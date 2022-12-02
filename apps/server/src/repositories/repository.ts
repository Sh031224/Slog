import AppDataSource from "@/data-source";

export default class Repository {
  protected DbConnect = async () => {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }
  };
}
