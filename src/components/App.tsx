import { useState, useMemo, useEffect , FC} from "react";
import "./App.css";
import SearchBar from "./SearchBar/SearchBar";
import ImageGallery from "./ImageGallery/ImageGallery";
import Loader from "./Loader/Loader";
import ErrorMessage from "./ErrorMessage/ErrorMessage";
import LoadMoreBtn from "./LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./ImageModal/ImageModal";
import { fetchImages  } from "./api";

interface ImageData {
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

interface ModalData {
  name: string;
  image: string;
  description: string;
}

function App():FC {
  const [images, setImages] = useState<ImageData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<any | null>(null);
  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalData, setModalData] = useState<{ name: string; image: string; description: string } >({name: "",image:"",description:""});

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      setIsLoading(true);
      try {
        if (page === 1) {
          const fetchedImages: { results: ImageData[], total_pages: number } = await fetchImages(query);
          setImages(fetchedImages.results);          
          setPage(1);
          setTotalPage(fetchedImages.total_pages);
          setError(null);
        } else {
          const fetchedImages: { results: ImageData[] } = await fetchImages(query, page);
          setImages((prevState) => {
            return [...prevState, ...fetchedImages.results];
          });
        }
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (query !== "") {
      fetchData();
    }
  }, [query, page]);

  useEffect((): void => {
    scrollToBottom();
  }, [images]);

  const handleSearch = (word:string) => {
    setQuery(word);
    setPage(1);
  };
  const handleAddImage = ():void => {
    setPage((prevState) => prevState + 1);
  };

  const handleOpenModal = (data:ImageData):void => {
    const image:string = data.urls.full;
    const description: string   = data.alt_description;
    const name: string  = data.user.name;

    setModalData({ image, description, name });
    setIsModalOpen(true);
  };
  function scrollToBottom():void {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth", // Додає плавність до скролу
    });
  }

  const handleCloseModal = ():void => {
    setIsModalOpen(false);
  };
  const memoizedModalData: ModalData = useMemo(
    () => ({
      name: modalData.name || "",
      image: modalData.image || "",
      description: modalData.description || "",
    }),
    [modalData]
  );

  return (
    <>
      <SearchBar onSubmit={handleSearch} />

      {isLoading ? (
        <Loader />
      ) : (
        <ImageGallery images={images} onClick={handleOpenModal} />
      )}
      {totalPage > page && <LoadMoreBtn onClick={handleAddImage} />}
      {error && <ErrorMessage message={error.message} />}
      <ImageModal
        data={memoizedModalData}
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
      />
    </>
  );
}

export default App;
