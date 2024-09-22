import { API_BASE_URL } from "./../../../constants/api.constants";
export default function useGetSystemLoad() {
  const getSystemLoad = async () => {
    const response = await fetch(`${API_BASE_URL}/system-load`);
    if (!response.ok) {
      throw new Error(`Error fetching system load: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  };

  return {
    getSystemLoad,
  };
}
