import fetchImages from "@/lib/fetchImages";
import type { ImagesResults } from "@/models/Images";
import ImgContainer from "./ImgContainer";
import addBlurredDataUrls from "@/lib/getBase64";

type Props = {
  term?: string | undefined;
};

export default async function Gallery({ term }: Props) {
  const url = !term
    ? "https://api.pexels.com/v1/curated"
    : `https://api.pexels.com/v1/search?query=${term}`;
  const images: ImagesResults | undefined = await fetchImages(url);

  if (!images) return <h2 className="m-4 text-2xl">No Images Found</h2>;

  const photosWithBlur = await addBlurredDataUrls(images);
  return (
    <section className="px-1 my-3 grid grid-cols-gallery auto-rows-[10px]">
      {photosWithBlur.map((photo) => (
        <ImgContainer key={photo.id} photo={photo} />
      ))}
    </section>
  );
}
