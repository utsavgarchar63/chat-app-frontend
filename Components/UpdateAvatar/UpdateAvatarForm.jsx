import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Container, Row, Col, Button } from "react-bootstrap";
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
    setAvatarUrls(urls);
    setLoading(false);
  };

  const handleAvatarClick = (url) => {
    setSelectedAvatar(url);
  };

  const handleUpdateAvatar = async () => {
    if (selectedAvatar) {
      try {
        const response = await ApiPut(
          `/user/update-user-avatar?id=${query?.id}`,
          {
            avatarPath: selectedAvatar,
          }
        );
        if (response?.data?.success === true) {
          toast.success(response?.data?.message, {
            duration: 4000,
            position: "top-right",
          });
          router.push(`/login`);
        }
      } catch (error) {
        toast.error(error?.response?.data?.message, {
          duration: 4000,
          position: "top-right",
        });
      }
    } else {
      alert("Please select an avatar.");
    }
  };

  return (
    <Container fluid className="update-avatar-form">
      <Row className="justify-content-center">
        {avatarUrls.map((url, index) => (
          <Col
            key={index}
            xs={6}
            sm={4}
            md={3}
            lg={2}
            className="d-flex justify-content-center mb-4"
          >
            <img
              src={url}
              alt={`Avatar ${index}`}
              className="avatar-img"
              onClick={() => handleAvatarClick(url)}
              style={{
                cursor: "pointer",
                border:
                  selectedAvatar === url ? "3px solid rgb(80 0 202)" : "none",
                padding: selectedAvatar === url ? "5px" : "0",
                transition: "border-color 0.2s, padding 0.3s",
              }}
            />
          </Col>
        ))}
      </Row>
      <div className="mt-4 d-flex justify-content-center">
        <Button variant="primary" onClick={handleUpdateAvatar}>
          Update Avatar
        </Button>
      </div>
      <style jsx>{`
        .avatar-img {
          width: 100%;
          max-width: 200px;
          height: auto;
          border-radius: 50%;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          transition: border 0.3s ease;
        }

        @media (max-width: 576px) {
          .avatar-img {
            max-width: 120px;
          }
        }

        @media (max-width: 360px) {
          .avatar-img {
            max-width: 100px;
          }
        }

        .update-avatar-form {
          padding: 20px;
        }

        .update-avatar-form button {
          width: 100%;
          max-width: 200px;
        }
      `}</style>
    </Container>
  );
}
