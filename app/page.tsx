'use client';

import { useState } from 'react';

export default function Home() {
  const [alias, setAlias] = useState('');
  const [url, setUrl] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  //handleSumbit was something I used during my internship at a startup, it was a function that was used to handle the submission of a form. It was used to send data to the server and get a response back. It was a function that was used to handle the submission of a form. It was used to send data to the server and get a response back.
  const handleSubmit = async (e: React.FormEvent) => { /*
  e: This is the event object that is passed to the handleSubmit function when the form is submitted and 
  React.FormEvent: This type comes from the React library and represents an event that is triggered by a form submission (or form-related interaction). It extends the standard browser Event type but includes some specific properties that are useful when working with forms in React. */
    e.preventDefault(); // Google: Prevents the form from submitting and refreshing the page. In modern web development, particularly when building single-page applications (SPAs) with frameworks like React, preventing the page from refreshing when a form is submitted is need for a smooth and seamless user experience
    setError('');
    setResult('');

    const res = await fetch('/api/', {
      method: 'POST',
      body: JSON.stringify({ alias, url }),
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await res.json();
    if (!res.ok) {
      setError(data.error);
    } else {
      setResult(data.shortUrl);
    }
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          className="border p-2"
          placeholder="Alias"
          value={alias}
          onChange={(e) => setAlias(e.target.value)}
        />
        <input
          className="border p-2"
          placeholder="https://example.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button className="bg-blue-500 text-white px-4 py-2" type="submit">
          Shorten
        </button>
      </form>
      {result && (
        <div className="mt-4">
          Shortened URL: <a href={result} className="text-blue-600 underline">{result}</a>
        </div>
      )}
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}
