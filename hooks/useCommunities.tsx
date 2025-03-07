import { StateType } from "@/lib/@types";
import axios from "axios";
import { useEffect, useState } from "react";

export const useCommunities = (state: string) => {
  const [communities, setCommunities] = useState<StateType[]>([
    {
      key: "",
      value: "",
    },
  ]);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    setFetching(true);
    const getCommunities = async () => {
      try {
        const { data } = await axios.get(
          `https://247labapi.netpro.software/api.aspx?api=getcommunities&statename=${state}`,
        );

        if (data) {
          const newArray = data?.map((community: any) => ({
            key: community?.commname,
            value: community?.commname,
          }));

          setCommunities(newArray);
        } else {
          setCommunities([
            {
              key: "",
              value: "",
            },
          ]);
        }
      } catch (error) {
        console.log(error);
        setCommunities([
          {
            key: "",
            value: "",
          },
        ]);
      } finally {
        setFetching(false);
      }
    };

    getCommunities();
  }, [state]);

  return {
    communities,
    fetching,
  };
};
