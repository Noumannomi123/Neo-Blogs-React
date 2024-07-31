import { VStack } from "@chakra-ui/react";
import Editor from "../components/Editor";
import Loader, { HelperLoader } from "../components/Loader";
import { useContext } from "react";
import AuthContext from "../components/AuthContext";
import { useParams } from "react-router-dom";
import NotFoundPage from "./NotFoundPage";
const NewBlog = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  if (HelperLoader()) return <Loader />;
  if (id != user.id) return <NotFoundPage />;
  return (
    <div>
      <VStack marginTop={10} marginLeft={"10%"} marginRight={"10%"}>
        <h3 className="mb-4">Add a new post</h3>
        <Editor />
      </VStack>
    </div>
  );
};

export default NewBlog;
