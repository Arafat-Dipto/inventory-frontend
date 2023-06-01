import { Input } from "antd";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import Nav from "../Component/Nav";
import { AuthContext } from "../context/AuthProvider";

const initialState = {
  name: "",
  sector: [{
    value: '',
    label: ''
  }],
  isAgreed: false,
};


const Form = () => {
  const { currentUser, dispatch } = useContext(AuthContext);
  const TOKEN = currentUser?.token;
  const [selectedOptions, setSelectedOptions] = useState();
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(initialState);


  // FETCHING SECTORS

  const [options, setOptions] = useState([]);

  // const TOKEN = currentUser?.token;

  console.log(TOKEN);

  const userSectorInfo = async () => {
    const res = await axios.get(
      "https://user-sector-app.vercel.app/auth/profile",
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      }
    );
    var newsectors = res.data.sectors.map((n) => ({
      value: n.value,
      label: n.label
    }));

    setUserInfo((prev) => ({
      ...prev,
      name: res.data.username,
      sector: newsectors,
      isAgreed: res.data.isAgreed,
    }));
    console.log("USER PR INFO::::>>>", res.data);
  };
  const sectorsList = async () => {
    await axios
      .get("https://user-sector-app.vercel.app/sectors")
      .then(({ data }) => {
        const treeData = [...data]?.map((op, k) => ({
          value: op._id,
          label: op.name,
        }));
        setOptions((prev) => ({ ...prev, treeData: treeData }));
      });
  };

  useEffect(() => {
    sectorsList();
    userSectorInfo()
  }, []);

  const userNameHnadler = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const userCheckHandler = () =>
    setUserInfo({ ...userInfo, isAgreed: !userInfo.agree });

  function handleSelect(data) {
    setSelectedOptions(data);
    var sectors = [];
    for (var i in data) {
      sectors[i] = {
        value: data[i].value,
        label: data[i].label
      }
    }
    setUserInfo((prev) => ({
      ...prev,
      sector: sectors,
    }))
  }

  // console.log(userInfo);

  const updateInfo = async (e) => {
    e.preventDefault()
    await axios.put(
      "https://user-sector-app.vercel.app/auth/profile/update",
      userInfo,
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      },

    );
    navigate('/');
  };

  return (
    <div>
      <Nav />
      <div className="h-screen w-screen flex justify-center items-center bg-cyan-200">
        <div className="bg-blue-500 text-white w-3/4 lg:w-1/4  p-4 rounded-md">
          <span className="">
            Please enter your name and pick the Sectors you are currently involved
            in.
          </span>
          <form className="space-y-4 mt-8">
            <div className="flex flex-row gap-2">
              <label className="font-medium">Name:</label>
              <Input
                placeholder="Enter Your Name"
                name="name"
                value={userInfo.name}
                onChange={(e) =>
                  setUserInfo((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
              />
            </div>

            <div className="flex flex-row gap-2 ">
              <span className="font-medium">Sectors:</span>

              <Select
                styles={{ width: "300px" }}
                theme={(theme) => ({
                  ...theme,
                  borderRadius: 0,
                  colors: {
                    ...theme.colors,
                    background: 'gray',
                    primary25: 'hotpink',
                    primary: 'black',
                  },
                })}
                closeMenuOnSelect={false}
                value={userInfo.sector ? userInfo.sector : selectedOptions}
                isMulti
                isSearchable={true}
                options={options.treeData}
                onChange={handleSelect}
              />
            </div>
            <div>
              <input
                type="checkbox"
                name="agree"
                // checked={userInfo.isAgreed === true ? true : false}
                onChange={(e) => userCheckHandler(e)}
              />
              <span className="font-medium"> Agree to terms</span>
            </div>
            <button
              className="bg-white text-blue-600 py-1 px-3 rounded-md"
              onClick={updateInfo}
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Form;
