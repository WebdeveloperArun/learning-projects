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
    <div className="main flex justify-center items-center min-h-screen bg-gray-100">
      <div className="card w-full max-w-3xl p-6 bg-white shadow-md rounded-md">
        <h1 className="main-heading text-2xl font-bold mb-4 text-center text-gray-800">
          Password Manager
        </h1>
        <div className="upperpart mb-6">
          <h3 className="smallheading text-xl font-semibold mb-2 text-gray-700">
            Your Passwords
          </h3>
          <div>
            {allPasswords.length !== 0 ? (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      URL
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Username
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Password
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {allPasswords.map((data, index) => (
                    <tr key={index} className="hover:bg-gray-100">
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {data.url}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {data.username}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {data.password}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        <button
                          onClick={() => copyHandler(index)}
                          className="text-blue-500 hover:underline"
                        >
                          Copy
                        </button>
                        <button
                          onClick={() => deleteHandler(index)}
                          className="text-red-500 hover:underline ml-2"
                        >
                          Delete
                        </button>
                        <button
                          onClick={() => editHandler(index, data.id)}
                          className="text-green-500 hover:underline ml-2"
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-center text-gray-500">No Data to show</p>
            )}
          </div>
        </div>
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2 text-gray-700">
            Add a Password
          </h3>
          <div className="grid grid-cols-1 gap-4">
            <Input
              type="text"
              value={form.url}
              placeholder={"Enter URL"}
              onChange={handleUrlChange}
              className="border rounded-md p-2 w-full"
            />
            <Input
              type="text"
              value={form.username}
              placeholder={"Enter Username"}
              onChange={handleUsernameChange}
              className="border rounded-md p-2 w-full"
            />
            <Input
              type={hidePassword ? "password" : "text"}
              value={form.password}
              placeholder={"Enter Password"}
              onChange={handlePasswordChange}
              className="border rounded-md p-2 w-full"
            />
            <button
              onClick={() => setHidePassword(!hidePassword)}
              className="mt-2 text-sm text-blue-500 hover:underline"
            >
              {hidePassword ? "Show Password" : "Hide Password"}
            </button>
          </div>
        </div>
        <div>
          <button
            onClick={() => addPassword()}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Add Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
