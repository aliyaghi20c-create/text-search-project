"use client";

import { useState } from "react";
import "./globals.css";

const posts = [
  {
    id: 1,
    title: "Understanding the difference between grid-template and grid-auto",
    date: "Oct 09, 2018",
    content:
      "With all the new properties related to CSS Grid Layout, one of the distinctions that confused me was the difference between the grid-template-* and grid-auto-* properties."
  },
  {
    id: 2,
    title: "Recreating the GitHub Contribution Graph with CSS Grid Layout",
    date: "Oct 20, 2018",
    content:
      "In this article, we explore recreating GitHub's contribution graph using pure CSS Grid."
  },
];

function highlight(text, query) {
  if (!query) return text;
  const regex = new RegExp(`(${query})`, "gi");
  return text.replace(regex, "<mark>$1</mark>");
}

export default function Home() {
  const [search, setSearch] = useState("");

  const filtered = posts.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.content.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="page">
      <h1 className="search-title">Search</h1>

      <div className="search-wrapper">
        <input
          type="text"
          placeholder="Search…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {search.length > 0 && (
          <button className="clear-btn" onClick={() => setSearch("")}>
            ✕
          </button>
        )}
      </div>

      <p className="count">
        {filtered.length} posts were found.
      </p>

      <div className="results">
        {filtered.map((post) => (
          <div key={post.id} className="post">
            <h2
              dangerouslySetInnerHTML={{
                __html: highlight(post.title, search),
              }}
            />
            <p className="date">{post.date}</p>

            <p
              className="excerpt"
              dangerouslySetInnerHTML={{
                __html: highlight(post.content, search),
              }}
            />
          </div>
        ))}
      </div>
    </main>
  );
}