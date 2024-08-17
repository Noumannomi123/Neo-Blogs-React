import { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import {
  VStack,
  HStack,
  Button,
  Input,
  FormControl,
  FormLabel,
  Select,
} from "@chakra-ui/react";
import Image from "../components/Image";
import editProfile from "../assets/editProfile.png";
import close from "../assets/close.png";
import axios from "axios";
import API_URL from "../config";
import Loader from "../components/Loader";
import { useMedia } from "use-media";
import ImageUploader from "../components/ImageUploader";
import dummyProfile from "../assets/dummyProfile.png";
const Profile = () => {
  const user = {
    id: localStorage.getItem("id"),
    email: localStorage.getItem("email"),
  };
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    date_of_birth: "",
    address: "",
    facebook_link: "",
    instagram_link: "",
    twitter_link: "",
    pic: [],
  });
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editProfileData, setEditProfileData] = useState({});
  const isMobile = useMedia({ maxWidth: "1050px" });
  const circleColon = "\uFE55";

  const handleEditProfile = () => {
    setIsEditing(!isEditing);
    setEditProfileData({ ...profile });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditProfileData({ ...editProfileData, [name]: value });
  };

  const handleSave = async () => {
    try {
      if (profile.pic.length === 0) {
        profile.pic = [{ ...profile.pic[0], data_url: dummyProfile }];
      }
      const data = { ...editProfileData, pic: profile.pic[0].data_url };
      const response = await axios.put(
        `${API_URL}/user/profile/${user.id}`,
        data,
        {
          withCredentials: true,
        }
      );
      setProfile({
        ...response.data,
        pic: [{ data_url: response.data.pic || dummyProfile }],
      });
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating user profile.");
    }
  };
  useEffect(() => {
    const getProfile = async () => {
      try {
        const response = await axios.get(`${API_URL}/user/profile/${user.id}`);
        setProfile({
          ...response.data,
          pic: [{ data_url: response.data.pic || dummyProfile }],
        });
        setLoading(false);
      } catch (error) {
        console.log("Error fetching user profile from the database.", error);
      }
    };
    getProfile();
  }, [user.id]);
  if (loading) return <Loader />;
  return (
    <div>
      <NavBar />
      {!isMobile ? (
        <div className="w-100 d-flex flex-wrap justify-content-center align-items-center">
          <VStack className="shadow" width={"75%"} marginTop={10}>
            <div className="align-self-start d-flex flex-row p-4 w-100">
              <div className="shadow-sm w-100 p-4">
                {isEditing ? (
                  <div>
                    <div className="d-flex">
                      <h2
                        style={{ width: "95%", textAlign: "center" }}
                        className="mb-3"
                      >
                        Profile
                      </h2>
                      <div
                        onClick={handleEditProfile}
                        style={{ width: "30px", height: "30px" }}
                      >
                        <Image
                          styles={{ cursor: "pointer" }}
                          className={"mt-2 cursor"}
                          src={close}
                          width={"24px"}
                          height={"24px"}
                        />
                      </div>
                    </div>
                    <FormControl>
                      <FormLabel>Name</FormLabel>
                      <Input
                        name="name"
                        value={editProfileData.name}
                        disabled
                      />
                      <FormLabel>Email</FormLabel>
                      <Input
                        name="email"
                        value={editProfileData.email}
                        disabled
                      />
                      <FormLabel>Phone</FormLabel>
                      <Input
                        name="phone"
                        type="number"
                        value={editProfileData.phone}
                        onChange={handleChange}
                      />
                      <FormLabel>Gender</FormLabel>
                      <Select
                        id="gender"
                        name="gender"
                        value={editProfileData.gender}
                        onChange={handleChange}
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </Select>
                      <FormLabel>Date of Birth</FormLabel>
                      <Input
                        name="date_of_birth"
                        type="date"
                        value={editProfileData.date_of_birth}
                        onChange={handleChange}
                      />
                      <FormLabel>Address</FormLabel>
                      <Input
                        name="address"
                        value={editProfileData.address}
                        onChange={handleChange}
                      />
                      <FormLabel>Facebook Link</FormLabel>
                      <Input
                        name="facebook_link"
                        value={editProfileData.facebook_link}
                        onChange={handleChange}
                      />
                      <FormLabel>Twitter Link</FormLabel>
                      <Input
                        name="twitter_link"
                        value={editProfileData.twitter_link}
                        onChange={handleChange}
                      />
                      <FormLabel>Instagram Link</FormLabel>
                      <Input
                        name="instagram_link"
                        value={editProfileData.instagram_link}
                        onChange={handleChange}
                      />
                      <Button
                        onClick={handleSave}
                        bg="#3078c3"
                        color={"white"}
                        mt={4}
                      >
                        Save
                      </Button>
                      <Button onClick={() => setIsEditing(false)} mx={5} mt={4}>
                        Cancel
                      </Button>
                    </FormControl>
                  </div>
                ) : (
                  <div>
                    <div className="d-flex">
                      <h2
                        style={{ width: "95%", textAlign: "center" }}
                        className="mb-4"
                      >
                        Profile
                      </h2>
                      <div
                        onClick={handleEditProfile}
                        style={{ width: "30px", height: "30px" }}
                      >
                        <Image
                          styles={{ cursor: "pointer" }}
                          className={"mt-2 cursor"}
                          src={editProfile}
                          width={"30px"}
                          height={"30px"}
                        />
                      </div>
                    </div>
                    <VStack width={"100%"}>
                      <HStack align={"start"} width={"100%"}>
                        <VStack spacing={0} align={"start"} width={"50%"}>
                          <p className="dot fs-5 fw-bolder">
                            Name{circleColon}{" "}
                          </p>
                          <p>{profile.name}</p>
                          <p className="dot fs-5 fw-bolder">
                            Email{circleColon}{" "}
                          </p>
                          <p>{profile.email}</p>
                        </VStack>
                        <VStack spacing={0} align={"start"} width={"50%"}>
                          <p className="dot fs-5 fw-bolder">
                            Phone{circleColon}{" "}
                          </p>
                          <p>{profile.phone}</p>
                          <p className="dot fs-5 fw-bolder">
                            Gender{circleColon}{" "}
                          </p>
                          <p>{profile.gender}</p>
                        </VStack>
                      </HStack>
                      <HStack align={"start"} width={"100%"}>
                        <p className="dot fs-5 fw-bolder">
                          Date of Birth{circleColon}
                        </p>
                        <p style={{ marginTop: "0.6%" }} className="mt-1">
                          {profile.date_of_birth.slice(0, 10)}
                        </p>
                      </HStack>
                      <HStack align={"start"} width={"100%"}>
                        <p className="dot fs-5 fw-bolder">
                          Address{circleColon}
                        </p>
                        <p style={{ marginTop: "0.6%" }}>{profile.address}</p>
                      </HStack>
                    </VStack>

                    <p className="dot fs-5 fw-bolder">Connect with me: </p>
                    {profile.facebook_link > 0 && (
                      <p>{`${profile.facebook_link}`}</p>
                    )}
                    {profile.instagram_link > 0 && (
                      <p>{`${profile.instagram_link}`}</p>
                    )}
                    {profile.twitter_link > 0 && (
                      <p>{`${profile.twitter_link}`}</p>
                    )}
                  </div>
                )}
              </div>
              <div className="mx-3 mb-3">
                {profile.pic.length > 0 ? (
                  <Image
                    src={profile.pic[0].data_url}
                    className={"rounded-circle"}
                    width={"250px"}
                    height={"250px"}
                  />
                ) : (
                  <Image
                    src={dummyProfile}
                    className={"rounded-circle"}
                    width={"250px"}
                    height={"250px"}
                  />
                )}

                <div className="w-100 mt-3 d-flex justify-content-center mx-auto">
                  <ImageUploader
                    setTitleImage={(images) =>
                      setProfile({ ...profile, pic: images })
                    }
                    images={profile.pic}
                    msg={`Profile Picture. Click or Drop here.`}
                  />
                </div>
              </div>
            </div>
          </VStack>
        </div>
      ) : (
        <div className="w-100 d-flex flex-column-reverse flex-wrap justify-content-center align-items-center">
          <VStack className="shadow" width={"95%"}>
            <div className="align-self-start d-flex flex-row p-4 w-100">
              <div className="shadow-sm w-100 p-4">
                {isEditing ? (
                  <div>
                    <div className="d-flex">
                      <h2
                        style={{ width: "95%", textAlign: "center" }}
                        className="mb-3"
                      >
                        Profile
                      </h2>
                      <div
                        onClick={handleEditProfile}
                        style={{ width: "30px", height: "30px" }}
                      >
                        <Image
                          styles={{ cursor: "pointer" }}
                          className={"mt-2 cursor"}
                          src={close}
                          width={"24px"}
                          height={"24px"}
                        />
                      </div>
                    </div>
                    <FormControl>
                      <FormLabel>Name</FormLabel>
                      <Input
                        name="name"
                        value={editProfileData.name}
                        disabled
                      />
                      <FormLabel>Email</FormLabel>
                      <Input
                        name="email"
                        value={editProfileData.email}
                        disabled
                      />
                      <FormLabel>Phone</FormLabel>
                      <Input
                        name="phone"
                        type="number"
                        value={editProfileData.phone}
                        onChange={handleChange}
                      />
                      <FormLabel>Gender</FormLabel>
                      <Select
                        id="gender"
                        name="gender"
                        value={editProfileData.gender}
                        onChange={handleChange}
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </Select>
                      <FormLabel>Date of Birth</FormLabel>
                      <Input
                        name="date_of_birth"
                        type="date"
                        value={editProfileData.date_of_birth}
                        onChange={handleChange}
                      />
                      <FormLabel>Address</FormLabel>
                      <Input
                        name="address"
                        value={editProfileData.address}
                        onChange={handleChange}
                      />
                      <FormLabel>Facebook Link</FormLabel>
                      <Input
                        name="facebook_link"
                        value={editProfileData.facebook_link}
                        onChange={handleChange}
                      />
                      <FormLabel>Twitter Link</FormLabel>
                      <Input
                        name="twitter_link"
                        value={editProfileData.twitter_link}
                        onChange={handleChange}
                      />
                      <FormLabel>Instagram Link</FormLabel>
                      <Input
                        name="instagram_link"
                        value={editProfileData.instagram_link}
                        onChange={handleChange}
                      />
                      <Button
                        onClick={handleSave}
                        bg="#3078c3"
                        color={"white"}
                        mt={4}
                      >
                        Save
                      </Button>
                      <Button onClick={() => setIsEditing(false)} mx={5} mt={4}>
                        Cancel
                      </Button>
                    </FormControl>
                  </div>
                ) : (
                  <div>
                    <div className="d-flex">
                      <h2
                        style={{ width: "95%", textAlign: "center" }}
                        className="mb-4"
                      >
                        Profile
                      </h2>
                      <div
                        onClick={handleEditProfile}
                        style={{ width: "30px", height: "30px" }}
                      >
                        <Image
                          styles={{ cursor: "pointer" }}
                          className={"mt-2 cursor"}
                          src={editProfile}
                          width={"30px"}
                          height={"30px"}
                        />
                      </div>
                    </div>
                    <VStack width={"100%"}>
                      <HStack align={"start"} width={"100%"}>
                        <VStack spacing={0} align={"start"} width={"50%"}>
                          <p className="dot fs-5 fw-bolder">
                            Name{circleColon}{" "}
                          </p>
                          <p>{profile.name}</p>
                          <p className="dot fs-5 fw-bolder">
                            Email{circleColon}{" "}
                          </p>
                          <p>{profile.email}</p>
                        </VStack>
                        <VStack spacing={0} align={"start"} width={"50%"}>
                          <p className="dot fs-5 fw-bolder">
                            Phone{circleColon}{" "}
                          </p>
                          <p>{profile.phone}</p>
                        </VStack>
                      </HStack>
                      <HStack align={"start"} width={"100%"}>
                        <p className="dot fs-5 fw-bolder">
                          Gender{circleColon}{" "}
                        </p>
                        <p>{profile.gender}</p>
                      </HStack>
                      <HStack align={"start"} width={"100%"}>
                        <p className="dot fs-5 fw-bolder">
                          Date of Birth{circleColon}
                        </p>
                        <p style={{ marginTop: "0.6%" }} className="mt-1">
                          {profile.date_of_birth.slice(0, 10)}
                        </p>
                      </HStack>
                      <HStack align={"start"} width={"100%"}>
                        <p className="dot fs-5 fw-bolder">
                          Address{circleColon}
                        </p>
                        <p style={{ marginTop: "0.6%" }}>{profile.address}</p>
                      </HStack>
                    </VStack>

                    <p className="dot fs-5 fw-bolder">Connect with me: </p>
                    {profile.facebook_link > 0 && (
                      <p>{`${profile.facebook_link}`}</p>
                    )}
                    {profile.instagram_link > 0 && (
                      <p>{`${profile.instagram_link}`}</p>
                    )}
                    {profile.twitter_link > 0 && (
                      <p>{`${profile.twitter_link}`}</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </VStack>
          {profile.pic.length > 0 ? (
            <Image
              src={profile.pic[0].data_url}
              className={"rounded-circle"}
              width={"160px"}
              height={"160px"}
            />
          ) : (
            <Image
              src={dummyProfile}
              className={"rounded-circle"}
              width={"160px"}
              height={"160px"}
            />
          )}

          <div className="w-100 mt-3 d-flex justify-content-center mx-auto">
            <ImageUploader
              setTitleImage={(images) =>
                setProfile({ ...profile, pic: images })
              }
              images={profile.pic}
              msg={`Profile Picture. Click or Drop here.`}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
