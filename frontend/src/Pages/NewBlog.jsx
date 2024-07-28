import { VStack } from "@chakra-ui/react";
import Editor from "../components/Editor";
const NewBlog = () => {
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
