import { MockData } from "../mockData";
import { TalksApiData, TalksData } from "../types/TalksData";

class ApiService {
  async apiCall(url: string, method: string = "GET"): Promise<TalksApiData> {
    return new Promise((resolved, rejected) => {
      if (url) {
        setTimeout(() => {
          resolved({ data: MockData });
        }, 1000);
      } else {
        rejected();
      }
    });
  }

  async getTalks(): Promise<TalksData[]> {
    const res: TalksApiData = (await this.apiCall("/lectures", "GET")) as TalksApiData;
    return res.data;
  }
}

export default new ApiService();
