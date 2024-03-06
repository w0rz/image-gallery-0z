import type { Photo } from "@/models/Images";
import Image from "next/image";

type Props = {
  photo: Photo;
};

export default function ImgContainer({ photo }: Props) {
  return (
    <div className="h-64 bg-gray-200 rounded-xl relative overflow-hidden group">
      <Image
        src={photo.src.large}
        alt={photo.alt}
        fill={true}
        sizes="(min-width: 1620px) 276px, (min-width: 1320px) calc(8.57vw + 139px), (min-width: 1060px) 25vw, (min-width: 800px) calc(33.33vw - 14px), (min-width: 540px) calc(50vw - 15px), calc(100vw - 20px)"
        placeholder="blur"
        blurDataURL={photo.blurredDataUrl}
        className="object-cover group-hover:opacity-75"
      />
    </div>
  );
}
