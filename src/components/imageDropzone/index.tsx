import React, { useCallback, useMemo } from "react";
import { useDropzone } from "react-dropzone";
import styles from "./ImageDropzone.module.css";

type Props = {
  file: File | null;
  imageUrl?: string;
  onSelect: (file: File) => void;
};

export function ImageDropzone({ file, imageUrl, onSelect }: Props) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        onSelect(acceptedFiles[0]);
      }
    },
    [onSelect],
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
  });

  const previewUrl = useMemo(() => {
    if (file) {
      return URL.createObjectURL(file);
    }
    if (imageUrl) {
      return imageUrl;
    }
    return null;
  }, [file, imageUrl]);

  return (
    <div {...getRootProps()} className={styles.root}>
      <input {...getInputProps()} />

      {previewUrl ? (
        <img
          src={previewUrl}
          alt="Imagen de la mascota"
          className={styles.image}
        />
      ) : (
        <p className={styles.placeholder}>Agregar o cambiar foto</p>
      )}
    </div>
  );
}
