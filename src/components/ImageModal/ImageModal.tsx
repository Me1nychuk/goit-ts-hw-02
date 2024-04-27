import ReactModal from "react-modal";
import css from "./ImageModal.module.css";

interface ImageModalProp{
  data: {
    name: string,
    image: string,
    description: string,
  };
  isOpen: boolean;
  onRequestClose: () => void;

}

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "90%",
    height: "90%",
    padding: "20px",
    backgroundColor: "rgba(0, 0, 0, 0.95)",
    borderRadius: "8px",
  },
};
const ImageModal: React.FC<ImageModalProp> = ({ data, isOpen, onRequestClose }) => {
  if (!data) {
    return <div>No data available</div>;
  }

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      contentLabel="Image Modal"
      ariaHideApp={false}
    >
      <div className={css.modal}>
        <p>User: {data.name}</p>
        <p>Description: {data.description}</p>
        <img className={css.img} src={data.image}></img>
        <button type="button" onClick={onRequestClose}>
          Close
        </button>
      </div>
    </ReactModal>
  );
};



export default ImageModal;
