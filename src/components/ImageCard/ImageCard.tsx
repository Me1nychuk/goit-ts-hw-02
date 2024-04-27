
import css from "./ImageCard.module.css";



interface ImageCardProp{
  imageSmall: string;
  description: string;
  onClick:  (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const ImageCard:React.FC<ImageCardProp> = ({ imageSmall, description, onClick }) => {
  return (
    <div className={css.wrapper} onClick={onClick}>
      <img
        className={css.img}
        width="400px"
        height="300px"
        src={imageSmall}
        alt={description}
      />
    </div>
  );
};



export default ImageCard;
