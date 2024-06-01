import React, { useEffect, useState } from "react";
import Input from "./components/Input";
import { v4 as uuid } from "uuid";

const App = () => {
  const [form, setForm] = useState({
    id: null,
    url: "",
    username: "",
    password: "",
  });
  const id = uuid();
  const [allPasswords, setAllPasswords] = useState([]);
  const [hidePassword, setHidePassword] = useState("true");

  const handleUrlChange = (e) => {
    setForm({ ...form, url: e });
  };
  const handleUsernameChange = (e) => {
    setForm({ ...form, username: e });
  };
  const handlePasswordChange = (e) => {
    setForm({ ...form, password: e });
  };

  useEffect(() => {
    const localData = localStorage.getItem("password");
    if (localData) {
      setAllPasswords(JSON.parse(localData));
    }
  }, []);

  const addPassword = () => {
    setAllPasswords([...allPasswords, { ...form, id: id }]);
    localStorage.setItem(
      "password",
      JSON.stringify([...allPasswords, { ...form, id: id }])
    );

    setForm({
      url: "",
      username: "",
      password: "",
    });
  };

  const editHandler = (index, uid) => {
    const passwordObj = allPasswords[index];
    const { url, username, password, id } = passwordObj;
    setForm({ url: url, username: username, password: password });
    localStorage.removeItem("password");

    const filterdPasswords = allPasswords.filter((_, e) => {
      return index !== e;
    });
    localStorage.setItem("password", JSON.stringify(filterdPasswords));
    setAllPasswords(filterdPasswords);
  };

  const deleteHandler = (i) => {
    localStorage.removeItem("password");
    const filterdPasswords = allPasswords.filter((_, e) => {
      return i !== e;
    });
    localStorage.setItem("password", JSON.stringify(filterdPasswords));
    setAllPasswords(filterdPasswords);
  }

  const copyHandler = (i) => {
    const {password} = allPasswords[i]
    navigator.clipboard.writeText(password);
    let w = window.open("", "", "width=100,height=100");
    w.document.write("password copied");
    w.focus();
    setTimeout(function () {
      w.close();
    }, 1000);
  };

  return (
    <div>
      <div>
        <h1>Password Manager</h1>
        <div>
          <h3>Your Passwords</h3>

          <div className="relative overflow-x-auto">
            {!allPasswords.length == 0 ? (
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      url
                    </th>
                    <th scope="col" className="px-6 py-3">
                      username
                    </th>
                    <th scope="col" className="px-6 py-3">
                      password
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {allPasswords.map((data, index) => {
                    // console.log(data.id);
                    return (
                      <tr
                        key={index}
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                      >
                        <td className="px-6 py-4">{data.url}</td>
                        <td className="px-6 py-4">{data.username}</td>
                        <td className="px-6 py-4">{data.password}</td>
                        <td className="px-6 py-4" onClick={() => copyHandler(index)}>copy</td>
                        <td className="px-6 py-4" onClick={() => deleteHandler(index)}>delete</td>
                        <td
                          onClick={() => editHandler(index, data.id)}
                          className="px-6 py-4"
                        >
                          edit
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <p>No Data to show</p>
            )}
          </div>
        </div>
        <div>
          <h3>Add a Password</h3>
        </div>
        <div>
          <Input
            type="text"
            value={form.url}
            placeholder={"enter url"}
            onChange={handleUrlChange}
          />
          <Input
            type="text"
            value={form.username}
            placeholder={"enter username"}
            onChange={handleUsernameChange}
          />
          <Input
            type={hidePassword ? "password" : "text"}
            value={form.password}
            placeholder={"enter password"}
            onChange={handlePasswordChange}
          />
          <button
            onClick={() => {
              setHidePassword(!hidePassword);
            }}
          >
            {hidePassword ? "showPassword" : "hidePassword"}
          </button>
        </div>
        <div>
          <button onClick={() => addPassword()}>Add Password</button>
        </div>
      </div>
    </div>
  );
};

export default App;
