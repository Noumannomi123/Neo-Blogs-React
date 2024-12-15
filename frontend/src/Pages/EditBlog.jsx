import { VStack } from "@chakra-ui/react";
import Loader, { HelperLoader } from "../components/Loader";
import { useParams } from "react-router-dom";
import NotFoundPage from "./NotFoundPage";
import NavBar from "../components/NavBar";
import BlogEditor from "../components/BlogEditor";
const EditBlog = () => {
  const user = {
    id: localStorage.getItem("id"),
    email: localStorage.getItem("email"),
  };
  const { id } = useParams();
  if (HelperLoader()) return <Loader />;
  if (id != user.id) return <NotFoundPage />;
  return (
    <div>
      <NavBar />
      <VStack
        marginTop={10}
        marginLeft={{ base: "2%", lg: "10%" }}
        marginRight={{ base: "2%", lg: "10%" }}
      >
        <h2 className="mb-3">Edit your blog</h2>
        <BlogEditor />
      </VStack>
    </div>
  );
};

export default EditBlog;
