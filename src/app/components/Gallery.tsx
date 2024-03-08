import fetchImages from "@/lib/fetchImages";
import type { ImagesResults } from "@/models/Images";
import ImgContainer from "./ImgContainer";
import addBlurredDataUrls from "@/lib/getBase64";
import getPrevNextPages from "@/lib/getPrevNextPages";
import Footer from "./Footer";
type Props = {
  term?: string | undefined;
  page?: string | undefined;
};

export default async function Gallery({ term = "curated", page }: Props) {
  let url;
  if (term === "curated" && page) {
    // browsing beyond the home page
    url = `https://api.pexels.com/v1/curated?page=${page}`;
  } else if (term === "curated") {
    // home page
    url = "https://api.pexels.com/v1/curated";
  } else if (!page) {
    //first page of search results
    url = `https://api.pexels.com/v1/search?query=${term}`;
  } else {
    // search results beyond the first page
    url = `https://api.pexels.com/v1/search?query=${term}&page=${page}`;
  }
  const images: ImagesResults | undefined = await fetchImages(url);

  if (!images || images.per_page === 0)
    return <h2 className="m-4 text-2xl font-bold">No Images Found</h2>;

  const photosWithBlur = await addBlurredDataUrls(images);

  // calculate pagination
  const { prevPage, nextPage } = getPrevNextPages(images);

  const footerProps = { term, page, nextPage, prevPage };
  return (
    <>
      <section className="px-1 my-3 grid grid-cols-gallery auto-rows-[10px]">
        {photosWithBlur.map((photo) => (
          <ImgContainer key={photo.id} photo={photo} />
        ))}
      </section>
      <Footer {...footerProps} />
    </>
  );
}
