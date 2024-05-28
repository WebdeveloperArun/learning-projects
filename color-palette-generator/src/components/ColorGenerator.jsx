import React, { useEffect, useState } from "react";

const ColorGenerator = () => {
  const [colorCode, setColorCode] = useState([]);
  const [savedColor, setSavedColor] = useState([]);

  const generateColor = () => {
    let colorcode = "#";
    for (let i = 0; i < 3; i++) {
      let num = Math.floor(Math.random() * 256);
      let colorhex = num.toString(16).padStart(2, "0");
      colorcode += colorhex;
    }
    return colorcode;
  };

  const handlegenerate = () => {
    const colorArr = [];
    for (let i = 0; i < 5; i++) {
      const color = generateColor();
      colorArr.push(color);
    }
    setColorCode(colorArr);
  };
  useEffect(() => {
    handlegenerate();
  }, []);

  const handleSave = () => {
    let savedInstant = [...savedColor];
    savedInstant.push(colorCode);
    setSavedColor(savedInstant);
  };

  const handledelete = (index) => {
    const savedInstant = savedColor.filter((_, i) => {
     return i != index;
    });
    setSavedColor(savedInstant);
  }

  const copyHandler = (color) => {
     navigator.clipboard.writeText(color);
     let w = window.open("", "", "width=100,height=100");
     w.document.write("color copied");
     w.focus();
     setTimeout(function () {
       w.close();
     }, 1000);
  }
  return (
    <div className="h-min[100vh] flex items-center justify-center flex-col pt-10">
      <div className="flex">
        {colorCode &&
          colorCode.map((color, index) => {
            return (
              <div
                className="rounded-md h-48 w-32 flex items-center justify-center flex-col pt-20"
                key={index}
                style={{ backgroundColor: color }}
              >
                {color}
              </div>
            );
          })}
      </div>
      <div>
        <button
          className="bg-gray-300 rounded px-2 py-2 m-5"
          onClick={() => handlegenerate()}
        >
          generate color palette
        </button>
        <button
          className="bg-gray-300 rounded px-2 py-2 m-5"
          onClick={() => handleSave()}
        >
          save color palette
        </button>
      </div>
      <div>
        {savedColor &&
          savedColor.map((val, index) => (
            <div key={index}>
              <div className="flex">
                {val &&
                  val.map((color, index) => {
                    return (
                      <div
                        onClick={() => copyHandler(color)}
                        className="rounded-md mb-2 h-48 w-32 flex items-center justify-center flex-col pt-20"
                        key={index}
                        style={{ backgroundColor: color }}
                      >
                        {color}
                      </div>
                    );
                  })}
              </div>
              <button
                className="bg-gray-300 rounded px-2 py-2 mt-1 mb-6"
                onClick={() => handledelete(index)}
              >
                delete
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ColorGenerator;
