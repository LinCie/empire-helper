"use client";

import { FormEvent, useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function Home() {
  const [url, setUrl] = useState<string>();
  const [title, setTitle] = useState<string>();

  const [downloadUrl, setDownloadUrl] = useState<string>();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await axios.get("/api/download", {
      params: { url: url, title: title },
    });

    setDownloadUrl(response.data.url);
  };

  return (
    <div className="flex items-center justify-center flex-col">
      <h1 className="text-3xl font-bold">Empire Helper</h1>
      <form onSubmit={onSubmit} className="flex flex-col gap-3">
        <label htmlFor="url">url</label>
        <input
          type="text"
          name="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="border"
        />
        <label htmlFor="title">title</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border"
        />
        <button type="submit" className="border">
          Submit
        </button>
      </form>
      {downloadUrl && (
        <Link
          href={downloadUrl}
          target="_blank"
          className="text-blue-600 underline"
        >
          Download Here
        </Link>
      )}
    </div>
  );
}
