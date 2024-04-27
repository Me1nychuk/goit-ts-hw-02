import { FC } from "react";
interface LoadMoreBtnProp{
  onClick: () => void;
}
const LoadMoreBtn:FC<LoadMoreBtnProp> = ({ onClick }) => {
  return (
    <div>
      <button type="button" onClick={onClick}>
        Load more..
      </button>
    </div>
  );
};



export default LoadMoreBtn;
