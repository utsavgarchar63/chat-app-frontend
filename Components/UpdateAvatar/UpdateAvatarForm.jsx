import React, { useEffect, useState, Suspense } from "react";
import { Card, Button } from "react-bootstrap";
import { ApiGet, ApiPost } from "../../Helper/APIData";
import { useRouter } from "next/router";
import styles from "./UpdateAvatar.module.css";

import { RadioGroup, Radio, cn } from "@nextui-org/react";
// import Radio from "@mui/material/Radio";
export const CustomRadio = (props) => {
  const { children, ...otherProps } = props;

  return (
    <Radio
      {...otherProps}
      classNames={{
        base: cn(
          "inline-flex m-0 bg-content1 hover:bg-content2 items-center justify-between",
          "flex-row-reverse max-w-[300px] cursor-pointer rounded-lg gap-4 p-4 border-2 border-transparent",
          "data-[selected=true]:border-primary"
        ),
      }}
    >
      {children}
    </Radio>
  );
};

export default function UpdateAvatarForm() {
  // const router = useRouter();
  // const boyId = [
  //   40, 16, 33, 2, 24, 34, 17, 32, 15, 35, 47, 7, 30, 9, 45, 23, 14, 13, 3, 21,
  //   6, 31, 22, 43, 50, 12, 25, 11, 10, 39, 8, 19, 49, 27, 18, 37, 36, 44, 29,
  //   48, 26, 41, 5, 1, 4, 42, 20, 38,
  // ];
  // const girlId = [
  //   95, 61, 74, 51, 81, 78, 53, 84, 94, 72, 75, 77, 67, 82, 90, 65, 71, 80, 57,
  //   55, 99, 83, 59, 58, 73, 69, 76, 64, 52, 66, 88, 91, 92, 63, 86, 93, 98, 100,
  //   87, 70, 62, 97, 60, 96, 85, 56, 79, 54, 89,
  // ];
  // const [selectedValue, setSelectedValue] = useState("a");
  // const [avatar, setAvatar] = useState("");
  // const [data, setData] = useState("");
  // const [gender, setGender] = useState("");
  // const [fade, setFade] = useState("visible");
  // const [loading, setLoading] = useState(false);

  // const fetchRandomAvatar = (gender) => {
  //   setLoading(true);

  //   setFade("hidden");
  //   const idList = gender === "male" ? boyId : girlId;
  //   const randomId = idList[Math.floor(Math.random() * idList.length)];
  //   const newAvatar = `https://avatar.iran.liara.run/public/${randomId}`;
  //   setTimeout(() => {
  //     setAvatar(newAvatar);
  //     setFade("visible");
  //     setLoading(false);
  //   }, 500);
  // };

  // const handleUpload = async (event) => {
  //   const file = event.target.files[0];
  //   console.log(file);
  //   const formData = new FormData();
  //   formData.append("image", file);

  //   try {
  //     const response = await ApiPost("/upload/image-upload", formData);

  //     if (!response.ok) {
  //       throw new Error("Failed to upload image");
  //     }

  //     const data = await response.json();
  //     console.log(data);
  //     setAvatar(data.imageUrls[0]); // Assuming your API responds with the uploaded image URL
  //   } catch (error) {
  //     console.error("Error uploading image:", error);
  //   }
  // };
  // const handleUpdateAvatar = async () => {
  //   try {
  //     const response = await ApiPost(
  //       `/user/update-user-avatar?${router.query.id}`,
  //       {
  //         avatarPath: avatar,
  //       }
  //     );
  //     console.log(response);
  //     if (response.success) {
  //       console.log("Avatar updated successfully");
  //     } else {
  //       console.error("Failed to update avatar");
  //     }
  //   } catch (error) {
  //     console.error("Error updating avatar:", error);
  //   }
  // };
  // const handleChange = (event) => {
  //   setSelectedValue(event.target.value);
  // };
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await ApiGet(`/user/get-user?id=${router.query.id}`);
  //       setData(response.data);
  //       console.log(response.data.data.vAvatarImagePath);
  //       setGender(response.data.data.vGender);
  //       setAvatar(response.data.data.vAvatarImagePath);
  //       if (response.data.success == false) {
  //         router.push("/register");
  //       }
  //     } catch (error) {
  //       console.error("Error fetching data", error);
  //       router.push("/register");
  //     }
  //   };

  //   if (router.query.id) {
  //     fetchData();
  //   }
  // }, [router.query.id]);
  // return (
  //   <>
  //     <div className="position-absolute top-50 start-50 translate-middle">
  //       <div className="w-40 p-lg-4  shadow-lg p-3 mb-5 rounded d-flex justify-content-center">
  //         <Card className="w-50 p-4 me-5">
  //           <div>
  //             <div className="d-flex justify-content-center">
  //               <Suspense fallback={<p>Loading feed...</p>}>
  //                 <img
  //                   src={avatar}
  //                   alt="Avatar"
  //                   className={`${styles.avatarImage} ${styles[fade]}`}
  //                 />
  //               </Suspense>
  //             </div>
  //             <div>
  //               <Radio
  //                 checked={selectedValue === "a"}
  //                 onChange={handleChange}
  //                 value="a"
  //                 sx={{
  //                   color: "#5000ca",
  //                   "&.Mui-checked": {
  //                     color: "#5000ca",
  //                   },
  //                 }}
  //                 name="radio-buttons"
  //                 inputProps={{ "aria-label": "A" }}
  //               />
  //               <br />
  //               <button
  //                 className="button mt-4"
  //                 onClick={() => fetchRandomAvatar(gender)}
  //                 disabled={loading}
  //               >
  //                 Refresh Avatar
  //               </button>
  //             </div>
  //           </div>
  //         </Card>
  //         <Card className="w-50">
  //           <input type="file" onChange={handleUpload} />
  //           <Radio
  //             checked={selectedValue === "b"}
  //             onChange={handleChange}
  //             value="b"
  //             sx={{
  //               color: "#5000ca",
  //               "&.Mui-checked": {
  //                 color: "#5000ca",
  //               },
  //             }}
  //             name="radio-buttons"
  //             inputProps={{ "aria-label": "B" }}
  //           />
  //         </Card>
  //       </div>
  //       <button className="button" onClick={handleUpdateAvatar}>
  //         Save Avatar
  //       </button>
  //     </div>
  //   </>
  // );
  return (
    <RadioGroup
      label="Plans"
      description="Selected plan can be changed at any time."
    >
      <CustomRadio description="Up to 20 items" value="free">
        Free
      </CustomRadio>
      <CustomRadio description="Unlimited items. $10 per month." value="pro">
        Pro
      </CustomRadio>
      <CustomRadio
        description="24/7 support. Contact us for pricing."
        value="enterprise"
      >
        Enterprise
      </CustomRadio>
    </RadioGroup>
  );
}
