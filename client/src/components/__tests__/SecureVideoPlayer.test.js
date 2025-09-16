import React from "react";
import { render, screen } from "@testing-library/react";
import SecureVideoPlayer from "../SecureVideoPlayer";

// fetch'i mock'la
beforeEach(() => {
  global.fetch = jest.fn();
  global.URL.createObjectURL = jest.fn(() => "blob:http://localhost/fake-video-url");
});

// testten sonra temizle
afterEach(() => {
  jest.resetAllMocks();
});

describe("SecureVideoPlayer", () => {
  const token = "fake-token";
  const videoId = "123";

  test("loading state gösterilmeli", () => {
    // fetch pending durumda (resolve etmedik)
    fetch.mockImplementation(() => new Promise(() => {}));

    render(<SecureVideoPlayer videoId={videoId} token={token} />);
    expect(screen.getByText(/Loading video/i)).toBeInTheDocument();
  });

  test("başarılı fetch sonrası video render edilmeli", async () => {
    // 1. fetch'i başarılı bir response ile mock'la
    const fakeBlob = new Blob(["fake video data"], { type: "video/mp4" });
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        status: 200,
        blob: () => Promise.resolve(fakeBlob),
      })
    );

    // 2. createObjectURL mock'u zaten var
    render(<SecureVideoPlayer videoId="123" token="fake-token" />);

    // 3. video elementini bekle
    const video = await screen.findByTestId("secure-video");
    expect(video).toBeInTheDocument();
    expect(video.tagName).toBe("VIDEO");
  });

  test("fetch başarısız olursa hata mesajı gösterilmeli", async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
    });

    render(<SecureVideoPlayer videoId={videoId} token={token} />);

    const errorMessage = await screen.findByText(/Video yüklenemedi/i);
    expect(errorMessage).toBeInTheDocument();
  });
});
