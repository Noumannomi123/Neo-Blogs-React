import { useState } from "react";
import NavBar from "../components/NavBar";
import { VStack } from "@chakra-ui/react";
import { HStack } from "@chakra-ui/react";
import Image from "../components/Image";
import editProfile from "../assets/editProfile.png";
import { useContext, useEffect } from "react";
import axios from "axios";
import AuthContext from "../components/AuthContext";
import API_URL from "../config";
const Profile = () => {
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState({});
  const circleColon = "\uFE55";
  const handleEditProfile = () => {
    console.log("Edit Profile");
  };
  useEffect(() => {
    // hit the route API_URL//profile/:id"
    const getProfile = async () => {
      try {
        const response = await axios.get(`${API_URL}/user/profile/${user.id}`);
        setProfile(response.data);
        console.log(response.data);
      } catch (error) {
        console.log("Error fetching user profile from the database.", error);
      }
    };
    getProfile();
  }, [user.id]);
  return (
    <div>
      <NavBar />
      <div className="w-100 d-flex flex-wrap justify-content-center align-items-center">
        <VStack className="shadow" height={500} width={"75%"} marginTop={10}>
          <div className="align-self-start d-flex flex-row p-4 w-100">
            <div className="shadow-sm w-100 p-4">
              <div className="d-flex">
                <h2 style={{ width: "95%" }} className="mb-3">
                  Profile
                </h2>
                <div
                  onClick={handleEditProfile}
                  style={{ widoth: "30px", height: "30px" }}
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
              <HStack>
                <p className="dot fs-5 fw-bolder">Name{circleColon} </p>
                <p>{profile.name}</p>
                <br /> <br />
                <p className="dot fs-5 fw-bolder">Email{circleColon} </p>
                <p>{profile.email}</p>
                <br /> <br />
              </HStack>
              <HStack>
                <p className="dot fs-5 fw-bolder">Phone{circleColon} </p>
                <p>{profile.phone}</p>
                <br /> <br />
                <p className="dot fs-5 fw-bolder">Gender{circleColon} </p>
                <p>{profile.gender}</p>
                <br /> <br />
              </HStack>
              <HStack>
                <p className="dot fs-5 fw-bolder">
                  Date of Birth{circleColon}{" "}
                </p>
                <p>{profile.date_of_birth.slice(0,10)}</p>
                <br /> <br />
                <p className="dot fs-5 fw-bolder">Address{circleColon} </p>
                <p>{profile.address}</p>
                <br /> <br />
              </HStack>
              <p className="dot fs-5 fw-bolder">Connect with me: </p>
              <p>{`${profile.facebook_link}, ${profile.twitter_link}, ${profile.instagram_link}`}</p>
            </div>
            <div className="mx-3">
              <Image
                src=""
                className={"rounded-circle"}
                width={"250px"}
                height={"250px"}
              />
            </div>
          </div>
        </VStack>
      </div>
    </div>
  );
};

export default Profile;
