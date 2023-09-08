import { usePaginate } from "@tam11a/react-use-hooks";
import React from "react";
import { IOption } from "./types";
import { useGetMedia } from "@/queries/media";

const useMedia = () => {
  const { setSearch, getQueryParams } = usePaginate({
    defaultParams: {
      limit: 40,
    },
  });

  const [media, setMedia] = React.useState<IOption[]>([]);
  const { data: mediaData, isLoading: mediaLoading } = useGetMedia(
    getQueryParams()
  );

  React.useEffect(() => {
    if (!mediaData) return;
    var d: IOption[] = [];
    mediaData?.data?.data?.map?.(
      (s: { id: string; first_name: string; last_name: string }) => {
        d.push({
          value: s.id,
          label: `${s.first_name} ${s.last_name}`,
          data: s,
        });
      }
    );
    setMedia(d);
  }, [mediaData]);

  return {
    isMediaLoading: mediaLoading,
    media,
    searchMedia: (value: string) => {
      setSearch(value);
    },
  };
};

export default useMedia;
