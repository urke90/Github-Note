interface IEditPostProps {
  params: {
    id: string;
  };
}

const EditPost: React.FC<IEditPostProps> = (props) => {
  console.log('props', props);
  return <div>EditPost</div>;
};

export default EditPost;
