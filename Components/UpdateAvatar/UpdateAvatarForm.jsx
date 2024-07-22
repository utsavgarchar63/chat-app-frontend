import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { Container, Row, Col } from "react-bootstrap";
import "react-loading-skeleton/dist/skeleton.css";
import { toast } from "react-hot-toast";
import { ApiGet, ApiPut } from "../../Helper/APIData";

const avatarIds = {
  male: [
    40, 16, 33, 2, 24, 34, 17, 32, 15, 35, 47, 7, 30, 9, 45, 23, 14, 13, 3, 21,
    6, 31, 22, 43, 50, 12, 25, 11, 10, 39, 8, 19, 49, 27, 18, 37, 36, 44, 29,
    48, 26, 41, 5, 1, 4, 42, 20, 38,
  ],
  female: [
    95, 61, 74, 51, 81, 78, 53, 84, 94, 72, 75, 77, 67, 82, 90, 65, 71, 80, 57,
    55, 99, 83, 59, 58, 73, 69, 76, 64, 52, 66, 88, 91, 92, 63, 86, 93, 98, 100,
    87, 70, 62, 97, 60, 96, 85, 56, 79, 54, 89,
  ],
};

const getRandomIds = (array, count = 4) => {
  const uniqueIndexes = new Set();
  const tempArray = [...array];

  while (uniqueIndexes.size < count && tempArray.length > 0) {
    const randomIndex = Math.floor(Math.random() * tempArray.length);
    uniqueIndexes.add(tempArray[randomIndex]);
    tempArray.splice(randomIndex, 1);
  }

  return Array.from(uniqueIndexes);
};

export default function UpdateAvatarForm() {
  const [loading, setLoading] = useState(true);
  const [avatarUrls, setAvatarUrls] = useState([]);
  const [selectedAvatar, setSelectedAvatar] = useState(null);
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
      if (response?.data?.success) {
        const userGender = response.data.data.vGender;
        const genderKey = userGender === "male" ? "male" : "female";
        fetchAvatars(genderKey);
      } else {
        console.error(`Failed to fetch user data: ${response.status}`);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const fetchAvatars = (gender) => {
    const ids = getRandomIds(avatarIds[gender]);
    const urls = ids.map((id) => `https://avatar.iran.liara.run/public/${id}`);
    setTimeout(() => {
      setAvatarUrls(urls);
      setLoading(false);
    }, 1000);
  };
  const handleAvatarClick = (url) => {
    setSelectedAvatar(url);
  };

  const handleUpdateAvatar = async () => {
    if (selectedAvatar) {
      try {
        const response = await ApiPut(`/user/update-user-avatar`, {
          avatarPath: selectedAvatar,
        });
        console.log(response?.data)
        if (response?.data?.success) {
          toast.success(res.data?.message, {
            duration: 4000,
            position: "top-right",
            icon: "📧",
          });
        } else {
          console.error(`Failed to update avatar: ${response.status}`);
        }
      } catch (error) {
        console.error("Error updating avatar:", error);
      }
    } else {
      alert("Please select an avatar.");
    }
  };
  return (
    <Container fluid>
      <Row className="justify-content-center">
        <SkeletonTheme baseColor="#202020" highlightColor="#444">
          {loading
            ? Array.from({ length: 4 }).map((_, index) => (
                <Col
                  key={index}
                  xs={10}
                  sm={4}
                  md={3}
                  lg={2}
                  className="d-flex justify-content-center mb-4"
                >
                  <Skeleton
                    circle
                    height={200}
                    width={200}
                    className="skeleton-loader"
                  />
                </Col>
              ))
            : avatarUrls.map((url, index) => (
                <Col
                  key={index}
                  xs={10}
                  sm={4}
                  md={3}
                  lg={2}
                  className="d-flex justify-content-center mb-4"
                >
                  <img
                    src={url}
                    alt={`Avatar ${index}`}
                    className="avatar-img"
                  />
                </Col>
              ))}
        </SkeletonTheme>
        <style jsx>{`
          .skeleton-loader {
            border-radius: 50%;
            width: 200px;
            height: 200px;
            animation: skeleton-loading 1.5s infinite ease-in-out;
          }

          .avatar-img {
            width: 200px;
            height: 200px;
            border-radius: 50%;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          }

          @keyframes skeleton-loading {
            0% {
              background-position: -200% 0;
            }
            100% {
              background-position: 200% 0;
            }
          }

          @media (max-width: 576px) {
            .avatar-img {
              width: 120px;
              height: 120px;
            }
            .skeleton-loader {
              width: 120px !important;
              height: 120px !important;
            }
          }

          @media (max-width: 360px) {
            .avatar-img {
              width: 100px;
              height: 100px;
            }

            .skeleton-loader {
              width: 100px !important;
              height: 100px !important;
            }
          }
        `}</style>
      </Row>
      <div className="mt-4 d-flex justify-content-center">
        <button className="button">Update Avatar</button>
      </div>
    </Container>
  );
}
