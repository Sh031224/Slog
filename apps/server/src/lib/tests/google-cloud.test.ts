import { Storage } from "@google-cloud/storage";

import GoogleCloud from "../google-cloud";

const mockUploadFile = {
  originalname: "test.txt",
  fieldname: "file",
  buffer: "buffer"
};

const mockWriteStreamOn = jest.fn();

const mockWriteStream = {
  on: mockWriteStreamOn,
  end: jest.fn()
};

const mockFile = {
  createWriteStream: jest.fn().mockReturnValue(mockWriteStream),
  makePublic: jest.fn()
};

const mockBucket = {
  file: jest.fn(() => mockFile)
};

const mockStorage = {
  bucket: jest.fn(() => mockBucket)
};

let mockGoogleStorage: jest.Mock;

jest.mock("@google-cloud/storage", () => {
  mockGoogleStorage = jest.fn(() => mockStorage);

  return {
    Storage: mockGoogleStorage
  };
});

describe("google-cloud.ts", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("upload success", () => {
    mockWriteStreamOn.mockImplementation(function (event, handler) {
      if (event === "finish") {
        handler();
      }
    });

    const googleCloud = new GoogleCloud();

    googleCloud.upload(mockUploadFile as any);

    expect(mockStorage.bucket).toHaveBeenCalled();
    expect(mockFile.makePublic).toHaveBeenCalled();
    expect(mockWriteStream.end).toBeCalled();
  });

  it("upload failure", async () => {
    mockWriteStreamOn.mockImplementation(function (event, handler) {
      if (event === "error") {
        handler(new Error("error"));
      }
    });

    mockGoogleStorage.mockReturnValue(mockStorage);

    const googleCloud = new GoogleCloud();

    await expect(googleCloud.upload(mockUploadFile as any)).rejects.toThrowError("error");

    expect(mockStorage.bucket).toHaveBeenCalled();
    expect(mockFile.makePublic).not.toHaveBeenCalled();
    expect(mockWriteStream.end).toHaveBeenCalled();
  });
});
