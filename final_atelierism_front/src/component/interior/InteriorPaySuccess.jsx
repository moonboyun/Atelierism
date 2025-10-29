import { useEffect } from "react";

const InteriorPaySuccess = () => {
  const designerId = localStorage.getItem("interiorDesigner");
  useEffect(() => {
    const designerId = localStorage.getItem("interiorDesigner");
    console.log("디자이너 아이디:", designerId);
    return () => {
      localStorage.removeItem("interiorDesigner");
    };
  }, []);
  return (
    <div className="main-content">
      <div className="main-title">결제 완료!</div>
      <div>{designerId}</div>
    </div>
  );
};

export default InteriorPaySuccess;
