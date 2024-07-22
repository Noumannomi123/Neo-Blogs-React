import Container from "react-bootstrap/Container";
import Post from "../components/Post";
const AllPosts = () => {
  const posts = [
    {
      id: 1,
      title: "Observability Data Types",
      description: `Sed lorem mi, pellentesque sit amet orci et, mollis vehicula nunc. In fermentum rhoncus rutrum. Quisque eget varius risus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. In in libero eget nisl dictum egestas dapibus ut lorem. Morbi in risus non lacus interdum congue at sed velit. Phasellus ornare felis feugiat purus scelerisque porta.`,
      image:
        "https://media.istockphoto.com/id/174616627/photo/programming-language.webp?b=1&s=170667a&w=0&k=20&c=9wqa8MtXR7hV2xbEQFjY96vvzcjHg5CNtsoInNA7eFQ=",
      date: "2020-01-01",
      author: "John Doe",
      likes: 10,
      comments: [
        {
          id: 1,
          text: "This is the first comment",
          author: "Jane Doe",
          date: "2020-01-01",
        },
        {
          id: 2,
          text: "This is the second comment",
          author: "John Doe",
          date: "2020-01-02",
        },
      ],
    },
    {
      id: 2,
      title: "Introduction to AI",
      description: `Proin nec venenatis nisl. Nullam tincidunt, nisl nec rhoncus pretium, neque orci malesuada nunc, ut aliquam diam purus id magna. Nam libero diam, condimentum nec tristique id, auctor et urna. Suspendisse nibh tellus, fringilla ac blandit et, posuere a nibh. Cras sed vulputate mauris. Curabitur ornare quam in est facilisis, vel imperdiet est maximus. Quisque eget quam in velit viverra efficitur. Suspendisse potenti. Nam id massa rutrum, tristique mauris eget, porttitor nibh. Vestibulum vel faucibus lacus. Maecenas ultricies ultrices porta. Praesent sit amet pretium elit. Aliquam pharetra nunc efficitur porttitor imperdiet. Sed sollicitudin, tortor non lobortis venenatis, justo quam faucibus turpis, cursus pellentesque ante eros at tellus.`,
      image:
        "https://plus.unsplash.com/premium_photo-1680503587331-d8d4f8047393?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8QUl8ZW58MHx8MHx8fDA%3D",
      date: "2020-01-02",
      author: "Jane Doe",
      likes: 20,
      comments: [
        {
          id: 3,
          text: "This is the third comment",
          author: "John Doe",
          date: "2020-01-03",
        },
        {
          id: 4,
          text: "This is the fourth comment",
          author: "Jane Doe",
          date: "2020-01-04",
        },
      ],
    },
    // blog on gaming
    {
      id: 3,
      title: "The Evolution of Gaming",
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tincidunt, nisl nec rhoncus pretium, neque orci malesuada nunc, ut aliquam diam purus id magna. Nam libero diam, condimentum nec tristique id, auctor et urna. Suspendisse nibh tellus, fringilla ac blandit et, posuere a nibh. Cras sed vulputate mauris. Curabitur ornare quam in est facilisis, vel imperdiet est maximus. Quisque eget quam in velit viverra efficitur. Suspendisse potenti. Nam id massa rutrum, tristique mauris eget, porttitor nibh. Vestibulum vel faucibus lacus. Maecenas ultricies ultrices porta. Praesent sit amet pretium elit. Aliquam pharetra nunc efficitur porttitor imperdiet. Sed sollicitudin, tortor non lobortis venenatis, justo quam faucibus turpis, cursus pellentesque ante eros at tellus.`,
      image:
        "https://plus.unsplash.com/premium_photo-1674374443275-20dae04975ac?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z2FtaW5nfGVufDB8fDB8fHww",
      date: "2020-01-03",
      author: "John Doe",
      likes: 30,
      comments: [
        {
          id: 5,
          text: "This is the fifth comment",
          author: "Jane Doe",
          date: "2020-01-05",
        },
        {
          id: 6,
          text: "This is the sixth comment",
          author: "John Doe",
          date: "2020-01-06",
        },
      ],
    },
    // 3 more blogs on interesting topics
    {
      id: 4,
      title: "The Future of Artificial Intelligence",
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tincidunt, nisl nec rhoncus pretium, neque orci malesuada nunc, ut aliquam diam purus id magna. Nam libero diam, condimentum nec tristique id, auctor et urna. Suspendisse nibh tellus, fringilla ac blandit et, posuere a nibh. Cras sed vulputate mauris. Curabitur ornare quam in est facilisis, vel imperdiet est maximus. Quisque eget quam in velit viverra efficitur. Suspendisse potenti. Nam id massa rutrum, tristique mauris eget, porttitor nibh. Vestibulum vel faucibus lacus. Maecenas ultricies ultrices porta. Praesent sit amet pretium elit. Aliquam pharetra nunc efficitur porttitor imperdiet. Sed sollicitudin, tortor non lobortis venenatis, justo quam faucibus turpis, cursus pellentesque ante eros at tellus.`,
      image:
        "https://media.istockphoto.com/id/1488762342/photo/ai-new-age-digital-brain-chip-concept.webp?b=1&s=170667a&w=0&k=20&c=6840UWfPqaoEF-l4M9ocl1IAZnE7FykWvkSN5YWuB7Q=",
      date: "2020-01-04",
      author: "Jane Doe",
      likes: 40,
      comments: [
        {
          id: 7,
          text: "This is the seventh comment",
          author: "John Doe",
          date: "2020-01-07",
        },
        {
          id: 8,
          text: "This is the eighth comment",
          author: "Jane Doe",
          date: "2020-01-08",
        },
      ],
    },
    {
      id: 5,
      title: "The Impact of Social Media on Society",
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tincidunt, nisl nec rhoncus pretium, neque orci malesuada nunc, ut aliquam diam purus id magna. Nam libero diam, condimentum nec tristique id, auctor et urna. Suspendisse nibh tellus, fringilla ac blandit et, posuere a nibh. Cras sed vulputate mauris. Curabitur ornare quam in est facilisis, vel imperdiet est maximus. Quisque eget quam in velit viverra efficitur. Suspendisse potenti. Nam id massa rutrum, tristique mauris eget, porttitor nibh. Vestibulum vel faucibus lacus. Maecenas ultricies ultrices porta. Praesent sit amet pretium elit. Aliquam pharetra nunc efficitur porttitor imperdiet. Sed sollicitudin, tortor non lobortis venenatis, justo quam faucibus turpis, cursus pellentesque ante eros at tellus.`,
      image:
        "https://images.unsplash.com/photo-1517292987719-0369a794ec0f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c29jaWFsJTIwbWVkaWF8ZW58MHx8MHx8fDA%3D",
      date: "2020-01-05",
      author: "John Doe",
      likes: 50,
      comments: [
        {
          id: 9,
          text: "This is the ninth comment",
          author: "Jane Doe",
          date: "2020-01-09",
        },
        {
          id: 10,
          text: "This is the tenth comment",
          author: "John Doe",
          date: "2020-01-10",
        },
      ],
    },
    {
      id: 6,
      title: "The Role of Technology in the Workplace",
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tincidunt, nisl nec rhoncus pretium, neque orci malesuada nunc, ut aliquam diam purus id magna. Nam libero diam, condimentum nec tristique id, auctor et urna. Suspendisse nibh tellus, fringilla ac blandit et, posuere a nibh. Cras sed vulputate mauris. Curabitur ornare quam in est facilisis, vel imperdiet est maximus. Quisque eget quam in velit viverra efficitur. Suspendisse potenti. Nam id massa rutrum, tristique mauris eget, porttitor nibh. Vestibulum vel faucibus lacus. Maecenas ultricies ultrices porta. Praesent sit amet pretium elit. Aliquam pharetra nunc efficitur porttitor imperdiet. Sed sollicitudin, tortor non lobortis venenatis, justo quam faucibus turpis, cursus pellentesque ante eros at tellus.`,
      image:
        "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGVjaHxlbnwwfHwwfHx8MA%3D%3D",
      date: "2020-01-06",
      author: "Jane Doe",
      likes: 60,
      comments: [
        {
          id: 11,
          text: "This is the eleventh comment",
          author: "John Doe",
          date: "2020-01-11",
        },
        {
          id: 12,
          text: "This is the twelfth comment",
          author: "Jane Doe",
          date: "2020-01-12",
        },
      ],
    },
  ];
  function showPost(post) {
    return (
      <Post
        key={post.id}
        id={post.id}
        title={post.title}
        description={post.description}
        image={post.image}
        date={post.date}
        author={post.author}
      />
    );
  }
  return (
    <>
      <Container>{posts.map(showPost)}</Container>
    </>
  );
};

export default AllPosts;
