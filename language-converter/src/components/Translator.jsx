import React, { useEffect, useState } from "react";
import axios from "axios";

const Translator = () => {
  const [options, setOptions] = useState([]);
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [from, setFrom] = useState("en");
  const [to, setTo] = useState("");

  useEffect(() => {
    const options = {
      method: "GET",
      url: "https://libretranslate.com/languages",
      headers: {
        "accept": "application/json"
      },
    };
      axios.request(options).then(res => {
      console.log(res.data);
      setOptions(res.data)
      })
  }, []);

  // curl -X 'POST' \
  // 'https://libretranslate.com/translate' \
  // -H 'accept: application/json' \
  // -H 'Content-Type: application/x-www-form-urlencoded' \
  // -d 'q=hallo&source=en&target=es&format=text&api_key=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
  //     q=hallo&source=en&target=fr&format=text&api_key=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx

  const translate = () => {
    console.log("from:",from,to);

    const params = new URLSearchParams();
    params.append("q", inputText);
    params.append("source", from);
    params.append("target", to);
    params.append("format", "text");
    params.append("api_key", "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx");

    axios.post('https://libretranslate.com/translate', params ,
        {
          headers: {
            "accept": "application/json",
            "Content-Type": "application/x-www-form-urlencoded"
          },
        }
      )
      .then((res) => {
        console.log(res);
        // setOutputText(res.data.translatedText)
      })
  };

  return (
    <div className="bg-orange-400 h-screen flex justify-center items-center flex-col">
      <div className="flex">
        <label htmlFor="from">from: ({from})</label>
        <select className="mr-5" onChange={(e) => setFrom(e.target.value)}>
          {options.map((obj) => (
            <option value={obj.code} key={obj.code}>
              {obj.name}
            </option>
          ))}
        </select>
        <label htmlFor="to">to: ({to})</label>
        <select onChange={(e) => setTo(e.target.value)}>
          {options.map((obj) => (
            <option value={obj.code} key={obj.code}>
              {obj.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex p-5">
        <div className="inputText mr-5">
          <textarea
            onInput={(e) => setInputText(e.target.value)}
            value={inputText}
            cols={60}
            rows={10}
            type="text"
            placeholder="Enter Text"
          />
        </div>
        <div className="outputText">
          <textarea
            value={outputText}
            cols={60}
            rows={10}
            type="text"
            placeholder="Enter Text"
          />
        </div>
      </div>
      <div className="row3">
        <button className="btn" onClick={() => translate()}>
          <span className="translate">Translate</span>
        </button>
      </div>
    </div>
  );
};

export default Translator;
