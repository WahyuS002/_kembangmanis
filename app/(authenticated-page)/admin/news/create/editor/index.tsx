import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function Editor({
  content,
  setContent,
}: {
  content: string;
  setContent: (value: string) => void;
}) {
  return (
    <ReactQuill
      className="h-[500px]"
      theme="snow"
      value={content}
      onChange={setContent}
    />
  );
}
