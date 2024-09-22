import { API_STASTICS_CLIENT_URL } from "@/constants/api.constants";

export default function useGetStatisticsClient() {
  const getStaticsClient = async (
    clientId: number,
    showDetails: boolean = true
  ) => {
    const response = await fetch(
      `${API_STASTICS_CLIENT_URL}/${clientId}?show_details=${showDetails}`
    );
    if (!response.ok) {
      throw new Error(
        `Error fetching client statistics: ${response.statusText}`
      );
    }
    const data = await response.json();
    return data;
  };

  return {
    getStaticsClient,
  };
}
