import NavBar from "../components/NavBar";
import { VStack } from "@chakra-ui/react";
import { HStack } from "@chakra-ui/react";
import Image from "../components/Image";
import editProfile from "../assets/editProfile.png";
const Profile = () => {
  const circleColon = "\uFE55";
  const handleEditProfile = () => {
    console.log("Edit Profile");
  };
  return (
    <div>
      <NavBar />
      <div className="w-100 d-flex flex-wrap justify-content-center align-items-center">
        <VStack className="shadow" height={500} width={"75%"} marginTop={10}>
          <div className="align-self-start d-flex flex-row p-4 w-100">
            <div className="shadow-sm w-100 p-4">
              <div className="d-flex">
                <h2 style={{ width: "95%" }} className="mb-3">
                  Personal Information
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
                <p>John Doe</p>
                <br /> <br />
                <p className="dot fs-5 fw-bolder">Email{circleColon} </p>
                <p>john.doe@example.com</p>
                <br /> <br />
              </HStack>
              <HStack>
                <p className="dot fs-5 fw-bolder">Phone{circleColon} </p>
                <p>+91 1234567890</p>
                <br /> <br />
                <p className="dot fs-5 fw-bolder">Gender{circleColon} </p>
                <p>Male</p>
              </HStack>
              <HStack>
                <p className="dot fs-5 fw-bolder">
                  Date of Birth{circleColon}{" "}
                </p>
                <p>01/01/1990</p>
                <br /> <br />
                <p className="dot fs-5 fw-bolder">Address{circleColon} </p>
                <p>123, Main Street, City, Country</p>
                <br /> <br />
              </HStack>
              <HStack>
                <p className="dot fs-5 fw-bolder">Interests: </p>
                <p>Reading, Hiking, Coding</p>
              </HStack>
              <br /> <br />
              <p className="dot fs-5 fw-bolder">Connect with me: </p>
              <p>Facebook, Twitter, Instagram</p>
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
