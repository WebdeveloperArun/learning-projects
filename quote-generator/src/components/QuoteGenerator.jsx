import React, { useEffect, useState } from "react";
import axios from "axios";

const QuoteGenerator = () => {
  const [quote, setQuote] = useState();

  const getOneQuote = () => {
    axios("https://api.quotable.io/random").then((res) => {
      setQuote(res.data);
      console.log(res.data);
    });
  };
  
  useEffect(() => {
    getOneQuote();
  }, []);

  return (
    <div className="h-screen bg-orange-200 flex items-center justify-center">
      <div className="bg-green-400 p-10 rounded-lg">
        <div>
          <p onLoad={() => getOneQuote()}>
            {quote ? quote.content : "No quotes available"}
          </p>
          <h5 className="text-orange-600 mt-2">
            {quote ? quote.author : null}
          </h5>
        </div>
        <div className="mt-6">
          <button
            className="px-4 py-2 bg-slate-200 rounded-md mr-5"
            onClick={() => getOneQuote()}
          >
            Get Quote
          </button>
          <a
            className="px-4 py-2 bg-slate-200 rounded-md"
            href="https://twitter.com/intent/tweet?text=hallo"
            target="_blank"
            rel="noopener noreferrer"
          >
            twitter
          </a>
        </div>
      </div>
    </div>
  );
};

export default QuoteGenerator;
