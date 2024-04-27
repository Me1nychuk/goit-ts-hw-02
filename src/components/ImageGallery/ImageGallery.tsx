
import css from "./ImageGallery.module.css";
import ImageCard from "../ImageCard/ImageCard";

interface Image {
  id: string;
  urls: {
    small: string;
    full: string;
  };
  alt_description: string;
  user: {
    name: string;
  };
}

interface ImageGalleryProps {
  images: Image[];
  onClick: (image: Image) => void;
}

const ImageGallery:React.FC<ImageGalleryProps> = ({ images, onClick }) => {
  return (
    <div className={css.wrapper}>
      <ul className={css.list}>
        {images.map((el) => {
          return (
            <li key={el.id} className={css.listItem}>
              <ImageCard
                imageSmall={el.urls.small}
                description={el.alt_description}
                onClick={() => onClick(el)}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};



export default ImageGallery;
