// client/src/services/__tests__/mediaService.test.js
import { fetchImages } from "../mediaService.js";
import mockImages from "../../__fixtures__/images.json";
import axios from "axios";

jest.mock("axios");

describe("fetchImages", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return images when API call is successful", async () => {
    axios.get.mockResolvedValueOnce({ data: mockImages });

    const result = await fetchImages("fitness", 2);

    expect(axios.get).toHaveBeenCalledWith("http://localhost:5000/api/images", {
      params: { category: "fitness", limit: 2 },
    });
    expect(result).toEqual([mockImages]);
  });

  it("should return empty array if API response has no data", async () => {
    axios.get.mockResolvedValueOnce({});

    const result = await fetchImages("fitness", 2);
    expect(result).toEqual([]);
  });

  it("should return empty array when API call fails", async () => {
    axios.get.mockRejectedValueOnce(new Error("Network Error"));

    const result = await fetchImages("fitness", 2);
    expect(result).toEqual([]);
  });
});
