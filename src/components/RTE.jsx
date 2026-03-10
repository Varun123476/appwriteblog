import { Controller } from "react-hook-form";
import { Editor } from "@tinymce/tinymce-react";

function RTE({ name, control, label, defaultValue = "" }) {
  return (
    <div className="w-full mb-4">
      {label && (
        <label className="block mb-1.5 text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field: { onChange, value } }) => (
          <Editor
            apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
            value={value}
            onEditorChange={onChange}
            init={{
              height: 400,
              menubar: true,
              skin: "oxide",
              plugins: [
                "advlist", "autolink", "lists", "link", "image",
                "charmap", "preview", "anchor", "searchreplace",
                "visualblocks", "code", "fullscreen", "insertdatetime",
                "media", "table", "code", "help", "wordcount",
              ],
              toolbar:
                "undo redo | formatselect | bold italic underline | " +
                "alignleft aligncenter alignright alignjustify | " +
                "bullist numlist outdent indent | link image | removeformat | help",
              content_style:
                "body { font-family: Georgia, serif; font-size: 16px; line-height: 1.7; color: #111827; }",
            }}
          />
        )}
      />
    </div>
  );
}

export default RTE;
