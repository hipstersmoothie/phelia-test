import React from "react";
import { Message, ImageBlock, Divider, Actions, Button, PheliaMessage } from "phelia";

const imageUrls = [
  "https://cdn.pixabay.com/photo/2015/06/08/15/02/pug-801826__480.jpg",
  "https://cdn.pixabay.com/photo/2015/03/26/09/54/pug-690566__480.jpg",
  "https://cdn.pixabay.com/photo/2018/03/31/06/31/dog-3277416__480.jpg",
  "https://cdn.pixabay.com/photo/2016/02/26/16/32/dog-1224267__480.jpg",
];

function randomImage() {
  const index = Math.floor(Math.random() * imageUrls.length);
  return imageUrls[index];
}

const RandomImage: PheliaMessage = ({ useState }) => {
  const [imageUrl, setImageUrl] = useState("imageUrl", randomImage());

  return (
    <Message text="Choose a dog">
      <ImageBlock
        title="an adorable :dog:"
        alt="a very adorable doggy dog"
        imageUrl={imageUrl}
        emoji
      />
      <Divider />
      <Actions>
        <Button
          style="primary"
          action="randomImage"
          onClick={() => setImageUrl(randomImage())}
        >
          New doggy
        </Button>
      </Actions>
    </Message>
  );
};

export default RandomImage;