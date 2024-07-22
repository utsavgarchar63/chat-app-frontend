import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { Skeleton } from "@nextui-org/react";
import { ApiGet } from "../../Helper/APIData";

const boyId = [
  40, 16, 33, 2, 24, 34, 17, 32, 15, 35, 47, 7, 30, 9, 45, 23, 14, 13, 3, 21, 6,
  31, 22, 43, 50, 12, 25, 11, 10, 39, 8, 19, 49, 27, 18, 37, 36, 44, 29, 48, 26,
  41, 5, 1, 4, 42, 20, 38,
];
const girlId = [
  95, 61, 74, 51, 81, 78, 53, 84, 94, 72, 75, 77, 67, 82, 90, 65, 71, 80, 57,
  55, 99, 83, 59, 58, 73, 69, 76, 64, 52, 66, 88, 91, 92, 63, 86, 93, 98, 100,
  87, 70, 62, 97, 60, 96, 85, 56, 79, 54, 89,
];

export default function UpdateAvatarForm() {
  const [gender, setGenderData] = useState("");
  const [avatarUrls, setAvatarUrls] = useState([]);
  const router = useRouter();
  const { query } = router;

  useEffect(() => {
    if (query.id) {
      fetchUserData(query.id);
    }
  }, [query.id]);

  const fetchUserData = async (id) => {
    try {
      const response = await ApiGet(`/user/get-user?id=${id}`);
      if (response?.data?.success === true) {
        const userGender = response?.data?.data?.vGender;
        setGenderData(userGender);
        fetchAvatars(userGender);
      } else {
        console.error(`Failed to fetch user data: ${response.status}`);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const fetchAvatars = async (gender) => {
    const ids = gender === "male" ? getRandomIds(boyId) : getRandomIds(girlId);
    const urls = ids.map((id) => `https://avatar.iran.liara.run/public/${id}`);
    setAvatarUrls(urls);
  };

  const getRandomIds = (array) => {
    let result = [];
    const tempArray = [...array];
    while (result.length < 4 && tempArray.length) {
      const randomIndex = Math.floor(Math.random() * tempArray.length);
      result.push(tempArray.splice(randomIndex, 1)[0]);
    }
    return result;
  };

  return (
    <>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {avatarUrls.length === 0
          ? [1, 2, 3, 4].map((_, index) => (
              <div
                key={index}
                style={{
                  position: "relative",
                  width: "100px",
                  height: "100px",
                }}
              >
                <Skeleton
                  css={{ width: "100%", height: "100%", borderRadius: "8px" }}
                />
              </div>
            ))
          : avatarUrls.map((url, index) => (
              <div
                key={index}
                style={{
                  position: "relative",
                  width: "100px",
                  height: "100px",
                }}
              >
                <Image
                  src={url}
                  alt={`Avatar ${index}`}
                  layout="fill"
                  objectFit="cover"
                  placeholder="blur"
                  blurDataURL={url} // Use a low-quality image placeholder or a tiny version of the image
                />
              </div>
            ))}
      </div>
    </>
  );
}
