// useMetadata.js
import { useEffect } from "react";

const useMetadata = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  useEffect(() => {
    document.title = title;
    document
      ?.querySelector('meta[name="description"]')
      ?.setAttribute("content", description);
    // 기타 메타데이터 설정
  }, [title, description]);
};

export default useMetadata;
